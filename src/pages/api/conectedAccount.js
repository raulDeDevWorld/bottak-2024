import Stripe from 'stripe'



export default async function account(req, res) {
    
    const stripe = new Stripe('sk_test_51K4GxEEHzR9KDft7JvEtNpwEXsSlbWC5BsDaCJ5SCOWR91owjrjfhYJS0J9onrjGVrE7uXvaFoITNpz53cfx1MOK00kOAGB32S');

    const account = await stripe.accounts.create({
        type: 'express',
    })
}