import { Authenticator } from "remix-auth";
import { sessionStorage } from "./session.server";
import type { User } from "../models/user";

export let authenticator = new Authenticator<User>(sessionStorage);
