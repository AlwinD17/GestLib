from rest_framework import routers
from .views import UsuarioView, PrestamoView

router=routers.DefaultRouter()

router.register(r'usuarios',UsuarioView,"usuarios")
router.register(r'prestamos',PrestamoView,"prestamos")

urlpatterns = router.urls

