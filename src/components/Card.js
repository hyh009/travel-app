import React from "react";
import "../styles/style.css";
import defaultImg from "../imgs/Notfound.svg";
import {
  LocationOnOutlined,
  PhoneOutlined,
  Star,
  LanguageOutlined,
  EmojiEmotionsOutlined,
} from "@mui/icons-material";

const Card = ({ place, selected, refProps }) => {
  if (selected) {
    refProps?.current?.scrollIntoView({ behavior: "smooth", block: "start" });
  }
  return (
    <div className="cardContainer">
      <img
        className="restaurantImg"
        alt={place.name}
        src={place.photo?.images.large.url || defaultImg}
      />
      <div className="rating">
        <Star />
        {place.rating || "---"}
      </div>
      <div className="details">
        <h3 className="restaurantName">{place.name}</h3>
        <ul className="restaurantStatus">
          {(place?.distance_string || place?.distance) && (
            <li className="specialText">
              距離(
              {place.distance_string ||
                `${Math.floor(place.distance * 100) / 100}公里`}
              )
            </li>
          )}
          {place?.open_now_text && (
            <li className="specialText">{place?.open_now_text}</li>
          )}
        </ul>
        <ul className="restaurantInfo">
          <li className="infoList">
            <span className="subtitle">排名</span>
            {place.ranking || "---"}
          </li>
        </ul>
        <div className="tagContainer">
          {place.cuisine?.map((tag, index) => (
            <div className="tag" key={index}>
              {tag.name}
            </div>
          ))}
        </div>
        <ul className="restaurantInfo">
          {place?.address && (
            <li className="infoList contact">
              <LocationOnOutlined />
              {place.address.split(" ").slice(2).join(" ")}
            </li>
          )}
          {place?.phone && (
            <li className="infoList contact">
              <PhoneOutlined />
              {place.phone || "---"}
            </li>
          )}
        </ul>
      </div>
      <div className="actionContainer">
        {place?.web_url && (
          <button
            className="action"
            onClick={() => window.open(place.web_url, "_blank")}
          >
            <EmojiEmotionsOutlined />
            Trip Advisor
          </button>
        )}
        {place?.website && (
          <button
            className="action"
            onClick={() => window.open(place.website, "_blank")}
          >
            <LanguageOutlined />
            官方網站
          </button>
        )}
      </div>
    </div>
  );
};

export default Card;
