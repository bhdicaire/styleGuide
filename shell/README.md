# Bash and zsh style guide

## Rationale

Shell scripts are glue code. They should be small, explicit, and easy to delete when a better tool appears.

Use Bash for scripts that need arrays, strict mode, or predictable behavior across machines. Use zsh for interactive shell configuration and personal functions. Avoid writing portable `sh` unless portability is the actual goal.

## Rules

Start executable Bash scripts with:

```sh
#!/usr/bin/env bash
set -Eeuo pipefail
```

Use zsh only for interactive files such as `.zshrc`, prompt setup, completions, and shell-specific functions.

Use 2 spaces for indentation.

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

Use lowercase function and variable names unless exporting environment variables.

Use `UPPER_SNAKE_CASE` for exported environment variables.

Prefer `local` variables inside functions.

Prefer `case` over long chains of string comparisons.

Do not parse `ls`.

Do not hide errors with `|| true` without a comment explaining why failure is acceptable.

## Tooling

Use `shfmt` to format shell scripts.

Use `shellcheck` to catch quoting, portability, and error-handling mistakes.

Use EditorConfig so editors and shfmt agree on indentation.

## Files

- `.editorconfig`: shell formatting defaults for editors and shfmt.
- `.shellcheckrc`: ShellCheck defaults.

## Local checks

```sh
shfmt -w .
shellcheck scripts/*.sh
zsh -n path/to/file.zsh
bash -n path/to/file.sh
```
