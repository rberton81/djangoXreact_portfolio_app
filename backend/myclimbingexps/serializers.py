from rest_framework import serializers
from .models import ClimbingExp

class ClimbingExpSerializer(serializers.ModelSerializer):
    class Meta:
        model = ClimbingExp
        fields = ('id' ,'title','place', 'description', 'picture')