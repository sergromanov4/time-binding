import { isRejectedWithValue } from "@reduxjs/toolkit";
import type { MiddlewareAPI, Middleware } from "@reduxjs/toolkit";

import { resetAuth } from "./profileSlice";

export const authLogger: Middleware =
  (api: MiddlewareAPI) => (next) => (action) => {
    if (isRejectedWithValue(action)) {
      if (action.payload.status === 401) {
        api.dispatch(resetAuth());
      }
    }

    return next(action);
  };
