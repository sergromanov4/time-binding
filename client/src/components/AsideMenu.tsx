import Link from "next/link";
import classnames from "classnames";

interface IAsideMenuProps {
  activeRoute: string;
}

const AsideMenu: React.FC<IAsideMenuProps> = ({ activeRoute }) => {
  return (
    <aside className="hidden max-w-sm flex-col rounded-xl border-slate-400 border-2 p-4 max-h-fit sm:flex">
      <Link
        className={classnames("text-lg menu-item hover:underline", {
          ["text-blue-900"]: activeRoute === "/profile",
        })}
        href="/profile"
      >
        Профиль
      </Link>
      <Link
        className={classnames("text-lg menu-item hover:underline", {
          ["text-blue-900"]: activeRoute === "/profile/timetable",
        })}
        href="/profile/timetable"
      >
        Выбрать время
      </Link>
    </aside>
  );
};

export default AsideMenu;
