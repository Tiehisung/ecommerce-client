import Link from "next/link";
import Image from "next/image";
import { useEffect, useState } from "react";

export default function SocialMediaLinks() {
  const [slideInTimer, setSlideInTimer] = useState(0);
  useEffect(() => {
    let interval = setInterval(() => {
      setSlideInTimer((p) => p + 1);
    }, 1000);
    return () => clearInterval(interval);
  }, [slideInTimer]);
  return (
    <>
      <main className={``}>
        <h1 className="text-[30px]">Contact</h1>
        <ul className="flex rounded bg-backcolorA w-fit p-4 gap-2 md:grid">
          <li>
            <Link href={"https://facebook.com/gmas-k/"} target="_blank">
              <button>
                <Image
                  src={"/icons/contact/facebook.svg"}
                  width={30}
                  height={30}
                  alt="facebook"
                  priority
                  className="hover:opacity-90 grayscale h-[30px] w-[30px]"
                />
              </button>
            </Link>
          </li>

          <li>
            <Link href={"mailto:gmsak-gm@gmail.com"}>
              <button>
                <Image
                  src={"/icons/contact/email.png"}
                  width={30}
                  height={30}
                  alt="email"
                  priority
                  className="hover:opacity-90 grayscale h-[30px] w-[30px]"
                />
              </button>
            </Link>
          </li>

          <li>
            <Link href={"https://instagram/gmsa-k"} target="_blank">
              <button>
                <Image
                  src={"/icons/contact/instagram.svg"}
                  width={30}
                  height={30}
                  alt="instagram"
                  priority
                  className="hover:opacity-90 grayscale h-[30px] w-[30px]"
                />
              </button>
            </Link>
          </li>

          <li>
            <Link href={"https/whatsapp.web/0230202003"} target="_blank">
              <button>
                <Image
                  src={"/icons/contact/whatsapp.svg"}
                  width={30}
                  height={30}
                  alt="instagram"
                  priority
                  className="hover:opacity-90 grayscale h-[30px] w-[30px]"
                  title="Chat us on 0230202003"
                />
              </button>
            </Link>
          </li>
          <li>
            <Link href={"https://twitter/gmsa-k"} target="_blank">
              <button>
                <Image
                  src={"/icons/contact/twitter.svg"}
                  width={30}
                  height={30}
                  alt="instagram"
                  priority
                  className="hover:opacity-90 grayscale h-[30px] w-[30px]"
                  title=""
                />
              </button>
            </Link>
          </li>
        </ul>
      </main>
    </>
  );
}

export const Notice = ({ setFire, message, delay, backcolor, color }) => {
  //hide notice
  useEffect(() => {
    let noticeEl = document.getElementById("notice-id");
    let timeout = setTimeout(() => {
      noticeEl.style.transform = "translateX(200%)";
      noticeEl.addEventListener("transitionend", () => {
        setFire(false);
      });
    }, delay||3000);
    return () => clearTimeout(timeout);
  }, []);

  return (
    <div>
      <h1
        id="notice-id"
        style={{
          transition: "all 2s ease",
          backgroundColor: backcolor || "initial",
          color: color || "inherit",
        }}
        className="text-[#0fd40f] bg-secondary px-2 rounded uppercase"
      >
        {message}
      </h1>
    </div>
  );
};
