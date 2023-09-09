import Link from "next/link";

import { IUserInfo } from "@/interfaces/user";

interface IUserInfoProps {
  userInfo: IUserInfo;
  onEditClick: () => void;
}

const UserInfo: React.FC<IUserInfoProps> = ({ userInfo, onEditClick }) => {
  return (
    <>
      <div className="flex flex-col gap-2 justify-start items-start text-lg border-b-2 border-blue-300 pb-2 sm:flex-row sm:items-center sm:border-b-0">
        <span className="font-bold">Логин:</span>
        <span>{userInfo.login}</span>
      </div>
      <div className="flex flex-col gap-2 justify-start items-start text-lg border-b-2 border-blue-300 pb-2 sm:flex-row sm:items-center sm:border-b-0">
        <span className="font-bold ">Имя:</span>
        <span>{userInfo.name}</span>
      </div>
      <div className="flex flex-col gap-2 justify-start items-start text-lg border-b-2 border-blue-300 pb-2 sm:flex-row sm:items-center sm:border-b-0">
        <span className="font-bold">Обо мне:</span>
        <span>{userInfo.description}</span>
      </div>
      <div className="flex flex-col gap-2 justify-start items-start text-lg border-b-2 border-blue-300 pb-2 sm:flex-row sm:items-center sm:border-b-0">
        <span className="font-bold">Доступное кол-во уроков:</span>
        <span>{userInfo.classCount}</span>
      </div>

      <div className="mt-4 flex flex-1 flex-row gap-4 flex-wrap">
        <button
          onClick={onEditClick}
          className="flex justify-center items-center text-white bg-green-600 hover:bg-green-700 rounded-xl border-2 border-green-800 h-4 p-4 w-full sm:w-fit"
        >
          Редактровать
        </button>

        <Link
          href="/password-change"
          className="flex justify-center items-center text-white bg-blue-600 hover:bg-blue-700 rounded-xl border-2 border-blue-800 h-4 p-4 w-full sm:w-fit"
        >
          Сменить пароль
        </Link>
      </div>
    </>
  );
};

export default UserInfo;
