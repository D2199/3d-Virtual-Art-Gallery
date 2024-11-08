import React, { useState } from "react";
import { useFrame } from "@react-three/fiber";
function BackEffects({ numSqrs, width, height }) {
  //   const [sqrs, setSqrs] = useState([]);
  const boxs = [];
  useFrame((state, delta, frame) => {
    // console.log(state.scene);
  });
  const colors = ["red", "green", "blue"];

  for (let i = 0; i < numSqrs; i++) {
    const box = (
      <mesh
        position={[
          Math.random() * width,
          Math.random() * height,
          Math.random() * 10,
        ]}
      >
        <boxGeometry />
        <meshBasicMaterial
          color={colors[Math.floor(Math.random() * colors.length)]}
        />
      </mesh>
    );
    // setSqrs((sqrs) => [...sqrs, box]);
    boxs.push(box);
  }
  return boxs.forEach((e) => e);
}

export default BackEffects;
