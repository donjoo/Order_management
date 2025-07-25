# Generated by Django 5.2.2 on 2025-06-09 15:46

from django.db import migrations, models


class Migration(migrations.Migration):

    initial = True

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='Order',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('customer_name', models.CharField(max_length=100)),
                ('customer_id', models.CharField(max_length=50)),
                ('quantity', models.PositiveIntegerField()),
                ('product', models.CharField(max_length=100)),
                ('product_cost', models.DecimalField(decimal_places=2, max_digits=10)),
                ('user_email', models.EmailField(max_length=254)),
                ('status', models.CharField(choices=[('Order Placed', 'Order Placed'), ('Confirmed', 'Confirmed'), ('Dispatched', 'Dispatched')], default='Order Placed', max_length=20)),
                ('created_at', models.DateTimeField(auto_now_add=True)),
            ],
        ),
    ]
