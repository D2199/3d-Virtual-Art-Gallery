import * as THREE from "three";
import { group, useFrame, Canvas, useThree } from "@react-three/fiber";
import { Art } from "./Arts";
import { createContext, useContext, useEffect, useRef, useState } from "react";
import {
  PerspectiveCamera,
  PointerLockControls,
  OrbitControls,
  useKeyboardControls,
  KeyboardControls,
} from "@react-three/drei";
import { checkCollision } from "../canvas/scripts/movment";
import Room from "./Room";
// import arts from "./0.jpg";
import "./style.css";
import { useData } from "../../contexts";
// import { useData } from "../../contexts";

// document.addEventListener("keydown", move);
// function move(ev) {
//   console.log(ev);
// }
// function Foo(controls, speed) {
//   const { size, camera, scene } = useThree();

//   console.log(camera, scene.children.filter((v) => v.name == "Room")[0]);
//   // useFrame((s, d, f) => {
//   //   console.log(s, d, f);
//   // });
//   let previousPosition = camera.position.clone();
//   useEffect(() => {
//     document.addEventListener("keydown", (e) => {
//       if (e.key == "ArrowUp") {
//         controls.current.moveForward(0.1 * speed);
//       }
//       if (e.key == "ArrowDown") {
//         controls.current.moveForward(-0.1 * speed);
//       }
//       if (e.key == "ArrowRight") {
//         controls.current.moveRight(0.1 * speed);
//       }
//       if (e.key == "ArrowLeft") {
//         controls.current.moveRight(-0.1 * speed);
//       }
//       if (
//         checkCollision(
//           camera,
//           scene.children.filter((v) => v.name == "Room")[0]
//         )
//       ) {
//         camera.position.copy(previousPosition); // reset the camera position to the previous position. The `previousPosition` variable is a clone of the camera position before the movement. We use `copy` instead of `set` because `set` will set the position to the same object, so if we change the previousPosition, the camera position will also change. `copy` creates a new object with the same values as the previousPosition.
//       }
//     });
//     return () => {
//       document.removeEventListener("keydown", this);
//     };
//   }, []);
//   // document.addEventListener("keydown", (e) => {
//   //   if (e.key == "ArrowUp") {
//   //     controls.current.moveForward(0.1 * speed);
//   //   }
//   //   if (e.key == "ArrowDown") {
//   //     controls.current.moveForward(-0.1 * speed);
//   //   }
//   //   if (e.key == "ArrowRight") {
//   //     controls.current.moveRight(0.1 * speed);
//   //   }
//   //   if (e.key == "ArrowLeft") {
//   //     controls.current.moveRight(-0.1 * speed);
//   //   }
//   // });
//   console.log();
// }
function check() {}
export default function Gallery({
  gallery,
  arts,
  // selected,
  prentsetSelected,
  ...props
}) {
  console.log(gallery);
  // const [input, setInput] = useState({});

  // useFrame((s, d, f) => {
  //   console.log(s, d, f);
  // });
  // console.log(useThree());

  // Foo(controls, speed);

  // const [room, setroom] = useState("");
  // const speed = 2;
  // console.log(room);
  // useEffect(() => {
  //   document.addEventListener("keydown", (e) => {
  //     const previousPosition = camer.current.position.clone(); // clone the camera position and store it in previousPosition. We will use this to reset the camera position if there is a collision

  //     if (e.key == "ArrowUp") {
  //       // console.log(e, controls);
  //       controls.current.moveForward(0.1 * speed);
  //     }
  //     if (e.key == "ArrowDown") {
  //       controls.current.moveForward(-0.1 * speed);
  //     }
  //     if (e.key == "ArrowRight") {
  //       controls.current.moveRight(0.1 * speed);
  //     }
  //     if (e.key == "ArrowLeft") {
  //       controls.current.moveRight(-0.1 * speed);
  //     }
  //     //   if (checkCollision(camer.current, room.current)) {
  //     //     console.log("colide");
  //     //     camer.current.position.copy(previousPosition); // reset the camera position to the previous position. The `previousPosition` variable is a clone of the camera position before the movement. We use `copy` instead of `set` because `set` will set the position to the same object, so if we change the previousPosition, the camera position will also change. `copy` creates a new object with the same values as the previousPosition.
  //     //   }
  //   });
  // }, [camer]);
  // const canva = useRef();
  const [selected, setSelected] = useState();
  const DataContext = useData();
  const context = useContext(DataContext);
  console.log(context);
  useEffect(() => {
    context.setSelected(selected);
  }, [selected]);

  // const data = createContext(props);
  // const cont = useKeyboardControls();
  // useEffect(() => {
  //   // console.log(selected);
  // }, [selected]);
  // const dataContext = useData();
  // console.log(camera);
  // useEffect(() => {
  //   console.log(selected);
  // }, [selected]);
  const art = context.arts[0];
  return (
    // <data.Provider value={props}>
    <>
      <Canvas id="canvas" style={{ width: "100%", height: "100%" }}>
        {/* <PerspectiveCamera makeDefault /> */}
        <ambientLight />
        {/* <KeyboardControls /> */}
        <pointLight intensity={1} />
        {/* <OrbitControls /> */}
        <Room
          wallTexture={require("./0.jpg")}
          floorTexture={context.gallery.floorTexture}
          cellingTexture={context.gallery.cellingTexture}
          scale={context.gallery.scale}
        />
        <Art
          art={art}
          // img={arts}
          setSelected={setSelected}
          // artInfo={{ hi: "de" }}
          // position={[0, 0, 3]}
        />
      </Canvas>
      {selected && <div className="artInfo">"selected"</div>}
    </>
    // </data.Provider>
  );
}
