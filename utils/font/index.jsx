export default function ToggleFont({ initialSize, setFont }) {
  return (
    <div className="flex gap-2 text-sm border text-graytext p-1 rounded-t">
      <span className="text-black ">Adjust font |</span>
      <div className="flex gap-1 items-baseline ">
        Font size
        <input
          onChange={(e) => {
            let size = parseInt(e.target.value);
            if (size > 15 && size < 60) {
              console.log(size);
              document.getElementById("font-size-input").style.outline =
                "initial";
              setFont((p) => ({ ...p, size }));
              return;
            }
            document.getElementById("font-size-input").style.outline =
              "solid red 2px";
          }}
          type="number"
          name="fontSize"
          value={initialSize}
          id="font-size-input"
          className="border w-10   focus:outline outline-outlineColor"
        />
      </div>

      <div className=" flex items-center">
        Color
        <input
          type="color"
          name="color"
          id="color-input"
          className="h-6"
          onChange={(e) =>
            setFont((p) => {
              let color = e.target.value;
              console.log(color);
              return { ...p, color };
            })
          }
        />
      </div>
    </div>
  );
}
