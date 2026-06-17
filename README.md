# Goal

This is a demonstration game to find all drone light show combinations, based on pre-determined formations & sounds.

The goal is to prove my ability to create SaaS (Software as a Service), using various frameworks with good practices.

## Product

See [PRODUCT.md](./PRODUCT.md) for the full product documentation: vision, target users, core features, and roadmap.

## AI Workflow

See [AI_WORKFLOW.md](./AI_WORKFLOW.md) for how AI (Claude) is used to support product tasks: spec generation, ticket generation, acceptance test generation, and release notes.

## Testing & Code Quality

[![CI/CD](https://github.com/ostefanini/drawn-lights-game/actions/workflows/ci-cd.yml/badge.svg)](https://github.com/ostefanini/drawn-lights-game/actions)

**api-nestjs** [![coverage](https://raw.githubusercontent.com/ostefanini/drawn-lights-game/badges/apps/api-nestjs/badges/badge-statements.svg)](https://github.com/ostefanini/drawn-lights-game/tree/badges/apps/api-nestjs/badges)  
**api-expressjs** [![coverage](https://raw.githubusercontent.com/ostefanini/drawn-lights-game/badges/apps/api-expressjs/badges/badge-statements.svg)](https://github.com/ostefanini/drawn-lights-game/tree/badges/apps/api-expressjs/badges)

**Translations** [![translations](https://img.shields.io/badge/dynamic/json.svg?style=plastic&color=2096F3&label=locize&query=%24.translatedPercentage&url=https://api.lite.locize.app/badgedata/d4b20cc3-2dfc-4ea8-967b-e02a4810a14d&suffix=%+translated&link=https://www.locize.com)](https://www.locize.com)


## Live demo

The react + nestjs version is deployed at

https://game.drawnlights.show


## Relation to Drawn Lights

Drawn lights was a marketplace for drone light show, an entrepreneurial project that aims to connect clients, designers and drone light show operators.

This demo is inspired from a previous demonstration.

# Technologies & SaaS concepts

## Shared packages

I use shared packages to factorize code between different tech versions, when possible.

### Data Transfer Objects (DTO)

With Zod, in [here](/packages/shared/)

### Database schemas

With Prisma, the ORM (Object Relational Mapping), [here](./packages/prisma/)

## #1st Frontend app, in vanilla React

React + Typescript + Mantine UI + Nginx [here](./apps/web-react/)

## #1st Backend app, in Express.js

Node.js + Express.js + Typescript + lodash + supertest [here](./apps/api-expressjs/)

## #2nd Backend app, in NestJS (deployed)

Node.js + Nest.js + Typescript + lodash [here](./apps/api-nestjs/)

## Infra

CI/CD + Docker files/compose (hardened images)

## Observability

Grafana content stored in the grafana folder.

[Traces](https://jovialbeet1186.grafana.net/dashboard/snapshot/m6kZ8jYVEgvezx3kkc7XHsrbYyWLcAu0) + [Metrics](https://jovialbeet1186.grafana.net/dashboard/snapshot/m6kZ8jYVEgvezx3kkc7XHsrbYyWLcAu0) + [Logs](https://jovialbeet1186.grafana.net/dashboard/snapshot/0omZU56ZidBueIuwUSS0KRxockp1mUDR) + [Alerting working](./grafana/alert-works.png)

(5XX Errors were explicitely done using /error-test endpoint to prove alerting working.)

# Development

## Quick Start

```bash
# Install dependencies
pnpm install

# Start development requirements
pnpm run stack:dev

# Run db migrations
pnpm migrate

# Start any application
pnpm --filter api-nestjs dev
pnpm --filter web-react dev

# Stopping everything
pnpm run stack:dev:down
```

## Testing

### Running Tests Locally

```bash
# Start tests requirements
pnpm stack:tests:e2e

# Run all tests (unit, integrations)
pnpm test

pnpm test:e2e-playwright
pnpm test:e2e-gherkin

# Run tests with coverage
pnpm test:cov:badges  # Generates badges in apps/*/badges/

# Stop test database
pnpm stack:tests:e2e:down
```

### Coverage Badges

Coverage badges are automatically generated and updated by the CI/CD pipeline on each push to `main`. The badges are stored in the repository and reflect real-time coverage metrics.

## Available Scripts

From project root:

```bash
# Database
pnpm migrate              # Run Prisma migrations (dev)
pnpm migrate:deploy       # Apply migrations (prod)
pnpm showDb               # Open Prisma Studio

# Testing
pnpm stack:tests

# Code quality
pnpm lint                 # Lint all apps
pnpm test                 # Run all tests
pnpm typecheck            # Run all typechecks
pnpm fullcheck            # Run code quality + all tests types
```

# Contributors

| Name | Role |
|------|------|
| Karine | Product Manager |

## Feedback

[Share feedback or feature requests](https://app.userjot.com/cmpv6si161nie0ipjv3kgdhvz/d/requests)

See [FEEDBACK.md](./FEEDBACK.md) for the full feedback policy: how to share feedback, what we do with it, and expected response times.

# Hire us

oscar[dot]stefanini1[at]gmail.com (fullstack engineer, product oriented)

karine.majdalani@gmail.com (product manager)