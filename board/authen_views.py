from django.db import IntegrityError
from django.contrib import messages
from django.contrib.auth import authenticate, login, logout
from django.shortcuts import redirect
#from  django.contrib.auth.password_validation import validate_password 

from board.helpers import login_required
from board.models import User


def user_register(request):

  if request.method == "POST":

    username = request.POST["username"].strip()
    email = request.POST["email"].strip()
    user_password = request.POST["password"]
    
    if not user_password:
      messages.error(request, 'password is required !')
      return redirect("/")
  
    try:
      new_user = User.objects.create_user(
        username=username,
        email=email,
        password=user_password
      )

      new_user.save()
      login(request, new_user)
    
    except IntegrityError:
      messages.error(request, 'username already exists !')
    
  return redirect("/")


def user_login(request):
  if request.method == "POST":
    username = request.POST["username"]
    password= request.POST["password"]
    user = authenticate(request, username=username, password=password)
   
    if user is not None:
      login(request,user)
   
    else:
      messages.error(request, 'wrong username or password')
  
  return redirect("/")


@login_required
def user_logout(request):
  logout(request)
  list(messages.get_messages(request))
  return redirect("/")
