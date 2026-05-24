# npm and Node style guide

A build passed on one laptop and failed in CI because nobody wrote down which Node version the project expected. The package manager was not the problem. The contract was missing.

The rule is simple: document the [Node.js](https://nodejs.org/en) runtime and the [npm](https://docs.npmjs.com/) install behavior together. npm without Node is half a policy.

## Thesis

An npm project is reproducible only when `package.json`, `package-lock.json`, `.npmrc`, and CI agree on the runtime contract.

## Runtime contract

Last verified: 2026-05-24.

Declare supported runtimes in [`engines`](https://docs.npmjs.com/cli/v11/configuring-npm/package-json#engines).

Use [`devEngines`](https://docs.npmjs.com/cli/v11/configuring-npm/package-json#devengines) when contributors need an enforced local toolchain.

Set `engine-strict=true` in `.npmrc` when the project should fail fast on the wrong runtime.

```ini
engine-strict=true
fund=false
save-exact=true
```

## Package rules

Commit `package.json`.

Commit `package-lock.json` for applications, CLIs, websites, and internal tools.

Use `npm ci` in CI.

Use `npm install` only when intentionally updating dependencies.

Use ESM for new Node projects unless a dependency or runtime constraint requires CommonJS.

Keep generated files out of source control unless publishing or deployment requires them.

## Scripts

Use a small script vocabulary:

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

Use `npm run check` as the human and CI entry point.

## Formatting and linting

Use [Prettier](https://prettier.io/docs/options) for formatting.

Use [ESLint flat config](https://eslint.org/docs/latest/use/configure/configuration-files) for JavaScript linting.

Use the built-in [Node test runner](https://nodejs.org/api/test.html) for small projects before adding a heavier framework.

```sh
npm ci
npm run check
npm audit
```

Treat `npm audit` as a signal. Review severity, exploitability, and deployment context before changing dependency trees.

## Tradeoff

`save-exact=true` reduces surprise but increases update maintenance. That is acceptable for applications. Libraries may prefer ranges when they intentionally support a wider dependency surface.

## Closing

The lockfile is not clerical. It is the build receipt.

## Change log for this rewrite

* Thesis identified: reproducibility depends on runtime and install contracts agreeing.
* Claims dated: npm and Node guidance marked `Last verified: 2026-05-24`.
* Links added: Node.js, npm docs, `engines`, `devEngines`, Prettier, ESLint flat config, Node test runner.
* Tradeoff surfaced: exact dependency saves reduce drift but add update work.
* Flagged but unchanged: pnpm and Yarn are out of scope for this npm-specific guide.
