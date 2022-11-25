# Financial App

Financial App is an application that allows users to
search and follow financial instruments, while also
getting current and historical data for them.

At the moment, this application was made to be viewed in mobile
view. It is not meant to be viewed on a desktop screen.

It was created with Next.js and bootsrapped with create-next-app.

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

## Dependencies

    "@tanstack/react-query": "^4.16.1",
    "algoliasearch": "^4.14.2",
    "eslint": "8.27.0",
    "eslint-config-next": "13.0.3",
    "firebase": "^9.14.0",
    "instantsearch.css": "^7.4.5",
    "next": "13.0.3",
    "next-share": "^0.19.0",
    "react": "18.2.0",
    "react-dom": "18.2.0",
    "react-icons": "^4.6.0",
    "react-instantsearch-dom": "^6.38.1",
    "react-loader-spinner": "^5.3.4",
    "recharts": "^2.1.16"

## Dev Dependencies

    "@svgr/webpack": "^6.5.1",
    "autoprefixer": "^10.4.13",
    "css-loader": "^6.7.2",
    "postcss": "^8.4.19",
    "style-loader": "^3.3.1",
    "tailwindcss": "^3.2.4"

## Optimizations

Given more time, I would implement the following optimizations:

- Optimize the UI for desktop view
- Find an API to fetch company logos
- Create a way to share specific financial instrument details through social media, rather than just sharing the application
