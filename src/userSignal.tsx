import { signal } from "@preact/signals-react";
import IUser from "./types/user.type";
import authService from "./services/auth.service";

export const currentUserSignal = signal<IUser | null>(
  authService.getCurrentUser()
);
