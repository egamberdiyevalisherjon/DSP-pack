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

  const handleChange = (index) => (e) => {
    const name = e.target.name;
    const value = +e.target.value;
    let newState = [...rects];
    newState[index][name] = value >= field[name] ? field[name] : value;
    setRects(newState);
  };

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
              name="w"
              type="number"
              value={rect.w}
              min={0}
              max={field.w}
              onChange={handleChange(index)}
            />
            <input
              type="number"
              name="h"
              value={rect.h}
              min={0}
              max={field.h}
              onChange={handleChange(index)}
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
