import * as THREE from "three";
// import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
import { PointerLockControls } from "three/examples/jsm/controls/PointerLockControls.js";

// import React from "react";
//style
import "./CanvasStyle.css";
//scripts
import { createWalls } from "./scripts/room";

import { useEffect, useRef } from "react";
// import { updateMovement, checkCollision } from "./scripts/movment";

function Canvas() {
  const refContainer = useRef(null);
  useEffect(() => {
    // === THREE.JS CODE START ===
    var scene = new THREE.Scene();
    var camera = new THREE.PerspectiveCamera(
      75,
      window.innerWidth / window.innerHeight,
      0.1,
      1000
    );

    //light
    const light = new THREE.AmbientLight();
    scene.add(light);

    const loader = new THREE.TextureLoader();

    var renderer = new THREE.WebGLRenderer();
    renderer.setSize(window.innerWidth, window.innerHeight);
    // document.body.appendChild( renderer.domElement );
    // use ref as a mount point of the Three.js scene instead of the document.body
    refContainer.current &&
      refContainer.current.appendChild(renderer.domElement);

    var geometry = new THREE.BoxGeometry(1, 1, 1);
    var material = new THREE.MeshBasicMaterial({ color: 0x00ff00 });
    var cube = new THREE.Mesh(geometry, material);
    scene.add(cube);
    // const controls = new OrbitControls(camera, renderer.domElement);
    let controls = new PointerLockControls(camera, renderer.domElement); // create a PointerLockControls object that takes the camera and the renderer's domElement as arguments. PointerLockControls is a class that allows the camera to be controlled by the mouse and keyboard.
    const walls = createWalls(scene, loader);
    for (var i = 0; i < walls.children.length; i++) {
      walls.children[i].geometry.boundingBox = new THREE.Box3().setFromObject(
        walls.children[i]
      );
    }
    scene.add(walls);
    scene.add(controls.getObject());
    window.addEventListener("click", () => controls.lock());
    // window.addEventListener("keydown", (e) => {
    //   updateMovement(e, controls, camera, walls);
    // });

    window.addEventListener("keydown", (e) => {
      const previousPosition = camera.position.clone();

      if (e.keyCode == 38) {
        controls.lock();
        controls.moveForward(0.5);
        //console.log(controls.getObject().position)
      } else if (e.keyCode == 39) {
        controls.moveRight(0.5);
        // console.log(controls.getObject().position)
      } else if (e.keyCode == 40) {
        controls.moveForward(-0.5);
        //console.log(controls.getObject().position)
      } else if (e.keyCode == 37) {
        controls.moveRight(-0.5);
        //console.log(controls.getObject().position)
      }
      if (checkCollision(camera, walls)) {
        camera.position.copy(previousPosition);
      }
    });

    camera.position.z = 5;
    var animate = function () {
      requestAnimationFrame(animate);
      cube.rotation.x += 0.01;
      cube.rotation.y += 0.01;
      renderer.render(scene, camera);
    };
    animate();
  }, []);
  return <div ref={refContainer}></div>;
}

export default Canvas;
