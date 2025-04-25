from django.http import HttpResponse, JsonResponse
from django.views.decorators.csrf import csrf_exempt
from rest_framework.parsers import JSONParser
from authentication.models import User, AccessTokenData
from authentication.serializers import AccessTokenDataSerializer, UserDataSerializer

from random import choice
from string import ascii_letters, digits

# def token_generator():
#     return "temptoken-c3r2rwe12"

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
def register(request):
    """
    Register a new User
    """
    if (request.method == 'POST'):
        data = JSONParser().parse(request)
        print(data)
        new_user = User.objects.create(username=data['username'], password=data['password'])
        serializer = AccessTokenDataSerializer(data={
            'user': new_user.id,  # or new_user if you want to pass the instance
            'access_token': jwt_token_generator()
        })

        if serializer.is_valid():
            serializer.save()
            return JsonResponse({"access_token":serializer.data['access_token'], "token_type":"Bearer"}, status=201)
        return JsonResponse(serializer.errors, status=400)
    

@csrf_exempt
def get_user(request):
    """
    Get the registered user
    """
    # print(request.headers['Authorization'][7:])

    if request.method == 'GET':
        pass
        access_token = request.headers['Authorization'][7:]
        user_data = AccessTokenData.objects.get(access_token=access_token).user
        print(user_data)
        # user_data = User.objects.get(pk=recent_user_id)
        serializer = UserDataSerializer(user_data)
        return JsonResponse(serializer.data, status=200)
    else:
        return JsonResponse(serializer.error, status=400)
        # return JsonResponse({"response":"error"}, status=400)


@csrf_exempt
def login(request):
    """
    Get the registered user
    """
    # print(request.headers)
    # if request.method == 'GET':
    #     # auth_data = AccessTokenData.objects.last()
    #     user = User.objects.get(username=request.user)
    #     access_data = AccessTokenData.objects.get(user=user)
    #     serializer = AccessTokenDataSerializer(access_data)
    #     return JsonResponse({"access_token":serializer.data['access_token'], "token_type":"Bearer"}, status=201)
    # else:
    #     return JsonResponse(serializer.error, status=400)

    if request.method == 'POST':
        data = JSONParser().parse(request)
        print(data)
        username = data['username']
        user_id = User.objects.get(username=username).id
        print(username)
        auth_data = AccessTokenData.objects.get(user=user_id)
        print(auth_data)
        serializer = AccessTokenDataSerializer(auth_data)
        return JsonResponse({"access_token":serializer.data['access_token'], "token_type":"Bearer"}, status=201)
    else:
        # pass
        return JsonResponse(serializer.error, status=400)