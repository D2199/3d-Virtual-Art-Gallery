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
import { useParams } from "react-router-dom";

// await import("./image.png");
// import url from "./art.jpg";
const checkCollision = (camera, rooms) => {
  // console.log(room.children);
  const raycaster = new THREE.Raycaster();
  raycaster.setFromCamera(new THREE.Vector2(0, 0), camera);

  const intersects = raycaster.intersectObjects(
    rooms ? rooms.children : []
    // scene && scene.children.filter((c) => c.name == "Room")[0].children
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
  const speed = 1;
  const { camera, scene } = useThree();
  const [intersectionResults, setIntersectionResults] = useState([]);
  // const room = scene.children.filter((c) => c.name == "Room")[0].children;
  let roomChild = useRef();
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

  useEffect(() => {
    // const walls = scene.children.filter((e) => e.name == "Room")[0];

    // camera.position.copy(previousPosition);

    const event = document.addEventListener("keydown", (e) => {
      const previousPosition = camera.position.clone();
      const control = controls.current;
      if (e.key == "ArrowUp") {
        control && controls.current.moveForward(0.1 * speed);
      }
      if (e.key == "ArrowDown") {
        control && controls.current.moveForward(-0.1 * speed);
      }
      if (e.key == "ArrowRight") {
        control && controls.current.moveRight(0.1 * speed);
      }
      if (e.key == "ArrowLeft") {
        control && controls.current.moveRight(-0.1 * speed);
      }
      if (checkCollision(camera, roomChild.current)) {
        camera.position.copy(previousPosition); // reset the camera position to the previous position. The `previousPosition` variable is a clone of the camera position before the movement. We use `copy` instead of `set` because `set` will set the position to the same object, so if we change the previousPosition, the camera position will also change. `copy` creates a new object with the same values as the previousPosition.
      }
    });
    return () => {
      document.removeEventListener("keydown", event);
    };
    // Foo(controls, speed);
  });
  return (
    <group scale={scale} name="Room" ref={roomChild}>
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
  const { galleryId } = useParams();
  // const [selected]
  useEffect(() => {
    console.log(context.selected);
  }, [context.selected]);
  let arts;
  arts =
    galleryId == 2
      ? [
          {
            art: "https://images.pexels.com/photos/795693/pexels-photo-795693.jpeg?auto=compress&cs=tinysrgb&w=600",

            name: "art2",
            description: "some disctiption",
            author: "ditto",
            owner: "deva",
            price: 100,
            scale: { x: 1.5, y: 1, z: 1 },
            position: { x: 0, y: 0, z: -10 },
          },
        ]
      : [
          {
            art: "https://images.pexels.com/photos/159862/art-school-of-athens-raphael-italian-painter-fresco-159862.jpeg?auto=compress&cs=tinysrgb&w=600",
            position: { x: 5, y: 0, z: -10 },
            name: "art1",
            description: "some disctiption",
            author: "ditto",
            owner: "deva",
            price: 100,
            scale: { x: 1.5, y: 1.5, z: 1 },

            // rotation: [],
          },
        ];
  // useEffect(() => {
  //   galleryId == 2 &&
  //     setArts([
  //       // ...arts,
  //       {
  //         art: "https://images.pexels.com/photos/795693/pexels-photo-795693.jpeg?auto=compress&cs=tinysrgb&w=600",

  //         name: "art2",
  //         description: "some disctiption",
  //         author: "ditto",
  //         owner: "deva",
  //         price: 100,
  //         scale: { x: 1.5, y: 1, z: 1 },
  //         position: { x: 0, y: 0, z: -10 },
  //       },
  //     ]);
  //   // return () => {};
  // });

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
            // position={[value.position.x, value.position.y, value.position.z]}
            // rotation={[value.rotation.x, value.rotation.y, value.rotation.z]}
            position-z={value.position.z}
            position-y={value.position.y}
            position-x={value.position.x}
            // scale={[value.scale.x, value.scale.y, value.scale.z]}
            scale-x={value.scale.x}
            scale-y={value.scale.y}
            scale-z={value.scale.z}
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
