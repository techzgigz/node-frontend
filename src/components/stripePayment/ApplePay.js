import React, { useEffect, useState } from "react";
import { useStripe, useElements, PaymentRequestButtonElement } from "@stripe/react-stripe-js";

const ApplePay = () => {
    const [paymentRequest, setPaymentRequest] = useState(null);
    const stripe = useStripe();
    const elements = useElements();
    useEffect(() => {
        if(!stripe||!elements){
            return;
        }
        const pr = stripe.paymentRequest({
            currency: 'usd',
            country: 'US',
            requestPayerEmail: true,
            requestPayerName: true,
            total: {
                label: 'Demo payment',
                amount: 1999,
            }
        })
        pr.canMakePayment().then((result)=>{
            if(result){
                setPaymentRequest(pr)
            } else{
                console.log(result);
            }
        });
        pr.on('paymentmethod', async(e)=>{
            const {clientSecret} = await fetch('/create-payment-intent',{
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    paymentMethodType: 'card',
                    currency: 'usd'
                }),
            }).then(r => r.json())

            const {error, paymentIntent} = await stripe.confirmCardPayment(
                clientSecret,{
                    payment_method: e.paymentMethod.id,
                },{
                    handleActions: false
                }
            )
            if(error){
                e.complete('fail');
                return;
            }
            e.complete('success');
            if(paymentIntent.status === 'requires_action'){
                stripe.confirmCardPayment(clientSecret);
            }
        });
    }, [stripe, elements])
    return (
        <>
            <h1>Apple Pay</h1>
            {paymentRequest && <PaymentRequestButtonElement 
                options={{paymentRequest}}
            />}
        </>
    )
}

export default ApplePay