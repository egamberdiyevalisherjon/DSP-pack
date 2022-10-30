import { useEffect, useState } from "react";
import pack from "./pack";

const calculate = (rects, field) => {
  let pieces = [];
  let uncoordinatedBoxes = [];

  const test = (boxes, field) => {
    const a = [];
    pack(boxes, field);
    const coordinatedBoxes = boxes.filter((e) => {
      if (!Number.isInteger(e.x) && !Number.isInteger(e.y)) {
        a.push(e);
        return false;
      }

      return true;
    });
    uncoordinatedBoxes = a;
    pieces.push(coordinatedBoxes);

    if (uncoordinatedBoxes.length > 0) {
      test(uncoordinatedBoxes, field);
    }

    return pieces;
  };

  test(
    rects.map((e) => ({ ...e })),
    field
  );

  return pieces;
};

const usePackRectangles = (rects, field = { w: 600, h: 600 }) => {
  const [pieces, setPieces] = useState([]);

  useEffect(() => setPieces(calculate(rects, field)), [rects, field]);

  return pieces;
};

export default usePackRectangles;
