import { serialize } from "cookie";

export default async function handler(req, res) {
  // We only accept POST for logout to prevent accidental logout via links
  if (req.method !== "POST") {
    res.setHeader("Allow", ["POST"]);
    return res.status(405).end(`Method ${req.method} Not Allowed`);
  }

  // Note: If your backend needs to do something on logout (e.g., invalidate
  // the token in a database), you would make a fetch call here first.
  // For this example, we'll just clear the cookie from the browser.

  // 1. Create a cookie that is expired
  const cookie = serialize("token", "", {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    expires: new Date(0), // Set the expiry date to the past
    path: "/",
  });

  // 2. Set the expired cookie to "delete" it from the browser
  res.setHeader("Set-Cookie", cookie);

  // 3. Send a success response
  res.status(200).json({ message: "Logout successful" });
}
