"use client";

import Link from "next/link";
import { slide as Menu } from "react-burger-menu";
import { useSelector } from "react-redux";

import { IRootStore } from "@/store";
import { useEffect, useState } from "react";

const BurgerMenu = () => {
  const [isOpen, setOpen] = useState<boolean>(false);

  const isAuthorized: boolean = useSelector(
    (store: IRootStore) => store.profile.isAuthorized,
  );

  useEffect(() => {
    const htmlElement = document.getElementsByTagName("html").item(0);
    if (isOpen) {
      htmlElement?.classList.add("overflow-hidden");
    } else {
      htmlElement?.classList.remove("overflow-hidden");
    }
  }, [isOpen]);

  return isAuthorized ? (
    <div className="block sm:hidden">
      <Menu
        right={true}
        isOpen={isOpen}
        onOpen={() => {
          setOpen(true);
        }}
        onClose={() => {
          setOpen(false);
        }}
      >
        <Link
          onClick={() => {
            setOpen(false);
          }}
          className="menu-item hover:underline"
          href="/profile"
        >
          Профиль
        </Link>
        <Link
          onClick={() => {
            setOpen(false);
          }}
          className="menu-item  hover:underline"
          href="/profile/timetable"
        >
          Выбрать время
        </Link>
      </Menu>
    </div>
  ) : null;
};

export default BurgerMenu;
