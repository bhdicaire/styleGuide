# Makefile style guide

A repository had five setup commands in the README and three of them were stale. `make check` would have been harder to forget.

The rule is simple: use [GNU Make](https://www.gnu.org/software/make/manual/make.html) as a thin command index. Do not hide the real build system behind it.

## Thesis

A Makefile should make common commands discoverable, repeatable, and boring.

## Syntax

Make has one ugly fact that matters: recipe lines start with tabs. That is syntax, not preference.[^tabs]

Use `Makefile`.

Put the default target first.

Declare [phony targets](https://www.gnu.org/software/make/manual/html_node/Phony-Targets.html):

```make
.PHONY: help lint test build clean

help:
<TAB>@awk 'BEGIN {FS = ":.*##"} /^[a-zA-Z0-9_-]+:.*##/ {printf "%-20s %s\n", $$1, $$2}' $(MAKEFILE_LIST)

lint: ## Run static checks
<TAB>npm run lint
```

`<TAB>` means a literal tab character in the Makefile.

Use lowercase target names with hyphens.

Use `$(VARIABLE)` for make variables.

Use `$$VARIABLE` for shell variables inside recipes.

Prefer one shell command per recipe line.

Use `@` only when hiding the command makes output clearer.

## Targets

Use outcome names:

```text
install
lint
format
test
build
clean
release
```

Avoid target names that describe implementation details.

## Enforcement

Last verified: 2026-05-24.

Use EditorConfig to preserve tabs in recipe lines.

Use `make --warn-undefined-variables` for stricter local checks.

Use [checkmake](https://github.com/mrtazz/checkmake) when available.

```sh
make --warn-undefined-variables --dry-run
checkmake Makefile
```

## Tradeoff

Make is not a dependency manager, task queue, or CI system. If targets start passing JSON through shell quoting, move the logic into a script and keep Make as the entry point.

## Closing

The best Makefile in a small repository is a map. It should not become the territory.

## Change log for this rewrite

* Thesis identified: Makefiles are thin command indexes.
* Claims dated: check commands marked `Last verified: 2026-05-24`.
* Links added: GNU Make manual, phony targets, checkmake.
* Tradeoff surfaced: complex logic belongs in scripts.
* Flagged but unchanged: the `awk` help target is useful but intentionally optional.

[^tabs]: GNU Make supports changing the recipe prefix with `.RECIPEPREFIX`, but using it surprises readers. Do not do it without a local reason.
