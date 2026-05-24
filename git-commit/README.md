# Git commit style guide

A release went out with the wrong version bump because the commit said `chore:` when the change fixed user-visible behavior. The diff was right. The metadata lied.

The rule is simple: use [Conventional Commits](https://www.conventionalcommits.org/en/v1.0.0/) when commit history drives changelogs, release notes, or [Semantic Versioning](https://semver.org/).

Otherwise, do not pretend the format is free.

## Thesis

A commit message is release metadata. If automation reads it, enforce it.

## Format

```text
<type>[optional scope]: <description>

[optional body]

[optional footer(s)]
```

Use lowercase types.

Keep the first line under 72 characters when practical.

Use imperative mood:

```text
fix(cli): reject empty config path
```

Do not end the subject with a period.

Use a scope only when it narrows the change:

```text
docs(readme): add install notes
ci(release): add release-please workflow
```

Mark incompatible public changes with `!` or `BREAKING CHANGE:`:

```text
feat(api)!: require OAuth tokens
```

## Types

Use `feat` for a user-visible capability.

Use `fix` for corrected user-visible behavior.

Use `docs` for documentation-only changes.

Use `style` for formatting-only changes. Not visual design.

Use `refactor` for behavior-preserving code restructuring.

Use `perf` for behavior-preserving performance work.

Use `test` for test-only changes.

Use `build` for dependencies, packaging, and build-system changes.

Use `ci` for CI and GitHub Actions changes.

Use `chore` for repository maintenance that does not fit a more precise type.

Use `revert` for commits that undo earlier commits.

## Enforcement

Last verified: 2026-05-24.

Use [commitlint](https://commitlint.js.org/reference/configuration.html) to reject malformed messages.

Use [Commitizen](https://github.com/commitizen/cz-cli) when humans need a prompt.

Use local hooks for solo projects. Use CI checks for teams. Local hooks do not protect a repository from a fork, a fresh clone, or a contributor who skipped setup.

```sh
npx commitlint --from origin/main --to HEAD
npx cz
```

## Tradeoff

Conventional Commits add friction. That friction is worth paying when `release-please`, semantic-release, or changelog automation reads the log. It is theatre when nobody consumes the structure.

## Closing

The point is not prettier commit history. The point is a log that can safely decide what ships.

## Change log for this rewrite

* Thesis identified: commit messages are release metadata.
* Claims dated: tool commands marked `Last verified: 2026-05-24`.
* Links added: Conventional Commits, SemVer, commitlint, Commitizen.
* Tradeoff surfaced: the format is overhead when no automation consumes it.
* Flagged but unchanged: exact type list stays conventional, not project-specific.
