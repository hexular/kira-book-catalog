from rest_framework import serializers
from .models import Book

class BookSerializer(serializers.ModelSerializer):
    class Meta:
        model = Book
        fields = ('id', 'title', 'author', 'quantity', 'reserved')

    def partial_update(self, request, *args, **kwargs):
        print(request)
        kwargs['partial'] = True
        return self.update(request, *args, **kwargs)