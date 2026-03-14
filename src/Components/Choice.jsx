import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import classNames from 'classnames';
import { getMovieImage, getPersonImage } from "../requests";
import { CATEGORIES } from "../consts";

export const Choice = ({ category, option }) => {
  const [imgUrl, setImgUrl] = useState("");
  const selections = useSelector((state) => state.selections);
  
  const selectedValue = selections[category];
  const isChoiceSlected = selectedValue === option.name || selectedValue === `${option.name} for ${option.detail}`;
  if(selectedValue) {
    console.log("selectedValue", selectedValue, "option.name", option.name );
  }
  useEffect(() => {
    const getImageWrapper = async () => {
      const isActor =
        category === CATEGORIES.BEST_ACTOR ||
        category === CATEGORIES.BEST_ACTRESS ||
        category === CATEGORIES.BEST_SUPPORTING_ACTOR ||
        category === CATEGORIES.BEST_SUPPORTING_ACTRESS;

      let detail = option.detail;
      if (category == CATEGORIES.BEST_ORIGINAL_SONG) {
        const clean = detail.replace(/\u00A0/g, " ");

        const idx = clean.indexOf("from ");
        if (idx !== -1) {
          detail = clean.substring(idx + 5);
        }
      }

      if (isActor) {
        const imgUrlStr = await getPersonImage(option.name);
        setImgUrl(imgUrlStr);
      } else {
        const imgUrlStr = await getMovieImage(detail);
        setImgUrl(imgUrlStr);
      }
    };
    getImageWrapper();
  }, []);

  const optionName = `${option.name}${option.detail ? ` for ${option.detail}` : ""}`;
  if (imgUrl) {
    return (
      <div className={"hover-container"}>
        <img src={imgUrl} alt={optionName} className={classNames("choice-image", "hide-on-hover")} />
        
        <div className={classNames("empty-choice", !isChoiceSlected && "show-on-hover")}>{optionName}</div>
      </div>
    );
  }
  return <div className={"empty-choice"}>{optionName}</div>;
};
