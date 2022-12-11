from rest_framework import serializers
from .models import *



class ItemSerializer(serializers.ModelSerializer):
    class Meta:
        model = Item
        fields = ['itemID','description','cost', 'sellingPrice', 'note', 'supplierID']


class SupplierSerializer(serializers.ModelSerializer):
    class Meta:
        model = Supplier
        fields = ['supplierID','company','email', 'phoneNum', 'country', 'street','city','state','zip', 'note']


class CustomerSerializer(serializers.ModelSerializer):
    class Meta:
        model = Customer
        fields = ['customerID','firstName','lastName','email', 'phoneNum', 'country', 'street','city','state','zip', 'note']


class ShipmentSerializer(serializers.ModelSerializer):
    class Meta:
        model = Shipment
        fields = ['shipID','trackingNo','shipDate', 'note']

class InventorySerializer(serializers.ModelSerializer):
    class Meta:
        model = Inventory
        fields = ['stackID','itemID','quantity', 'expirationDate','inboundDate']

class GoodsReceiptSerializer(serializers.ModelSerializer):
    class Meta:
        model = GoodsReceipt
        fields = ['recID','supplierID','shipmentdate', 'cost','trackingNo','note']
        

class OrderSerializer(serializers.ModelSerializer):
    class Meta:
        model = Order
        fields = ['orderID', 'itemID', 'quantity', 'orderDate', 'orderPrice', 'customerID', 'shipID']

