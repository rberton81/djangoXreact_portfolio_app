from django.db import models

# Create your models here.
class ClimbingExp(models.Model):
   title = models.CharField(max_length=100)
   place = models.CharField(max_length=100, default='somewhere on Earth')
   description = models.TextField()
   picture = models.CharField(max_length=100)

   def _str_(self):	
     return self.title