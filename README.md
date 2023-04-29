# Real estate backend
Backend for real estate application created with Node.js and Express.

## Table of Contents
* [Features](#features)
* [Technologies](#technologies)
* [Setup](#setup)

## Features
* Custom API Gateway
* JWT Authentication
* GraphQL API (listing-service, location-service)

## Technologies
Project is created with:
* Express: 4.18.2
* jsonwebtoken: 9.0.0
* mongodb: 5.3.0
* multer: 1.4.5
* node-postgres: 8.10.0
* bcrypt: 5.1.0
* Apollo Server: 4.7.0

## Setup
The easiest way to run the project locally is to run it with Docker Compose:
```
$ cd real-estate-backend
$ docker-compose up --build
```