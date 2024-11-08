import React, { createContext, useEffect, useState } from "react";
import Gallery from "../scene/Gallery";
import Room from "../scene/Room";
import Settings from "../settings/Settings";
import "./Dashstyle.css";
import { getGallery } from "../../services/GallerysServ";

import { useData } from "../../contexts";
import GalleryTest from "./galleryTest";

const dataContext = createContext();
function Dashboard() {
  // function getData(d) {
  //   setSelected(d);
  // }

  // console.log(arts);
  // const seletedArt = arts.filter((e) => e.seleted)[0];
  // console.log(seletedArt);
  //   console.log(gallery);
  // useEffect(() => {
  //   getGallery().then((e) => {
  //     console.log(e);
  //     setGallery(e);
  //   });
  // }, []);
  // useEffect(() => {
  //   console.log(selected);
  // }, [selected]);
  const DataContext = useData();
  return (
    <div className="Dashboard">
      <DataContext.Provider>
        <GalleryTest
        // name="some"
        // gallery={gallery}
        // arts={arts}
        // prentsetSelected={getData}
        // selected={selected}
        // Settings={{ gallery, arts }}
        />
        {/* <Room /> */}
        <Settings
        // setGallery={setGallery}
        // setArt={setArts}
        // selected={selected}
        />
      </DataContext.Provider>
    </div>
  );
}

export default Dashboard;
