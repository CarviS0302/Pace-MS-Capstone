from django.shortcuts import render
from django.http import HttpResponse
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.request import Request
from rest_framework.permissions import IsAuthenticated

from .models import *
from .serializer import *
# Create your views here.

class ItemView(APIView):
    # permission_classes = (IsAuthenticated,)
    def get(self, request: Request):
        items = Item.objects.all()
        serialized_item = ItemSerializer(items, many = True)
        return Response(serialized_item.data)

class SupplierView(APIView):
    permission_classes = (IsAuthenticated,)
    def get(self, request: Request):
        suppliers = Supplier.objects.all()
        serialized_supplier = SupplierSerializer(suppliers, many = True)
        return Response(serialized_supplier.data)

class FindSupplierView(APIView):
    permission_classes = (IsAuthenticated,)
    def get(self, request: Request, pk):
        suppliers = Supplier.objects.get(pk = pk)
        serialized_supplier = SupplierSerializer(suppliers, many = False)
        return Response(serialized_supplier.data)
    
class AddSupplierView(APIView):
    permission_classes = (IsAuthenticated,)
    def post(self, request: Request):
        supplier = SupplierSerializer(data = request.data)
        if supplier.is_valid():
            supplier.save()
            return Response(supplier.data)
        else:
            return Response(supplier.errors)
        
class UpdateSupplierView(APIView):
    permission_classes = (IsAuthenticated,)
    def put(self, request: Request, pk):
        supplier = Supplier.objects.get(pk = pk)
        supplier_serializer = SupplierSerializer(supplier, data = request.data)
        if supplier_serializer.is_valid():
            supplier_serializer.save()
            return Response(supplier_serializer.data)
        else:
            return Response(supplier_serializer.errors)
        
class DeleteSupplierView(APIView):
    permission_classes = (IsAuthenticated,)
    def delete(self, request: Request, pk):
        supplier = Supplier.objects.get(pk = pk)
        supplier.delete()
        return Response("Supplier deleted")
    
  
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
        serialized_goodsreceipt = GoodsReceiptSerializer(goodsreceipt, many = True)
        return Response(serialized_goodsreceipt.data)

class OrderView(APIView):
    def get(self, request: Request):
        orders = Order.objects.all()
        serialized_order = OrderSerializer(orders, many = True)
        return Response(serialized_order.data)

    



