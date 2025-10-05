import { cookies } from "next/headers";

export async function PUT(request) {
  // Retrieve the token from cookies on the server side.
  const token = cookies().get("access_token")?.value;
  if (!token) {
    return new Response("Token not found", { status: 401 });
  }

  // Read the request body (the stats update payload).
  const body = await request.json();

  // Call the external stats API endpoint.
  const res = await fetch(
    "https://boardverse-backend.onrender.com/stats/stats",
    {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}`,
      },
      body: JSON.stringify(body),
      cache: "no-store",
    }
  );

  if (!res.ok) {
    const errorText = await res.text();
    return new Response(errorText, { status: res.status });
  }

  return new Response("Stats updated successfully", { status: 200 });
}
