from board.models import *
from time import sleep

# script for reseting state of the database by deleting any data used in testing


users = User.objects.exclude(pk=1)
questions = Question.objects.all()


Question.objects.exclude(contributor=User.objects.get(username="admin",pk=1,is_superuser=True)).delete()

for user in users:
  user.points=0
  user.tests_completed=0
  user.tests_started=0
  user.contributor=False
  user.contributions_count=0
  user.level = "beginner"
  user.animes_to_review.clear()
  user.animes_for_quiz.clear()
  user.save()



for q in questions:
    q.correct_answers=0
    q.wrong_answers=0
    q.save()



Game.objects.all().delete()
sleep(3)
Notification.objects.all().delete()

print(f"\n\ data created through manual testing of the app has been deleted sucessfully !\n")