from django.contrib import admin
from .models import ProfExp

class ProfExpAdmin(admin.ModelAdmin):
    list_display = ('title', 'place', 'description')

# Register your models here.
admin.site.register(ProfExp, ProfExpAdmin)
