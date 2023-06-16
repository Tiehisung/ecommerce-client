import Header from "./header";

export default function MainLayout({ children }) {
  return (
    <main>
      <header>
        <Header />
      </header>
      <div className=" px-[15px] sm:px-[10vw]">{children}</div>
    </main>
  );
}
