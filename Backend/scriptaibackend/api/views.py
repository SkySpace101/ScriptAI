from django.http import HttpResponse, JsonResponse
from django.views.decorators.csrf import csrf_exempt
from rest_framework.decorators import api_view, permission_classes
from rest_framework.parsers import JSONParser
from api.models import PromptData, JWTToken
from rest_framework import status
from rest_framework.response import Response
from django.contrib.auth.models import User
from api.serializers import PromptDataSerializer, UserDataSerializer, JWTTokenDataSerializer
from rest_framework.permissions import IsAuthenticated
from . import geminiAPI

from authentication.models import AccessTokenData

from random import choice
from string import ascii_letters, digits

# global list of generted tokens
GENERATED_TOKENS_LIST = []

# A simple Hash Function for JWT Token(20 characters)
def jwt_token_generator()->str:
    characters = ascii_letters + digits
    token = ""
    while True:
        for num in range(20):
            token += choice(characters)
        if token not in GENERATED_TOKENS_LIST:
            GENERATED_TOKENS_LIST.append(token)
            break
        else:
            token =''
            continue
    return token


@csrf_exempt
@api_view(['GET', 'POST'])
def register(request):
    """
    Register a user and generate a unique JWT Token that is provided to the user
    """
    if request.method == 'GET':
        # print(request.data)
        jwt_data = JWTToken.objects.all()
        serializer = JWTTokenDataSerializer(jwt_data, many=True)

        return Response(serializer.data)
    
    if request.method == 'POST':
        token = jwt_token_generator()
        print(token)
        try:
            new_user = User.objects.create(username=request.data['user'], password=request.data['password'])
            serializer = JWTTokenDataSerializer(data=request.data, context={'user': new_user, 'token':token})
            if serializer.is_valid():
                serializer.save()
                # return Response(serializer.data, status=status.HTTP_201_CREATED)
                return Response(serializer.data['token'], status=status.HTTP_201_CREATED)

        except:
            return Response({"bad request"},status=status.HTTP_400_BAD_REQUEST )   
            # return Response({"bad"}, status=status.HTTP_400_BAD_REQUEST)  
        


@csrf_exempt
@api_view(['GET','POST'])
# @permission_classes([IsAuthenticated])
def promptdata_list(request):
    """
    List all code snippets, or create a new snippet.
    """

    if request.method == 'GET':
        access_token = request.headers['Authorization'][7:]
        user_id = AccessTokenData.objects.get(access_token=access_token).user.id
        prompt_data = PromptData.objects.filter(user_id=user_id)
        serializer = PromptDataSerializer(prompt_data, many=True)
        # return JsonResponse(serializer.data, safe=False)
        return Response(serializer.data)

    elif request.method == 'POST':
        # data = JSONParser().parse(request)  # much stricter 
        # request.data is more flexible with the request data
        # print(request.user)
        print(request.data)
        # print(request.data['prompt'])
        prompt = request.data['prompt']
        # print(f" the user is  {request.user}")
        gen_script = geminiAPI.get_answer(prompt)
        # gen_script = "No script"
        

        serializer = PromptDataSerializer(data=request.data, context={'request':request, 'script':gen_script}) # sending the request context to serializer to auto fill the user from request.
        if serializer.is_valid():
            serializer.save()
            # return JsonResponse(serializer.data, status=201)
            return Response(serializer.data, status=status.HTTP_201_CREATED)

        # return JsonResponse(serializer.errors, status=400)
        return Response(serializer.data, status=status.HTTP_400_BAD_REQUEST)
    
@csrf_exempt
@api_view(['GET','PUT', 'DELETE'])
@permission_classes([IsAuthenticated])
def promptdata_detail(request, pk):
    """
    Retrieve, update or delete Prompt Data.
    """


    try:
        prompt_data = PromptData.objects.get(pk=pk)
    except PromptData.DoesNotExist:
        # return HttpResponse(status=404)
        return Response(status=status.HTTP_404_NOT_FOUND)

    if request.method == 'GET':
        serializer = PromptDataSerializer(prompt_data)
        # return JsonResponse(serializer.data)
        return Response(serializer.data)

    elif request.method == 'PUT':
        data = JSONParser().parse(request)
        serializer = PromptDataSerializer(prompt_data, data=data)
        if serializer.is_valid():
            serializer.save()
            # return JsonResponse(serializer.data)
            return Response(serializer.data)
        # return JsonResponse(serializer.errors, status=400)
        return Response(serializer.data, status=status.HTTP_400_BAD_REQUEST)

    elif request.method == 'DELETE':
        prompt_data.delete()
        # return HttpResponse(status=204)
        return Response(status=status.HTTP_204_NO_CONTENT)
    

@csrf_exempt
@api_view(['GET','POST'])
@permission_classes([IsAuthenticated])
def user_list(request):
    """
    Get All the Users List
    """

    if request.method == 'GET':
        user_data = User.objects.all()
        serializer = UserDataSerializer(user_data, many=True)
        # return JsonResponse(serializer.data, safe=False)
        return Response(serializer.data)

    

    elif request.method == 'POST':
        print(request.data)

        # data = JSONParser().parse(request)
        serializer = UserDataSerializer(data=request.data)
        if serializer.is_valid():
            print("inner" , request.data)
            serializer.save()
            # return JsonResponse(serializer.data, status=201)
            return Response(serializer.data, status=status.HTTP_201_CREATED)

        # return JsonResponse(serializer.errors, status=400)
        return Response(serializer.data, status=status.HTTP_400_BAD_REQUEST)


@csrf_exempt
@api_view(['GET','PUT','DELETE'])
@permission_classes([IsAuthenticated])
def user_detail(request, pk):
    """
    Retrieve, update or delete User Data.
    """

    try:
        user_data = User.objects.get(pk=pk)
    except User.DoesNotExist:
        # return HttpResponse(status=404)
        return Response(status=status.HTTP_404_NOT_FOUND)


    if request.method == 'GET':
        serializer = UserDataSerializer(user_data)
        # return JsonResponse(serializer.data)
        return Response(serializer.data)


    elif request.method == 'PUT':
        data = JSONParser().parse(request)
        serializer = UserDataSerializer(user_data, data=data)
        if serializer.is_valid():
            serializer.save()
            # return JsonResponse(serializer.data)
            return Response(serializer.data)

        # return JsonResponse(serializer.errors, status=400)
        return Response(serializer.data, status=status.HTTP_400_BAD_REQUEST)


    elif request.method == 'DELETE':
        user_data.delete()
        # return HttpResponse(status=204)
        return Response(status=status.HTTP_204_NO_CONTENT)
