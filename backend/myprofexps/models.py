from django.db import models

# Create your models here.
class ProfExp(models.Model):
   title = models.CharField(max_length=100)
   place = models.CharField(max_length=100, default='somewhere on Earth')
   description = models.TextField()

   def _str_(self):	
     return self.title