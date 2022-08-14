from rest_framework import serializers
from .models import *

class SimpleUserDataSerializer(serializers.ModelSerializer):
  class Meta:
    model = User
    fields = ('id','username','points','level','country')

class AllUserDataSerializer(serializers.ModelSerializer):
  class Meta:
    model = User
    fields = ('id','username','points','level','tests_completed','tests_started','country','contributions_count')

class LeaderBoradSerializer(serializers.ModelSerializer):
  class Meta:
    model = User
    fields = ('username','points','level','country','contributions_count')


class AnimeSerializer(serializers.ModelSerializer):
  class Meta:
    model = Anime
    fields = ("id","anime_name")



# animes that have questions
class QuizAnimesSerializer(serializers.ModelSerializer):
  quiz_questions_count = serializers.IntegerField()
  class Meta:
    model = Anime
    fields = ("id","anime_name","quiz_questions_count")
    

# used for each anime and its corresponding number of questions 
class Animes_with_Questions_Count_serializer(serializers.ModelSerializer):
  class Meta:
    model = Anime
    fields = ("id","anime_name","approved_questions")
    

class AnimeNameSerializer(serializers.ModelSerializer):
  class Meta:
    model = Anime 
    fields = ("anime_name",)



class QuestionSerializer(serializers.ModelSerializer):
  anime = AnimeNameSerializer()
    
  class Meta:
    model = Question
    fields = ("anime","question","choice1","choice2","choice3","right_answer","id")


class GameSerializer(serializers.ModelSerializer):
  anime = AnimeNameSerializer()
  class Meta:
    model = Game
    fields = ("anime","score","gamesnumber","contributions")

    
class NotificationsSerializer(serializers.ModelSerializer):
  class Meta: 
    model = Notification
    fields = ("id","notification","time","seen")
    
