import { serialize } from "cookie";
import { constants } from "../../constants"; // Adjust path as needed

export default async function handler(req, res) {
  // 1. We only accept POST requests for login
  if (req.method !== "POST") {
    res.setHeader("Allow", ["POST"]);
    return res.status(405).end(`Method ${req.method} Not Allowed`);
  }

  const { email, password } = req.body;

  // 2. Call your *real* backend (GCP) from the server
  try {
    const backendResponse = await fetch(`${constants.apiURL}/user/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, password }),
    });

    // 3. Check if the backend login was successful
    if (!backendResponse.ok) {
      // Forward the error from the backend to the frontend
      const errorData = await backendResponse.json();
      return res.status(backendResponse.status).json(errorData);
    }

    // 4. Get the 'Set-Cookie' header from the backend's response
    const rawCookie = backendResponse.headers.get("Set-Cookie");

    if (!rawCookie) {
      // This should not happen if your backend is configured correctly
      return res.status(500).json({ message: "Backend did not send a token." });
    }

    // 5. Parse the cookie to get just the token name and value
    // Example: "token=abc123...; Max-Age=...; HttpOnly" -> ["token", "abc123..."]
    const [cookieName, cookieValue] = rawCookie.split(";")[0].split("=");

    // 6. Create a NEW, FIRST-PARTY cookie and set it on the browser
    const cookie = serialize(cookieName, cookieValue, {
      httpOnly: true, // Prevents client-side JS from accessing it
      secure: process.env.NODE_ENV === "production", // Use HTTPS in production
      sameSite: "lax", // More secure than 'None'. Works for 1st-party.
      maxAge: 60 * 60 * 24 * 7, // 1 week (matches your backend's Max-Age)
      path: "/", // Available on all pages
    });

    res.setHeader("Set-Cookie", cookie);

    // 7. Send the user data (from the backend) back to the frontend
    const userData = await backendResponse.json();
    res.status(200).json(userData);
  } catch (error) {
    console.error("Login Proxy Error:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
}
