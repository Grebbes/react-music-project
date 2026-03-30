import { Link } from "react-router";

export default function LandingPage() {
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        height: "100vh",
        gap: "20px",
      }}
    >
      <h1>View our stats</h1>
      <Link to="/overall">
        <button>view</button>
      </Link>
    </div>
  );
}
