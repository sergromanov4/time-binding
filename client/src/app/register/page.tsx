"use client";

import { useRouter } from "next/navigation";
import { useDispatch } from "react-redux";
import { useForm } from "react-hook-form";
import classNames from "classnames";
import Link from "next/link";
import { toast } from "react-toastify";

import { setToken } from "@/store/profileSlice";
import { useRegisterMutation } from "@/api/loginApi";

import type { IError, ILoginResponse } from "@/interfaces/common";

enum FieldType {
  login = "login",
  password = "password",
}

interface IData {
  [FieldType.login]: string;
  [FieldType.password]: string;
}

export default function Login() {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm({
    shouldFocusError: false,
  });
  const dispatch = useDispatch();
  const router = useRouter();

  const [registerApi, { error }] = useRegisterMutation();

  const onSubmit = (data: IData) => {
    registerApi({
      login: data.login,
      password: data.password,
    })
      .unwrap()
      .then((response: ILoginResponse) => {
        if (response.access_token) {
          dispatch(setToken(response));
          router.replace("/profile");
          toast.success("Новый пользователь успешно создан", {
            position: toast.POSITION.TOP_RIGHT,
          });
        }
      })
      .catch((error: IError) => {
        toast.error(error.data.message, {
          position: toast.POSITION.TOP_RIGHT,
        });
      });
  };

  return (
    <>
      <form
        className="w-full max-w-screen-sm rounded-xl self-centerborder-slate-400 border-2 bg-white flex flex-col justify-center align-center p-8 gap-6"
        onSubmit={handleSubmit(onSubmit as any)}
      >
        <h2 className="flex text-lg justify-center">Создай аккаунт</h2>
        <div className="flex flex-col gap-2">
          <label>Логин</label>
          <input
            className={classNames("p-2 border-2 border-spacing-1 rounded-lg", {
              ["border-red-500"]: errors.login,
            })}
            {...register("login", { required: true })}
          />
        </div>

        <div className="flex flex-col gap-2">
          <label>Пароль</label>
          <input
            className={classNames("p-2 border-2 border-spacing-1 rounded-lg", {
              ["border-red-500"]: errors.password,
            })}
            {...register("password", { required: true })}
          />
        </div>

        <input
          type="submit"
          className="p-2 bg-green-300 rounded-xl border-slate-400 border-2 cursor-pointer active:bg-green-500"
        />

        <span className="text-sm flex gap-2 justify-center">
          Уже есть аккаунт?
          <Link className="underline text-blue-500" href="/login">
            Войти
          </Link>
        </span>
      </form>
    </>
  );
}
