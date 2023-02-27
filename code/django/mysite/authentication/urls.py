from django.urls import path,include
# from . import views

from .views import LoginAPIView, RegistrationAPIView

app_name = 'authentication'
urlpatterns = [
    path('users/', RegistrationAPIView.as_view()),
    path('users/login/', LoginAPIView.as_view()),
]