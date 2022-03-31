# Nile Virtual Store

A mock e-commerce platform which allows freelancers to list their various offerings for sale. For example: tutoring, web design, and accessibility improvements.

## Important Links

[Deployed Site via Netlify](https://nile-store.netlify.app)

[Back End Repo](https://github.com/taegorov/virtual-store-backend)

---

## Table of Contents

[Features](#features)

[Getting Started](#getting-started)

[Routes](#routes)

[Technologies](#technologies)

---

## Features

- Create new profiles, as either a Freelancer or a User
  - Both Freelancers and Users are able to view (read/get) all services offered by all Freelancers
  - Freelancers have the ability to create new services, update their existing services, and delete their existing services
- Log in to your account and view your dashboard, which contains all your services
- Rate services 1-5 ⭐️  (only if logged in)
- Filter shown services by category
- Add services to your cart
- View your cart and quickly change quantities
- View details of a service you're interested in

---

## Getting Started

[Back to Top](#nile-virtual-store)

To install Nile locally, follow these steps:

1. Clone the repo from GitHub ([link here](https://github.com/taegorov/virtual-store))

2. Install dependencies in your terminal with `npm i`

3. Start up the server in your terminal with `npm start`

---

## Routes

[Back to Top](#nile-virtual-store)

#### Auth

- POST to /signup
- POST to /signin
- GET to /users

#### Users

- POST to /user (create)
- GET to /user (get all)
- GET to /user/:id (get one)
- PUT to /user/:id (update one)
- DELETE to /user/:id (delete one)

#### Services

- POST to /services (create)
- GET to /services (get all)
- GET to /services/:servicesId (get one)
- PUT to /services/:servicesId (update one)
- DELETE to /services/:servicesId (delete one)

#### Ratings

- PUT to /services/:servicesId/rating (add / update)

---

## Technologies

[Back to Top](#nile-virtual-store)

Here are some of the technologies I used when working on this project:

Front end:

- React
- Redux
- ContextAPI
- MUI (formerly known as Material UI)
- Axios
- Lodash
- React-Hamburger
- React Star Ratings

Back end:

- Bcrypt
- Cors
- Express
- Sequelize
- PostgreSQL

---
