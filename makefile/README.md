# Makefile style guide

## Rationale

Makefiles are best when they are small, boring task runners with obvious targets. They should make common project commands discoverable without hiding the real tools.

Make has one non-negotiable style exception: recipe lines start with tabs. This is syntax, not preference.

## Rules

Use `Makefile` with a capital `M`.

Declare phony targets.

Put the default target first.

Use lowercase target names with hyphens:

```make
.PHONY: help lint test

help:
	@awk 'BEGIN {FS = ":.*##"} /^[a-zA-Z0-9_-]+:.*##/ {printf "%-20s %s\n", $$1, $$2}' $(MAKEFILE_LIST)
```

Use 2 spaces in variable continuations and comments.

Use tabs only for recipe lines.

Prefer target names that describe outcomes:

```text
install
lint
format
test
build
clean
release
```

Use `@` only when hiding the command makes output clearer.

Use `$(VARIABLE)` for make variables.

Use `$$VARIABLE` for shell variables inside recipes.

Prefer one shell command per recipe line unless the commands must share state.

When commands must share state, use `.ONESHELL` deliberately and document why.

## Tooling

Use EditorConfig to preserve tabs in recipe lines.

Use `make --warn-undefined-variables` for stricter local checks.

Use `checkmake` when available to catch common Makefile mistakes.

Use `shellcheck` for shell scripts called by Makefile targets. Make is not a shell linter.

## Files

- `.editorconfig`: Makefile indentation rules.
- `checkmake.ini`: starter checkmake configuration.

## Local checks

```sh
make --warn-undefined-variables --dry-run
checkmake Makefile
```
