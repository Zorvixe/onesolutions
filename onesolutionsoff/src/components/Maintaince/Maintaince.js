import { useEffect } from "react";
import { Link } from "react-router-dom";

const Maintenance = () => {

  useEffect(() => {
    document.title = "Maintainance | One Solutions"
  })
  
  return (
    <div
      style={{
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        textAlign: "center",
        padding: "20px",
        backgroundColor: "#f9f9f9",
        position: "relative",
      }}
    >
      {/* Logo */}
      <div
        className="logo"
        style={{
          display: "flex",
          alignItems: "center",
          padding: "10px 20px",
          marginBottom: "30px",
        }}
      >
        <Link to="/">
          <img
            src="/assets/img/onesolutions.png"
            alt="Logo"
            style={{
              height: "60px",
              width: "auto",
              display: "block",
              borderRadius: "7px",
            }}
          />
        </Link>
      </div>

      {/* Maintenance Image */}
      <div style={{ marginBottom: "30px", maxWidth: "400px", width: "100%" }}>
        <img
          src="/assets/img/maintaince.png"
          alt="Maintenance"
          style={{
            width: "100%",
            maxWidth: "400px",
            height: "auto",
          }}
        />
      </div>

      {/* Description */}
      <div style={{ maxWidth: "600px", color: "#333" }}>
        <h2>We'll Be Back Soon!</h2>
        <p>
          Our website is currently undergoing scheduled maintenance. We’re working hard to improve your experience.
          Please check back later. Thank you for your patience!
        </p>
      </div>
    </div>
  );
};

export default Maintenance;
