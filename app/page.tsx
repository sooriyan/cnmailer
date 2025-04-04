"use client";
import { useState } from "react";

export default function EmailSender() {
  const [email, setEmail] = useState("");
  const [consignment, setConsignment] = useState("");
  const [trackingUrl, setTrackingUrl] = useState(
    "https://www.dtdc.in/trace.asp"
  );
  const [message, setMessage] = useState("");

  const sendEmail = async (type: "confirmation" | "dispatch") => {
    setMessage("");
    const payload: {
      type: "confirmation" | "dispatch";
      email: string;
      consignment?: string;
      trackingUrl?: string;
    } = {
      type,
      email,
    };

    if (type === "dispatch") {
      payload.consignment = consignment;
      payload.trackingUrl = trackingUrl;
    }

    const res = await fetch("/api/send-email", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });
    const data = await res.json();
    setMessage(data.message);
  };

  return (
    <div
      style={{
        padding: "20px",
        fontFamily: "Arial",
        maxWidth: "400px",
        margin: "auto",
      }}
    >
      <h2>Send Order Email</h2>
      <input
        type='email'
        placeholder='Customer Email'
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        style={{
          display: "block",
          width: "100%",
          padding: "8px",
          marginBottom: "10px",
        }}
      />
      <button
        onClick={() => sendEmail("confirmation")}
        style={{ width: "100%", padding: "10px", marginBottom: "10px" }}
      >
        Send Order Confirmation
      </button>
      <hr />
      <input
        type='text'
        placeholder='Consignment Number'
        value={consignment}
        onChange={(e) => setConsignment(e.target.value)}
        style={{
          display: "block",
          width: "100%",
          padding: "8px",
          marginBottom: "10px",
        }}
      />
      <input
        type='text'
        placeholder='Tracking URL'
        value={trackingUrl}
        onChange={(e) => setTrackingUrl(e.target.value)}
        style={{
          display: "block",
          width: "100%",
          padding: "8px",
          marginBottom: "10px",
        }}
      />
      <button
        onClick={() => sendEmail("dispatch")}
        style={{ width: "100%", padding: "10px" }}
      >
        Send Order Dispatch
      </button>
      {message && (
        <p style={{ marginTop: "10px", color: "green" }}>{message}</p>
      )}
    </div>
  );
}
