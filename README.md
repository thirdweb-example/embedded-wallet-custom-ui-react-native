# Embedded Wallets with Custom UI

This repo showcases how you can build your own UI to connect users to [embedded wallets](https://portal.thirdweb.com/embedded-wallet) using email or google sign in React Native.

<img width="358" alt="Screenshot 2023-11-06 at 3 40 02 PM" src="https://github.com/thirdweb-example/embedded-wallet-custom-ui-react-native/assets/121973632/d6fbc5c5-c83a-4b23-a93f-70fa704a1a59">


## Getting Started

Clone this project or create a new project using this template:

```bash
npx thirdweb create --template embedded-wallet-custom-ui-react-native
```

You can start editing the screen by modifying `src/App.tsx`.

On `scr/App.tsx`, you'll find our `ThirdwebProvider` wrapping your app, this is necessary for our [hooks](https://portal.thirdweb.com/react) and
[UI Components](https://portal.thirdweb.com/ui-components) to work.

## Environment Variables

To run this project, you will need to add environment variables. Check the `.env` file for all the environment variables required and add it to `.env.local` file or set them up on your hosting provider.

## Runing the project

Install dependencies

```bash
yarn install
```

Run project

```bash
yarn android
```

or

```bash
cd ios && pod install
cd ../ && yarn ios
```

## Learn More

To learn more about thirdweb and React Native, take a look at the following resources:

- [thirdweb Embedded Wallet Documentation](https://portal.thirdweb.com/embedded-wallet) - learn about our Embedded Wallets.
- [thirdweb ReactNative Documentation](https://docs.thirdweb.com/react-native) - learn about our React Native SDK.
- [thirdweb TypeScript Documentation](https://docs.thirdweb.com/typescript) - learn about our JavaScript/TypeScript SDK.
- [thirdweb Portal](https://docs.thirdweb.com) - check our guides and development resources.
- [Templates](https://thirdweb.com/templates)

You can check out [the thirdweb GitHub organization](https://github.com/thirdweb-dev) - your feedback and contributions are welcome!

## Join our Discord!

For any questions, suggestions, join our discord at [https://discord.gg/thirdweb](https://discord.gg/thirdweb).
