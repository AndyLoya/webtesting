# Render Deployment

## Before

- Use Node.js 20 or newer.
- Ensure `npm test` passes on `main`.
- Connect Render to `AndyLoya/webtesting` and select the `main` branch.
- Tasks use in-memory storage and reset on redeploy or restart.

## Deploy

Create a Render Web Service with:

- **Build Command:** `npm ci`
- **Start Command:** `npm start`
- **Health Check Path:** `/health`
- **Environment:** Node 20+

## Verify

- Open the live `*.onrender.com` URL.
- Confirm `GET /` and `GET /health` return HTTP 200.
- Test task creation, toggling, and deletion in the UI.
- Review the Render deploy logs.

## Roll back

1. Open the Render service's Events/Deploys history.
2. Select the last known-good deploy.
3. Click **Rollback to this deploy**.
4. Wait for the service to show **Live**.
5. Re-verify `/` and `/health`.

## Record

Log the live URL, deploy timestamp, and rollback verification details in `docs/DEVLOG.md`.
