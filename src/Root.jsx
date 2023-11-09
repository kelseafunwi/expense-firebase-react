import { useEffect } from "react";
import { Outlet, useNavigate } from "react-router-dom";

export default function Root() {
  const navigate = useNavigate();
  useEffect(() => {
    if (!localStorage.getItem('auth')) {
      // what it does if the user is not logged in for all the routes.
      navigate('/auth');
    } 
  }, [])
  return (
    <>
        <div className="body">
          Header element
        </div>
        <div className="body">
            <Outlet />
        </div>
    </>
  )
}
