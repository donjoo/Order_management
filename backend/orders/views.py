from rest_framework import viewsets, status
from rest_framework.response import Response
from .models import Order 
from .serializers import OrderSerializer
from django.core.mail import send_mail, EmailMultiAlternatives
from django.conf import settings
import urllib.parse


WAREHOUSE_EMAIL = "donjorois@gmail.com"

class OrderViewSet(viewsets.ModelViewSet):
    queryset = Order.objects.all().order_by('-created_at')
    serializer_class = OrderSerializer

    def perform_create(self,serializer):
        order = serializer.save(status='Order Placed')
        #send email to warehouse
        subject = f"New Order Placed : {order.id}"
        from_email = settings.EMAIL_HOST_USER
        to_email = [WAREHOUSE_EMAIL]

       
        confirm_subject = f"Confirm Order #{order.id}"
        confirm_body = f"Order #{order.id} confirmed"

        mailto_link = f"mailto:{settings.EMAIL_HOST_USER}?subject={urllib.parse.quote(confirm_subject)}&body={urllib.parse.quote(confirm_body)}"

       
        text_content = (
            f"Order Details:\n"
            f"Customer: {order.customer_name}\n"
            f"Product: {order.product}\n"
            f"Quantity: {order.quantity}\n"
            f"Cost: {order.product_cost}\n"
            f"User Email: {order.user_email}\n\n"
            f"To confirm this order , reply with:\nOrder #{order.id} confirmed"
        )

        html_content = f"""
        <html>
        <body>
            <h2>New Order Placed</h2>
            <p><strong>Order ID:</strong> {order.id}</p>
            <p><strong>Customer:</strong> {order.customer_name}</p>
            <p><strong>Product:</strong> {order.product}</p>
            <p><strong>Quantity:</strong> {order.quantity}</p>
            <p><strong>Cost:</strong> {order.product_cost}</p>
            <p><strong>User Email:</strong> {order.user_email}</p>
            <br>
            <a href="{mailto_link}"

            style="background-color:#4CAF50;color:white;padding:10px 20px;text-decoration:none;border-radius:5px;">
            ✅ Confirm Order
            </a>
            <br><br>
            <p>Or reply with: <code>Order #{order.id} confirmed</code></p>
        </body>
        </html>
        """
            

        msg = EmailMultiAlternatives(subject, text_content, from_email, to_email)
        msg.attach_alternative(html_content, "text/html")
        msg.send()

        # send_mail(subject, message, settings.EMAIL_HOST_USER, [WAREHOUSE_EMAIL])


