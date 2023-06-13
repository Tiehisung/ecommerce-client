import Link from "next/link";
import styler from "./nav.module.css";

export default function Nav() {
  return (
    <nav className={styler.navMain + ` grow`}>
      <div className={styler.linksDiv+` flex`}>
        <Link className="default-link " href={"/"}>Home</Link>
        <Link className="default-link " href={"/products"}>All Products</Link>
        <Link className="default-link " href={"/categories"}>Categories</Link>
        <Link className="default-link " href={"/account"}>Account</Link>
        <Link className="default-link " href={"/cart"}>Cart(0)</Link>
      </div>
    </nav>
  );
}
