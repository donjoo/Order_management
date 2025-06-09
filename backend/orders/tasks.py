from celery import shared_task
import imaplib
import email
from .models import Order
from django.conf import settings
import re


import openai

openai.api_key = settings.OPENAI_API_KEY


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


        llm_response = openai.ChatCompletetion.create(
            model= "gpt-3.5-turbo",
            message=[
                {"role":"system","content":"You are an assistant that helps confirm if an email indicates order confirmation."},
                {"role":"user","content":f"Here is an email:\n{body}\n\n Does it confirm an order? if yes, extract the order number."}
            ]
        )

        answer = llm_response['choices'][0]['message']['content'].lower()


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