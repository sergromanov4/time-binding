"use client";

import { useRouter } from 'next/navigation'
import { useDispatch } from "react-redux";
import { useForm } from "react-hook-form";
import classNames from "classnames";

import { setAuthorize } from "@/store/dateSlice";

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
    shouldFocusError: false
  });
  const dispatch = useDispatch();
  const router = useRouter();

  const onSubmit = (data: IData) => {
    dispatch(setAuthorize());
    router.push('/timetable')
  };

  return (
    <main className="flex min-h-screen flex-col items-center justify-between py-24 px-6">
      <form
        className=" w-full max-w-screen-sm rounded-xl border-slate-400 border-2 bg-white flex flex-col justify-center align-center p-8 gap-6"
        onSubmit={handleSubmit(onSubmit)}
        
      >
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
      </form>
    </main>
  );
}
