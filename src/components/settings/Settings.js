import React, { useContext, useEffect } from "react";
import "./style.css";
import Buttons from "../../components/utils/Buttons";
import { useData } from "../../contexts";
import { updateGallery } from "../../services/GallerysServ";
function Settings() {
  // const seleted = art.forEach((element) => {
  //   return element.seleted ? element : { name: "art2", seleted: true };
  // });
  // useEffect(() => {
  //   console.log(seleted);
  // }, [seleted]);
  const DataContext = useData();
  const context = useContext(DataContext);
  // context.setSelected;
  // context.setGallery({ ...context.gallery, name: name });
  const GalleryForm = new FormData();
  const ArtForm = new FormData();
  function onGallerySubmit() {
    for (let field in context.gallery) {
      if (typeof context.gallery[field] === "object") {
        // console.log(field);
        GalleryForm.append(field, JSON.stringify(context.gallery[field]));
      } else {
        GalleryForm.append(field, context.gallery[field]);
      }
    }
    // console.log(GalleryForm);
    // updateGallery(GalleryForm).then;
  }
  return (
    <div className="setCon">
      <details>
        <summary>Gallery Settings</summary>
        <div className="form-item">
          <lable>Name</lable>
          <input
            name="name"
            placeholder="name"
            onChange={(e) => {
              console.log(e.target.value);
              context.setGallery({
                ...context.gallery,
                name: e.target.value.trim(),
              });
            }}
          />
        </div>
        <div className="form-item">
          <lable>Discription</lable>
          <textarea
            name="discription"
            placeholder="discription"

            // onChange={(e) => {
            //   console.log(e.target.value);
            //   context.setGallery({
            //     ...context.gallery,
            //     name: e.target.value.trim(),
            //   });
            // }}
          />
        </div>
        <div className="form-item">
          <lable>Wall Texture</lable>
          <input
            onChange={(e) => {
              context.setGallery({
                ...context.gallery,
                wallTexture: e.target.value,
              });
            }}
            name="wallTexture"
            type="file"
          />
        </div>
        <div className="form-item">
          <lable>Floor Texture</lable>
          <input
            onChange={(e) => {
              context.setGallery({
                ...context.gallery,
                floorTexture: e.target.value,
              });
            }}
            name="floorTexture"
            type="file"
          />
        </div>
        <div className="form-item">
          <lable>Celling Texture</lable>
          <input
            onChange={(e) => {
              context.setGallery({
                ...context.gallery,
                cellingTexture: e.target.value,
              });
            }}
            name="cellingTexture"
            type="file"
          />
        </div>
        <div className="form-item">
          <lable>Scale</lable>
          <div className="positionInputs">
            <span>
              X
              <input
                onChange={(e) => {
                  context.setGallery({
                    ...context.gallery,
                    scale: {
                      ...context.gallery.scale,
                      x: e.target.value,
                    },
                  });
                }}
                type="number"
                max={5}
                min={1}
              />
            </span>

            {/* <span>
              Y <input type="number" max={Math.PI * 2} min={0} />
            </span> */}
            <span>
              Z{" "}
              <input
                onChange={(e) => {
                  context.setGallery({
                    ...context.gallery,
                    scale: {
                      ...context.gallery.scale,
                      z: e.target.value,
                    },
                  });
                }}
                type="number"
                max={5}
                min={1}
              />
            </span>
          </div>
        </div>
        <div className="form-item">
          <Buttons
            action={() => {
              console.log(context.gallery);
              onGallerySubmit();
            }}
          >
            save
          </Buttons>
        </div>
      </details>
      <details>
        <summary>Art settings</summary>
        <div className="form-item">
          <lable>Art </lable>
          <input onChange={(e) => console.log(e.target.value)} type="file" />
        </div>
        <div className="form-item">
          <label>Name</label>
          <input onChange={(e) => console.log(e.target.value)} type="text" />
        </div>
        <div className="form-item">
          <lable>Position</lable>
          <div className="positionInputs">
            <span>
              X <input type="number" max={Math.PI * 2} min={0} />
            </span>

            <span>
              Y <input type="number" max={Math.PI * 2} min={0} />
            </span>
            <span>
              Z <input type="number" max={Math.PI * 2} min={0} />
            </span>
          </div>
        </div>
        <div className="form-item">
          <lable>Rotation</lable>
          <div className="rotateInputs">
            <span>
              X <input type="number" max={Math.PI * 2} min={0} />
            </span>

            <span>
              Y <input type="number" max={Math.PI * 2} min={0} />
            </span>
            <span>
              Z <input type="number" max={Math.PI * 2} min={0} />
            </span>
          </div>
        </div>
        <div className="form-item">
          {context.selected ? (
            <Buttons onClick={() => {}}>edit</Buttons>
          ) : (
            <Buttons>Add</Buttons>
          )}
        </div>
      </details>
    </div>
  );
}

export default Settings;
