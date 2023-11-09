import { useNavigate } from "react-router-dom";

export const useGetUserInfo = () => {

    const navigate = useNavigate();
    if (localStorage.getItem('auth')) {
        // the user is not logged in
        const { name, photoURL, userId, isAuth } = JSON.parse(localStorage.getItem('auth'));
        return {
            name,
            photoURL,
            userId,
            isAuth
        }
    } else {
        // returning an empty object list with error on the console
        console.log("the user is not logged in ")
        navigate('/auth');
        return {
            name: "",
            photoURL: "",
            userId: "",
            isAuth: true
        };
    }
}