# Interbank Type Extension

This is a chrome extension to help type normal text into the Interbank Perú "Banca por Internet" virtual keyboard

## Why?

Interbank Perú, as other banks, use a virtual keyboard, which don't allow users to paste passwords from password managers without the hassle of using a mouse. This, in turn, incentivizes people to use less secure passwords. With this, you can generate a complex password and then type it into it.

## Instalation Instructions

- In this Github page, go to the releases section here and open the latest available release:

<img width="361" alt="Screenshot 2024-01-19 at 16 41 02" src="https://github.com/juliogarciag/interbank-type-extension/assets/362584/9f669c72-36fc-433d-b02b-d4952f1948dc">

- Download the zip file in the release page:

<img width="1254" alt="Screenshot 2024-01-19 at 16 42 51" src="https://github.com/juliogarciag/interbank-type-extension/assets/362584/e364939a-120f-4115-9ba2-5d060b97ac3b">

- Uncompress the downloaded file somewhere in a folder.
- Go to [chrome://extensions](chrome://extensions) and enable `Developer Mode`.

<img width="1920" alt="Screenshot 2024-01-19 at 17 01 11" src="https://github.com/juliogarciag/interbank-type-extension/assets/362584/2e5f0c28-3b9f-4571-aad0-6d9ac6405581">

- In the same page, click on `Load unpacked` and select the folder in which the zip file was downloaded.

## Usage Instructions

- When you're in [https://bancaporinternet.interbank.pe/login](https://bancaporinternet.interbank.pe/login), open the extension using the extension button on chrome (You can pin this extension too).
- You will see this popup window:

<img width="332" alt="Screenshot 2024-01-19 at 17 03 49" src="https://github.com/juliogarciag/interbank-type-extension/assets/362584/9e55c436-18e3-4476-badb-d5d36a4fcafe">

- Type your password (or copy it from your password manager) and press `Enter`. The extension will start typing the password in the virtual password.

## Disclaimer

This extension doesn't send your password to the internet, or store your password locally or remotely. It's basically a script to automate typing into the Interbank virtual keyboard wrapped in a chrome extension for ease of use.
