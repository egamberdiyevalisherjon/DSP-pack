import { useRef, useEffect } from "react";
const Canvas = (props) => {
  const canvasRef = useRef(null);
  const { piece, field } = props;
  let arr = piece.map((r) => ({ w: r.width + r.x, h: r.height - r.y }));

  let w = arr.reduce((p, c) => Math.max(p, c.w), 0);
  let h = arr.reduce((p, c) => Math.max(p, c.h), 0);


  let min = Math.min(field.w, field.h);
  let max = Math.max(field.w, field.h);

  if (w <= min) {
    w = min;
    h = max;
  } else {
    w = max;
    h = min;
  }

  useEffect(() => {
    const canvas = canvasRef.current;
    const context = canvas.getContext("2d");
    const r = 1;

    canvas.width = w * 2;
    canvas.height = h * 2;
    canvas.style.width = w + "px";
    canvas.style.height = h + "px";
    canvas.style.backgroundColor = "grey";
    context.scale(2, 2);

    const text = `${w}`;
    context.beginPath();
    context.font = "20px Arial";
    context.fillStyle = "black";
    context.textAlign = "center";
    context.fillText(text, w / 2, 0);
    context.stroke();

    context.lineWidth = 0.5;

    for (const box of piece) {
      const text = `${box.width}x${box.height}`;
      context.beginPath();
      context.fillStyle = `white`;
      context.rect(box.x * r, box.y * r, box.width * r, box.height * r);
      context.fill();
      context.font = "20px Arial";
      context.fillStyle = "black";
      context.textAlign = "center";
      context.fillText(text, box.x + box.width / 2, box.y + box.height / 2);
      context.stroke();
    }
  }, [piece]);

  return (
    <div className="canvas-wrapper">
      <div className="height-of-canvas">{h}</div>
      <div className="width-of-canvas">{w}</div>
      <canvas ref={canvasRef} {...props} />
    </div>
  );
};

export default Canvas;
