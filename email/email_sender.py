import smtplib
import schedule, time
import requests
from email.mime.multipart import MIMEMultipart
from email.mime.text import MIMEText
from db_connection import dbConnection
from datetime import date
from decouple import config

#configs and init
sender = "sibo.currencybot1@gmail.com"
password = config("email_password", default="")
apikey = config("currency_apikey", default="")
db = dbConnection()


def SMTP_init():
    server = smtplib.SMTP(host='smtp.gmail.com', port=587)
    server.starttls()
    server.login(sender, password)
    return server

def construct_messgae(des, name, base , target, amount, today):
    msg = MIMEMultipart()

    message = f"Hi {name},\n1 {base} worth {amount} {target} on {today} "
    msg['From'] = sender
    msg['To'] = des
    msg['Subject'] = "Today's currency"

    msg.attach(MIMEText(message, 'plain'))
    return msg

def send_email():
    # make the api call there, probably store all the pair in dictionary like structure to reduce the 
    # amount of api calls

    currency_pairs = {}
    bases = ["USD", "CAD", "CNY", "EUR"]
    currencies = ["USD", "CAD", "CNY", "EUR"]
    for base in bases:
        response = requests.get(f"https://freecurrencyapi.net/api/v2/latest?apikey={apikey}&base_currency={base}").json()
        for currency in currencies:
            if currency != base:
                currency_pairs[f"{base}_to_{currency}"] = response["data"][currency]
    
    for user in db.retrieve_today_users():
        msg = construct_messgae(user["email"], user["firstName"],user["base"], user["target"], amount=currency_pairs.get(f"{user['base']}_to_{user['target']}"), today=date.today().strftime("%m/%d/%Y"))
        server.send_message(msg)
        print(f"Message sent to someone {user['firstName']}")

schedule.every().day.at("10:30").do(send_email)
server = SMTP_init()
while 1:
    schedule.run_pending()
    time.sleep(1)

