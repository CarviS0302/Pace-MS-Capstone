from django.contrib import admin
from .models import *

# Register your models here.
admin.site.register(Item)
admin.site.register(Inventory)
admin.site.register(Order)
admin.site.register(Shipment)
admin.site.register(GoodsReceipt)
admin.site.register(Customer)
admin.site.register(Supplier)



