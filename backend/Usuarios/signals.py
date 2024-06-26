from django.db.models.signals import post_save
from django.dispatch import receiver
from django.utils import timezone
from .models import Prestamo

# Update prestamo status to vencido when end_date is reached
@receiver(post_save, sender=Prestamo)
def update_prestamo_status(sender, instance, created, **kwargs):
    if instance.status.lower() == 'activo' and instance.end_date and timezone.now() >= instance.end_date:
        instance.status = 'vencido'
        instance.save(update_fields=['status'])

# When prestamo status is changed to terminado, update libro status to disponible
@receiver(post_save, sender=Prestamo)
def prestamo_status_change(sender, instance, created, **kwargs):
    if not created:
        if instance.status.lower() == 'terminado':
            instance.libro.status = 'disponible'
            instance.libro.save(update_fields=['status'])

#When prestamo with status activo is created, update libro status to prestado
@receiver(post_save, sender=Prestamo)
def update_libro_status(sender, instance, created, **kwargs):
    if created:
        if instance.status.lower()=='activo':
            instance.libro.status = 'prestado'
            instance.libro.save(update_fields=['status'])
