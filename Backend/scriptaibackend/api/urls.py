from django.urls import path
from api import views

urlpatterns = [
    path('promptdata/', views.promptdata_list),
    path('promptdata/<int:pk>/', views.promptdata_detail),
    path('users/', views.user_list),
    path('users/<int:pk>/', views.user_detail),
    # path('register/', views.register, name='register')
]