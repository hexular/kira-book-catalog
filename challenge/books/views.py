from django.shortcuts import render

# Create your views here.

from .models import Book
from .serializers import BookSerializer
from rest_framework import generics, viewsets, mixins

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

class BookPartialUpdateView(generics.GenericAPIView, mixins.UpdateModelMixin):
    '''
    You just need to provide the field which is to be modified.
    '''
    queryset = Book.objects.all()
    serializer_class = BookSerializer
    lookup_field = 'id'

    def put(self, request, *args, **kwargs):
        return self.partial_update(request, *args, **kwargs)