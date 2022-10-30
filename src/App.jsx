import usePackRectangles from "./Hooks/usePackRectangles";
import { useMemo, useState } from "react";
import Canvas from "./components/Canvas";
function App() {
  const [field, setField] = useState({ w: 600, h: 600 });
  const [rects, setRects] = useState([
    { w: 100, h: 100 },
    { w: 200, h: 200 },
    { w: 300, h: 300 },
    { w: 600, h: 600 },
  ]);
  const props = useMemo(() => [rects, field], [rects, field]);
  const pieces = usePackRectangles(...props);

  return (
    <div className="App">
      <div>
        <fieldset>
          <legend>DSP Olchami</legend>
          <input
            type="number"
            value={field.w}
            min={0}
            onChange={(e) => setField({ ...field, w: +e.target.value })}
          />
          <input
            type="number"
            value={field.h}
            min={0}
            onChange={(e) => setField({ ...field, h: +e.target.value })}
          />
        </fieldset>
        <button
          type="button"
          onClick={() => {
            setRects([...rects, { w: "", h: "" }]);
          }}
        >
          Add
        </button>
        {rects.map((rect, index) => (
          <div key={index}>
            <input
              type="number"
              value={rect.w}
              min={0}
              onChange={(e) => {
                let newState = [...rects];
                newState[index].w = +e.target.value;
                setRects(newState);
              }}
            />
            <input
              type="number"
              value={rect.h}
              min={0}
              onChange={(e) => {
                let newState = [...rects];
                newState[index].h = +e.target.value;
                setRects(newState);
              }}
            />
          </div>
        ))}
      </div>
      <div>
        {pieces.map((piece, index) => (
          <Canvas field={field} key={index} piece={piece} />
        ))}
      </div>
    </div>
  );
}

export default App;
