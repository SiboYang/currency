import dotenv from "dotenv";
import express from "express";
import bodyParser from "body-parser";
import mongodb from "mongodb";

const { MongoClient } = mongodb;
const app = express();
dotenv.config();
app.use(bodyParser.json());

MongoClient.connect(
  `mongodb+srv://siboyang:${process.env.db_password}@cluster0.iot5g.mongodb.net/MailingList?retryWrites=true&w=majority`,
  { useUnifiedTopology: true }
)
  .then((client) => {
    console.log("Connected to Database");
    const db = client.db("MailingList");
    const users = db.collection("list");

    app.post("/subscribe", async (req, res) => {
      try {
        const new_sub = req.body;
        new_sub._id = new_sub.email;
        const created_user = await users.insertOne(new_sub);
        console.log("One user subscribed.")
        res.status(201).json(created_user);
      } catch (e) {
        if (e.code === 11000) {
            res.status(409).json({ error: "Email already exist" });
        } else {
            res.status(500).json({error: "Something goes wrong."})
        }
            
      }
    });

    app.delete("/unsubscribe", async (req, res) => {
      try {
          const id = req.body
          const user_removed = await users.findOneAndDelete(id);
          if (user_removed.value === null) {
              res.status(404).json({error: "Email not found"})
          }
          else {
            console.log("one user unsubscribed.")
            res.status(200).json(user_removed.value)
          }
          

      } catch (e) {
          console.log(e);
      }
    });
  })
  .catch((error) => console.error(error));

app.listen(3000, () => {
  console.log("listening on 3000");
});
