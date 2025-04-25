from rest_framework import serializers
from authentication.models import User, AccessTokenData

class AccessTokenDataSerializer(serializers.ModelSerializer):
    class Meta:
        model = AccessTokenData
        fields = ['user', 'access_token']

    # def create(self, validated_data):
    #     print(validated_data)


class UserDataSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ['username', 'email', 'is_staff']

        