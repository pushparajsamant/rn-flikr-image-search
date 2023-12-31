This is a new [**React Native**](https://reactnative.dev) project, bootstrapped using [`@react-native-community/cli`](https://github.com/react-native-community/cli).

# Getting Started

>**Note**: Make sure you have completed the [React Native - Environment Setup](https://reactnative.dev/docs/environment-setup) instructions till "Creating a new application" step, before proceeding.

```bash
Environment on my machine

Make: Apple Macbook Pro
OS: Ventura
Node: v18.16.1
React-Native CLI: 11.3.5
````


## Step 1: Install the packages

First, you will need to install all the dependencies

```bash
# using npm
npm install
```

## Step 2: Reinstall the react-native-config plugin
```bash
# using npm
npm uninstall react-native-config
npm install react-native-config
```
## Step 3: Add the .env file to the root of the Project
```bash
# using npm
touch .env
echo 'APIKEY=<FLIKR_API_KEY>' >> .env
```
## Step 4: Add the pods for iOS
```bash
npx pod-install ios
```
## Step 5: Run the app
```bash
npx react-native run-ios
```

## Congratulations! :tada:

You've successfully run Flikr Search API App. :partying_face:

## Video DEMO
https://www.youtube.com/watch?v=7I6Aad5_d0w
