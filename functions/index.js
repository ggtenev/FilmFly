const functions = require("firebase-functions");

const express = require("express");
const Stripe = require("stripe");

const app = express();
app.use(express.json());

const PUBLIC_KEY = "pk_live_N3H5rXOlTb75keITEO2y2hn900h0596QaZ";
const SECRET_KEY =
  "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";

const stripe = new Stripe(SECRET_KEY, { apiVersion: "2020-08-27" });

app.get("/", (req, res) => {
  res.send("WORLS");
});

app.post("/createIntent", async (req, res) => {
  console.log("seehsehsehse");
  try {
    const paymentIntent = await stripe.paymentIntents.create({
      amount: 9900,
      currency: "usd",
      payment_method_types: ["card"],
    });
    const clientSecret = paymentIntent.client_secret;
    res.json({
      clientSecret,
    });
  } catch (error) {
    console.log(error.message);
    res.json({
      error: error.message,
    });
  }
});

exports.intentFunction = functions.https.onRequest(app);
