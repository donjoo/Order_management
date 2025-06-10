from celery import shared_task
import imaplib
import email
from .models import Order
from django.conf import settings
import re
import cohere

# from openai import OpenAI
# client = OpenAI(api_key=settings.OPENAI_API_KEY)



co = cohere.Client(settings.COHERE_API_KEY)

@shared_task
def check_incoming_emails():
    mail = imaplib.IMAP4_SSL('imap.gmail.com')
    mail.login(settings.EMAIL_HOST_USER, settings.EMAIL_HOST_PASSWORD)
    mail.select('inbox')

    status, response = mail.search(None, 'UNSEEN')
    unread_msg_nums = response[0].split()

    print("Checking inbox...")
    for e_id in unread_msg_nums:
        status , msg_data = mail.fetch(e_id, '(RFC822)')
        raw_email = msg_data[0][1]
        msg = email.message_from_bytes(raw_email)

        body = ""
        if msg.is_multipart():
            for part in msg.walk():
                if part.get_content_type() == 'text/plain':
                    body = part.get_payload(decode=True).decode()
        else:
            body = msg.get_payload(decode=True).decode()
        print("Email received. Body:", body)
        print("Sending to LLM...")

        prompt = f"""You are an assistant that reads emails to determine if they confirm an order.
            Email content:
            {body}

            Question: Does this email confirm an order? If yes, please reply with "Yes" and the order number in format "Order #<number>".
            If no, reply with "No", Also if the email says order ready to dispatch or something similar , please reply with 'Ready to dispatch".
        """

        response = co.generate(
            model='command-r-plus',  
            prompt=prompt,
            max_tokens=50,
            temperature=0.3,
        )
        answer = response.generations[0].text.strip().lower()
        print("LLM Response:", answer)

        confirmed = False
        dispatched = False

        if "yes" in answer:
            match = re.search(r'order\s*#?(\d+)', answer)
            if match:
                order_id = int(match.group(1))
                try:
                    order = Order.objects.get(id=order_id)
                    order.status = 'Confirmed'
                    order.save()
                    confirmed = True
                    print(f"Order #{order_id} confirmed ✅")
                except Order.DoesNotExist:
                    print(f"Order #{order_id} not found ❌")
            else:
                print("Could not extract order ID ❌")


        elif 'ready to dispatch' in answer:
            match = re.search(r'order\s*#?(\d+)', answer)
            if match:
                order_id = int(match.group(1))
                try:
                    order = Order.objects.get(id=order_id)
                    order.status = 'Dispatched'
                    order.save()
                    dispatched = True
                    print(f"Order #{order_id} confirmed ✅")
                except Order.DoesNotExist:
                    print(f"Order #{order_id} not found ❌")
            else:
                print("Could not extract order ID ❌")

        if not confirmed and not dispatched:
            print("LLM did not confirm the order ❌")

    mail.logout()