'use server'

import { signIn, signOut } from "@/lib/auth"
import { revalidatePath } from "next/cache";

export async function googleSignInAction(){
    await signIn("google", {redirectTo: "/"});
}

export async function userSignOutAction(){
    await signOut({redirectTo: "/"});
}
