# npm and Node style guide

## Rationale

npm and Node belong together in this guide. npm manages packages and scripts, but those packages run on Node. A repository that documents one without the other leaves too much room for accidental version drift.

Use this directory for JavaScript and TypeScript repositories that use npm as their package manager. If a project uses pnpm or Yarn, keep the Node rules and replace the npm-specific rules with the package manager's own guide.

## Rules

Commit `package.json`.

Commit `package-lock.json` for applications, CLIs, websites, and internal tools.

Use `npm ci` in CI. Use `npm install` when intentionally updating dependencies.

Declare supported runtime versions with `engines`.

Use `devEngines` when contributors need a stricter local toolchain check.

Keep scripts predictable:

```json
{
  "scripts": {
    "build": "node ./scripts/build.mjs",
    "check": "npm run lint && npm run test",
    "format": "prettier --write .",
    "lint": "eslint .",
    "test": "node --test"
  }
}
```

Prefer `npm run check` as the command CI and humans can both remember.

Use ESM for new Node projects unless a dependency or runtime constraint requires CommonJS.

Use `camelCase` for local variables and object properties.

Use `PascalCase` for classes and types.

Use `UPPER_SNAKE_CASE` for environment variables.

Keep generated files out of source control unless they are required for publishing or deployment.

## Tooling

Use EditorConfig for shared whitespace rules.

Use Prettier for formatting JavaScript, TypeScript, JSON, YAML, Markdown, and CSS.

Use ESLint for code quality and likely defects.

Use npm's built-in `npm audit` as a signal, not as an automatic panic button. Review severity, exploitability, and deployment context.

## Files

- `.npmrc`: npm defaults for reproducible installs.
- `.prettierrc.json`: formatting defaults.
- `eslint.config.mjs`: flat ESLint starter configuration.
- `package.example.json`: recommended script and engine shape.

## Local checks

```sh
npm ci
npm run check
npm audit
```
