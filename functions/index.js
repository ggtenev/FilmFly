



const functions = require("firebase-functions") 

const express =  require('express') ;
const Stripe = require('stripe')

const app = express()
app.use(express.json())

const stripe = new Stripe('sk_test_4arCSrpGhFh6lJrtXgcBilLz00qBeyh8HC')

app.get('/', (req,res) => {
  res.send('WORLS')
})

app.post('/createIntent', async (req,res) => {
 const paymentIntent = await stripe.paymentIntents.create({
   amount:9900,
   currency:'usd' 
 })
 res.send({
   clientSecret:paymentIntent.client_secret
 })
})


exports.intentFunction = functions.https.onRequest(app)







