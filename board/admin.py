from django.contrib import admin
from .models import *

@admin.register(User)
class User_info(admin.ModelAdmin):
  list_display=("id","username","points","best_score","tests_completed","tests_started","country")
  list_filter = ("level",)
  search_fields = ("username",)
  

@admin.register(Question)
class QuestionInfo(admin.ModelAdmin):
  list_display=("anime","question","right_answer","advanced")
  list_filter = ("anime","advanced","contributor",)
  search_fields = ("question",)


@admin.register(Anime)
class AnimeInfo(admin.ModelAdmin):
  list_display = ("anime_name","total_score","id")
  search_fields = ("anime_name",)


@admin.register(Game)
class GameInfo(admin.ModelAdmin):
  list_display = ("game_owner","anime","gamesnumber")
  list_filter = ("game_owner",)
