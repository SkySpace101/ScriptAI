from django.db import models
from django.contrib.auth.models import User

# Create your models here.

# model to store the prompts and genrated scripts
class PromptData(models.Model):
    prompt = models.TextField(max_length=255)
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    script = models.TextField(max_length=700)
    creation_time = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        if (self.user == None):
            user_str = "no user"
        else:
            user_str = self.user

        return f"user: {user_str} | prompt : {self.prompt}"
    
    class Meta:
        ordering=['creation_time']

# JWT Token Model
class JWTToken(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE)
    token = models.TextField(max_length=255)

    def __repr__(self)->str:
        return f"{self.user} : {self.token}"