from rest_framework import routers
from rest_framework.documentation import include_docs_urls
from .views import LibroView

router=routers.DefaultRouter()

router.register(r'libros',LibroView,"libros")

urlpatterns = router.urls