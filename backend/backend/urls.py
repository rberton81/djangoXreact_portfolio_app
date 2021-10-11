"""backend URL Configuration

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/3.2/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""
from django.contrib import admin
from django.urls import path,include               
from rest_framework import routers                  
from myprojects import views as myprojects_views              
from myprofexps import views as myprofexps_views              
from myclimbingexps import views as myclimbingexps_views      
from usermanagement import views as usermanagement_views                                        

router = routers.DefaultRouter()
router.register(r'myprojects', myprojects_views.ProjectView, 'project')  
router.register(r'myprofexps', myprofexps_views.ProfExpView, 'profexp')  
router.register(r'myclimbingexps', myclimbingexps_views.ClimbingExpView, 'climbingexp')  
   

urlpatterns = [
    path('admin/', admin.site.urls),
    path('api/', include(router.urls)),
	path('api/', include('usermanagement.urls')),	
]