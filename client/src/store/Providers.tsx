"use client";

import { Provider } from "react-redux";

import { store } from ".";

interface IProviderProps {
  children: JSX.Element;
}

export function Providers({ children }: IProviderProps) {
  return <Provider store={store}>{children}</Provider>;
}
