import usePackRectangles from "./Hooks/usePackRectangles";
import { useMemo, useState } from "react";
import Canvas from "./components/Canvas";
// import { packer } from "guillotine-packer/dist/guillotine-packer.es5";

function App() {
  const [field, setField] = useState({ w: 600, h: 600 });
  const [rects, setRects] = useState([{ width: "", height: "" }]);
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
            setRects([...rects, { width: "", height: "" }]);
          }}
        >
          Add
        </button>
        {rects.map((rect, index) => (
          <div key={index}>
            <input
              name="width"
              type="number"
              value={rect.width}
              min={0}
              max={field.w}
              onChange={handleChange(index)}
            />
            <input
              type="number"
              name="height"
              value={rect.height}
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
