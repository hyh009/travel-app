import React from "react";
import defaultImg from "../imgs/Notfound.svg";
import Rating from "@mui/material/Rating";
import { TouchApp } from "@mui/icons-material";
import { styled } from "@mui/material/styles";
const StyledRating = styled(Rating)({
  color: "#ddc123",
  width: "100%",
});

const Marker = ({ place }) => {
  return (
    <div className="smallCard">
      <span className="smallTitle">{place?.name}</span>
      <div className="imgContainer">
        <img
          className="smallImg"
          alt={place.name}
          src={place.photo?.images.large.url || defaultImg}
        />
        <div className="circle">
          <TouchApp />
          點此
        </div>
      </div>
      {place?.rating?.length > 0 ? (
        <div className="ratingContainer">
          <StyledRating
            size="small"
            value={Number(place.rating)}
            precision={0.1}
            readOnly
          />
        </div>
      ) : (
        <span>目前沒有評論</span>
      )}
    </div>
  );
};

export default Marker;
