import React from 'react'
import firebase from "../firebase";

function useAuth() {
    const [authUser, setAuthuser] = React.useState(null);

    React.useEffect(() => {
        const unsubscribe = firebase.auth.onAuthStateChanged((user) => {
            if(user){
                setAuthuser(user);
            }else{
                setAuthuser(null);
            }
        })
        return () => unsubscribe();
    }, [])

    return [authUser, setAuthuser]
}
export default useAuth;