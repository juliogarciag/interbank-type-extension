import { FormEvent, useRef, useState } from "react";
import { EyeIcon, EyeSlashIcon } from "@heroicons/react/24/outline";

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

  const [showPassword, setShowPassword] = useState(false);

  return (
    <div className="flex flex-row p-4 w-[256px]">
      <form onSubmit={handleSubmit} className="w-full">
        <div className="w-full relative">
          <input
            type={showPassword ? "text" : "password"}
            ref={passwordRef}
            className="p-1 pr-8 mb-2 w-full"
            autoFocus
          />
          <button
            className="w-4 h-4 absolute top-[5px] right-2.5"
            type="button"
            onClick={() => {
              setShowPassword(!showPassword);

              const input = passwordRef.current;
              if (input) {
                input.focus();

                requestIdleCallback(() => {
                  input.selectionStart = input.value.length;
                  input.selectionEnd = input.value.length;
                });
              }
            }}
          >
            {showPassword ? (
              <EyeSlashIcon className="w-full h-full" />
            ) : (
              <EyeIcon className="w-full h-full" />
            )}
          </button>
        </div>
        <button
          type="submit"
          className="w-full bg-emerald-600 text-white px-1 py-2 font-bold"
        >
          Enter
        </button>
      </form>
    </div>
  );
}

export default App;
