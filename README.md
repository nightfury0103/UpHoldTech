# UpHold Bot

## About App

An applicaton used to create bot that is able to alert you about price oscillations on a given currency pair.

## Technologies

Use React.js for Frontend, Node/Express for Backend and PostgreSQL for Database

## Installation

### Prerequisites

Node version 16.14.2

### Database

Download Postgresql Installer from (https://www.enterprisedb.com/downloads/postgres-postgresql-downloads)

After installation

1 Create Postgresql connection using Navicat Premium or other tools

- Set initial database to postgres
- Set username to postgres
- Set password to postgres

2 Execute SQL file to create table

- Run _Execute SQL File_ command
- Select _database.sql_ file from backend repository

### Frontend

Clone down this repository. You will need `node` and `npm` installed globally on your machine.

Installation:

`npm install`

To Run Test Suite:

`npm test`

To Start App:

`npm start`

To Visit App:

`localhost:3000`

### Backend

Clone down this repository. You will need `node` and `npm` installed globally on your machine.

Installation:

`npm install`

To Start Server:

`npm start`

## Reflection

This is a project to alert price oscillation of a given currency pair automatically using Uphold API from (https://uphold.com/en/developer/api/documentation/#get-tickers-for-currency-pair)

One of the main challenges I ran into was get data from Uphold Platform. I used proxy server to avoid cors error.

At the end of the day, the technologies implemented in this project are React, React Bootstrap, Node, Express.

## Guide for Usage

Select currency pair from select boxes

Input fetch interval and minimum oscillation percentage

If you select or input, the application automatically get changed values and performs action using them
