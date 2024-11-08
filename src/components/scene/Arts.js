import { Suspense, useContext } from "react";
import * as THREE from "three";
import { extend, useLoader } from "@react-three/fiber";
import { TextureLoader } from "three/src/loaders/TextureLoader";
// import { GLTFLoader } from "three/src/loaders/ObjectLoader";

import { Gltf, useGLTF } from "@react-three/drei";

export function Art({ art, img, artInfo, setSelected, ...props }) {
  const gt = useGLTF("/3dmodels/frame1.glb");
  // const frame = useLoader(GLTFLoader, "/3dmodels/frame1.glb");
  gt.scenes[0].materials = new THREE.Color(0x00ff00);
  // console.log(gt);
  const artImg = useLoader(TextureLoader, art.img);
  // const detials = <div></div>;
  // const setSelected = useContext(dataContext).setSelected;
  return (
    <Suspense fallback={null}>
      <group
        {...props}
        // onPointerDown={() => alert("h")}
        onClick={() => setSelected(art)}
        scale={[art.scale.x, art.scale.y, art.scale.z]}
        position={[art.position.x, art.position.y, art.position.z]}
        // userData={art}
        onPointerMissed={() => setSelected(null)}
        // onPointerLeave={() => setSelected(false)}
      >
        <mesh>
          {/* <boxGeometry args={[1, 1, 0.02]} /> */}

          <planeGeometry />
          <meshStandardMaterial
            map={artImg}
            color="white"
            side={THREE.DoubleSide}
          />
        </mesh>
        {/* <primitive
          object={gt.scenes[0]}
          rotation={[Math.PI / 2, 0, 0]}
          position={[0, 0, 0]}
          scale={[0.6, 0.5, 0.6]}
        >
          <meshBasicMaterial color="green" />
        </primitive> */}
        <mesh
          geometry={gt.scenes[0].geometry}
          material={new THREE.Color(0xff0000)}
        />
        {/* <Gltf
          meshStandardMaterial={{ color: new THREE.Color(0xff0000) }}
          src="/3dmodels/frame1.glb"
          rotation={[Math.PI / 2, 0, 0]}
          position={[0, 0, 0]}
          scale={[0.6, 0.5, 0.6]}
          color={new THREE.Color(0xff0000)}
        >
          <meshStandardMaterial color={new THREE.Color(0xff0000)} />
        </Gltf> */}
      </group>
    </Suspense>
  );
}
