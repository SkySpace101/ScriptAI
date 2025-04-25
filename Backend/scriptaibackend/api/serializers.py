from rest_framework import serializers
from api.models import PromptData, JWTToken
from django.contrib.auth.models import User
from authentication.models import AccessTokenData

class UserDataSerializer(serializers.Serializer):
    username = serializers.CharField()
    first_name = serializers.CharField()
    last_name = serializers.CharField()
    email = serializers.EmailField()
    password = serializers.CharField(write_only=True)

    def create(self, validated_data):
        # user = User.objects.create_user(
        #     username=validated_data['username'],
        #     email=validated_data.get('email'),
        #     password=validated_data['password']
        # )
        return User.objects.create(**validated_data)

    def update(self, instance, validated_data):
        pass    

class PromptDataSerializer(serializers.Serializer):
    prompt = serializers.CharField()
    user = serializers.PrimaryKeyRelatedField(read_only=True)
    script = serializers.CharField(read_only=True)
    creation_time = serializers.DateTimeField(read_only=True)

    def create(self, validated_data):
        """
        Create and return a new `Snippet` instance, given the validated data.
        """
        # the user field is automatically filled with the authenticated user and need not be provided explicitly.add()
        # to get user data context when instantizating a serilaizer object in view
        request = self.context.get('request')  # grab the request object
        if request and hasattr(request, 'headers'):
            access_token = request.headers['Authorization'][7:]
            user_data = AccessTokenData.objects.get(access_token=access_token).user
            validated_data['user'] = user_data

        validated_data['script'] = self.context.get('script')

        return PromptData.objects.create(**validated_data)
    
    def update(self, instance, validated_data):
        """
        Update and return an existing `Snippet` instance, given the validated data.
        """
        instance.prompt = validated_data.get('prompt',instance.prompt)
        instance.script = validated_data.get('script',instance.script)
        instance.save()
        return instance
    
class JWTTokenDataSerializer(serializers.Serializer):
    user = serializers.PrimaryKeyRelatedField(read_only=True)
    token = serializers.CharField(read_only=True)

    def create(self, validated_data):
        """
        Create and Return a new JWT Token Instance, given validated data
        """
        validated_data['user'] = self.context.get('user')
        validated_data['token'] = self.context.get('token')  # getting data from context
        print(validated_data)

        return JWTToken.objects.create(**validated_data)

    def update(self, instance, validated_data):
        pass
