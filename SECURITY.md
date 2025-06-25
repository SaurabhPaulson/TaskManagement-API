# Security & Secret Management Guide

## 1. Environment Variables

- **All secrets (DB credentials, API keys, JWT secrets, etc.) must be stored in a `.env` file.**
- Example `.env`:
  ```
  DB_USER=your_db_user
  DB_PASSWORD=your_db_password
  DB_HOST=localhost
  DB_PORT=5432
  DB_NAME=your_db_name
  JWT_SECRET=your_jwt_secret
  OPENAI_API_KEY=your_openai_key
  ```
- Never hardcode secrets in your codebase.

## 2. .gitignore

- Ensure `.env` and any secret files are listed in `.gitignore`:
  ```
  .env
  *.env
  ```

## 3. Access Control

- Limit access to `.env` files to only trusted team members.
- Use environment-specific `.env` files for development, staging, and production.

## 4. Deployment

- Set environment variables securely in your deployment platform (e.g., Railway, Vercel, Render).
- Never expose secrets in client-side code.

## 5. Rotating Secrets

- Rotate API keys and secrets regularly.
- Remove unused or old secrets from `.env` and deployment environments.

## 6. Auditing

- Periodically audit your codebase and deployment for accidental secret exposure.
- Use tools like [git-secrets](https://github.com/awslabs/git-secrets) or [truffleHog](https://github.com/trufflesecurity/trufflehog) to scan for secrets.

## 7. Reporting

- If you suspect a secret has been leaked, rotate it immediately and investigate the exposure.

---

**Never commit secrets to version control. Always use environment variables for sensitive configuration.**
