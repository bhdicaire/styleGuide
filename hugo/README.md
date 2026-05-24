# Hugo style guide

A local image did not load because it sat beside a Markdown file that was not a page bundle. Hugo did what it was told. The site structure was unclear.

The rule is simple: write [Hugo](https://gohugo.io/) sites so content, assets, layouts, and generated output have separate jobs. When the boundary matters, encode it in the tree.

## Thesis

Hugo stays boring when the repository shape tells Hugo where every artifact belongs.

## Installation

Last verified: 2026-05-24.

Use the extended Hugo build unless a project proves it does not need asset processing.[^extended]

```sh
brew install hugo
hugo version
```

Install [Go](https://go.dev/doc/install) when the site uses [Hugo Modules](https://gohugo.io/hugo-modules/):

```sh
brew install go
go version
```

Install [Dart Sass](https://sass-lang.com/dart-sass/) when the site uses modern Sass features:

```sh
brew install sass/sass/sass
sass --version
```

Pin Hugo through npm only when the repository already uses Node tooling:

```sh
npm install --save-dev hugo-extended
npx hugo version
```

## Structure

Use `config/_default/` for multilingual or multi-environment sites.

Use one configuration format per project. Prefer YAML when content front matter already uses YAML.

Use [page bundles](https://gohugo.io/content-management/page-bundles/) when a page owns images or attachments:

```text
content/blog/example-post/
├── index.md
└── hero.jpg
```

Put site-wide static files under `static/`.

Keep generated output out of source control unless the host requires it.

Use [archetypes](https://gohugo.io/content-management/archetypes/) for repeated front matter.

Use stable slugs for published pages. A changed URL needs a redirect.

## Front matter

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

Use [front matter](https://gohugo.io/content-management/front-matter/) for metadata that templates, feeds, search, previews, or humans actually use.

## Markup

Hugo uses [Goldmark](https://github.com/yuin/goldmark/) for Markdown by default.

Configure Markdown rendering in [markup configuration](https://gohugo.io/configuration/markup/):

```yaml
markup:
  goldmark:
    renderer:
      unsafe: false
    renderHooks:
      link:
        useEmbedded: auto
```

Use [render hooks](https://gohugo.io/render-hooks/) for site-wide link and image behavior.

Use shortcodes when the author must opt into a special rendering path.

## Enforcement

```sh
hugo server --disableFastRender
hugo --minify
npx markdownlint-cli2 "**/*.md"
```

## Tradeoff

Theme overrides start cheap and become archaeology. If a site overrides most of a theme, own the layout instead of pretending the theme is still the architecture.

## Closing

Hugo is fast enough to remove excuses. Build often. Let the file tree carry the intent.

## Change log for this rewrite

* Thesis identified: repository shape is the contract.
* Claims dated: installation commands marked `Last verified: 2026-05-24`.
* Links added: Hugo, Go, Hugo Modules, Dart Sass, page bundles, archetypes, front matter, Goldmark, markup config, render hooks.
* Tradeoff surfaced: heavy theme overrides are a maintenance smell.
* Flagged but unchanged: npm pinning remains optional because not every Hugo site should depend on Node.

[^extended]: The extended build is the safe default for sites that process Sass or other assets.
