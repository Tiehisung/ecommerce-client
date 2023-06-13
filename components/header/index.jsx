import Logo from "./logo";
import Nav from "./nav";

export default function Header() {
  return (
    <>
      <header className={`flex  px-4 bg-transBlack text-white`}>
        <Logo />
        <Nav />
      </header>
    </>
  );
}
