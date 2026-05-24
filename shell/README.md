# Bash and zsh style guide

A deployment script deleted the wrong directory because an empty variable survived long enough to become a path. Shell did not betray anyone. It accepted vague input.

The rule is simple: use [Bash](https://www.gnu.org/software/bash/manual/bash.html) for scripts and [zsh](https://zsh.sourceforge.io/Doc/) for interactive configuration.

Use [ShellCheck](https://www.shellcheck.net/) for the mistakes humans keep making.

## Thesis

Shell code should be small, explicit glue. The moment it owns business logic, it should justify its existence.

## Script baseline

Use this for executable Bash scripts:

```sh
#!/usr/bin/env bash
set -Eeuo pipefail
```

Use zsh for `.zshrc`, prompt setup, completions, and personal interactive functions.

Do not write portable `sh` unless portability is the actual requirement.

## Rules

Use 2 spaces.

Quote variable expansions unless word splitting is intentional:

```sh
printf '%s\n' "$project_name"
```

Use `[[ ... ]]` in Bash and zsh conditionals.

Use arrays instead of building command strings.

Prefer functions for repeated work:

```sh
log_info() {
  printf 'info: %s\n' "$*"
}
```

Use lowercase function and variable names.

Use `UPPER_SNAKE_CASE` for exported environment variables.

Use `local` inside functions.

Prefer `case` over long chains of string comparisons.

Do not parse `ls`.

Do not write `|| true` without explaining why failure is acceptable.

## Enforcement

Last verified: 2026-05-24.

Use [shfmt](https://github.com/mvdan/sh) for formatting.

Use ShellCheck for static analysis.

Use parser checks before execution:

```sh
shfmt -w .
shellcheck scripts/*.sh
zsh -n path/to/file.zsh
bash -n path/to/file.sh
```

## Tradeoff

`set -Eeuo pipefail` is a guardrail, not proof of safety. It can make deliberate non-zero statuses noisy. Handle expected failures explicitly near the command that can fail.

## Closing

Good shell code is unromantic. It moves files, calls programs, checks exits, and leaves before it becomes an application.

## Change log for this rewrite

* Thesis identified: shell should remain small explicit glue.
* Claims dated: tooling commands marked `Last verified: 2026-05-24`.
* Links added: Bash manual, zsh docs, ShellCheck, shfmt.
* Tradeoff surfaced: strict mode has failure modes and needs local exceptions.
* Flagged but unchanged: POSIX `sh` remains excluded unless a project explicitly needs portability.
