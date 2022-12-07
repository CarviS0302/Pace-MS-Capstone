from django.urls import path,include
from . import views

#store specific urls.py file

urlpatterns = [
    
    
     path('item/', views.ItemView.as_view(), name='storefront-item'),

     path('inventory/', views.InventoryView.as_view(), name='storefront-inventory'),

     path('inventory/add/', views.AddInventoryView.as_view(), name='storefront-inventory'),

     path('inventory/update/<int:pk>/', views.UpdateInventoryView.as_view(), name='storefront-inventory'),

     path('inventory/delete/<int:pk>/', views.DeleteInventoryView.as_view(), name='storefront-inventory'),


     path('customer/', views.CustomerView.as_view(), name='storefront-customer'),

     path('order/', views.OrderView.as_view(), name='storefront-order'),

     path('supplier/', views.SupplierView.as_view(), name='storefront-supplier'),
     
     path('supplier/find/<int:pk>/', views.FindSupplierView.as_view(), name='storefront-supplier'),

     # AddSupplierView, UpdateSupplierView, DeleteSupplierView

     path('supplier/add/', views.AddSupplierView.as_view(), name='storefront-supplier'),

     path('supplier/update/<int:pk>/', views.UpdateSupplierView.as_view(), name='storefront-supplier'),

     # path('supplier/delete/', views.DeleteSupplierView.as_view(), name='storefront-supplier'),
     # delete has id in request.data
     path('supplier/delete/<int:pk>/', views.DeleteSupplierView.as_view(), name='storefront-supplier'),
     

     path('shipment/', views.ShipmentView.as_view(), name='storefront-shipment'),

     path('goodsReceipt/', views.GoodsReceiptView.as_view(), name='storefront-goodsReceipt'),
     



]