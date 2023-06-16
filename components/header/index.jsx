import { useState } from "react";
import Logo from "./logo";
import Nav from "./nav";
import { MenuIcon } from "@/utils/icons";

export default function Header() {
  const [showNav, setShowNav] = useState(false);

  return (
    <>
      <header
        className={`flex justify-between fixed top-0 left-0 right-0 py-2 px-4 bg-primaryDark text-white md:flex`}
      >
        <Logo />
        <Nav showNav={showNav} setShowNav={setShowNav} />
        <div
          className={`${
            showNav && "hidden"
          } md:hidden flex items-center cursor-pointer `}
        >
          <button onClick={() => setShowNav(true)}>
            <MenuIcon />
          </button>
        </div>
      </header>
    </>
  );
}
