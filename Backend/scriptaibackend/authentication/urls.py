from django.urls import path
from authentication import views

urlpatterns = [
    path('register/', views.register), # post
    path('user/', views.get_user), # get
    path('login/', views.login), # get
]