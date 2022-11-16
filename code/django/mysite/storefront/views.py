from django.shortcuts import render
from django.http import HttpResponse
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.request import Request
from .models import *
from .serializer import *
# Create your views here.

class ItemView(APIView):
    def get(self, request: Request):
        items = Item.objects.all()
        serialized_item = ItemSerializer(items, many = True)
        return Response(serialized_item.data)

class SupplierView(APIView):
    def get(self, request: Request):
        suppliers = Supplier.objects.all()
        serialized_supplier = SupplierSerializer(suppliers, many = True)
        return Response(serialized_supplier.data)


class CustomerView(APIView):
    def get(self, request: Request):
        customers = Customer.objects.all()
        serialized_customer = CustomerSerializer(customers, many = True)
        return Response(serialized_customer.data)

class ShipmentView(APIView):
    def get(self, request: Request):
        shipments = Shipment.objects.all()
        serialized_shipment = ShipmentSerializer(shipments, many = True)
        return Response(serialized_shipment.data)

class InventoryView(APIView):
    def get(self, request: Request):
        inventory = Inventory.objects.all()
        serialized_inventory = InventorySerializer(inventory, many = True)
        return Response(serialized_inventory.data)

class GoodsReceiptView(APIView):
    def get(self, request: Request):
        goodsreceipt = GoodsReceipt.objects.all()
        serialized_goodsreceipt = GoodsReceiptSerializer(orders, many = True)
        return Response(serialized_goodsreceipt.data)

class OrderView(APIView):
    def get(self, request: Request):
        orders = Order.objects.all()
        serialized_order = OrderSerializer(orders, many = True)
        return Response(serialized_order.data)

    



