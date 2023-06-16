import Image from "next/image";

export default function FormBtn({
  primaryText,
  waiting,
  waitingText,
  w,
  h,
  color,
}) {
  return (
    <button
      disabled={waiting}
      style={{
        transition: "all 500ms ease",
        width: w || "100%",
        height: h || "initial",
        color: color || "initial",
      }}
      className={`primary-btn hover:text-white font-bold py-2 px-8 justify-center w-fit rounded disabled:bg-gray-500 disabled:hover:bg-gray-500 disabled:text-inherit disabled:cursor-wait`}
    >
      {waiting ? (
        <span
          className={`flex items-center gap-2 w-fit min-w-max justify-between whitespace-nowrap  overflow-hidden`}
        >
          <Image
            src={"/icons/alert/spinning-knot.svg"}
            height={25}
            width={25}
            alt="knot"
            className=""
          />
          {waitingText}
        </span>
      ) : (
        primaryText
      )}
    </button>
  );
}

export function FormDeleteBtn({
  primaryText,
  waiting,
  waitingText,
  w,
  h,
  color,
  activate,
}) {
  return (
    <button
    type="submit"
      disabled={waiting}
      style={{
        transition: "all 500ms ease",
        width: w || "100%",
        height: h || "initial",
        color: color || "white",
        backgroundColor: "brown",
      }}
      className={` hover:text-white font-bold py-2 px-8 justify-center w-fit rounded disabled:bg-gray-500 disabled:hover:bg-gray-500 disabled:text-inherit disabled:cursor-wait`}
    >
      {waiting ? (
        <span
          className={`flex items-center gap-2 w-fit min-w-max justify-between whitespace-nowrap  overflow-hidden`}
        >
          <Image
            src={"/icons/alert/spinning-knot.svg"}
            height={25}
            width={25}
            alt="knot"
            className={`${activate && waiting ? "block" : "hidden"}`}
          />
          {waitingText}
        </span>
      ) : (
        primaryText
      )}
    </button>
  );
}
