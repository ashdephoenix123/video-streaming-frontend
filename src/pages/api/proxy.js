import { constants } from "../../../constants"; // Adjust path as needed
import { getCookie } from "cookies-next/server";

/**
 * This is a catch-all proxy route.
 * A request to /api/proxy/videos/liked will be caught by this file.
 * req.query.slug will be ['videos', 'liked']
 */
export default async function handler(req, res) {
  try {
    // 1. Get the token from the HttpOnly cookie
    const token = await getCookie("token", { req, res });

    if (!token) {
      return res.status(401).json({ message: "Unauthorized: No token" });
    }

    // 2. Rebuild the real backend URL
    // req.query.slug is an array, e.g., ['videos', 'liked']
    // .join('/') turns it into "videos/liked"
    const path = req.query.slug.join("/");
    console.log(path);
    const backendUrl = `${constants.apiURL}/${path}`;

    // 3. Forward the request to the real backend
    const backendResponse = await fetch(backendUrl, {
      method: req.method, // Forward the method (GET, POST, PUT, etc.)
      headers: {
        "Content-Type": "application/json",
        // 4. IMPORTANT: Add the token as an Authorization header
        Authorization: `Bearer ${token}`,
      },
      // 5. Forward the body if it exists (for POST, PUT requests)
      body:
        req.method === "GET" || req.method === "HEAD"
          ? undefined
          : JSON.stringify(req.body),
    });

    // 6. Handle the response from the real backend
    if (!backendResponse.ok) {
      // Forward the error from the backend to the client
      const errorData = await backendResponse.json();
      return res.status(backendResponse.status).json(errorData);
    }

    // Handle "No Content" responses (e.g., for a 204 from a DELETE)
    if (backendResponse.status === 204) {
      return res.status(204).end();
    }

    // 7. Forward the successful JSON data from the backend to the client
    const data = await backendResponse.json();
    res.status(200).json(data);
  } catch (error) {
    console.error("API Proxy Error:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
}
