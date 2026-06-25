import { useState } from "react";

export default function ContactForm() {
  const [form, setForm] = useState({
    email: "",
    phone: "",
    description: "",
  });

  const [status, setStatus] = useState("");
  const [loading, setLoading] = useState(false);

  function handleChange(e) {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setLoading(true);
    setStatus("");

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(form),
      });

      const data = await response.json();

      if (!response.ok) {
        setStatus(data.message || "Failed to send enquiry");
        return;
      }

      setStatus("Enquiry sent successfully!");
      setForm({
        email: "",
        phone: "",
        description: "",
      });
    } catch (error) {
      setStatus("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="email"
        name="email"
        placeholder="Your email"
        value={form.email}
        onChange={handleChange}
        required
      />

      <input
        type="tel"
        name="phone"
        placeholder="Phone number optional"
        value={form.phone}
        onChange={handleChange}
      />

      <textarea
        name="description"
        placeholder="Describe your enquiry"
        value={form.description}
        onChange={handleChange}
        required
      />

      <button type="submit" disabled={loading}>
        {loading ? "Sending..." : "Send enquiry"}
      </button>

      {status && <p>{status}</p>}
    </form>
  );
}
