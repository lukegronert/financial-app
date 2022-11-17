import { useState } from 'react';
import auth from '../firebase/clientApp';
import db from '../firebase/ClientDb';
import { RecaptchaVerifier, signInWithPhoneNumber } from "firebase/auth";
import { addDoc, collection, getDocs } from "firebase/firestore"; 

const UserLogin = () => {
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
        // update otp
        let otp = e.target.value
        // when otp is 6 digits long
        if(otp.length === 6) {
            let confirmationResult = window.confirmationResult;
            // check if it is correct
            confirmationResult.confirm(otp)
                .then(async (result) => {
                    const user = result.user;
                    // get user collection data
                    const querySnapshot = await getDocs(collection(db, "users"));
                    // check user collection for document with the same phoneNumber
                    const foundUser = querySnapshot.docs.find(doc => doc.data().id === phoneNumber)
                    // if found, console.log that user is already signed up
                    if(foundUser) {
                        return console.log('Already signed up')
                    } else {
                        // try to add a document with the users phoneNumber and empty watchList
                        try {
                            const docRef = await addDoc(collection(db, "users"), {
                                phoneNumber,
                                watchList: []
                            });
                            console.log("Document written with ID: ", docRef.id);
                            } catch (e) {
                                console.error("Error adding document: ", e);
                            }
                    }
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

export default UserLogin;
