'use client'

import { useLayoutEffect } from "react";
import { useRouter } from 'next/navigation'
import { useSelector } from "react-redux";
import { RootState } from "@/store";

export default function Layout({ children }: {
  children: React.ReactNode;
}) {
  const router = useRouter();

  const isAutorize: boolean = useSelector((store: RootState) => store.profile.isAutorize)

  useLayoutEffect(() => {
    if (!isAutorize) {
      router.push('/login')
    }
  }, [])

  return (
    <>
      <main>
        {isAutorize
          ? children
          : <div>Загрузка...</div>
        }
        </main>
    </>
  )
}