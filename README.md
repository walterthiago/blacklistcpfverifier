# Blacklist CPF verifier

## Introduction

> It checks and manages if a CPF is blacklisted. Lets you add and remove CPFs from this blacklist.

## Code Samples

> Endpoints:

* ``GET `` - ``http://localhost:3000/health``
-- Suport route to check the number of queries and the uptime process. (Without body)

* ``GET `` - ``http://localhost:3000/query?cpf=CPF_HERE``
-- Route to query a specific CPF and verify if it is blacklisted or not. (Without body)

* ``POST `` - ``http://localhost:3000/cpf``
-- Route to put a CPF in blacklist. Body should be like ``{ "cpf": "MY_CPF_HERE" }``

* ``GET `` - ``http://localhost:3000/cpf``
-- Route to show full blacklist (Without body)

* ``DELETE `` - ``http://localhost:3000/cpf``
-- Route to remove a CPF from blacklist. Body should be like ``{ "cpf": "MY_CPF_HERE" }``

**Warning:** CPF should have the mask '###.###.###-##', any other format will be throw an 400 status code with bad request message about inválid cpf.

## Installation

> To run project, follow the instructions below:

* Install docker and docker compose.
* Run ``$ docker-compose up -d`` to create docker dependencies
* Run ``$ npm install && npm start`` to download node dependencies and run project

> To test project:
* After to follow the installation instructions, run ``$ npm test``
