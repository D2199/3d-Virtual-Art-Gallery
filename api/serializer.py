# from rest_framework import serializers # type: ignore
# from .models import User
# from knox.models import AuthToken


# class UserSerializer(serializers.ModelSerializer):
#     class Meta:
#         model=User
#         fields=['id','username','password','first_name','last_name']
#         # extra_atgs=[{}]
#     # def validate(self, attrs):
#     #     return super().validate(attrs)
#     def create(self,validated_data):
#         user=super(UserSerializer,self).create(validated_data)
#         # user.isApo
#         user.set_password(validated_data['password'])
#         user.save()
#         return user
    
# class AuthTokenSerializer(serializers.ModelSerializer):
#     class Meta:
#         model=AuthToken
#         fields="__all__"

from rest_framework import serializers
from django.contrib.auth.models import User
from django.contrib.auth import authenticate
from .models import Gallery,Arts

class CreateUserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ('id', 'username', 'password')
        extra_kwargs = {'password': {'write_only': True}}

    def create(self, validated_data):
        user = User.objects.create_user(validated_data['username'],
                                        None,
                                        validated_data['password'])
        return user

class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ('id', 'username')

class LoginUserSerializer(serializers.Serializer):
    username = serializers.CharField()
    password = serializers.CharField()

    def validate(self, data):
        user = authenticate(**data)
        if user and user.is_active:
            return user
        raise serializers.ValidationError("Invalid Details.")

class GallerySerializer(serializers.ModelSerializer):
    class Meta:
        model=Gallery
        fields='__all__'
        # fields=['id','name','wallTexture','floorTexture','cellingTexture','scale','user']
    # This is the magic function which does the work
    def get_photo_url(self, obj):
        request = self.context.get('request')
        photo_url = obj.fingerprint.url
        return request.build_absolute_uri(photo_url)

    # def update(self,instance,validate_data):

class UpdataGallerySerializer(serializers.ModelSerializer):
    class Meta:
        model=Gallery
        fields='__all__'
        # fields=['id','name','wallTexture','floorTexture','cellingTexture','scale','user']

class ArtSerializer(serializers.ModelSerializer):
    class Meta:
        model=Arts
        fields="__all__"

    # def validate(self, attrs):
    #     print(attrs.get('owner')==req)
    #     return super().validate(attrs)
    
    # def create(self,validate_data):
    #     print(validate_data)
    #     pass
