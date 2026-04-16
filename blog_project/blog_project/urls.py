from django.contrib import admin
from django.urls import path
from django.conf import settings
from django.conf.urls.static import static
from blog.views import list_articles, create_article, update_article, delete_article
from users.views import RegisterView
from rest_framework_simplejwt.views import (
    TokenObtainPairView,
    TokenRefreshView,
)

urlpatterns = [
    path('admin/', admin.site.urls),
    
    # Auth
    path('api/auth/register/', RegisterView.as_view(), name='auth_register'),
    path('api/auth/login/', TokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('api/auth/refresh/', TokenRefreshView.as_view(), name='token_refresh'),
    # Logout is usually handled by deleting the token on the frontend, 
    # but could be added as a blacklist view if enabled.
    
    # Blog
    path('articles/', list_articles),
    path('articles/create/', create_article),
    path('articles/<int:id>/update/', update_article),
    path('articles/<int:id>/delete/', delete_article),
] + static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
