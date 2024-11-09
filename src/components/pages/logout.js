import React from "react";
import { useDispatch } from "react-redux";
import { setAuth } from "../../app/slicers/auth";

function Logout() {
  const dispatcher = useDispatch();
  dispatcher(setAuth(null));
  localStorage.removeItem("token");
  return <div>logout</div>;
}

export default Logout;
