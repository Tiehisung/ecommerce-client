
export default function RefreshSpinner({ message, dispatch }) {
  if (!dispatch) return;
  return (
    <button
      className="h-12 w-12 rounded-full z-50 fixed top-96 left-16"
      style={{
        backgroundImage: "url(/spinners/pink-oval-spin.svg)",
        backgroundPosition: "center",
        backgroundSize: "cover",
        color: message ? "inherit" : "transparent",
      }}
    >
      {message ? message : "Spinner"}
    </button>
  );
}

export function LoadingSpinner({ text, number ,color}) {
  switch (number) {
    case 1:
      return (
        <button
          className="h-32 w-32 rounded-full  relative top-1/2 left-1/3"
          style={{
            backgroundImage: "url(/icons/alert/grey-spinner.svg)",
            backgroundPosition: "center",
            backgroundSize: "cover",
            color: color||  "inherit",
          }}
        >
          {text || ""}
        </button>
      );
    case 2:
      return (
        <button
          className="h-32 w-32 rounded-full  relative top-1/2 left-1/3"
          style={{
            backgroundImage: "url(/icons/alert/ripples.svg)",
            backgroundPosition: "center",
            backgroundSize: "cover",
            color: color||  "inherit",
          }}
        >
          {text || ""}
        </button>
      );
    case 3:
      return (
        <button
          className="h-32 w-32 rounded-full  relative top-1/2 left-1/3"
          style={{
            backgroundImage: "url(/icons/alert/grey-spinner.svg)",
            backgroundPosition: "center",
            backgroundSize: "cover",
            color: color||  "inherit",
          }}
        >
          {text || ""}
        </button>
      );
    case 4:
      return (
        <button
          className="h-28 w-28 rounded-full  relative top-1/2 left-1/3"
          style={{
            backgroundImage: "url(/icons/alert/red-fade-spinner.svg)",
            backgroundPosition: "center",
            backgroundSize: "cover",
            color: color||  "inherit",
          }}
        >
          {text || ""}
        </button>
      );
    default:
      return (
        <button
          className="h-32 w-32 rounded-full  relative top-1/2 left-1/3"
          style={{
            backgroundImage: "url(/icons/alert/pink-spinner.svg)",
            backgroundPosition: "center",
            backgroundSize: "cover",
            color: color||  "inherit",
          }}
        >
          {text || ""}
        </button>
      );
  }
}
