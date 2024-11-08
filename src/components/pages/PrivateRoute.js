import React, { useEffect, useState } from "react";
import {
  Routes,
  Route,
  Navigate,
  useNavigate,
  Outlet,
  // Redirect,
} from "react-router-dom";
import { authGuard } from "../../services/Auth";
import { useDispatch } from "react-redux";
import { isAuth } from "../../app/slicers/auth";
// function PrivateRoute({ children }) {
//   const Authenticate = async () => await authGuard();
//   const navigate = useNavigate();
//   useEffect(() => {});
//   // if (true) {
//   //   navigate("/login");
//   // }
//   return (
//     <Routes>
//       <Route path="/" element={children} />
//     </Routes>
//   );
// }

function PrivateRoute({ children }) {
  const [isLoading, setIsLoading] = useState(true);
  const [isauth, setIsauth] = useState(true);
  const dispatcher = useDispatch();
  console.log(dispatcher(isAuth()));
  // useEffect(() => {
  //   const auth = async () => {
  //     await setIsauth(authGuard());
  //   };
  //   auth();
  //   console.log("l");
  //   setIsLoading(false);
  // }, []);
  // if (isLoading) {
  //   console.log(isauth);
  //   return <div>loading...</div>;
  // }
  const s = async () => await authGuard(setIsauth)();
  useEffect(() => {
    // s();
    authGuard(
      () => {
        setIsauth(true);
      },
      () => {
        setIsLoading(false);
      }
    );
  }, []);
  // if (isLoading) {
  //   return <>loading</>;
  // }
  // if (!isauth) {
  //   console.log(isauth);
  //   return <Navigate to="/login" />;
  // }
  // return isauth ? (
  //   <>{children}</>
  // ) : isLoading ? (
  //   <div>loading..</div>
  // ) : (
  //   <Navigate to="/login" />
  // );
  return isauth ? <Outlet /> : <Navigate to={"/login"} />;
}

export default PrivateRoute;
