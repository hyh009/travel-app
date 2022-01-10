import { CircularProgress } from "@mui/material";
import React, { useState, useEffect, createRef } from "react";
import "../styles/style.css";
import Card from "./Card";
import defaultImg from "../imgs/Notfound.svg";
const List = ({
  places,
  currentChild,
  isloading,
  type,
  setType,
  rating,
  setRating,
}) => {
  const [cardRefs, setCardRefs] = useState([]);
  const [translate, setTranslate] = useState(0);

  useEffect(() => {
    setCardRefs((refs) =>
      Array(places?.length)
        .fill()
        .map((_, i) => refs[i] || createRef())
    );
  }, [places]);
  console.log(translate);

  return (
    <div className="listContainer">
      <h2 className="title">周圍的餐廳、飯店、景點</h2>
      {isloading ? (
        <div className="progressContainer">
          <CircularProgress size="10vmin" />
        </div>
      ) : (
        <>
          <div className="filterContainer">
            <div className="filter">
              <label htmlFor="category" className="filterTitle">
                Type
              </label>
              <select
                name="category"
                id="category"
                value={type}
                className="filterSelect"
                onChange={(e) => setType(() => e.target.value)}
              >
                <option value="restaurants">Restaurants</option>
                <option value="hotels">Hotels</option>
                <option value="attractions">Attractions</option>
              </select>
            </div>
            <div className="filter">
              <label htmlFor="category" className="filterTitle">
                Rating
              </label>
              <select
                name="rating"
                id="rating"
                value={rating}
                className="filterSelect"
                onChange={(e) => setRating(() => e.target.value)}
              >
                <option value="">All</option>
                <option value="3">Above 3.0</option>
                <option value="4">Above 4.0</option>
                <option value="4.5">Above 4.5</option>
              </select>
            </div>
          </div>

          {places?.length > 0 ? (
            <div className="placeContainer">
              {places?.map((place, index) => (
                <div className="cardOutside" ref={cardRefs[index]} key={index}>
                  <Card
                    refProps={cardRefs[index]}
                    place={place}
                    selected={Number(currentChild) === index}
                    isloading={isloading}
                  />
                </div>
              ))}
            </div>
          ) : (
            rating && (
              <div className="listNotFound">
                <span className="notFoundText">沒有資料...</span>
                <img
                  className="notFoundImg"
                  alt="image not found"
                  src={defaultImg}
                />
              </div>
            )
          )}
        </>
      )}
    </div>
  );
};

export default List;
