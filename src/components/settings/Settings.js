import React, { useContext, useEffect, useState } from "react";
import style from "./style.module.css";
import Buttons from "../../components/utils/Buttons";
import { useData } from "../../contexts";
import { updateGallery } from "../../services/GallerysServ";
import { useDispatch, useSelector } from "react-redux";
import { updateSelectedArt } from "../../app/slicers/selectedArt";
import { useFetcher } from "react-router-dom";
function Settings() {
  // const seleted = art.forEach((element) => {
  //   return element.seleted ? element : { name: "art2", seleted: true };
  // });
  // useEffect(() => {
  //   console.log(seleted);
  // }, [seleted]);
  const DataContext = useData();
  const context = useContext(DataContext);
  const dispacher = useDispatch();
  const selectedArt = useSelector((state) => state.selectedArt.value);
  const [createdArt, setCreatedArt] = useState({
    img: "file",
    name: "art name",
    description: "description about your art",
    price: 0,
  });
  const artCreateForm = new FormData();
  // const form=useFetcher({

  // })
  useEffect(() => {
    // !selectedArt ? setClear(null) : setClear(false);
    // console.log(clear);
  }, [selectedArt]);
  // selectedArt = selectedArt ? selectedArt : {};
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
  const styles = { color: "white" };
  return (
    <div className={style.setCon}>
      <details>
        <summary>Gallery Settings</summary>
        <div className={style.formItem}>
          <lable>Name</lable>
          <input
            className={style.Inputs}
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
        <div className={style.formItem} style={styles}>
          <lable>Description</lable>
          <textarea
            className={style.Inputs}
            name="description"
            placeholder="description"

            // onChange={(e) => {
            //   console.log(e.target.value);
            //   context.setGallery({
            //     ...context.gallery,
            //     name: e.target.value.trim(),
            //   });
            // }}
          />
        </div>
        <div className={style.formItem}>
          <lable>Wall Texture</lable>
          <input
            className={style.Inputs}
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
        <div className={style.formItem}>
          <lable>Floor Texture</lable>
          <input
            className={style.Inputs}
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
        <div className={style.formItem}>
          <lable>Celling Texture</lable>
          <input
            className={style.Inputs}
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
        <div className={style.formItem}>
          <lable>Scale</lable>
          <div className={style.Inputs3D}>
            <span>
              X
              <input
                className={style.Inputs}
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
              Y <input className={style.Inputs} type="number" max={Math.PI * 2} min={0} />
            </span> */}
            <span>
              Z{" "}
              <input
                className={style.Inputs}
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
        <div className={style.formItem}>
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
        <div className={style.formItem}>
          <lable>Art </lable>
          <input className={style.Inputs} onChange={(e) => {}} type="file" />
        </div>
        <div className={style.formItem}>
          <label>Name</label>
          <input
            className={style.Inputs}
            value={selectedArt?.name}
            style={style.input}
            onChange={(e) => {
              console.log(selectedArt);
              dispacher(updateSelectedArt({ name: e.target.value }));
            }}
            type="text"
          />
        </div>
        <div className={style.formItem}>
          <label>Description</label>
          <input
            maxLength={100}
            className={style.Inputs}
            value={selectedArt?.description}
            onChange={(e) => {
              dispacher(updateSelectedArt({ description: e.target.value }));
            }}
            type="text"
          />
        </div>
        <div className={style.formItem}>
          <label>Price</label>
          <input
            className={style.Inputs}
            value={selectedArt?.price}
            onChange={(e) =>
              dispacher(updateSelectedArt({ price: e.target.value }))
            }
            type="number"
          />
        </div>
        <div className={style.formItem}>
          <lable>Position</lable>
          <div className={style.Inputs3D}>
            <span>
              X{" "}
              <input
                className={style.Inputs}
                type="number"
                max={Math.PI * 2}
                min={0}
                onChange={(e) =>
                  dispacher(
                    updateSelectedArt({
                      position: { ...selectedArt.position, x: e.target.value },
                    })
                  )
                }
              />
            </span>

            <span>
              Y{" "}
              <input
                className={style.Inputs}
                type="number"
                max={Math.PI * 2}
                min={0}
                onChange={(e) =>
                  dispacher(
                    updateSelectedArt({
                      position: { ...selectedArt.position, y: e.target.value },
                    })
                  )
                }
              />
            </span>
            <span>
              Z{" "}
              <input
                className={style.Inputs}
                type="number"
                max={Math.PI * 2}
                min={0}
                onChange={(e) =>
                  dispacher(
                    updateSelectedArt({
                      position: { ...selectedArt.position, z: e.target.value },
                    })
                  )
                }
              />
            </span>
          </div>
        </div>
        <div className={style.formItem}>
          <lable>Rotation</lable>
          <div className={style.Inputs3D}>
            <span>
              X{" "}
              <input
                className={style.Inputs}
                type="number"
                max={Math.PI * 2}
                min={0}
                onChange={(e) =>
                  dispacher(updateSelectedArt({ rotation: [e.target.value] }))
                }
              />
            </span>

            <span>
              Y{" "}
              <input
                className={style.Inputs}
                type="number"
                max={Math.PI * 2}
                min={0}
              />
            </span>
            <span>
              Z{" "}
              <input
                className={style.Inputs}
                type="number"
                max={Math.PI * 2}
                min={0}
              />
            </span>
          </div>
        </div>
        <div className={style.formItem}>
          {selectedArt ? (
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
