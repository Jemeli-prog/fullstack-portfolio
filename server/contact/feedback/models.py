from django.db import models

# Create your models here.
class ContactMessage(models.Model):
    name = models.CharField(max_length=100)
    email= models.EmailField()
    message = models.TextField()
    received_at= models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f'Message from {self.name} ({self.email})'
    
    class Meta:
        ordering =['-received_at']