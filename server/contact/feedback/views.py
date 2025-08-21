from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status 
from .serializers import ContactMessageSerializer

class ContactFormSubmissionView(APIView):
    def post(self, request,format=None):
        serializer = ContactMessageSerializer(data=request.data)

        if serializer.is_valid():
            serializer.save()

            return Response(
                {'message':"Thankyou for yourmessage!Will get back shortly"},
                status=status.HTTP_201_CREATED
            )
        return Response(serializer.errors,status=status.HTTP_400_BAD_REQUEST) 
