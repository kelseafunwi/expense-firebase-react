import { auth, provider } from "../../config/firebase-config"
import { signInWithPopup } from 'firebase/auth';
import { useNavigate } from "react-router-dom";

export const Auth = () => {
    const navigate = useNavigate();
    const signInWithGoogle  = async () => {
        // result is going to contain a lot of information about the user.
        const result = await signInWithPopup(auth, provider);
        const authInfo = {
            userId: result.user.uid,
            name: result.user.displayName,
            photoURL: result.user.photoURL,
            email: result.user.email,
            isAuth: true,
        }
        localStorage.setItem('auth', JSON.stringify(authInfo));
        navigate('/expense-tracker');
    }

    return (
        <>
            <div className="flex items-center justify-center mx-5">
                <div className="gy-3 w-full mx-auto">
                    <p>Click to sign in with google</p>
                    <button onClick={signInWithGoogle} className="bg-[#0000fd] text-black text-[17px]">Sign in with Google</button>
                </div>
            </div>
        </>
    )
}
