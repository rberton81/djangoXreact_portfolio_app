from django.shortcuts import render
from .serializers import ClimbingExpSerializer 
from rest_framework import viewsets      
from .models import ClimbingExp                 


# Create your views here.

class ClimbingExpView(viewsets.ModelViewSet):  
    serializer_class = ClimbingExpSerializer   
    queryset = ClimbingExp.objects.all()   