# Global conventions

These conventions are the defaults for repositories that do not have a stronger language, framework, or community rule. Local ecosystem rules win when they are clearer or more widely enforced.

## Rationale

A style guide should reduce choices, not create rituals. The goal is to make repositories easy to scan, easy to automate, and predictable enough that new work looks like it belongs.

Prefer rules that can be enforced by editors, formatters, linters, or CI. If a rule cannot be enforced, keep it short and useful.

## Naming

Use names that read from general to specific:

```text
releasePleaseConfig
githubReleaseWorkflow
projectRootDirectory
```

Prefer `lowerCamelCase` for local variables and object properties in languages where that is idiomatic.

Prefer `PascalCase` for classes, constructors, and type-like names.

Prefer `SCREAMING_SNAKE_CASE` only for environment variables and true constants that are configured outside the program.

Prefer `kebab-case` for Markdown files, documentation slugs, URLs, and command-line option names.

Prefer short names only when the scope is tiny and conventional, such as `i` in a small loop.

Avoid clever abbreviations. A longer obvious name is cheaper than a short surprising one.

## Formatting

Use UTF-8, LF line endings, and a final newline.

Use 2 spaces for indentation by default.

Do not use tabs for indentation unless the file format requires tabs. Makefiles are the important exception: recipe lines must begin with a tab.

Trim trailing whitespace except in Markdown files where two trailing spaces may be used deliberately for a hard line break.

Keep files sorted when the order is not meaningful.

Prefer one concept per line in configuration files. This makes reviews and merges quieter.

## Text and comments

Write comments to explain intent, tradeoffs, constraints, or surprises. Do not comment what the next line already says.

Use sentence case for headings unless an ecosystem expects otherwise.

Use American English for technical keywords and tool names, even in otherwise localized documentation.

Prefer active voice in instructions:

```text
Run npm ci before npm test.
```

Avoid vague words like "stuff", "misc", "helpers", or "utils" unless the surrounding context makes the category precise.

## Automation

Each repository should have these baseline files when practical:

- `.editorconfig` for editor behavior.
- A formatter configuration for the primary language.
- A linter configuration for likely mistakes.
- A commit message linter when releases are automated from Git history.
- CI commands that run the same checks locally available to developers.

Formatting should be automatic. Style debates should not happen in pull requests when a formatter can settle them.

## Exceptions

Every exception should have one of these reasons:

- The language or tool requires it.
- The ecosystem convention is stronger than this guide.
- The exception improves readability in that specific file.
- The project has legacy code and changing it would create noise without value.

When an exception repeats, document it near the local guide instead of relying on memory.
