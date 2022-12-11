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
        serialized_item = ItemSerializer(items, many=True)
        return Response(serialized_item.data)


class SupplierView(APIView):
    def get(self, request: Request):
        suppliers = Supplier.objects.all()
        serialized_supplier = SupplierSerializer(suppliers, many=True)
        return Response(serialized_supplier.data)


class FindSupplierView(APIView):
    def get(self, request: Request, pk):
        suppliers = Supplier.objects.get(pk=pk)
        serialized_supplier = SupplierSerializer(suppliers, many=False)
        return Response(serialized_supplier.data)


class AddSupplierView(APIView):
    def post(self, request: Request):
        supplier = SupplierSerializer(data=request.data)
        if supplier.is_valid():
            supplier.save()
            return Response(supplier.data)
        else:
            return Response(supplier.errors)


class UpdateSupplierView(APIView):
    def put(self, request: Request, pk):
        supplier = Supplier.objects.get(pk=pk)
        supplier_serializer = SupplierSerializer(supplier, data=request.data)
        if supplier_serializer.is_valid():
            supplier_serializer.save()
            return Response(supplier_serializer.data)
        else:
            return Response(supplier_serializer.errors)


class DeleteSupplierView(APIView):
    def delete(self, request: Request, pk):
        supplier = Supplier.objects.get(pk=pk)
        supplier.delete()
        return Response("Supplier deleted")


class CustomerView(APIView):
    def get(self, request: Request):
        customers = Customer.objects.all()
        serialized_customer = CustomerSerializer(customers, many=True)
        return Response(serialized_customer.data)


class ShipmentView(APIView):
    def get(self, request: Request):
        shipments = Shipment.objects.all()
        serialized_shipment = ShipmentSerializer(shipments, many=True)
        return Response(serialized_shipment.data)


class InventoryView(APIView):
    def get(self, request: Request):
        data = request.query_params
        if data.get('itemId') is not None:
            inventory = Inventory.objects.filter(itemID=data['itemId']).all()
        else:
            inventory = Inventory.objects.all()
        serialized_inventory = InventorySerializer(inventory, many=True)
        return Response(serialized_inventory.data)


class AddInventoryView(APIView):
    def post(self, request: Request):
        data = request.data
        itemID = data.get('itemID')
        inventory = Inventory.objects.filter(itemID=itemID).first()
        if inventory is not None:
            return Response({'code': 0, 'msg': 'itemID' + itemID + ' inventory already exist'})
        inventory = InventorySerializer(data=request.data)
        if inventory.is_valid():
            inventory.save()
            return Response(inventory.data)
        else:
            return Response(inventory.errors)


class UpdateInventoryView(APIView):
    def put(self, request: Request, pk):
        inventory = Inventory.objects.get(pk=pk)
        inventory_serializer = InventorySerializer(inventory, data=request.data)
        if inventory_serializer.is_valid():
            inventory_serializer.save()
            return Response(inventory_serializer.data)
        else:
            return Response(inventory_serializer.errors)


class DeleteInventoryView(APIView):
    def delete(self, request: Request, pk):
        inventory = Inventory.objects.get(pk=pk)
        inventory.delete()
        return Response("Supplier deleted")


class GoodsReceiptView(APIView):
    def get(self, request: Request):
        goodsreceipt = GoodsReceipt.objects.all()
        serialized_goodsreceipt = GoodsReceiptSerializer(goodsreceipt, many=True)
        return Response(serialized_goodsreceipt.data)


class OrderView(APIView):
    def get(self, request: Request):
        orders = Order.objects.all()
        serialized_order = OrderSerializer(orders, many=True)
        return Response(serialized_order.data)

class AddOrderView(APIView):
    def post(self, request: Request):
        data = request.data
        itemID = data.get('itemID')
        item = Item.objects.filter(itemID=itemID).first()
        if item is None:
            return Response({'code': 0, 'msg': 'item not found'})
        inventory = Inventory.objects.filter(itemID=itemID).first()
        if inventory is None:
            return Response({'code': 0, 'msg': 'inventory not found'})
        quantity = data.get("quantity")
        if quantity is None:
            return Response({'code': 0, 'msg': 'quantity not found'})
        if int(quantity) > inventory.quantity:
            return Response({'code': 0, 'msg': 'ItemID ' + itemID + ' quantity not enough'})
        Inventory.objects.filter(itemID=itemID).update(quantity=(inventory.quantity - int(quantity)))
        request.data['orderPrice'] = int(quantity) * item.sellingPrice
        order = OrderSerializer(data=request.data)
        if order.is_valid():
            order.save()
            return Response(order.data)
        else:
            return Response(order.errors)
