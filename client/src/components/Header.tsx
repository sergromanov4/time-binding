import Link from "next/link";
import BurgerMenu from "./BurgerMenu";

const Header = () => {
  return (
    <>
      <nav className="w-full py-2 bg-slate-50 border-slate-400 border-b-2">
        <ul className="w-full flex flex-row justify-center gap-4">
          <li>
            <Link href="/">Главная</Link>
          </li>
          <li>
            <Link href="/profile">Войти</Link>
          </li>
        </ul>
      </nav>

      <BurgerMenu />
    </>
  );
};

export default Header;
