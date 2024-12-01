import invariant from "tiny-invariant";
import { getCharacterFinder } from "./CharacterFinderMap";
import { times } from "lodash";

chrome.runtime.onMessage.addListener(async (request) => {
  if (request.message === "typeInKeyboard") {
    const password = request.password as string;
    const passwordInput = getPasswordInput();
    passwordInput.focus();

    await waitUntil(() => {
      return getVirtualKeys().length > 0;
    });

    await typePassword(password);
    getSubmitButton().click();
  }
});

type MayusMode = "Mayus" | "Minus";
type CharacterType = "Mayus" | "Minus" | "Number";

export async function typePassword(password: string) {
  let currentMode: MayusMode = "Mayus";

  for await (const character of password) {
    const characterType = getCharacterType(character);

    if (characterType === "Number" || characterType === currentMode) {
      typeVirtualKey(character);
    } else {
      const specialKey = document.querySelector<HTMLElement>(".special-key");
      invariant(specialKey);

      currentMode = characterType;
      await waitForKeyboardChange(() => {
        specialKey.click();
      });
      typeVirtualKey(character);
    }
  }
}

async function waitForKeyboardChange(action: () => void) {
  const oldKeys = getVirtualKeys();
  action();
  await waitUntil(() => {
    const newKeys = getVirtualKeys();
    const maxLength = Math.max(newKeys.length, oldKeys.length);
    const isKeyboardDifferent = times(maxLength).some(
      (index) => oldKeys[index] !== newKeys[index],
    );

    return isKeyboardDifferent;
  });
}

function typeVirtualKey(character: string) {
  const virtualKey = findVirtualKey(character);
  (virtualKey as HTMLElement).click();
}

function findVirtualKey(characterToFind: string) {
  const finder = getCharacterFinder(characterToFind);
  for (const virtualKey of getVirtualKeys()) {
    const found = finder(virtualKey);

    if (found) {
      return virtualKey;
    }
  }
  throw new Error(`No virtual key found with the character ${characterToFind}`);
}

function getVirtualKeys() {
  return [...document.querySelectorAll(".ibk-keyboard-virtual .key > *")];
}

function getPasswordInput() {
  const input = document.querySelector<HTMLInputElement>("#password input");
  invariant(input);
  return input;
}

function getSubmitButton() {
  const submitButton =
    document.querySelector<HTMLButtonElement>(".ibk-form button");
  invariant(submitButton);
  return submitButton;
}

function getCharacterType(character: string): CharacterType {
  if (/\d/.test(character)) {
    return "Number";
  }

  if (character.toUpperCase() === character) {
    return "Mayus";
  }

  return "Minus";
}

function waitUntil(
  condition: () => boolean,
  interval: number = 1000,
  timeout: number = 10000,
): Promise<void> {
  let elapsedTime = 0;

  return new Promise<void>((resolve, reject) => {
    const checkCondition = () => {
      if (condition()) {
        resolve();
      } else {
        elapsedTime += interval;

        if (elapsedTime >= timeout) {
          reject(new Error("Timeout exceeded"));
        } else {
          setTimeout(checkCondition, interval);
        }
      }
    };

    checkCondition();
  });
}
