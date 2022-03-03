from django.shortcuts import render, redirect
from django.http import HttpResponse, HttpResponseRedirect,JsonResponse

from rest_framework.decorators import api_view
from rest_framework.response import Response

import json
import random

from .models import *
from .serializers import *
from .helpers import login_required 

def DevelopmentUser(): return User.objects.get(pk=28)


# # render react build page
@login_required
def ReactApp(request):
  #return redirect("http://localhost:3000/home")
  return render(request, "index.html")

def Random():
  return random.randint(1, 4)


@api_view(["GET"])
def GetUserData(request):
  serialized_data = UserSerializer(request.user,many=False)
  return Response(serialized_data.data)

  

@api_view(["GET"])
def GetAvailableAnimes(request):
  AnimesWithQuestions = Anime.objects.filter(anime_questions__isnull=False).distinct()

  serialized_data = AnimeSerializer(AnimesWithQuestions,many=True)
  return Response(serialized_data.data)


@api_view(["GET"])
def AllCompetitors(request):
  otakus = User.objects.exclude(pk=1).exclude(points=0).order_by('-points')
  serialized_data = UserSerializer(otakus,many=True)
  return Response(serialized_data.data)



@api_view(["POST"])
def TestPost(request):
  return JsonResponse({"message": "successfull post request with its csrf token and this is the response"})


@login_required
@api_view(["POST"])
def GetTest(request):
  current_user = request.user
  current_user.tests_started+=1
  current_user.save()
  selected_anime= Anime.objects.get(anime_name=request.data["selectedanime"])
  questions=selected_anime.anime_questions.filter(approved=True).exclude(contributor=current_user)

  newgame=Game.objects.create(game_owner=current_user,anime=selected_anime)
  newgame.gamesnumber+=1
  newgame.save()
  
  serialized_data = QuestionSerializer(questions,many=True)
  return Response(serialized_data.data)



@login_required
@api_view(["POST"])
def MakeContribution(request):
  anime=request.data["anime"]
  question=request.data["question"]
  right_answer=request.data["correct"]
  
  c1=request.data["choice_1"]
  c2=request.data["choice_2"]
  c3=request.data["choice_3"]
  c4=right_answer

  random_number = Random()

  if random_number == 1:
    c1=request.data["choice_3"]
    c2=request.data["choice_2"]
    c3=right_answer
    c4=request.data["choice_1"]

  if random_number == 2:
    c1=request.data["choice_1"]
    c2=right_answer
    c3=request.data["choice_3"]
    c4=request.data["choice_2"]

  if random_number == 3:
    c1=right_answer
    c2=request.data["choice_2"]
    c3=request.data["choice_3"]
    c4=request.data["choice_1"]

  new_question = Question(anime=anime,contributor=request.user,approved=False,
  
  question=question,right_answer=right_answer,choice1=c1,choice2=c2,choice3=c3,choice4=c4)
  new_question.save()
  return JsonResponse({"message": "new question has been added by a contributor and waits approval"})


@login_required
@api_view(["GET"])
def UserContributions(request):
  user_questions = Question.objects.filter(contributor=request.user)
  serialized_data = QuestionSerializer(user_questions,many=True)
  return Response(serialized_data.data)


@login_required
@api_view(["GET"])
def GetUserProfiel(request,user):
  requested_user = User.objects.get(pk=user)
  serialized_data = UserSerializer(requested_user)
  return Response(serialized_data.data)
