from django.urls import path,include
from . import views

#store specific urls.py file

urlpatterns = [
    
    
     path('item/', views.ItemView.as_view(), name='storefront-item'),

     path('inventory/', views.InventoryView.as_view(), name='storefront-inventory'),

     path('customer/', views.CustomerView.as_view(), name='storefront-customer'),

     path('order/', views.OrderView.as_view(), name='storefront-order'),

     path('supplier/', views.SupplierView.as_view(), name='storefront-supplier'),

     path('shipment/', views.ShipmentView.as_view(), name='storefront-shipment'),

     path('goodsReceipt/', views.GoodsReceiptView.as_view(), name='storefront-goodsReceipt'),
     



]