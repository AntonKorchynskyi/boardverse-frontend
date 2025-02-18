"use client";

export default function LogoutBtn() {

  async function logout() {
    // Call our API route to log out
    const res = await fetch("/api/auth/logout", { method: "POST" });
    if (res.ok) {

      // use js feature to move user to another page (which also force a full reload of the page)
      window.location.href = "/";

    } else {
      console.error("Logout failed");
    }
  }

  return (
    <button onClick={logout} className="text-white hover:text-gray-300 transition">
      Logout
    </button>
  );
}
