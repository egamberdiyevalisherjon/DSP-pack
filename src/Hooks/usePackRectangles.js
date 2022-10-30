import { useEffect, useState } from "react";
import { packer } from "./pack";

function pack({ w, h, rects }) {
  const result = packer({
    binHeight: w,
    binWidth: h,
    items: rects.filter(
      (rect) => rect.width && rect.height && rect.width <= w && rect.height <= h
    ),
  });

  return result;
}

const usePackRectangles = (rects, field = { w: 600, h: 600 }) => {
  const [pieces, setPieces] = useState([]);
  useEffect(
    () => setPieces(pack({ w: field.w, h: field.h, rects })),
    [rects, field]
  );

  return pieces;
};

export default usePackRectangles;
