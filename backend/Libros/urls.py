from django.urls import path
from .views import LibroListView, LibroAddView, LibroUpdateView, LibroSearchView, LibroDeleteView
from rest_framework.documentation import include_docs_urls

urlpatterns = [
    path('libros/', LibroListView.as_view(), name='libro-list'),
    path('libros/add/', LibroAddView.as_view(), name='libro-add'),
    path('libros/<str:isbn>/', LibroSearchView.as_view(), name='libro-detail'),  
    path('libros/update/<str:isbn>/', LibroUpdateView.as_view(), name='libro-update'),
    path('libros/delete/<str:isbn>/', LibroDeleteView.as_view(), name='libro-delete'),
    path('libros-docs/',include_docs_urls(title="Libros API"))
]
