import { useNavigate } from "react-router-dom";
import Buttons from "../utils/Buttons";
import "./style.css";
export function ArtInfo({ info }) {
  const navigator = useNavigate();
  return (
    <>
      {info && (
        <div
          className="art-info card"
          style={{
            position: "absolute",
            width: "max-content",
            bottom: 0,
          }}
        >
          <div className="name card-item">
            <label>Name:</label>
            {info.name}
          </div>
          <div className="discription card-item">
            <label>Discription:</label>
            {info.discription}
          </div>
          <div className="author card-item">
            <label>Author:</label>
            {info.author}
          </div>
          <div className="owner card-item">
            <label>Owner:</label>
            {info.owner}
          </div>
          <div className="price card-item">
            <label>Price:</label>
            {info.price}
          </div>
          <div className="action card-item">
            <Buttons action={() => navigator("/bettings/" + info.name)}>
              Bet
            </Buttons>
          </div>
        </div>
      )}
    </>
  );
}
