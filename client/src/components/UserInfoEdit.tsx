"use client";

import { toast } from "react-toastify";
import { useForm } from "react-hook-form";
import classnames from "classnames";

import { IUserInfo } from "@/interfaces/user";
import { useUpdateUserMutation } from "@/api";
import { ILoginResponse } from "@/interfaces/common";
import { useDispatch } from "react-redux";
import { updateProfile } from "@/store/profileSlice";

interface IUserInfoEditProps {
  userInfo: IUserInfo;
  onClose: () => void;
}

interface IData {
  name: string;
  description: string;
}

const UserInfoEdit: React.FC<IUserInfoEditProps> = ({ userInfo, onClose }) => {
  const dispatch = useDispatch();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    shouldFocusError: false,
    defaultValues: {
      name: userInfo.name,
      description: userInfo.description,
    },
  });

  const [updateUser] = useUpdateUserMutation();

  const onSubmit = (data: IData) => {
    updateUser({
      name: data.name,
      description: data.description,
      login: userInfo.login,
    })
      .unwrap()
      .then((response: ILoginResponse) => {
        dispatch(updateProfile(response));
        toast.success("Данные успешно обновлены", {
          position: toast.POSITION.TOP_RIGHT,
        });
        onClose();
      })
      .catch(() => {
        toast.error("Что то пошло не так!", {
          position: toast.POSITION.TOP_RIGHT,
        });
      });
  };

  return (
    <form
      className="flex flex-col gap-6"
      onSubmit={handleSubmit(onSubmit as any)}
    >
      <div className="flex flex-col gap-2">
        <label>Имя</label>
        <input
          className={classnames("p-2 border-2 border-spacing-1 rounded-lg", {
            ["border-red-500"]: errors.name,
          })}
          {...register("name")}
        />
      </div>
      <div className="flex flex-col gap-2">
        <label>Расскажи о себе</label>
        <textarea
          rows={6}
          className={classnames("p-2 border-2 border-spacing-1 rounded-lg", {
            ["border-red-500"]: errors.description,
          })}
          {...register("description")}
        />
      </div>

      <input
        type="submit"
        value="Сохранить"
        className="mt-4 flex w-full justify-center items-center text-white bg-green-600 hover:bg-green-700 rounded-xl border-2 border-green-800 p-2 cursor-pointer"
      />
    </form>
  );
};

export default UserInfoEdit;
