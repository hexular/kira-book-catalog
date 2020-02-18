from django.db import models

# Create your models here.

class Book(models.Model):
  title = models.CharField(max_length=100)
  author = models.CharField(max_length=50)
  quantity = models.IntegerField()
  reserved = models.IntegerField(default=0)

# Added reserved to database in order for multiple concurrent users to be able to see changes in reservations.
# The alternative would have been to store reservation data locally in React, which would not allow multiple users
# to see changes in reservations, only their own.