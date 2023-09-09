"use client";

import { useState } from "react";
import { useSelector } from "react-redux";

import { IRootStore } from "@/store";

import UserInfo from "@/components/UserInfo";
import UserInfoEdit from "@/components/UserInfoEdit";

export default function Profile() {
  const [isEdit, setEdit] = useState<boolean>(false);

  const userInfo = useSelector((store: IRootStore) => store.profile.userInfo);

  return (
    <div className="w-full max-w-screen-sm self-center rounded-xl border-slate-400 border-2 bg-white flex flex-col justify-center align-center p-4 gap-6 md:p-8">
      {!isEdit ? (
        <UserInfo userInfo={userInfo} onEditClick={() => setEdit(true)} />
      ) : (
        <UserInfoEdit userInfo={userInfo} onClose={() => setEdit(false)} />
      )}
    </div>
  );
}
