import smtplib
import schedule, time
from email.mime.multipart import MIMEMultipart
from email.mime.text import MIMEText
from db_connection import dbConnection
from datetime import date
from decouple import config

#configs and init
sender = "sibo.currencybot1@gmail.com"
password = config("email_password", default="")
db = dbConnection()


def SMTP_init():
    server = smtplib.SMTP(host='smtp.gmail.com', port=587)
    server.starttls()
    server.login(sender, password)
    return server

def construct_messgae(des="sibo.yang@mail.mcgill.ca", name="sibo", currency="CNY", amount="5.1", today="10/27/2021"):
    msg = MIMEMultipart()

    message = f"Hi {name},\n1CAD worth {amount} {currency} on {today} "
    msg['From'] = sender
    msg['To'] = des
    msg['Subject'] = "Today's currency"

    msg.attach(MIMEText(message, 'plain'))
    return msg

def send_email():
    for user in db.retrieve_today_users():
        msg = construct_messgae(user["email"], user["firstName"], user["currency"], amount="5.1", today=date.today().strftime("%m/%d/%Y"))
        server.send_message(msg)
        print(f"Message sent to someone")

schedule.every(4).seconds.do(send_email)
server = SMTP_init()
while 1:
    schedule.run_pending()
    time.sleep(1)

