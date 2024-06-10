import { getMessaging } from "firebase-admin/messaging";
import express, { Express } from "express";
import admin from "firebase-admin";
import { applicationDefault } from "firebase-admin/app";
import cors from "cors";

const app: Express = express();

app.use(express.json());

app.use(
  cors({
    origin: "*",
  })
);

admin.initializeApp({
  credential: applicationDefault(),
});

app.post("/send", (req, res) => {
  console.log(req.body);

  const message = {
    notification: {
      title: "Hello from server",
      body: "Get Lost",
    },
    token: req.body.token,
  };

  getMessaging()
    .send(message)
    .then((response) => {
      res.status(200).json({
        status: "success",
        error: false,
        data: response,
      });
    })
    .catch((err) => {
      throw new Error(err);
    });
});

app.listen(3333, function () {
  console.log("Server is running on port " + 3333);
});
