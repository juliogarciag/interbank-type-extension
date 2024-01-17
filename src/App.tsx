import { FormEvent, useRef } from "react";
import "./App.css";

function App() {
  const passwordRef = useRef<HTMLInputElement>(null);

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const password = passwordRef.current!.value.trim();
    if (password !== "") {
      const [tab] = await chrome.tabs.query({
        active: true,
        currentWindow: true,
      });
      if (tab.id) {
        chrome.tabs.sendMessage(tab.id, {
          message: "typeInKeyboard",
          password,
        });
        window.close();
      }
    }
  };

  return (
    <div className="card">
      <form onSubmit={handleSubmit}>
        <input
          type="password"
          ref={passwordRef}
          className="password"
          autoFocus
        />
        <button type="submit" className="button">
          Enter
        </button>
      </form>
    </div>
  );
}

export default App;
