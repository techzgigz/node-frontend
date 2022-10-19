import React, { useState } from "react";
import { CardElement, useElements, useStripe,CardNumberElement,CardExpiryElement,CardCvcElement} from "@stripe/react-stripe-js";
import { timeFrame } from "../../data/houses";
import './style.css';

const CARD_OPTIONS = {
    iconStyle: "solid",
    style: {
        base:{
            iconColor: "#c4f0ff",
            color: "#fff",
            fontWeight: 500,
            fontFamily: "Roboto, Open Sans, Segoe UI, sans-serif",
            fontSize: "24px",
            fontSmoothing: "antialiased",
            ":-webket-autofill": {color: "#fce883"},
            ":placeholder": {color:"#87bbfd"}
        },
        invalid:{
            iconColor: "#ffc7ee",
            color: "#ffc7ee"
        }
    }
}

export default function PaymentForm(props) {
    const [success, setSucces] = useState(false);
    const stripe = useStripe();
    const elements = useElements();
    const [disabled,setDisabled] = useState(true);
    const [isNumberFilled,setIsNumberFilled] = useState(false);
    const [isExpiryFilled,setIsExpiryFilled] = useState(false);
    const [isCVVFilled,setIsCVVFilled] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setDisabled(true);
        if(!stripe || !elements) return;
        const {error: backenderror,clientSecret} = await fetch('/create-payment-intent',{
            method: 'POST',
            headers: {
                'Content-Type':'application/json',
            },
            body: JSON.stringify({
                paymentMethodType: 'card',
                currency: 'usd',
                amount: props.item.timeFrame === timeFrame.Monthly ? 200 : 2000,
            }),
        }).then(r=>r.json());
        if(backenderror){
            return;
        }
        console.log("payment intent created");
        console.log(elements.getElement(CardNumberElement));
        const {error:stripeError,paymentIntent} = await stripe.confirmCardPayment(
            clientSecret,{
                payment_method: {
                    type: 'card',
                    card: elements.getElement(CardNumberElement),
                }
            }
        )
        if(stripeError){
            return;
        }
        setSucces(true);
        props.submitData();
        console.log(`Payment Intent (${paymentIntent.id}) : ${paymentIntent.status}`)
    }

    return (
        <>
            {!success?
            <form className="cardForm" onSubmit={handleSubmit}>
                <label style={{marginLeft:'12px',fontSize:'20px'}}>Card Number</label>
                <fieldset style={{width:'100%',maxWidth:'500px'}} className="FormGroup">
                    <div className="FormRow">
                        <CardNumberElement id="card-element" options={CARD_OPTIONS} onChange={(e)=>{if(e.complete){setIsNumberFilled(true);isExpiryFilled&&isCVVFilled&&setDisabled(false);}}}/>
                    </div>
                </fieldset>
                <div style={{display:'flex'}}>
                    <div style={{flexGrow:1}}>
                <label style={{marginLeft:'12px',fontSize:'20px'}}>Expiry</label>
                <fieldset style={{width:'99%',maxWidth:'243px'}} className="FormGroup">
                    <div className="FormRow">
                        <CardExpiryElement id="card-element" options={CARD_OPTIONS} onChange={(e)=>{if(e.complete){setIsExpiryFilled(true);isNumberFilled&&isCVVFilled&&setDisabled(false);}}}/>
                    </div>
                </fieldset>
                </div>
                <div style={{flexGrow:1}}>
                <label style={{marginLeft:'12px',fontSize:'20px'}}>CVV</label>
                <fieldset style={{width:'100%',maxWidth:'243px'}} className="FormGroup">
                    <div className="FormRow">
                        <CardCvcElement id="card-element" options={CARD_OPTIONS} onChange={(e)=>{if(e.complete){setIsExpiryFilled(true);isExpiryFilled&&isNumberFilled&&setDisabled(false);}}}/>
                    </div>
                </fieldset>
                </div>
                </div>
                <fieldset style={{width:'100%',maxWidth:'500px'}} className="FormGroup">
                <button disabled={disabled} style={{width:'100%',backgroundColor:disabled?'gray':'black',color:'white',padding:'10px'}} >Pay</button>
                </fieldset>
            </form>
            :
            <div>
                <h2>Sucessfully posted your house...</h2>
            </div>
            }
        </>
    )
}