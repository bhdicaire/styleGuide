# Git commit style guide

## Rationale

Commit messages are interface text for future maintainers and release automation. They should explain the kind of change before they explain the detail.

Use Conventional Commits because the format is small, readable, and understood by tools such as commitlint, release-please, semantic-release, and changelog generators.

## Rules

Use this shape:

```text
<type>[optional scope]: <description>

[optional body]

[optional footer(s)]
```

Use lowercase types.

Keep the subject line under 72 characters when practical.

Use the imperative mood:

```text
fix(cli): reject empty config path
```

Do not end the subject with a period.

Use a scope when it makes the commit easier to place:

```text
docs(readme): add install notes
ci(release): add release-please workflow
```

Use `!` or a `BREAKING CHANGE:` footer for incompatible public changes:

```text
feat(api)!: require OAuth tokens
```

## Types

Use `feat` for a user-visible capability.

Use `fix` for corrected user-visible behavior.

Use `docs` for documentation-only changes.

Use `style` for formatting-only changes that do not affect behavior.

Use `refactor` for behavior-preserving code restructuring.

Use `perf` for behavior-preserving performance improvements.

Use `test` for test-only changes.

Use `build` for dependencies, packaging, and build-system changes.

Use `ci` for CI and GitHub Actions changes.

Use `chore` for repository maintenance that does not fit a more specific type.

Use `revert` for commits that undo earlier commits.

When in doubt, choose the type that describes the user-visible effect. If there is no user-visible effect, choose the most specific maintenance type.

## Tooling

Use commitlint to enforce the message shape.

Use Commitizen or a similar prompt when writing commits interactively.

Use release-please or semantic-release only after the repository already follows Conventional Commits consistently.

## Files

- `commitlint.config.cjs`: commit message linting rules.
- `commitizen.config.cjs`: interactive commit prompt configuration.

## Local checks

```sh
npx commitlint --from origin/main --to HEAD
npx cz
```
