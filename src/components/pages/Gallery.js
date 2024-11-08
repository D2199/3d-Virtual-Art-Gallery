import React, { useState, useContext, useEffect } from "react";
import Gallery from "../scene/Gallery";
import Buttons from "../utils/Buttons";
import GalleryTest from "./galleryTest";
import { redirect, useNavigate, useParams } from "react-router-dom";
import { useData } from "../../contexts";
import { getGallery } from "../../services/GallerysServ";

function ArtInfo({ info }) {
  return (
    <>
      {info && (
        <div className="art-info">
          <div className="name">{info.name}</div>
          <div className="discription">{info.discription}</div>
          <div className="author">{info.author}</div>
          <div className="owner">{info.owner}</div>
          <div className="price">{info.price}</div>
          <div className="action">
            <Buttons>Buy</Buttons>
          </div>
        </div>
      )}
    </>
  );
}
function Gallery() {
  const [gallery, setGallery] = useState("");
  const [arts, _] = useState();
  const { galleryId } = useParams();
  const DataContext = useData();
  const context = useContext(DataContext);
  const navigator = useNavigate();
  const previousGallery = () => {
    let id = Number(galleryId);
    if (typeof id == "number") {
      if (id > 0) {
        // console.log(id--);
        navigator(`/gallerys/${id - 1}`);
      }
    }
  };
  const nextGallery = () => {
    // redirect("/login");
    let id = Number(galleryId);
    if (typeof id == "number") {
      if (id < 50) {
        // console.log("/gallerys/" + id + 1);
        navigator(`/gallerys/${id + 1}`);
      }
    }
  };
  useEffect(async () => {
    const gallery = getGallery(galleryId);
    const arts = getArtsByGallery(galleryId);
  }, []);
  return (
    <div
      style={{
        border: "1px solid black",
        height: "100vh",
        width: "100vw",
        position: "absolute",
      }}
    >
      {/* Gallerys */}
      {/* <Gallery /> */}
      <GalleryTest />
      <div
        className="navBtns"
        style={{
          position: "absolute",
          top: "50%",
          display: "flex",
          width: "100vw",
          justifyContent: "space-between",
        }}
      >
        <Buttons action={() => previousGallery()} style={{ width: "100px" }}>
          previous
        </Buttons>
        <Buttons action={() => nextGallery()} style={{ width: "100px" }}>
          next
        </Buttons>
      </div>
    </div>
  );
}

export default Gallery;
