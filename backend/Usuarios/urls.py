from rest_framework import routers
from .views import UsuarioView

router=routers.DefaultRouter()

router.register(r'usuarios',UsuarioView,"usuarios")

urlpatterns = router.urls

