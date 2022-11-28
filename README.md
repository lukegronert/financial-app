# Financial App

Financial App is an application that allows users to
search and follow financial instruments, while also
getting current and historical data for them.

At the moment, this application was made to be viewed in mobile
view. It is not meant to be viewed on a desktop screen.

It was created with Next.js and bootstrapped with create-next-app.

## Demo

This project is hosted on Vercel.

https://financial-app-etsh.vercel.app/

## Run Locally

Clone the project

```bash
  git clone https://github.com/lukegronert/taiwan-access-labs-exercise.git
```

Go to the project directory

```bash
  cd financial-app
```

Install dependencies

```bash
  npm install
```

Start the dev server

```bash
  npx next dev
```

## Tech Stack

This project was created with React, Nextjs, Firebase, and TailwindCSS.

It uses Firebase for user authentication and the firestore database, Algolia Search for an instant search experience, the AlphaVantage API for current and historical financial data, the Financial Modeling Prep API for the current biggest gainers and losers on the market.

### Next.js

### TailwindCSS

### @tankstack/react-query

## Optimizations

Given more time, I would implement the following optimizations:

- Optimize the UI for desktop view
- Find an API to fetch company logos
- Create a way to share specific financial instrument details through social media, rather than just sharing the application
- Add options for notification bell and hamburger menu on Sign Up/Sign In screen
