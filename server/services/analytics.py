from app.models import Message, Ticket, User
from sqlalchemy import func
from app import db

def get_chat_statistics():
    total_messages = Message.query.count()
    active_users = db.session.query(func.count(func.distinct(Message.user_id))).scalar()
    return {'total_messages': total_messages, 'active_users': active_users}

def get_support_statistics():
    open_tickets = Ticket.query.filter_by(status='open').count()
    resolved_tickets = Ticket.query.filter_by(status='resolved').count()
    return {'open_tickets': open_tickets, 'resolved_tickets': resolved_tickets}