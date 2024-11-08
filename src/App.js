import "./App.css";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
// import Canvas from "./components/canvas/Canvas";
// import { Canvas } from "@react-three/fiber";
// import Room from "./components/scene/Room";
import Dashboard from "./components/pages/Dashboard";
import PrivateRoute from "./components/pages/PrivateRoute";
import Login from "./components/pages/Login";
import Home from "./components/pages/Home";
import Gallerys from "./components/pages/Gallerys";
import Navbar from "./components/nav/Navbar";
import Explore from "./components/pages/Explore";

// import {
//   OrbitControls,
//   PerspectiveCamera,
//   PointerLockControls,
// } from "@react-three/drei";
// import { useEffect, useRef } from "react";
// import { Art } from "./components/scene/Arts";
// import { checkCollision } from "./components/canvas/scripts/movment";

// import { AmbientLight } from "@react-three/fiber";
console.log();
function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/index" index element={<Home />} />
        <Route path="/gallery/:galleryId" element={<Gallerys />} />
        <Route path="/explore" element={<Explore />} />
        {/* <Route
          path="/dashboard"
          element={
            <PrivateRoute>
              <Dashboard />
            </PrivateRoute>
          }
        /> */}
        {/* <Route
          path="/gallerys"
          element={
            <PrivateRoute>
              <Gallerys />
            </PrivateRoute>
          }
        /> */}
        <Route element={<PrivateRoute/>}>
          <Route path="/dashboard" element={<Dashboard/>}/>
          <Route path="/gallerys" element={<Gallerys/>}/>
        </Route>
        <Route path="*" element={<Navigate to="/index" replace />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
