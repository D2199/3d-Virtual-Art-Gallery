import React, { useEffect } from "react";
import Buttons from "../utils/Buttons";
import { Navigate, useNavigate } from "react-router-dom";
// import "./galleyViewe.css";
function GalleryCard({ id, name, rating, discription, tags, setSearch }) {
  const nav = useNavigate();
  const c = [];
  useEffect(() => {
    for (let i; i < rating; i++) {
      c.push("*");
    }
  }, []);
  // console.log(c);
  return (
    <div
      className="card gallList"
      style={{
        display: "flex",
        gap: "10px",

        justifyContent: "space-between",
        flexDirection: "column",
      }}
    >
      <div className="card-item">
        <label>Name:</label>
        {name}
      </div>
      <div className="card-item">
        <label>Discription:</label>
        {discription}
      </div>
      <div className="card-item">
        <label>Ratings:</label>
        {rating}
        {c.map((v) => v)}
      </div>
      <div className="card-item">
        <label>HashTags:</label>
        {tags &&
          tags.map((element) => {
            return (
              <a
                style={{ cursor: "pointer" }}
                onClick={(e) => {
                  setSearch(element);
                }}
              >
                #{element}{" "}
              </a>
            );
          })}
      </div>
      <div className="card-item">
        <Buttons action={() => nav(`/gallery/${id}`)}>Explore</Buttons>
      </div>
    </div>
  );
}

export default GalleryCard;
