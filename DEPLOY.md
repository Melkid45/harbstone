# Harbstone Docker deployment

The repository contains two applications:

- `harbstone/` - Next.js frontend
- `admin/` - Strapi CMS

Both applications are built and started by `compose.yaml`.

## Required server data

Ask the server administrator for:

1. The frontend domain.
2. The Strapi domain.
3. The managed PostgreSQL host, port, database, username, password, and SSL requirements.
4. The reverse-proxy routing configuration expected for new services.

## Environment

Create the production environment file on the server:

```bash
cp .env.production.example .env.production
chmod 600 .env.production
```

Fill every placeholder before starting the project. Do not commit
`.env.production`.

Generate Strapi secrets with:

```bash
openssl rand -base64 48
```

Generate a separate value for every secret. `APP_KEYS` must contain at least
four comma-separated values.

## Build and start

```bash
docker compose --env-file .env.production build
docker compose --env-file .env.production up -d
docker compose --env-file .env.production ps
```

View logs:

```bash
docker compose --env-file .env.production logs -f --tail=200
```

## Services

The reverse proxy should route:

- the frontend domain to `51.15.99.215:3003`
- `admin.harbstone.digital` to `51.15.99.215:1337`

An nginx configuration template for the current production server is available
at `nginx/harbstone.conf.example`. It must be added to the source repository
that builds `common-infra-nginx`; do not patch the running container because
that change would disappear on its next deployment.

The Compose file publishes Next on host port `3003` and Strapi on host port
`1337`, matching the existing `common-infra-nginx` proxy pattern.

Next.js reaches Strapi over the private Compose network at
`http://strapi:1337`. Public media URLs use the HTTPS CMS domain.

Media uploads are limited to 1 GB per file by default. Override
`UPLOAD_MAX_FILE_SIZE_BYTES` in `.env.production` when a different Strapi
limit is required. The reverse proxy must allow at least the same request
size; the included nginx template uses `client_max_body_size 1G`.

## Persistent data

Uploaded Strapi files are stored in the Docker volume `strapi_public`.
The PostgreSQL database is managed externally.

Back up both:

- the managed PostgreSQL database
- the `strapi_public` Docker volume

## Update

```bash
git pull
docker compose --env-file .env.production build
docker compose --env-file .env.production up -d
docker image prune -f
```

## Stop

```bash
docker compose --env-file .env.production down
```

Do not use `down -v` in production: it deletes the uploads volume.
