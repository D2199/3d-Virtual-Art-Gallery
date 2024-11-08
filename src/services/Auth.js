import { useDispatch } from "react-redux";
import { json } from "react-router-dom";
import { setAuth } from "../app/slicers/auth";

// authGuard.js
export async function authGuard(resolve, rejected) {
  // Simulated authentication check (replace with your actual authentication logic)
  const isAuthenticated = localStorage.getItem("token") !== null;

  if (isAuthenticated) {
    const user = await getUser(localStorage.getItem("token"));
    // console.log(user);
    if (user) {
      // console.log(next);
      const data = {
        ...(await user.json()),
        token: localStorage.getItem("token"),
      };
      resolve(data);
      return true;
      // next(); // Allow navigation if authenticated
    } else {
      rejected();
      return false;
    }
  }
}
export async function getUser(token) {
  try {
    const response = await fetch("http://127.0.0.1:8000/api/user/", {
      headers: {
        Authorization: `Token ${token}`,
      },
    });
    // console.log(response.text());
    if (response.status == 200) {
      return response;
    } else {
      return false;
    }
  } catch (e) {
    throw e;
  }
}
export async function getAuthToken(data) {
  console.log(data);
  // const dispatcher = useDispatch();
  try {
    const response = await fetch("http://127.0.0.1:8000/api/login/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: data,
    });
    // console.log(response.text());
    if (response.status == 200) {
      const jsonData = await response.json();
      localStorage.setItem("token", jsonData.token);
      // dispatcher(setAuth(jsonData.token));

      return jsonData;
    } else {
      throw response.text;
      // return false;
    }
    console.log(response);
  } catch (e) {
    return e;
  }
}
