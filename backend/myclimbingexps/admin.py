from django.contrib import admin
from .models import ClimbingExp

class ClimbingExpAdmin(admin.ModelAdmin):
    list_display = ('title', 'place', 'description', 'picture')

# Register your models here.
admin.site.register(ClimbingExp, ClimbingExpAdmin)
