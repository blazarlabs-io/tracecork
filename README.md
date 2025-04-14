![Tracecork](./assets/cover.png)

# Tracecork Monorepo

## Table of Contents

- [Overview](#overview)
- [System Architecture](#system-architecture)
- [Project Structure](#project-structure)
  - [Apps](#apps)
  - [Packages](#packages)
- [Getting Started](#getting-started)
  - [Prerequisites](#prerequisites)
  - [Dependencies](#dependencies)
  - [Installation](#installation)
- [Configuration](#configuration)
  - [Environments](#environments)
  - [Environment Variables](#environment-variables)
  - [Admin](#admin)
  - [CMS](#cms)
  - [Web](#web)
  - [Setup Wine Tokenization Service](#setup-wine-tokenization-service)
    - [Pulling the Docker Image](#pulling-the-docker-image)
    - [Running the Docker Container](#running-the-docker-container)
    - [Updating Maestro Token](#updating-maestro-token)
    - [Running the Server](#running-the-server)
    - [Other Methods](#other-methods)
  - [Setup Third Party Clients](#setup-third-party-clients)
- [Licenses](#licenses)

## Overview

This mono-repository includes all apps and packages used within the ecosystem of [Tracecork](https://www.tracecork.com/). All the apps share common dependencies and configuration, allowing you to focus on the specific features of each app, while keeping homogeneity between them as the main component/ui library is used across the whole ecosystem.

## System Architecture

![Tracecorck System Architecture](./assets/systems.png)

## Project Structure

```
📦 tracecorck-turbo
├─ apps
│  ├─ admin
│  ├─ cms
│  ├─ token-update-server
│  └─ web
├─ assets
└─ packages
   ├─ eslint-config
   ├─ typescript-config
   └─ ui
```

## Getting Started

This ecosystem of apps has been developed on Linux POP OS 22.04.

### Prerequisites

- [Node.js](https://nodejs.org/en/download/)
- [pnpm](https://pnpm.io/)

### Dependencies and third party services

- [Next.js](https://nextjs.org/)
- [TypeScript](https://www.typescriptlang.org/)
- [TailwindCSS](https://tailwindcss.com/)
- [Shadcn UI](https://shadcn.com/)
- [Zod](https://zod.dev/)
- [React Hook Form](https://react-hook-form.com/)
- [React Query](https://tanstack.com/query/v4/)
- [firebase](https://firebase.google.com/)
- [firebase-admin](https://firebase.google.com/docs/admin/setup)
- [vercel](https://vercel.com/)
- [sendgrid](https://sendgrid.com/)
- [sanity](https://www.sanity.io/)

### Installation

Clone this repository and run the following command:

```bash
pnpm install
```

## Configuration

### Environments

Tracecork currently works on 3 different environments: **development**, **staging** and **production**. Each one has its own configuration and dependencies.

### Environment Variables

Each app in the /apps folder has its own .env files, one per environment. Any of these apps will need at least two .env files:

      .env.development

      .env.production

Here, the development environmental variables will be used to run the app in development mode (locally) and necessary to run the staging app once deployed to vercel under our "development" github branch.

### Admin

The admin app is the one that will be used by the company's employees to conduct administrative operations on our back end.

To run the admin app locally, run the following command:

```bash
pnpm dev --filter admin
```

### CMS

The CMS app is the one that will be used by the company's employees to manage the content of the website in **20+ languages**.

To run the CMS locally, run the following command:

```bash
pnpm dev --filter cms
```

### Web

The web app is the one that will be used by the company's customers to register their wine collections following EU regulations and generate printable QR codes for their wines.

To run the web locally, run the following command:

```bash
pnpm dev --filter web
```

### Setup Wine Tokenization Service

The wine tokenization service is a separate app, which is used to tokenize wines on the Cardano blockchain. Tracecork interacts with this service through a custom API. Find all the necessary information in the [wine-tokenization-service](https://github.com/mariusgeorgescu/wine-tokenization-service) repository. The endpoints allows tracecork web-app to tokenize wines on the blockchain through a series of fetches using the custom API.

![Wine Tokenization Service](./assets/wine-tokenization-service.png)

For each of our environments, the wine tokenization service is deployed as a docker container on our backend server. Subdomains are assigned to each container to match our own working environments:

- staging.wine-tokenization.tracecork.com
- production.wine-tokenization-service.tracecork.com

#### Pulling the Docker Image

Pull the wine tokenization service as a docker image:

```bash
docker pull mariusgeorgescu/wine-tokenization-service:amd64
```

#### Running the Docker Container

To run the wine tokenization service locally or on a server, run the following command. Keep in mind we are using ubuntu 20.04. hence the amd64 version of the image.

```bash
docker run -it -p 8082:8082 --name wts mariusgeorgescu/wine-tokenization-service:amd64 /bin/bash
```

#### Updating the Maestro Token

Once inside the container's bash shell, install nano:

```bah
apt-get install nano
```

Now edit the maestro token file:

```bash
nano config_atlas.json
```

#### Running the Server

Now lets start the server from within the container. So in the container's bash shell, run the following command:

```bash
server <USERNAME> <PASSWORD>
```

Finally we do `ctrl+p` followed by `ctrl+q` to exit the bash shell. Once out of the bash shell, run the following command to check if the container is running:

```bash
docker ps
```

#### Reconnect to the Container

To reconnect to the container, run the following command:

```bash
docker start -ai <CONTAINER_NAME>
```

#### Other Methods

Run a container for staging:

```bash
docker run -d -p 8082:8082 --name wtsd mariusgeorgescu/wine-tokenization-service:amd64 server <USERNAME> <PASSWORD>
```

Run a second container for production:

```bash
docker run -d -p 8083:8083 --name wtsp mariusgeorgescu/wine-tokenization-service:amd64 server <USERNAME> <PASSWORD>
```

### Setup Third Party Clients

Tracecork uses a few third party services in order to facilitate the enabling and maintenance of certain features. These services are:

- [Sendgrid](https://sendgrid.com/)
- [Sanity](https://www.sanity.io/)
- [Firebase](https://firebase.google.com/)

You will find the client configuration for each of these under the src/lib/ folder within each APP. For example, the firebase client configuration is located in the src/lib/firebase/client.ts file. The environmental variables for each of these services are located in the .env files.

## Licenses

- [APACHE2 License](https://www.apache.org/licenses/LICENSE-2.0)
