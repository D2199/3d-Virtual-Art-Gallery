import React, { useEffect, useState } from "react";
import GalleryCard from "../galleryView/GalleryCard";
import Search from "../search/Search";

function Explore() {
  const [search, setSearch] = useState("");
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
    {
      id: 3,
      name: "gallery 3",
      rating: 3,
      discription: "hi heop some discription",
      hashTags: ["something", "special", "inside", "relatedToPaintings"],
    },
    {
      id: 4,
      name: "gallery 4",
      rating: 1,
      discription: "hi heop",
      hashTags: ["something", "special", "inside", "relatedToPaintings"],
    },
  ]);
  // setGallery([
  //   { id: 1, name: "gallery 1", discription: "hi heop some discription" },
  //   { id: 2, name: "gallery 2", discription: "hi heop" },
  //   { id: 3, name: "gallery 3", discription: "hi heop some discription" },
  //   { id: 4, name: "gallery 4", discription: "hi heop" },
  // ]);
  const [filteredGalls, setfilteredGalls] = useState([{}]);

  useEffect(() => {
    // alert(search);
    console.log(search);
    setfilteredGalls(
      gallerys.filter(
        (value) => search == value.name || value.hashTags.includes(search)
      )
    );
  }, [search]);
  // alert(filteredGalls.length);
  return (
    <div style={{ margin: "5px" }}>
      <Search setSearch={setSearch} />
      <div
        style={{
          display: "grid",
          gap: "10px",
          marginTop: "10px",
          gridTemplateColumns: "repeat(auto-fit,300px)",
        }}
      >
        {filteredGalls.length > 0
          ? filteredGalls.map((value, index) => {
              return (
                <GalleryCard
                  name={value.name}
                  id={value.id}
                  discription={value.discription}
                  tags={value.hashTags}
                  rating={value.rating}
                  setSearch={setSearch}
                />
              );
            })
          : gallerys.map((value, index) => {
              return (
                <GalleryCard
                  name={value.name}
                  id={value.id}
                  discription={value.discription}
                  tags={value.hashTags}
                  rating={value.rating}
                  setSearch={setSearch}
                />
              );
            })}
      </div>
    </div>
  );
}

export default Explore;
