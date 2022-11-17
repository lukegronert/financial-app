import { useEffect, useRef, useState } from 'react';
import { onAuthStateChanged } from 'firebase/auth';
import * as firebaseui from 'firebaseui';

const FirebaseAuth = ({uiConfig, firebaseAuth, className, uiCallback}) => {
    const [userSignedIn, setUserSignedIn] = useState(false);
    const elementRef = useRef(null);

    useEffect(() => {
        // Get or Create a firebaseUI instance.
        const firebaseUiWidget = firebaseui.auth.AuthUI.getInstance() || new firebaseui.auth.AuthUI(firebaseAuth);
        if (uiConfig.signInFlow === 'popup')
            firebaseUiWidget.reset();

        // Track the auth state to reset firebaseUi if the user signs out.
        const unregisterAuthObserver = onAuthStateChanged(firebaseAuth, (user) => {
            if (!user && userSignedIn)
                firebaseUiWidget.reset();
            setUserSignedIn(!!user);
        });

        // Trigger the callback if any was set.
        if (uiCallback)
            uiCallback(firebaseUiWidget);

        // Render the firebaseUi Widget.
        firebaseUiWidget.start(elementRef.current, uiConfig);

        return () => {
            unregisterAuthObserver();
            firebaseUiWidget.reset();
        };
    }, [firebaseui, uiConfig]);

    return <div className={className} ref={elementRef} />;
};

export default FirebaseAuth;