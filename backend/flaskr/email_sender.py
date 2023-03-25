from . import mail
from flask_mail import Mail
from flask_mail import Message

def send_mail(target_email, title, email_body):
    msg = Message(title, recipients = [target_email])
    msg.body = email_body
    mail.send(msg)
    return "Email '"+title+"' sent to: '"+target_email+"' "