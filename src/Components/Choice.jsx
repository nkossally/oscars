import React, { useEffect, useState } from "react";
import classNames from 'classnames';
import { getMovieImage, getPersonImage } from "../requests";
import { CATEGORIES } from "../consts";

export const Choice = ({ category, option }) => {
  const [imgUrl, setImgUrl] = useState("");
  const [isHovered, setIsHovered] = useState(false);

  useEffect(() => {
    const getImageWrapper = async () => {
      const isActor =
        category === CATEGORIES.BEST_ACTOR ||
        category === CATEGORIES.BEST_ACTRESS ||
        category === CATEGORIES.BEST_SUPPORTING_ACTOR ||
        category === CATEGORIES.BEST_SUPPORTING_ACTRESS;
      if (category == "Best Animated Short Film") {
        // console.log(option.detail)
      }
      const originalDetail = option.detail;
      let detail = option.detail;
      if (category == CATEGORIES.BEST_ORIGINAL_SONG) {
        const clean = detail.replace(/\u00A0/g, " ");

        const idx = clean.indexOf("from ");
        if (idx !== -1) {
          detail = clean.substring(idx + 5);
        }
        console.log("detail", idx, originalDetail, detail);
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
        <img src={imgUrl} alt={optionName} className={classNames("choice-image")} />
        
        <div className={classNames("empty-choice", "hidden-content")}>{optionName}</div>
      </div>
    );
  }
  return <div className={"empty-choice"}>{optionName}</div>;
};
