// Set your secret key. Remember to switch to your live secret key in production.
// See your keys here: https://dashboard.stripe.com/apikeys
import Stripe from 'stripe'

const stripe = new Stripe('sk_test_51K4GxEEHzR9KDft7JvEtNpwEXsSlbWC5BsDaCJ5SCOWR91owjrjfhYJS0J9onrjGVrE7uXvaFoITNpz53cfx1MOK00kOAGB32S');

export default async function handler(req, res) {
    try {
        const session = await stripe.checkout.sessions.create({
            mode: 'payment',
            line_items: [
                {
                    price_data: {
                        product_data: {
                            name: req.body.type,
                        },
                        currency: req.body.currency,
                        unit_amount: req.body.amount * 100,
                    },
                    quantity: 1,
                },
                {
                    price_data: {
                        product_data: {
                            name: "Comision",
                        },
                        currency: req.body.currency,
                        unit_amount: req.body.comision * 100,
                    },
                    quantity: 1,
                },
            ],
            payment_intent_data: {
                application_fee_amount: 123,
                transfer_data: {
                    destination: '{{CONNECTED_ACCOUNT_ID}}',
                },
            },
            success_url: 'https://example.com/success',
            cancel_url: 'https://example.com/cancel',
        });
        return res.json({
            id: session.id,
            url: session.url
        });
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
}