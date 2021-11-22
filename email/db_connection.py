from pymongo import MongoClient
# pprint library is used to make the output look more pretty
from pprint import pprint
from decouple import config

password = config("db_password", default="")

class dbConnection:
    def __init__(self):
        self.client = MongoClient(f"mongodb+srv://siboyang:{password}@cluster0.iot5g.mongodb.net/cluster0?retryWrites=true&w=majority")
        self.db = self.client["MailingList"]
        self.col = self.db["list"]

    def retrieve_today_users(self):
        all_users = self.col.find()
        today = []
        for user in all_users:
            if user["active"]:
                left = user['daysLeft'] - 1
                if left == 0:
                    today.append(user)
                    left = user["frequency"]
                self.col.update_one({"_id": user["_id"]}, {"$set": {"daysLeft": left}})
                pprint(user)
        
        return today
