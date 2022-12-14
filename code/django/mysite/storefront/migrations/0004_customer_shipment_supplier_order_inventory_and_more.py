# Generated by Django 4.0.4 on 2022-11-13 22:17

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('storefront', '0003_item_classification'),
    ]

    operations = [
        migrations.CreateModel(
            name='Customer',
            fields=[
                ('customerID', models.AutoField(primary_key=True, serialize=False)),
                ('firstName', models.CharField(max_length=20)),
                ('lastName', models.CharField(max_length=20)),
                ('email', models.CharField(max_length=30)),
                ('phoneNum', models.CharField(max_length=15)),
                ('country', models.CharField(max_length=30)),
                ('street', models.CharField(max_length=30)),
                ('city', models.CharField(max_length=30)),
                ('state', models.CharField(max_length=30)),
                ('zip', models.IntegerField(max_length=10)),
                ('note', models.CharField(max_length=300)),
            ],
        ),
        migrations.CreateModel(
            name='Shipment',
            fields=[
                ('shipID', models.AutoField(primary_key=True, serialize=False)),
                ('trackingNo', models.CharField(max_length=30)),
                ('shipDate', models.DateField()),
                ('note', models.CharField(max_length=300)),
            ],
        ),
        migrations.CreateModel(
            name='Supplier',
            fields=[
                ('supplierID', models.AutoField(primary_key=True, serialize=False)),
                ('company', models.CharField(max_length=30)),
                ('email', models.CharField(max_length=30)),
                ('phoneNum', models.CharField(max_length=15)),
                ('country', models.CharField(max_length=30)),
                ('street', models.CharField(max_length=30)),
                ('city', models.CharField(max_length=30)),
                ('state', models.CharField(max_length=30)),
                ('zip', models.IntegerField(max_length=10)),
                ('note', models.CharField(max_length=300)),
            ],
        ),
        migrations.CreateModel(
            name='Order',
            fields=[
                ('orderID', models.AutoField(primary_key=True, serialize=False)),
                ('quantity', models.IntegerField(max_length=10)),
                ('orderDate', models.DateField()),
                ('orderPrice', models.DecimalField(decimal_places=2, max_digits=11)),
                ('customerID', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='storefront.customer')),
                ('itemID', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='storefront.item')),
                ('shipID', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='storefront.shipment')),
            ],
        ),
        migrations.CreateModel(
            name='Inventory',
            fields=[
                ('stackID', models.AutoField(primary_key=True, serialize=False)),
                ('quantity', models.IntegerField(max_length=10)),
                ('expirationDate', models.DateField()),
                ('inboundDate', models.DateField()),
                ('itemID', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='storefront.item')),
            ],
        ),
        migrations.CreateModel(
            name='GoodsReceipt',
            fields=[
                ('recID', models.AutoField(primary_key=True, serialize=False)),
                ('shipmentDate', models.DateField()),
                ('cost', models.DecimalField(decimal_places=2, max_digits=10)),
                ('trackingNo', models.CharField(max_length=30)),
                ('note', models.CharField(max_length=300)),
                ('supplierID', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='storefront.supplier')),
            ],
        ),
    ]
