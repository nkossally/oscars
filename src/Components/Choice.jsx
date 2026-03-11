import React, { useEffect, useState } from "react";
import ToggleButton from "@mui/material/ToggleButton";
import ToggleButtonGroup from "@mui/material/ToggleButtonGroup";
import { getMovieImage, getPersonImage } from "../requests";
import { CATEGORIES } from "../consts";

export const Choice = ({ category, option }) => {
  const [imgUrl, setImgUrl] = useState("");

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
        console.log("detail",idx, originalDetail, detail);
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
    return <img src={imgUrl} alt={optionName} className={"choice-image"} />;
  }
  return <>pizza</>;
};
