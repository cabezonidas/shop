[![Storybook](https://cdn.jsdelivr.net/gh/storybookjs/brand@master/badge/badge-storybook.svg)]()
[![Netlify Status](https://api.netlify.com/api/v1/badges/a08e3d72-b18d-4db3-b4c8-791c5389dff0/deploy-status)](https://app.netlify.com/sites/boring-swirles-fe3074/deploys)

# Full stack application

This repository aims to be the basis of a scalable and affordable web project that reduces technical debt as much as possible from its conception and uses best coding practices.

Site https://boring-swirles-fe3074.netlify.com

## General

This is full stack JS web application, built entirely in JavaScript using TypeScript.

Each business module is treated as a JS package, and it uses LernaJs to link the dependecies between each of them.

To support i18n, this app uses i18next both, in the back-end and in the front-end. The idea is that each module knows their translations, and that they are loaded when needed.

## Pre-requisites

NPM packages globally installed

1. [Lerna](https://)
2. [Typescript](https://)
3. [TSLint](https://)
4. [Serverless](https://)
5. [Node](https://)
6. [Nodemon](https://)
7. [Serverless](https://)

## Database

In order to reduce DB dependancy, TypeORM is used to define the schema and operations. This app uses a free tier account from MongoDB Atlas to skip the hazzle of having a DB running locally.

## Backend

Serverless AWS Lambda Function

ExpressJs

Grapqhl

## Frontend

## CD

**Frontend** The master branch is hooked up with Netlify, which on every push, it builds all the packages and deploys the frontend.

**Backend** At the moment is a manual process which executes a `serverless deploy` command present in the _packages.json_ file. The idea is that AWS is hooked up to the master branch as well and performs the deploy command on every push (to be done)

## CI

Tests aren't yet part of the building process (to be done).
