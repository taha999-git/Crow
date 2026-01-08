import os
from django.core.asgi import get_asgi_application
from channels.routing import ProtocolTypeRouter, URLRouter
from channels.auth import AuthMiddlewareStack
import crow_app.routing

os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'crow_project.settings')

application = ProtocolTypeRouter({
    "http": get_asgi_application(),
    "websocket": AuthMiddlewareStack(
        URLRouter(
            crow_app.routing.websocket_urlpatterns
        )
    ),
})