"use server";

import { serverFetch } from "@/shared/api/server";
import {
  CreateUserFormValues,
  UpdateUserFormValues,
} from "../schema/userSchema";

interface User {
  name: string;
  email: string;
  password: string;
  passwordConfirm: string;
}
interface UpdatedUser {
  name: string;
  email: string;
  isActive: boolean;
}

export async function createUserAction(data: CreateUserFormValues) {
  try {
    const res = await serverFetch({
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

export async function updateUserAction(id: string, data: UpdateUserFormValues) {
  try {
    const res = await serverFetch<UpdatedUser>({
      url: `admin/users/${id}`,
      method: "PATCH",
      body: data,
    });

    return res;
  } catch (error) {
    console.log(error);

    return {
      success: false as const,
      error: "حدث خطأ غير متوقع أثناء تحديث بيانات المستخدم",
    };
  }
}
