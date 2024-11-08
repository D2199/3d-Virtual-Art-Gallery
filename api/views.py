# from rest_framework.views import APIView
# from rest_framework.response import Response
# from .serializer import UserSerializer,AuthTokenSerializer
# from rest_framework.permissions import AllowAny,IsAuthenticated
# # from .models import User
# # from knox.serializers import UserSerializer
# from knox.views import LoginView
# from knox.models import AuthToken
# from knox.auth import TokenAuthentication

# class CreateUser(APIView):
#     permission_classes=[AllowAny]
#     def post(self,req):
#         serialized=UserSerializer(data=req.data)
#         print(req.data)
#         if serialized.is_valid(raise_exception=True):
#             # User(serialized.validated_data)
#             user=serialized.save()
#             [token,exists]=AuthToken.objects.create(user)
#             print(token)
#             serialized_token=AuthTokenSerializer(token)
#             # User(se)

#         return Response(serialized_token.data)
    

# class UpdateUser(APIView):
#     authentication_classes=(TokenAuthentication)
#     permission_classes=(IsAuthenticated)
#     def put(self,req):
#         serialized=UserSerializer(data=req.data)
#         # print(serialized)
#         if serialized.is_valid(raise_exception=True):
#             print(serialized.validated_data['password'])
#             user=UserSerializer(serialized.validated_data())
#             (serialized.validated_data['password'])
#             # serialized.save()
#             # User(se)
#         return Response({'details':'success'})

# class GalleryView(APIView):
#     def get(self,req):
#         return Response(UserSerializer(id=1,username='ditto',password='12345'))

# class Login(LoginView):
#     permission_classes=[AllowAny]
#     # serializer_class=UserSerializer
#     def get_post_response_data(self, request, token, instance):
#         UserSerializer = self.get_user_serializer_class()

#         data = {
#             'expiry': self.format_expiry_datetime(instance.expiry),
#             'token': token
#         }
#         if UserSerializer is not None:
#             data["user"] = UserSerializer(
#                 request.user,
#                 context=self.get_context()
#             ).data
#         return data
   


from rest_framework import viewsets, permissions, generics 
from rest_framework.response import Response
from rest_framework.parsers import MultiPartParser,FileUploadParser,FormParser
from knox.models import AuthToken
from .serializer import CreateUserSerializer, UserSerializer,LoginUserSerializer ,GallerySerializer,ArtSerializer
from .models import Gallery,Arts
from rest_framework import status

class RegistrationAPI(generics.GenericAPIView):
    serializer_class = CreateUserSerializer

    def post(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        user = serializer.save()
        return Response({
            "user": UserSerializer(user, context=self.get_serializer_context()).data,
            "token": AuthToken.objects.create(user)[1]
        })
class LoginAPI(generics.GenericAPIView):
    serializer_class = LoginUserSerializer

    def post(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        user = serializer.validated_data
        return Response({
            "user": UserSerializer(user, context=self.get_serializer_context()).data,
            "token": AuthToken.objects.create(user)[1]
        })


class UserAPI(generics.RetrieveAPIView):
    permission_classes = [permissions.IsAuthenticated, ]
    serializer_class = UserSerializer

    def get_object(self):
        return self.request.user

class GalleryGetApi(viewsets.views.APIView):
    permission_classes=[permissions.AllowAny]
    # serializer_class=GallerySerializer
    def get(self,request,id):
        queryset=Gallery.objects.get(id=id)
        serializer=GallerySerializer(queryset,context={'request':request})
        # data=Gallery.objects.filter(id=id).first()
        # print(data)
        return Response(serializer.data)


class GalleryApi(generics.RetrieveAPIView):
    permission_classes=[permissions.IsAuthenticated]
    serializer_class=GallerySerializer
    parser_classes = [MultiPartParser, FormParser]
    def post(self,request ,format=None):
        serialized=GallerySerializer(data=request.data)
        serialized.is_valid(raise_exception=True)
        serialized.validated_data['user']=request.user
        print(serialized.validated_data)
        serialized.save()
        return Response(serialized.data)
    
    def patch(self,request,format=None):
        serializer=GallerySerializer(data=request.data)
        galery=Gallery.objects.filter(id=request.data.get('id')).first()
        print(galery.user,request.user)
        serializer.is_valid(raise_exception=True)
        if(galery.user==request.user):
            # galery(**serializer.validated_data)
            print(serializer.update(galery,serializer.validated_data))
            return Response(serializer.data)
        else:
            return Response("you dont have access to edit this",status=status.HTTP_401_UNAUTHORIZED)
        return Response('')
    
    def delete(self,req,id):
        galery=Gallery.objects.get(id=id)
        if(galery.user==req.user):
            galery.delete()
            return Response("deleted successfuly",status=status.HTTP_200_OK)
        else:
            return Response("you dont have access to edit this",status=status.HTTP_401_UNAUTHORIZED)
      
class GetUserGallerys(generics.RetrieveAPIView):
     permission_classes = [permissions.IsAuthenticated, ]
     def get(self,req):
        print(req.user)
        gallerys= GallerySerializer(Gallery.objects.filter(user=req.user).all(),many=True)

        return Response(gallerys,status=status.HTTP_200_OK)

class GetArtByGallery(viewsets.views.APIView):
    def get(self,req,galleryId):
        arts=Arts.objects.filter(gallery=galleryId).all()
        return Response(ArtSerializer(arts,many=True).data)
    

class ArtsApi(generics.RetrieveAPIView):
    permission_classes=[permissions.IsAuthenticated]
    serializer_class=GallerySerializer
    parser_classes = [MultiPartParser, FormParser]
    def post(self,request ,format=None):
        serialized=ArtSerializer(data=request.data)
        serialized.is_valid(raise_exception=True)
        serialized.validated_data['owner']=request.user
        # print("valid Data",serialized.validated_data)
        # galery=Gallery.objects.filter(user=request.user).all().filter(id=serialized.validated_data.get('gallery')).first()
        # print(ArtSerializer(galery,many=True))
        # if()
        # serialized.save()
        g=Gallery.objects.filter(id=serialized.initial_data.get('gallery'),user=request.user)
        if g:
            serialized.save()
        else:
           return Response('not access',status=status.HTTP_401_UNAUTHORIZED)
        return Response("saved ")
    
    def patch(self,request,format=None):
        serializer=ArtSerializer(data=request.data)
        art=Arts.objects.filter(id=request.data.get('id')).first()
        # print(art.user,request.user)
        serializer.is_valid(raise_exception=True)
        if(art.owner==request.user):
            # galery(**serializer.validated_data)
            print(serializer.update(art,serializer.validated_data))
            return Response(serializer.data)
        else:
            return Response("you dont have access to edit this",status=status.HTTP_401_UNAUTHORIZED)
        return Response('')
    
    def delete(self,req,id):
        art=Arts.objects.get(id=id)
        if(art.owner==req.user):
            art.delete()
            return Response("deleted successfuly",status=status.HTTP_200_OK)
        else:
            return Response("you dont have access to edit this",status=status.HTTP_401_UNAUTHORIZED)
   