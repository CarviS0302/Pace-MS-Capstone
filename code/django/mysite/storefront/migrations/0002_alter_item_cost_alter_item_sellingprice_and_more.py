# Generated by Django 4.0.4 on 2022-11-11 05:14

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('storefront', '0001_initial'),
    ]

    operations = [
        migrations.AlterField(
            model_name='item',
            name='cost',
            field=models.DecimalField(decimal_places=2, max_digits=10),
        ),
        migrations.AlterField(
            model_name='item',
            name='sellingPrice',
            field=models.DecimalField(decimal_places=2, max_digits=10),
        ),
        migrations.AlterField(
            model_name='item',
            name='supplierID',
            field=models.CharField(blank=True, max_length=100, null=True),
        ),
    ]
