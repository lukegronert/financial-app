import { useState } from "react";
import { auth, db } from "../firebase/clientApp";
import { RecaptchaVerifier, signInWithPhoneNumber } from "firebase/auth";
import { setDoc, collection, getDocs, doc, getDoc } from "firebase/firestore";
import { setPersistence, browserSessionPersistence } from "firebase/auth";
import { useRouter } from "next/navigation";
import { TailSpin } from "react-loader-spinner";

import { HiOutlineMenuAlt3 } from "react-icons/hi";
import { AiOutlineBell } from "react-icons/ai";

const UserLogin = () => {
  const [phoneNumber, setPhoneNumber] = useState("+886");
  const [OTP, setOTP] = useState("");
  const [loginStatus, setLoginStatus] = useState("SignUp");
  const [OTPSent, setOTPSent] = useState(false);
  const [sendingOTP, setSendingOTP] = useState(false);
  const [verifyingOTP, setVerifyingOTP] = useState(false);
  const [invalidPhoneNumber, setInvalidPhoneNumber] = useState(false);

  const router = useRouter();

  // If in development environment, disable reCaptcha verifier
  if (process.env.NODE_ENV === "development") {
    auth.settings.appVerificationDisabledForTesting = true;
  }

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

  // Create new recaptchaVerifier for resent OTP
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
    e.preventDefault();
    setSendingOTP(true);
    console.log(phoneNumber);
    generateRecaptcha();
    let appVerifier = window.recaptchaVerifier;
    setPersistence(auth, browserSessionPersistence).then(() => {
      // Existing and future Auth states are now persisted in the current
      // session only. Closing the window would clear any existing state even
      // if a user forgets to sign out.
      // New sign-in will be persisted with session persistence.
      signInWithPhoneNumber(auth, phoneNumber, appVerifier)
        .then((confirmationResult) => {
          console.log("confirm");
          window.confirmationResult = confirmationResult;
          setSendingOTP(false);
          setOTPSent(true);
        })
        .catch((error) => {
          console.log(error.code);
          setInvalidPhoneNumber(true);
        });
    });
  };

  // When user enters 6 digits, they are compared to the
  // correct OTP which then sends a confirmation result
  // containing the user's information
  const verifyOTP = async () => {
    if (OTP.length === 6) {
      setVerifyingOTP(true);
      let confirmationResult = window.confirmationResult;
      // check if it is correct
      confirmationResult
        .confirm(OTP)
        .then(async (result) => {
          const user = result.user;
          console.log(user.phoneNumber);
          // check for document with the same phoneNumber
          // if found, console.log that user is already signed up and route to explore page
          const docSnap = await getDoc(doc(db, "users", `${phoneNumber}`));
          if (docSnap.exists()) {
            console.log("Already signed up");
            setVerifyingOTP(false);
            router.push("/explore");
          } else {
            // try to add a document with the users phoneNumber and empty watchList
            try {
              console.log("making user");
              const docRef = await setDoc(doc(db, "users", `${phoneNumber}`), {
                watchList: [],
              });
              setVerifyingOTP(false);
              router.push("/explore");
            } catch (error) {
              console.error("Error adding document: ", error);
            }
          }
        })
        .catch((error) => {
          console.log(error.code);
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

  if (invalidPhoneNumber) {
    return (
      <div className="w-screen h-screen flex justify-center items-center">
        Invalid phone number. Please refresh and try again.
      </div>
    );
  }

  return (
    <div className="w-screen h-screen">
      <div className="fixed top-4 left-1/2 transform -translate-x-1/2 bg-white shadow-md rounded-md px-4 py-2 text-xs font-bold z-50">
        <p>
          Please use test account as Phone Auth with SMS from Firebase is no
          longer included in my current plan.
        </p>
        <p>Number: +12345678901</p>
        <p>Verification Code: 123456</p>
      </div>
      <div className="w-screen h-2/5 items-center text-center text-white bg-login-red">
        <div className="w-screen flex justify-between p-5">
          <HiOutlineMenuAlt3
            size="1.5em"
            className="text-white cursor-pointer"
          />
          <AiOutlineBell size="1.5em" className="text-white cursor-pointer" />
        </div>
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
            aria-label="one time password"
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
            aria-label="telephone"
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
              className="underline font-semibold text-stone-500 cursor-pointer"
              onClick={resendOTP}
            >
              Resend OTP
            </a>
          ) : (
            <a
              className="underline font-semibold text-stone-500 cursor-pointer"
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
            {verifyingOTP || sendingOTP ? (
              <div className="w-full flex justify-center items-center">
                <TailSpin
                  height="30"
                  width="30"
                  color="#FFFFFF"
                  ariaLabel="tail-spin-loading"
                  radius="1"
                  wrapperStyle={{}}
                  wrapperClass=""
                  visible={true}
                />
              </div>
            ) : (
              "Submit"
            )}
          </button>
        </div>
      </div>
      <div id="recaptcha-container"></div>
      <div id="recaptcha-resend-container"></div>
    </div>
  );
};

export default UserLogin;
