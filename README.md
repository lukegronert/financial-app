# Financial App

## This project was optimized for **mobile view**. Please use the mobile view in your browser of choice if you are viewing on a pc.

Financial App is an application that allows users to
search and follow financial instruments, while also
getting current and historical data for them.

It was created with Next.js and bootstrapped with create-next-app.

The document for planning, thinking, and development process can be found here:

https://docs.google.com/document/d/1rt8ATxut-AwjLcS_r02fPHhxFZlao9UcpwF_vh_obGs/edit?usp=sharing

## Demo

This project is hosted on Vercel.

https://financial-app-etsh.vercel.app/

## Run Locally

Clone the project

```bash
  git clone https://github.com/lukegronert/financial-app.git
```

Go to the project directory

```bash
  cd financial-app
```

Install dependencies

```bash
  npm install
```

Now set up the project on firebase. Login on https://firebase.google.com/

Create a new project. Set up Authentication with phone, and if you prefer, create a phone number for testing.

In settings, set up your authorized domain, which can be localhost or a hosted domain.

Next, set up Firestore.

Then, go to project settings. Scroll down to "Your apps" and select web app. Firebase will direct you on how to initialize firebase and will give you the keys for your firebaseConfig. Add these to your .env.

To get API keys for AlphaVantage, Algolia, and Financial Modeling Prep, go to these links.

### AlphaVantage

https://www.alphavantage.co/support/#api-key

### Algolia

https://www.algolia.com/

You will need your Application ID and your Search-only API key.

Sign Up and go to API keys in your project overview.

### Financial Modeling Prep

https://site.financialmodelingprep.com/developer

Put your these keys, along with your firebaseConfig keys in your .env file. Make sure to add .env to your .gitignore file.

My .env file is set up as follow:

```bash
NEXT_PUBLIC_FIREBASE_API_KEY= Your Firebase API Key
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN= Your Firebase Auth Domain
NEXT_PUBLIC_FIREBASE_PROJECT_ID= Your Firebase Project ID
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET= Your Firebase Storage Bucket
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID= Your Firebase Messaging Sender ID
NEXT_PUBLIC_FIREBASE_APP_ID= Your Firebase App ID

NEXT_PUBLIC_ALGOLIA_APP_ID= Your Algolia App ID
NEXT_PUBLIC_ALGOLIA_API_KEY= Your Algolia API Key

NEXT_PUBLIC_ALPHA_VANTAGE_API_KEY= Your Alpha Vantage API Key
NEXT_PUBLIC_FINANCIAL_MODELING_PREP_API_KEY= Your Financial Modeling Prep API Key
```

Start the dev server

```bash
  npx next dev
```

## Tech Stack

This project was created with React, Nextjs, Firebase, and TailwindCSS.

It uses Firebase for user authentication and the firestore database, Algolia Search for an instant search experience, the AlphaVantage API for current and historical financial data, and the Financial Modeling Prep API for the current biggest gainers and losers on the market.

### Next.js

Next.js is a React framework that provides a quick way to start a project, providing routing, configuration, and structure.

### TailwindCSS

TailwindCSS is a CSS framework that provides classes that can be applied directly to elements with additional configuration to customize a variety of features.

### @tankstack/react-query

Tankstack React-Query allows for an easy way to manage server and client state, as well as an easy caching system. Since the AlphaVantage API is used heavily in this project and has an API call limit of 5 calls/minute and 500 calls/day, caching with Tanstack React-Query is a great way to limit the use of API calls.

## Testing

### Cypress

In order to get around the Google reCaptcha verifier for the tests, go to www.cloud.google.com

Navigate to your project. Open the menu and click IAM & Admin, then click Service Accounts. Click the menu under actions on your service account and click Manage Keys. Click Add Key. Download your service account key and place it in a "secrets" directory in the root of the project. Make sure you add /secrets to your .gitignore to protect your information.

Now you are ready to run Cypress tests without having to worry about the reCaptcha.

Start the dev server:

```bash
  npm run dev
```

Use this command to open Cypress:

```bash
  npm run cy:open
```

Select E2E Testing and open in your preferred browser.

Run the e2e test (spec.cy.js)

### Jest

To run Jest tests

```bash
  npm run test
```

## Optimizations

Given more time, I would implement the following optimizations:

- Optimize the UI for desktop view
- Find an API to fetch company logos
- Add options for notification bell and hamburger menu on Sign Up/Sign In screen
- Additional testing
