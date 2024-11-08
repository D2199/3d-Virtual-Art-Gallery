import * as THREE from "three";
// import wall from "../img/wall.png";
export function createWalls(scene, textureLoader) {
  let wallGroup = new THREE.Group();
  //console.log(scene)
  //scene.add(wallGroup);

  /* const normalTexture = textureLoader.load(
    "leather_white_4k.gltf/textures/leather_white_nor_gl_4k.jpg"
  );
  const roughnessTexture = textureLoader.load(
    "leather_white_4k.gltf/textures/leather_white_rough_4k.jpg"
  );

  normalTexture.wrapS = normalTexture.wrapT = THREE.RepeatWrapping;
  roughnessTexture.wrapS = roughnessTexture.wrapT = THREE.RepeatWrapping;
*/
  const wallMaterial = new THREE.MeshStandardMaterial({
    color: 0xadadae,
    // map: textureLoader.load(wall),
    // normalMap: normalTexture,
    //roughnessMap: roughnessTexture,
    side: THREE.DoubleSide,
  });
  // Front Wall
  const frontWall = new THREE.Mesh(
    new THREE.BoxGeometry(50, 20, 0.001),
    wallMaterial
  );
  frontWall.name = "frontWall";
  frontWall.position.z = -25;

  // Left Wall
  const leftWall = new THREE.Mesh(
    new THREE.BoxGeometry(50, 20, 0.001),
    wallMaterial
  );
  leftWall.name = "leftWall";
  leftWall.rotation.y = Math.PI / 2;
  leftWall.position.x = -25;

  // Right Wall
  const rightWall = new THREE.Mesh(
    new THREE.BoxGeometry(50, 20, 0.001),
    wallMaterial
  );

  rightWall.name = "rightWall";
  rightWall.position.x = 25;
  rightWall.rotation.y = Math.PI / 2;

  // Back Wall
  const backWall = new THREE.Mesh(
    new THREE.BoxGeometry(50, 20, 0.001),
    wallMaterial
  );
  backWall.position.z = 25;
  backWall.name = "backWall";
  //ceiling
  //   const normalTexture = textureLoader.load(wall);
  //   normalTexture.wrapS = normalTexture.wrapT = THREE.RepeatWrapping;

  const ceilngPlane = new THREE.Mesh(
    new THREE.PlaneGeometry(50, 50),
    new THREE.MeshLambertMaterial({
      //   map: normalTexture,
      side: THREE.DoubleSide,
    })
  );
  ceilngPlane.rotateX(Math.PI / 2);
  ceilngPlane.position.y = 10;
  ceilngPlane.name = "ceiling";
  //floor
  const floorPlane = new THREE.Mesh(
    new THREE.PlaneGeometry(50, 50),
    new THREE.MeshStandardMaterial({
      //  map:textureLoader.load('./img/wood.jpg'),
      side: THREE.DoubleSide,
    })
  );
  floorPlane.name = "floor";
  floorPlane.rotation.x = -Math.PI / 2;
  floorPlane.position.y = -10;

  wallGroup.name = "room";
  wallGroup.add(
    frontWall,
    backWall,
    leftWall,
    rightWall,
    ceilngPlane,
    floorPlane
  );

  return wallGroup;
}
