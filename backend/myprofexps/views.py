from django.shortcuts import render
from .serializers import ProfExpSerializer 
from rest_framework import viewsets      
from .models import ProfExp                 


# Create your views here.

class ProfExpView(viewsets.ModelViewSet):  
    serializer_class = ProfExpSerializer   
    queryset = ProfExp.objects.all()   