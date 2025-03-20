import React from "react";
import "../App.css";

function NotFound() {
  return (
    <section
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
        textAlign: "center",
        flexDirection: "column",
      }}
    >
      <div>
        <h1 style={{ fontSize: "2rem", fontWeight: "bold" }}>404 - Page Not Found</h1>
        <p style={{ marginTop: "10px" }}>Oops! The page you are looking for does not exist.</p>
        <p>You might have mistyped the URL or the page has been moved.</p>
      </div>
    </section>
  );
}

export default NotFound;
