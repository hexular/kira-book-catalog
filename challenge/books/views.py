from django.shortcuts import render

# Create your views here.

from .models import Book
from .serializers import BookSerializer
from rest_framework import generics, viewsets

class BookListCreate(generics.ListCreateAPIView):
    queryset = Book.objects.all()
    serializer_class = BookSerializer

class BookDetail(generics.ListAPIView):
    """
    List one Book
    """
    # queryset = Book.objects.get(id=1)
    serializer_class = BookSerializer
    def get_queryset(self):
        return Book.objects.filter(id=self.kwargs['id'])