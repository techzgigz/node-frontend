import { loadStripe } from "@stripe/stripe-js";
import React from "react";
import { Elements } from "@stripe/react-stripe-js";
import PaymentForm from "./PaymentForm";
import ApplePay from './ApplePay';
import GooglePay from "./GooglePay";
import { connect } from "react-redux";
import { addHouse } from "../../redux/house/houseActions";
import moment from 'moment';
import { addSelectedCountry } from "../../redux/selectedCountries/selectedCountryActions";
import { timeFrame } from "../../data/houses";
import './style.css';

const PUBLIC_KEY = "pk_test_51LnnHVK4PvrcSEjoKkineniz2RVbGxKERgaJfcALjd8RdYiVCWPcoDZPDgWc5M8gw46rPKBlENBPiRNYiCX2B13z00LXMHmhRO"

const stripeTestPromise = loadStripe(PUBLIC_KEY)

function StripeContainer(props) {
    let totalAmount = props && props.preview.timeFrame === timeFrame.Monthly ? 2 : 20;
    let timeframe = props && props.preview.timeFrame === timeFrame.Monthly ? "months" : "years";
    let time = props && props.preview.timeFrame === timeFrame.Monthly ? "Montly" : "Yearly";
    return (
        <Elements stripe={stripeTestPromise}>
            <div  className="row sm-gutters content">
                <div className="col-sm-6 col-md-6" style={{display: 'flex', gap:'12px', alignItems: 'center',flexDirection: 'column', borderRight: '1px solid', padding:'20px 40px'}}>
                    <div className="subscripton">1 {time} SUBSCRIPTION FEE</div>
                    <div className="paymentAmount" >${totalAmount}.00</div>
                    <div className="subscripton">Expiry- {moment().format("MM/DD/YYYY")}-{moment().add(1, timeframe).calendar()}</div>
                    <div><img src={'/logo/2Copy.png'} alt="metaraisa" className="meta-image" /></div>
                </div>
                <div className="col-sm-6 col-md-6" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '20px' }}>
                    <div style={{ fontSize: '32px', fontWeight: 500 }}>Payment</div>
                    {/* <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '20px' }}>
                        <div style={{ fontWeight: '500' }}>Express payment</div>
                        <div style={{ display: 'flex', gap: '20px' }}><ApplePay /></div>
                    </div> */}
                    <hr style={{ width:'100%', maxWidth:'500px' }}/>
                    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '20px' }}>
                        {/* <div>Or Continue below to pay with card</div> */}
                        <PaymentForm item={props.preview} submitData={() => { props.addHouse(props.preview); props.addSelectedCountries(props.preview.country) }} />
                    </div>
                </div>
            </div>
        </Elements>
    )
}

const mapStateToProps = state => {
    return {
        preview: state.preview.preview
    }
}

const mapDispatchToProps = dispatch => {
    return {
        addHouse: (data) => dispatch(addHouse(data)),
        addSelectedCountries: (country) => dispatch(addSelectedCountry(country))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(StripeContainer);