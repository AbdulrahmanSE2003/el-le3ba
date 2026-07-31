"use server";

import { serverFetch } from "@/shared/api/server";
import { CreateUserFormValues } from "../schema/userSchema";

interface User {
  name: string;
  email: string;
  password: string;
  passwordConfirm: string;
}

export async function createUserAction(data: CreateUserFormValues) {
  try {
    // const payload = {
    //   ...data,
    //   role: "student",
    // };
    const res = await serverFetch<User>({
      url: "admin/users",
      method: "POST",
      body: data,
    });

    return res;
  } catch (error) {
    console.log(error);

    return {
      success: false as const,
      error: "حدث خطأ غير متوقع أثناء إضافة المستخدم",
    };
  }
}
