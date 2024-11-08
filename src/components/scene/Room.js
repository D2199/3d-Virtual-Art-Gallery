import * as THREE from "three";
import {
  group,
  mesh,
  boxGeometry,
  meshBasicMaterial,
  meshStandardMaterial,
  useFrame,
  useThree,
} from "@react-three/fiber";
import { useLoader } from "@react-three/fiber";
// import { TextureLoader } from "three/src/loaders/TextureLoader";
import {
  Loader,
  PointerLockControls,
  useSpriteLoader,
  useTexture,
} from "@react-three/drei";
import { TextureLoader, Mesh, PlaneGeometry, MeshBasicMaterial } from "three";
import { useContext, useEffect, useRef, useState } from "react";
import { loadImg } from "../../services/GallerysServ";
import woodFloor from "../../asserts/roomTex/wood.jpg";
import wallTex from "../../asserts/roomTex/wall.png";
import "./0.jpg";
import { useHelper, useScroll } from "@react-three/drei";
import { checkCollision } from "../canvas/scripts/movment";

const textureLoader = new TextureLoader();

function Wall({ position, rotation, color, map }) {
  // const wall = useRef();
  // const [walls, setWall] = useState(wall);
  // const texture = textureLoader.load("./0.jpg");
  // const mesh = new Mesh(
  //   new PlaneGeometry(1, 1),
  //   new MeshBasicMaterial({ map: texture })
  // );

  // wall.current.geometry.boundingBox = new THREE.Box3().setFromObject(
  //   wall.current
  // );
  // console.log(wall);
  // useHelper(wall, THREE.BoxHelper, "blue");
  return (
    <mesh position={position} rotation={rotation}>
      <boxGeometry
        args={[50, 50]}
        // boundingBox={new THREE.Box3().setFromObject(wall.current)}
      />
      <meshStandardMaterial map={map} />
    </mesh>
  );
}
export default function Room({
  refs,
  scale,
  wallTexture,
  floorTexture,
  cellingTexture,
  ...probs
}) {
  console.log(wallTexture);

  const room = useRef();
  const controls = useRef();
  const speed = 3;
  // console.log(controls);
  // console.log(useContext(data));
  // const walls = room.current.children;
  // for (var i = 0; i < walls.length; i++) {
  //   walls[i].geometry.boundingBox = new THREE.Box3().setFromObject(walls[i]);
  //   console.log(room);
  // }
  // console.log(<Wall />);
  // const room = useRef();
  // console.log(room);
  // const room = useRef();
  // useEffect(() => {
  //   for (let wall of room.current.children) {
  //     wall.geometry.boundingBox = new THREE.Box3().setFromObject(wall);
  //   }
  //   // console.log(wall);
  // });
  // refs(room);

  // for (let wall of walls.children) {
  //   wall.geometry.boundingBox = new THREE.Box3().setFromObject(wall);
  // }
  // console.log(camera);
  const { camera, scene } = useThree();
  // const walls = scene.children.filter((e) => e.name == "Room")[0];
  // console.log(walls);
  // for (let wall of walls.children) {
  //   wall.geometry.boundingBox = new THREE.Box3().setFromObject(wall);
  // }

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
      // if (checkCollision(camera, walls)) {
      //   camera.position.copy(previousPosition); // reset the camera position to the previous position. The `previousPosition` variable is a clone of the camera position before the movement. We use `copy` instead of `set` because `set` will set the position to the same object, so if we change the previousPosition, the camera position will also change. `copy` creates a new object with the same values as the previousPosition.
      // }
    });
    return () => {
      document.removeEventListener("keydown", this);
    };
    // Foo(controls, speed);
  }, []);
  // useFrame((e, t, v) => {
  //   // console.log(e, t, v);
  //   checkCollision(
  //     e.camera,
  //     e.scene.children.filter((e) => e.name == "Room")[0]
  //   );
  // });
  // import("http://127.0.0.1:8000/media/textures/image.png");

  // loadImg("http://127.0.0.1:8000/media/textures/image.png").then((e) =>
  //   console.log(useTexture(TextureLoader, e.text))
  // );
  const wallTextureLoad = useTexture(
    wallTexture
    // "http://127.0.0.1:8000/media/textures/image.png"
  );
  // wallTexture = wallTex;
  // const floorTex = useLoader(TextureLoader, floorTexture);
  // console
  //   .log
  // wallTex
  // useLoader(TextureLoader, "http://127.0.0.1:8000/media/textures/image.png")
  // ();

  return (
    <group
      {...probs}
      ref={room}
      scale={[scale.x, scale.y, scale.z]}
      name="Room"
    >
      <PointerLockControls selector="canvas" id="control" ref={controls} />
      <Wall position={[0, 0, -25]} map={wallTextureLoad} />

      <Wall position={[0, 0, 25]} map={wallTextureLoad} />
      <Wall
        position={[-25, 0, 0]}
        rotation={[0, Math.PI / 2, 0]}
        map={wallTextureLoad}
      />
      <Wall
        position={[25, 0, 0]}
        rotation={[0, Math.PI / 2, 0]}
        map={wallTextureLoad}
      />
      <Wall
        position={[0, 25, 0]}
        rotation={[Math.PI / 2, 0, 0]}
        color={"red"}
      />
      <Wall
        position={[0, -25, 0]}
        rotation={[Math.PI / 2, 0, 0]}
        color={"white"}
        map={wallTextureLoad}
      />
    </group>
  );
}
