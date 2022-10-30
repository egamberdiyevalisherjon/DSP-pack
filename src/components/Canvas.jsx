import { useRef, useEffect } from "react";
const Canvas = (props) => {
  const canvasRef = useRef(null);
  const { piece, field } = props;

  useEffect(() => {
    const canvas = canvasRef.current;
    const context = canvas.getContext("2d");
    const r = 1;

    const cw = field.w;
    const ch = field.h;

    canvas.width = cw * 2;
    canvas.height = ch * 2;
    canvas.style.width = cw + "px";
    canvas.style.height = ch + "px";
    canvas.style.backgroundColor = "grey";
    context.scale(2, 2);

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

  return <canvas ref={canvasRef} {...props} />;
};

export default Canvas;
