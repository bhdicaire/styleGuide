# Hugo style guide

## Rationale

Hugo sites are easiest to maintain when content, configuration, layouts, and generated output stay clearly separated. Hugo is fast enough that the workflow should encourage frequent local builds instead of guessing.

Use Hugo for static sites where content can live in files and publishing should be reproducible. Avoid hiding site behavior in theme magic when a local layout, partial, or render hook would make the project easier to understand.

## Installation

Install the extended edition of Hugo when possible. The [official Hugo macOS installation guide](https://gohugo.io/installation/macos/) recommends the extended edition.

On macOS with Homebrew:

```sh
brew install hugo
hugo version
```

Install Git when the site uses Hugo Modules, themes as submodules, Git info, or common deployment providers:

```sh
brew install git
git --version
```

Install Go when the site uses [Hugo Modules](https://gohugo.io/hugo-modules/):

```sh
brew install go
go version
```

Install Dart Sass when the site uses modern Sass features. Hugo documents Dart Sass installation in its [Sass function documentation](https://gohugo.io/functions/css/sass/).

```sh
brew install sass/sass/sass
sass --version
```

If a repository needs Hugo pinned through npm, use the Node guide and install [hugo-extended](https://www.npmjs.com/package/hugo-extended) as a development dependency:

```sh
npm install --save-dev hugo-extended
npx hugo version
```

## Rules

Use `config/_default/` for multi-environment or multilingual configuration.

Use one configuration format per project. Prefer YAML when the surrounding content already uses YAML front matter.

Use page bundles when content owns images or attachments:

```text
content/blog/example-post/
├── index.md
└── hero.jpg
```

Use leaf bundles for single pages with resources.

Use branch bundles for sections that need section content and child pages.

Keep generated output out of source control unless the hosting platform requires it.

Prefer render hooks over raw HTML in Markdown when behavior should be consistent across the site.

Prefer shortcodes for explicit author intent and render hooks for automatic Markdown behavior.

Use archetypes for repeated front matter.

Use `draft: true` only for local drafts. Do not rely on drafts for long-term private notes in a public repository.

Use stable slugs for published pages. Changing a URL requires a redirect.

Use relative links to site pages when possible, and let Hugo resolve them.

Keep theme overrides small and local. If a theme needs extensive overrides, consider owning the layout.

## Content front matter

Use this minimum front matter for dated content:

```yaml
---
title: "Example post"
date: 2026-05-24
lastmod: 2026-05-24
description: "One-sentence summary for feeds, search, and previews."
tags: ["hugo"]
draft: true
---
```

Use [Hugo front matter](https://gohugo.io/content-management/front-matter/) fields deliberately. Metadata should help templates, feeds, search, previews, or humans.

## Markup

Hugo uses Goldmark for Markdown by default. Configure Markdown rendering in the site configuration, as documented in [Configure markup](https://gohugo.io/configuration/markup/).

Recommended starter:

```yaml
markup:
  goldmark:
    renderer:
      unsafe: false
    renderHooks:
      link:
        useEmbedded: auto
```

Use [link render hooks](https://gohugo.io/render-hooks/links/) when links need consistent external-link attributes, broken-link handling, or multilingual behavior.

## Tooling

Use `hugo --minify` for production builds.

Use `hugo server --disableFastRender` when debugging templates or content that does not refresh cleanly.

Use `markdownlint` for Markdown files.

Use `prettier` for YAML, JSON, CSS, and JavaScript assets when the repository already uses Node tooling.

Use `htmltest` or another link checker for larger public sites.

## Files

- `config.yaml`: starter Hugo configuration.
- `archetypes/default.md`: default front matter for new content.
- `.markdownlint.yml`: Markdown linting defaults for Hugo content.
- `package.example.json`: optional npm scripts for projects that pin Hugo tooling through npm.

## Local checks

```sh
hugo server --disableFastRender
hugo --minify
npx markdownlint-cli2 "**/*.md"
```
