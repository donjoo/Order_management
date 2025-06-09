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


        prompt = f"""You are an assistant that reads emails to determine if they confirm an order.
            Email content:
            {body}

            Question: Does this email confirm an order? If yes, please reply with "Yes" and the order number in format "Order #<number>".
            If no, reply with "No".
        """

        response = co.generate(
            model='command-r-plus',  
            prompt=prompt,
            max_tokens=50,
            temperature=0.3,
        )
        answer = response.generations[0].text.strip().lower()


        if "yes" in answer:
            match = re.search(r'order\s*#?(\d+)', answer)
            if match:
                order_id = int(match.group(1))
                try:
                    order = Order.objects.get(id=order_id)
                    order.status = 'Confirmed'
                    order.save()
                except Order.DoesNotExist:
                    password


    mail.logout()