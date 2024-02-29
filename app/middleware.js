import Cryptr from "cryptr";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";

export function middleware(request) {
  console.log("🚀 ~ middleware ~ request:", request);

  const user = getUserFromRequest(request);

  if (user === "none") {
    return NextResponse.redirect(new URL("/login", request.url));
  }

  return NextResponse.next();
}

const getUserFromRequest = (request) => {
  // Example: Retrieve user information from cookies or authentication headers.
  // Return "none" if the user is not authenticated or doesn't exist.
  return "none"; // Placeholder, replace with actual logic.
};

// Generates a session data string for a user.
const generateSessionData = (user) => {
  if (!user || !user.id || !user.email) {
    throw new Error("Invalid user data provided.");
  }

  const sessionData = {
    userId: user.id,
    userEmail: user.email,
    timestamp: new Date().toISOString(),
  };

  const sessionDataString = JSON.stringify(sessionData);
  return sessionDataString;
};

// Save session as a cookie.
const saveAsCookie = (user) => {
  const sessionData = generateSessionData(user);
  const cryptr = new Cryptr(process.env.NEXT_PUBLIC_CRYPTR_KEY);
  const encryptedSessionData = cryptr.encrypt(sessionData);

  cookies.set("sessionData", encryptedSessionData, {
    maxAge: 60 * 60 * 24, // 1 day
  });
};
