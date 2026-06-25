import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "./assets/vite.svg";
import heroImg from "./assets/hero.png";
import "./App.css";
import ContactForm from "./components/ContactForm";

function App() {
  const [count, setCount] = useState(0);

  return (
    <>
      <ContactForm />
      <h6>Wahidullah Rahimi</h6>
    </>
  );
}

export default App;
