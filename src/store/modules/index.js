import { app } from "./app";
import { user } from "./user";

export const reducers = {
  app: app.reducer,
  user: user.reducer
};

export const actions = {
  app: app.actions,
  user: user.actions
};

export { app, user };
