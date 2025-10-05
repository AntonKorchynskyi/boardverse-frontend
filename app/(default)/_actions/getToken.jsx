'use server';

import { cookies } from "next/headers";

export default async function getToken() {
    // retrieve the token from cookies
    const cookieStore = await cookies();
    const token = cookieStore.get("access_token")?.value;
    console.log('hello');
    
    console.log(token);
    
    return token;  
}