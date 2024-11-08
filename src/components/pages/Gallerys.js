import React, { useEffect, useState } from "react";
import GalleryCard from "../galleryView/GalleryCard";
import { authGuard, getUser } from "../../services/Auth";
import { useNavigate } from "react-router-dom";
import { getUserGallerys } from "../../services/GallerysServ";

function Gallerys() {
  const nav = useNavigate();
  const isauth = authGuard(
    (response) => {
      console.log(response);
      getUserGallerys(response);
    },
    () => nav("/login")
  );
  const [gallerys, setGallery] = useState([
    {
      id: 1,
      name: "gallery 1",
      discription: "hi heop some discription",
      rating: 5,
      hashTags: [
        "gallery 1",
        "paintings",
        "special",
        "inside",
        "relatedToPaintings",
      ],
    },
    {
      id: 2,
      name: "gallery 2",
      discription: "hi heop",
      rating: 2,
      hashTags: [
        "something",
        "paintings",
        "special",
        "inside",
        "relatedToPaintings",
      ],
    },
  ]);
  useEffect(() => {
    getUser();
  }, []);
  return (
    <div>
      Gallerys
      <div
        style={{
          display: "grid",
          gap: "10px",
          marginTop: "10px",
          gridTemplateColumns: "repeat(auto-fit,300px)",
        }}
      >
        {gallerys.map((value, index) => {
          return (
            <GalleryCard
              name={value.name}
              id={value.id}
              discription={value.discription}
              tags={value.hashTags}
              rating={value.rating}
              //   setSearch={setSearch}
            />
          );
        })}
      </div>
    </div>
  );
}

export default Gallerys;
