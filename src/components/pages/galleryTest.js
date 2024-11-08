import React, {
  Suspense,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";

import { Canvas, useLoader, useThree } from "@react-three/fiber";
import {
  OrbitControls,
  PointerLockControls,
  useTexture,
} from "@react-three/drei";
import * as THREE from "three";
import { BoxGeometry, MeshBasicMaterial, TextureLoader } from "three";
import { useData } from "../../contexts";
import Buttons from "../utils/Buttons";
import { ArtInfo } from "../artInfo/ArtInfo";
import { useDispatch, useSelector } from "react-redux";
import { setSelectedArt } from "../../app/slicers/selectedArt";

// await import("./image.png");
// import url from "./art.jpg";

function Wall({ texture, position, rotation }) {
  //   const loader = new TextureLoader();
  //   const texture = loader.load(
  //     "/Ditto/Desktop/reactProject/artgallery/src/components/scene/0.jpg"
  //   );
  // const [texture, setTexture] = useState(null);
  // useEffect(() => {
  //   const loader = new TextureLoader();
  //   loader.load("./image.png", (tex) => {
  //     setTexture(tex);
  //     alert("");
  //   });
  // }, []);
  // const textureImage = useLoader(TextureLoader, import("./image.png"));
  // setTexture(textureImage);
  // useEffect(() => {
  //   const loadTexture = async () => {
  //     const textureImage = new Image();
  //     textureImage.src = "./image.png";
  //     await textureImage.decode();
  //     setTexture(textureImage);
  //   };
  //   loadTexture();
  // }, []);
  // const loader = new TextureLoader();
  // const geometry = new BoxGeometry(1, 1, 1);
  // const material = new MeshBasicMaterial();
  // loader.load("./art.jpg", (t) => {
  //   setTexture(t);
  // });
  // useEffect(() => {
  //   material.map = texture;
  //   material.color = "blue";
  // }, [texture]);
  // const url = "./art.jpg";
  // import(url);
  // const t = useTexture(texture);
  return (
    <group position={position} rotation={rotation}>
      <mesh>
        <boxGeometry args={[50, 50]} />
        <meshStandardMaterial map={texture} color={"gleen"} />
      </mesh>
    </group>
  );
}
// function controls(control, key, speed) {
//   const [up, setUp] = useState(false);
//   const [down, setDown] = useState(false);
//   const [left, setLeft] = useState(false);
//   const [right, setRight] = useState(false);
//   useEffect(() => {
//     if (up) {
//       control.moveForward(0.1 * speed);
//     }
//     if (down) {
//       control.moveForward(-0.1 * speed);
//     }
//     if (right) {
//       control.moveRight(0.1 * speed);
//     }
//     if (left) {
//       control.moveRight(-0.1 * speed);
//     }
//   }, [up, down, left, right, left]);
// }
function Room({ wallImage, floorImage, scale }) {
  const wallTexture = useTexture((new Image().src = wallImage));
  const floorTexture = useTexture((new Image().src = floorImage));
  const controls = useRef();
  const speed = 2;
  const { camera, scene } = useThree();
  const [intersectionResults, setIntersectionResults] = useState([]);
  let roomChild;
  // useMemo(() => {});
  // useEffect(() => {
  //   roomChild = scene.children.filter((c) => c.name == "Room")[0].children;
  // });
  // const room = useRef();
  // console.log(scene.children);
  // useEffect(() => {
  // const checkIntersections = () => {
  //   const raycaster = new THREE.Raycaster();
  //   raycaster.setFromCamera(new THREE.Vector2(0, 0), camera);
  //   // console.log(raycaster.intersectObjects([scene.children[0]]));
  //   const objects = scene.children[0].children;
  //   const intersects = raycaster.intersectObjects(objects);
  //   intersects.forEach((intersect)=>{if(intersect.distance<5){console.log('intersect');return true}else{return false}})
  //   // const newIntersectionResults = [];
  //   // for (let i = 0; i < intersects.length; i++) {
  //   //   const intersect = intersects[i];
  //     // newIntersectionResults.push({
  //     //   object: intersect.object.name,
  //     //   distance: intersect.distance,
  //     // });
  //     // if (intersect.distance < 5) {
  //     //   console.log("intersect");
  //     // }
  //   }

  // setIntersectionResults(newIntersectionResults);
  // console.log(newIntersectionResults, intersectionResults);
  // };
  // checkIntersections();
  // console.log("camera.moves");
  // });
  const checkCollision = () => {
    const raycaster = new THREE.Raycaster();
    raycaster.setFromCamera(new THREE.Vector2(0, 0), camera);
    const intersects = raycaster.intersectObjects(
      (roomChild = scene.children.filter((c) => c.name == "Room")[0].children)
    );
    // console.log(scene.children.filter((c) => c.name == "Room")[0]);
    for (let intersect of intersects) {
      if (intersect.distance < 5) {
        console.log("intersect");
        return true;
      } else {
        return false;
      }
    }
  };
  useEffect(() => {
    // const walls = scene.children.filter((e) => e.name == "Room")[0];

    // camera.position.copy(previousPosition);
    document.addEventListener("keydown", (e) => {
      const previousPosition = camera.position.clone();
      if (e.key == "ArrowUp") {
        controls.current.moveForward(0.1 * speed);
      }
      if (e.key == "ArrowDown") {
        controls.current.moveForward(-0.1 * speed);
      }
      if (e.key == "ArrowRight") {
        controls.current.moveRight(0.1 * speed);
      }
      if (e.key == "ArrowLeft") {
        controls.current.moveRight(-0.1 * speed);
      }
      if (checkCollision()) {
        camera.position.copy(previousPosition); // reset the camera position to the previous position. The `previousPosition` variable is a clone of the camera position before the movement. We use `copy` instead of `set` because `set` will set the position to the same object, so if we change the previousPosition, the camera position will also change. `copy` creates a new object with the same values as the previousPosition.
      }
    });
    return () => {
      document.removeEventListener("keydown", this);
    };
    // Foo(controls, speed);
  }, []);
  return (
    <group
      scale={scale}
      name="Room"
      // ref={room}
    >
      <PointerLockControls
        // onLock={checkIntersections()}
        selector="canvas"
        onLock={() => {}}
        ref={controls}
      />
      <ambientLight />
      <Wall texture={wallTexture} position={[0, 0, -25]} />
      <Wall texture={wallTexture} position={[0, 0, 25]} />
      <Wall
        texture={wallTexture}
        position={[-25, 0, 0]}
        rotation={[0, Math.PI / 2, 0]}
      />
      <Wall
        texture={wallTexture}
        position={[25, 0, 0]}
        rotation={[0, Math.PI / 2, 0]}
      />
      <Wall
        // texture={wallTexture}
        position={[0, 25, 0]}
        rotation={[Math.PI / 2, 0, 0]}
      />
      <Wall
        texture={floorTexture}
        position={[0, -25, 0]}
        rotation={[Math.PI / 2, 0, 0]}
      />
    </group>
  );
}
function Art({ texture, information, setSelected, ...probs }) {
  // const DataContext = useData();
  // const context = useContext(DataContext);
  // const [select, setSelect] = useState(false);
  const dispatcher = useDispatch();
  const selectedArt = useSelector((state) => state.selectedArt.value);

  // useEffect(() => {
  //   console.log(selected);
  // });
  return (
    <group
      // scale={select ? [2, 2, 2] : [1, 1, 1]}
      {...probs}
      onClick={() => {
        console.log("clicked");
        dispatcher(setSelectedArt(information));
        // setSelected(information);
        // setSelect(true);
      }}
      onPointerMissed={() => {
        // setSelected(null);
        // setSelect(false);
        dispatcher(setSelectedArt(null));
      }}
      // onPointerLeave={() => {
      //   setSelected(null);
      //   setSelect(false);
      // }}
      onPointerEnter={() => {
        console.log("hoverd");
        dispatcher(setSelectedArt(information));
        // setSelected(information);
        // setSelect(true);
      }}
    >
      <mesh>
        <planeGeometry args={[3, 3]} />
        <meshBasicMaterial
          map={useTexture(texture)}
          color={selectedArt ? "white" : "#808080"}
          side={THREE.DoubleSide}
        />
      </mesh>
    </group>
  );
}

function GalleryTest() {
  const DataContext = useData();
  const context = useContext(DataContext);
  const selectedArt = useSelector((state) => state.selectedArt.value);

  // const [selected]
  useEffect(() => {
    console.log(context.selected);
  }, [context.selected]);
  const arts = [
    {
      art: "https://images.pexels.com/photos/159862/art-school-of-athens-raphael-italian-painter-fresco-159862.jpeg?auto=compress&cs=tinysrgb&w=600",
      position: [5, 0, -10],
      name: "art1",
      discription: "some disctiption",
      author: "ditto",
      owner: "deva",
      price: 100,
      scale: [1.5, 1.5, 1],

      // rotation: [],
    },
    {
      art: "https://images.pexels.com/photos/795693/pexels-photo-795693.jpeg?auto=compress&cs=tinysrgb&w=600",

      name: "art2",
      discription: "some disctiption",
      author: "ditto",
      owner: "deva",
      price: 100,
      scale: [1.5, 1, 1],
      position: [0, 0, -10],
    },
  ];

  return (
    <>
      <Canvas>
        {/* <OrbitControls /> */}
        {/* <Wall url="./image.png" /> */}

        <Room
          scale={[0.5, 0.5, 0.5]}
          wallImage={"http://127.0.0.1:8000/media/textures/image.png"}
          floorImage={"http://127.0.0.1:8000/media/textures/wood.jpg"}
        />

        {arts.map((value, index) => (
          <Art
            key={index}
            texture={(new Image().src = value.art)}
            position={value.position}
            rotation={value.rotation}
            scale={value.scale}
            information={value}
            setSelected={context.setSelected}
          />
        ))}
      </Canvas>
      {selectedArt && <ArtInfo info={selectedArt} />}
    </>
  );
}

export default GalleryTest;
