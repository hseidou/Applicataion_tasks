from django.shortcuts import render, get_object_or_404
from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt
from .models import Article
import json

@csrf_exempt
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
def create_article(request):
    if request.method == 'POST':
        title = request.POST.get('title')
        content = request.POST.get('content')
        
        if title and content:
            article = Article.objects.create(title=title, content=content)
            return JsonResponse({'message': 'Article created successfully', 'id': article.id}, status=201)
        return JsonResponse({'message': 'Missing title or content'}, status=400)
    return JsonResponse({'message': 'Invalid method'}, status=405)

@csrf_exempt
def update_article(request, id):
    try:
        article = Article.objects.get(id=id)
        if request.method == 'POST':
            title = request.POST.get('title')
            content = request.POST.get('content')
            
            if title: article.title = title
            if content: article.content = content
            
            article.save()
            return JsonResponse({'message': 'Article updated successfully'})
    except Article.DoesNotExist:
        return JsonResponse({'message': 'Article not found'}, status=404)
    return JsonResponse({'message': 'Invalid method'}, status=405)

@csrf_exempt
def delete_article(request, id):
    if request.method == 'DELETE':
        try:
            article = Article.objects.get(id=id)
            article.delete()
            return JsonResponse({'message': 'Article deleted successfully'})
        except Article.DoesNotExist:
            return JsonResponse({'message': 'Article not found'}, status=404)
    return JsonResponse({'message': 'Invalid method'}, status=405)
