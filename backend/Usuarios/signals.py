from django.db.models.signals import post_save,post_delete
from django.dispatch import receiver
from django.utils import timezone
from .models import Prestamo,Usuario
from .apps import avl_usuarios, avl_prestamos

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



#Signals for updating usuarios avl
@receiver(post_save, sender=Usuario)
def handle_usuario_save(sender, instance, created, **kwargs):
    if created:
        avl_usuarios.insert(instance.dni, instance)
    else:
        avl_usuarios.delete(instance.dni)
        avl_usuarios.insert(instance.dni,instance)

@receiver(post_delete, sender=Usuario)
def handle_usuario_delete(sender, instance, **kwargs):
    avl_usuarios.delete(instance.dni)

#Signals for updating prestamos avl
@receiver(post_save, sender=Prestamo)
def handle_prestamo_save(sender, instance, created, **kwargs):
    if created:
        avl_prestamos.insert(instance.id, instance)
    else:
        avl_prestamos.delete(instance.id)
        avl_prestamos.insert(instance.id, instance)


@receiver(post_delete, sender=Prestamo)
def handle_prestamo_delete(sender, instance, **kwargs):
    avl_prestamos.delete(instance.id)
