import { createContext, useEffect, useState } from "react";

// export const useData = () => {
//   const [gallerySettings, setGallerySettings] = useState({});
//   const dataProvider = createContext();
//   const data = { gallerySettings };
//   console.log(dataProvider.Provider);
//   return dataProvider;
// };
import artimg from "./components/scene/0.jpg";
import React from "react";
import Buttons from "./components/utils/Buttons";

export function useData() {
  // const userAuth=localStorage.getItem('AuthToken')
  const [gallery, setGallery] = useState({
    name: "gallery",
    scale: { x: 1, y: 0, z: 1 },
    wallTexture: "http://127.0.0.1:8000/media/textures/image.png",
    floorTexture: "http://127.0.0.1:8000/media/textures/image.png",
    cellingTexture: "http://127.0.0.1:8000/media/textures/image.png",
  });
  const [arts, setArts] = useState([
    {
      name: "art1",
      img: artimg,
      price: 240,
      position: { x: 0, y: 0, z: 1 },
      rotation: { x: 0, y: 0, z: 0 },
      seleted: true,
      scale: { x: 1, y: 1, z: 1 },
    },
    {
      name: "art2",
      art: "/dd/dd",
      price: 250,
      position: { x: 1, y: 1, z: 1 },
      rotation: { x: 1, y: 1, z: 1 },
      // seleted: true,
    },
  ]);
  const [selected, setSelected] = useState(null);
  useEffect(() => {}, [selected]);
  const DataContext = React.createContext({
    gallery,
    setGallery,
    selected,
    setSelected,
    arts,
    setArts,
  });

  return DataContext;
}
