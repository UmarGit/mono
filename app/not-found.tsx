import Link from "next/link";

export default function NotFound() {
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
      <h1 style={{ fontSize: "4rem", marginBottom: "1rem", fontWeight: 700 }}>
        404
      </h1>
      <h2 style={{ fontSize: "1.5rem", marginBottom: "1rem", fontWeight: 600 }}>
        Page Not Found
      </h2>
      <p
        style={{
          fontSize: "1rem",
          color: "#666",
          marginBottom: "2rem",
          maxWidth: "500px",
        }}
      >
        The page you are looking for doesn't exist or has been moved.
      </p>
      <Link
        href="/"
        style={{
          padding: "0.75rem 1.5rem",
          fontSize: "1rem",
          fontWeight: 500,
          color: "#fff",
          backgroundColor: "#000",
          border: "none",
          borderRadius: "8px",
          textDecoration: "none",
          display: "inline-block",
          transition: "opacity 0.2s",
        }}
      >
        Go back home
      </Link>
    </div>
  );
}
