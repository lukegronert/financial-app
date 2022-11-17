import { useState } from 'react';
import auth from '../firebase/clientApp';
import { RecaptchaVerifier, signInWithPhoneNumber } from "firebase/auth";

const Auth = () => {
    const [phoneNumber, setPhoneNumber] = useState('+886');

    // Generates invisible recaptcha to verify user is
    // sending a request from a verified domain
    const generateRecaptcha = () => {
        window.recaptchaVerifier = new RecaptchaVerifier('recaptcha-container', {
            size: 'invisible',
            callback: (response) => {

            },
        }, auth);
    }

    // Generates recaptcha, signs in with phone number
    // which then sends a OTP to user's phone number
    const requestOTP = (e) => {
        e.preventDefault();
        generateRecaptcha();
        let appVerifier = window.recaptchaVerifier;
        signInWithPhoneNumber(auth, phoneNumber, appVerifier)
            .then((confirmationResult) => {
                window.confirmationResult = confirmationResult
            })
            .catch((error) => {
                console.log(error)
            })
    }

    // When user enters 6 digits, they are compared to the
    // correct OTP which then sends a confirmation result
    // containing the user's information
    const verifyOTP = (e) => {
        let otp = e.target.value
        if(otp.length === 6) {
            let confirmationResult = window.confirmationResult;
            confirmationResult.confirm(otp)
                .then((result) => {
                    const user = result.user;
                    console.log(user)
                })
                .catch((error) => {
                    console.log(error)
                }) 
        }
    }

    return (
        <div>
            <form onSubmit={requestOTP}>
                <div>
                    <label>Phone Number</label>
                    <input type="tel" value={phoneNumber} onChange={(e) => setPhoneNumber(e.target.value)}/>
                </div>
                <button type="submit">Request OTP</button>
            </form>
            <form>
                <div>
                    <label>OTP</label>
                    <input type="number" onChange={verifyOTP} />
                </div>
            </form>
            <div id="recaptcha-container" ></div>
        </div>
    )
}

export default Auth;
