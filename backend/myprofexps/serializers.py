from rest_framework import serializers
from .models import ProfExp

class ProfExpSerializer(serializers.ModelSerializer):
    class Meta:
        model = ProfExp
        fields = ('id' ,'title', 'place', 'description')