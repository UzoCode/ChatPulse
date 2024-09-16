from celery import Celery

celery = Celery('tasks', broker='redis://localhost:6379/0')

@celery.task
def send_email_notification(user_email, message):
    # Implement email sending logic here
    pass