import { useState } from "react";
import { auth, db } from "../firebase/clientApp";
import { RecaptchaVerifier, signInWithPhoneNumber } from "firebase/auth";
import { addDoc, collection, getDocs } from "firebase/firestore";
import { useRouter } from "next/navigation";

import { IconContext } from "react-icons";
import { HiOutlineMenuAlt3 } from "react-icons/hi";
import { AiOutlineBell } from "react-icons/ai";

const UserLogin = () => {
  const [phoneNumber, setPhoneNumber] = useState("+886");
  const [OTP, setOTP] = useState("");
  const [loginStatus, setLoginStatus] = useState("SignUp");
  const [OTPSent, setOTPSent] = useState(false);

  const router = useRouter();

  // Generates invisible recaptcha to verify user is
  // sending a request from a verified domain
  const generateRecaptcha = () => {
    window.recaptchaVerifier = new RecaptchaVerifier(
      "recaptcha-container",
      {
        size: "invisible",
        callback: (response) => {},
      },
      auth
    );
  };

  const generateResendRecaptcha = () => {
    window.recaptchaVerifier = new RecaptchaVerifier(
      "recaptcha-resend-container",
      {
        size: "invisible",
        callback: (response) => {},
      },
      auth
    );
  };

  // Generates recaptcha, signs in with phone number
  // which then sends a OTP to user's phone number
  const requestOTP = (e) => {
    console.log(phoneNumber);
    e.preventDefault();
    generateRecaptcha();
    let appVerifier = window.recaptchaVerifier;
    signInWithPhoneNumber(auth, phoneNumber, appVerifier)
      .then((confirmationResult) => {
        console.log("confirm");
        window.confirmationResult = confirmationResult;
        setOTPSent(true);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  // When user enters 6 digits, they are compared to the
  // correct OTP which then sends a confirmation result
  // containing the user's information
  const verifyOTP = () => {
    if (OTP.length === 6) {
      let confirmationResult = window.confirmationResult;
      // check if it is correct
      confirmationResult
        .confirm(OTP)
        .then(async (result) => {
          const user = result.user;
          console.log(user.phoneNumber);
          // get user collection data
          const querySnapshot = await getDocs(collection(db, "users"));
          // check user collection for document with the same phoneNumber
          const foundUser = querySnapshot.docs.find(
            (doc) => doc.data().phoneNumber === phoneNumber
          );
          // if found, console.log that user is already signed up
          if (foundUser) {
            console.log("Already signed up");
            router.push("/explore");
          } else {
            // try to add a document with the users phoneNumber and empty watchList
            try {
              const docRef = await addDoc(collection(db, "users"), {
                phoneNumber,
                watchList: [],
              });
              console.log("Document written with ID: ", docRef.id);
              router.push("/explore");
            } catch (error) {
              console.error("Error adding document: ", error);
            }
          }
        })
        .catch((error) => {
          console.log(error);
        });
    }
  };

  const resendOTP = (e) => {
    console.log(phoneNumber);
    e.preventDefault();
    generateResendRecaptcha();
    let appVerifier = window.recaptchaVerifier;
    signInWithPhoneNumber(auth, phoneNumber, appVerifier)
      .then((confirmationResult) => {
        console.log("confirm");
        window.confirmationResult = confirmationResult;
        setOTPSent(true);
      })
      .catch((error) => {
        alert(
          "OTP already resent. If you do not receive it, please refresh the application and try again later."
        );
      });
  };

  return (
    <div className="w-screen h-screen">
      <div className="w-screen h-2/5 items-center text-center text-white bg-login-red">
        <IconContext.Provider value={{ color: "white", size: "1.5em" }}>
          <div className="w-screen flex justify-between p-5">
            <HiOutlineMenuAlt3 />
            <AiOutlineBell />
          </div>
        </IconContext.Provider>
        <h1 className="font-bold text-3xl p-5 pt-10">
          {loginStatus === "SignUp" ? "Sign Up !" : "Sign In !"}
        </h1>
      </div>
      {OTPSent ? (
        <div className="flex flex-col justify-center items-center bg-white p-5 border border-stone-300 border-b-4 h-1/4 w-5/6 rounded-md absolute top-1/3 left-1/2 transform -translate-x-1/2 -translate-y-1/4">
          <label className="pb-3 text-sm font-bold text-stone-400">
            Enter OTP
          </label>
          <input
            type="number"
            value={OTP}
            onChange={(e) => setOTP(e.target.value)}
            className="border-b-2 text-center text-gray-600 font-bold outline-none text-lg tracking-wider"
          />
        </div>
      ) : (
        <div className="flex flex-col justify-center items-center bg-white p-5 border border-stone-300 border-b-4 h-1/4 w-5/6 rounded-md absolute top-1/3 left-1/2 transform -translate-x-1/2 -translate-y-1/4">
          <label className="pb-3 text-sm font-bold text-gray-400">
            Enter Mobile Number
          </label>
          <input
            type="tel"
            value={phoneNumber}
            onChange={(e) => setPhoneNumber(e.target.value)}
            className="border-b-2 text-center text-gray-600 font-bold outline-none text-lg tracking-wider"
          />
        </div>
      )}
      <div className="w-screen h-3/5 flex flex-col pt-40">
        <div className="flex flex-col justify-between items-center pb-10 text-sm my-auto">
          <p className="text-gray-300 font-bold pb-5 text-xs">
            Already have an account ?
          </p>
          {OTPSent ? (
            <a
              className="underline font-semibold text-stone-500"
              onClick={resendOTP}
            >
              Resend OTP
            </a>
          ) : (
            <a
              className="underline font-semibold text-stone-500"
              onClick={() =>
                loginStatus === "SignUp"
                  ? setLoginStatus("SignIn")
                  : setLoginStatus("SignUp")
              }
            >
              {loginStatus === "SignUp" ? "Sign In" : "Sign Up"}
            </a>
          )}
        </div>
        <div className="flex justify-center my-auto pb-20">
          <button
            onClick={OTPSent ? verifyOTP : requestOTP}
            className="self-center items-center bg-login-red rounded-3xl text-white text-lg p-3 w-3/4"
          >
            {loginStatus === "SignUp" ? "Submit" : "Register"}
          </button>
        </div>
      </div>
      <div id="recaptcha-container"></div>
      <div id="recaptcha-resend-container"></div>
    </div>
  );
};

export default UserLogin;
