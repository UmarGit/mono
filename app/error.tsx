"use client";

import { useEffect } from "react";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    // Log the error to an error reporting service
    console.error("Application error:", error);
  }, [error]);

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        minHeight: "100vh",
        padding: "2rem",
        textAlign: "center",
        fontFamily: "var(--font-geist-sans), system-ui, sans-serif",
      }}
    >
      <h1 style={{ fontSize: "2rem", marginBottom: "1rem", fontWeight: 600 }}>
        Something went wrong
      </h1>
      <p
        style={{
          fontSize: "1rem",
          color: "#666",
          marginBottom: "2rem",
          maxWidth: "500px",
        }}
      >
        We apologize for the inconvenience. An unexpected error has occurred.
        Please try again.
      </p>
      <button
        onClick={() => reset()}
        style={{
          padding: "0.75rem 1.5rem",
          fontSize: "1rem",
          fontWeight: 500,
          color: "#fff",
          backgroundColor: "#000",
          border: "none",
          borderRadius: "8px",
          cursor: "pointer",
          transition: "opacity 0.2s",
        }}
        onMouseEnter={(e) => {
          e.currentTarget.style.opacity = "0.8";
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.opacity = "1";
        }}
      >
        Try again
      </button>
    </div>
  );
}
