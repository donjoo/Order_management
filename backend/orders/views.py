from rest_framework import viewsets, status
from rest_framework.response import Response
from .models import Order 
from .serializers import OrderSerializer
from django.core.mail import send_mail
from django.conf import settings

WAREHOUSE_EMAIL = "donjorois@gmail.com"

class OrderViewSet(viewsets.ModelViewSet):
    queryset = Order.objects.all().order_by('-created_at')
    serializer_class = OrderSerializer

    def perform_create(self,serializer):
        order = serializer.save(status='Order Placed')
        #send email to warehouse
        subject = f"New Order Placed : {order.id}"
        message = (
            f"Order Details:\n"
            f"Customer: {order.customer_name}\n"
            f"Product: {order.product}\n"
            f"Quantity: {order.quantity}\n"
            f"Cost: {order.product_cost}\n"
            f"User Email: {order.user_email}\n\n"
            f"To confirm this order , reply with:\nOrder #{order.id} confirmed"
        )

        send_mail(subject, message, settings.EMAIL_HOST_USER, [WAREHOUSE_EMAIL])


