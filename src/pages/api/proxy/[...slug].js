import { constants } from "../../../constants"; // Adjust path as needed
import { getCookie } from "cookies-next/server";

export default async function handler(req, res) {
  try {
    // 1. TRY to get the token. It's okay if it's not there.
    const token = await getCookie("token", { req, res });

    // 2. Rebuild the real backend URL
    const path = req.query.slug.join("/");
    const backendUrl = `${constants.apiURL}/${path}`;
    console.log(1, path);
    console.log(backendUrl);

    // 3. Prepare the headers
    const headers = {
      "Content-Type": "application/json",
    };

    // 4. *** THIS IS THE NEW LOGIC ***
    // If a token exists, add the Authorization header
    if (token) {
      headers["Authorization"] = `Bearer ${token}`;
    }

    // 5. Forward the request to the real backend
    const backendResponse = await fetch(backendUrl, {
      method: req.method,
      headers: headers, // Pass our conditional headers
      body:
        req.method === "GET" || req.method === "HEAD"
          ? undefined
          : JSON.stringify(req.body),
    });

    // --- The rest of the file is the same ---

    // 6. Handle the response from the real backend
    if (!backendResponse.ok) {
      const errorData = await backendResponse.json();
      return res.status(backendResponse.status).json(errorData);
    }

    if (backendResponse.status === 204) {
      return res.status(204).end();
    }

    // 7. Forward the successful JSON data
    const data = await backendResponse.json();
    res.status(200).json(data);
  } catch (error) {
    console.error("API Proxy Error:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
}
