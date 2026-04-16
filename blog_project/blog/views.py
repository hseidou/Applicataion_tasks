from django.shortcuts import render, get_object_or_404
from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated, AllowAny
from .models import Article
import json

@api_view(['GET'])
@permission_classes([AllowAny])
def list_articles(request):
    articles = Article.objects.all().order_by('-created_at')
    data = []
    for a in articles:
        data.append({
            'id': a.id,
            'title': a.title,
            'content': a.content,
            'created_at': a.created_at
        })
    return JsonResponse(data, safe=False)

@csrf_exempt
@api_view(['POST'])
@permission_classes([IsAuthenticated])
def create_article(request):
    title = request.POST.get('title')
    content = request.POST.get('content')
    
    if title and content:
        article = Article.objects.create(title=title, content=content)
        return JsonResponse({'message': 'Article créer avec succés', 'id': article.id}, status=201)
    return JsonResponse({'message': 'Veuillez fournir un titre et un contenu'}, status=400)

@csrf_exempt
@api_view(['POST'])
@permission_classes([IsAuthenticated])
def update_article(request, id):
    try:
        article = Article.objects.get(id=id)
        title = request.POST.get('title')
        content = request.POST.get('content')
        
        if title: article.title = title
        if content: article.content = content
        
        article.save()
        return JsonResponse({'message': 'Article mis à jour avec succés'})
    except Article.DoesNotExist:
        return JsonResponse({'message': 'Article non trouvé'}, status=404)

@csrf_exempt
@api_view(['DELETE'])
@permission_classes([IsAuthenticated])
def delete_article(request, id):
    try:
        article = Article.objects.get(id=id)
        article.delete()
        return JsonResponse({'message': 'Article supprimé avec succés'})
    except Article.DoesNotExist:
        return JsonResponse({'message': 'Article non trouvé'}, status=404)
