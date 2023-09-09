"use client";

import { useRouter } from "next/navigation";
import { useDispatch } from "react-redux";
import { useForm } from "react-hook-form";
import Link from "next/link";
import { toast } from "react-toastify";
import classNames from "classnames";

import { setToken } from "@/store/profileSlice";
import { useLoginMutation } from "@/api/loginApi";
import { ILoginResponse } from "@/interfaces/common";

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
    formState: { errors },
  } = useForm({
    shouldFocusError: false,
  });
  const dispatch = useDispatch();
  const router = useRouter();

  const [loginApi] = useLoginMutation();

  const onSubmit = (data: IData) => {
    loginApi({
      login: data.login,
      password: data.password,
    })
      .unwrap()
      .then((response: ILoginResponse) => {
        if (response.access_token) {
          dispatch(setToken(response));
          router.replace("/profile");
          toast.success("Вы успешно вошли", {
            position: toast.POSITION.TOP_RIGHT,
          });
        }
      })
      .catch(() => {
        toast.error("Неверный логин или пароль", {
          position: toast.POSITION.TOP_RIGHT,
        });
      });
  };

  return (
    <>
      <form
        className="w-full max-w-screen-sm self-center rounded-xl border-slate-400 border-2 bg-white flex flex-col justify-center align-center p-8 gap-6"
        onSubmit={handleSubmit(onSubmit as any)}
      >
        <h2 className="flex text-lg justify-center">Войти</h2>
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
          Нет аккаунта?
          <Link className="underline text-blue-500" href="/register">
            Создать
          </Link>
        </span>
      </form>
    </>
  );
}
