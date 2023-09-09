"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { usePathname } from "next/navigation"
import { useSelector } from "react-redux";
import { RiseLoader } from "react-spinners";

import { IRootStore } from "@/store";
import AsideMenu from "@/components/AsideMenu";

export default function Layout({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const pathName = usePathname();
  

  const isAuthorized: boolean = useSelector(
    (store: IRootStore) => store.profile.isAuthorized,
  );

  useEffect(() => {
    if (!isAuthorized) {
      router.push("/login");
    }
  }, [isAuthorized]);


  return (
    <>
      {isAuthorized ? (
        <div className="w-full flex flex-1 flex-row gap-10 justify-center">
          <div className="flex flex-col gap-8 flex-1">{children}</div>

          <AsideMenu activeRoute={pathName} />
        </div>
      ) : (
        <RiseLoader className="self-center items-center" color="#86EFAC" />
      )}
    </>
  );
}
