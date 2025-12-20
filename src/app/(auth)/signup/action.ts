"use server";

import { SignupFormValues } from "./schema";

export async function registerUser(data: SignupFormValues) {
  try {
    return "User registered successfully";
  } catch (error) {
    console.log(error);
  }
}
