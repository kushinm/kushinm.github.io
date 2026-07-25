# kushinm.com (lean rebuild)

This is a lean, from-scratch Jekyll site that reproduces the visuals of the
full [al-folio](https://github.com/alshedivat/al-folio) theme at the repo
root, but keeps only what's actually used: the homepage, the publications
list, a direct link to a CV PDF, and a personal-links page. It lives in this
`site/` subdirectory on purpose, next to the original tree, so the two can
be diffed and eventually merged — the root site is untouched and this one
doesn't affect it.

If you just want to add a paper or a news item, skip to
["Adding a publication"](#adding-a-publication) or
["Adding a news item"](#adding-a-news-item) below.

## Why this exists

The root site carries a lot of theme surface that three pages never touch —
demo blog posts, an unused CV data file, `jekyll-scholar` and its dependency
chain, 1000+ lines of Sass, etc. That made small changes (like adding a
paper) require touching a hand-maintained `years:` list and understanding a
much bigger system than the site actually needs. This directory is the
same visual site with that surface removed, so it's easier to extend.

## Directory layout

```
site/
├── _config.yml              site settings (title, social handles, plugins)
├── Gemfile / Gemfile.lock    5 gems, vs. ~15 in the root Gemfile
├── CNAME                    kushinm.com
│
├── index.md                 homepage (about text + profile photo + news)
├── publications.md          publications page
├── personal.md              personal links (Goodreads, HowLongToBeat, etc.)
├── news.md                  full news list (linked from the homepage)
│
├── _data/
│   ├── publications.yml     ← the publication list. Edit this to add a paper.
│   ├── news.yml              ← the news list. Edit this to add a news item.
│   └── coauthors.yml         name → homepage URL, used to auto-link authors
│
├── _layouts/
│   └── default.html         the only layout; every page uses it
│
├── _includes/
│   ├── head.html            <head>: CDN CSS/font links, page title
│   ├── nav.html             navbar (social icons on `/`, page links elsewhere)
│   ├── social.html          social icon links, driven by _config.yml
│   ├── news.html            renders a list from _data/news.yml
│   └── publication.html     renders one row from _data/publications.yml
│
└── assets/
    ├── css/main.scss        ~200 lines; the old theme's Sass was 1000+
    ├── js/site.js           ~15 lines: just the mobile navbar toggle
    ├── img/                 prof_pic.jpeg, icon.png, publication_preview/
    └── pdf/                 paper PDFs + the CV PDF
```

There is deliberately no `_posts`, `_projects`, `_plugins`, or extra
`_layouts` — nothing here is unused.

There's also no `cv.md`: the navbar's "cv" link (see `_includes/nav.html`)
goes straight to `assets/pdf/KM_CV_2026.pdf`, not to an HTML page.

## Running it locally

```sh
cd site
bundle install
bundle exec jekyll serve
```

Then open `http://localhost:4000`. Use `bundle exec jekyll build` (no
`serve`) if you just want the static output in `site/_site/` without a
dev server.

## Adding a publication

Open `_data/publications.yml` and add an entry near the top (entries are
newest-first; the publications page groups them by `year` automatically —
there's no separate list to keep in sync). Each entry looks like:

```yaml
- title: Your paper title
  authors:
    - {first: Kushin, last: Mukherjee}   # use this exact spelling — it renders bold as "you"
    - {first: Jane, last: Doe}
  journal: Some Conference or Journal
  year: 2026
  preview: your_paper.png    # optional — put the image in assets/img/publication_preview/
  pdf: your_paper.pdf        # optional — put the PDF in assets/pdf/
```

Optional fields, only set them if the paper needs them:

| Field      | Use for |
|------------|---------|
| `year`     | a number, or the literal string `pre-pub` to suppress the year in the citation line (for preprints/in-review work) |
| `badge`    | a bold-italic line under the title, e.g. an award: `Best Paper Honorable Mention` |
| `progress` | an italic status next to the title, e.g. `(under review)`, `(in press)` |
| `note`     | a second citation line, e.g. `Also appeared in the ...` |

**Co-author links:** if an author's last name is a key in `_data/coauthors.yml`
and their first name matches, their name auto-links to the URL there. Add a
new co-author once and every paper with them links automatically:

```yaml
Doe:
  - firstname: Jane
    url: https://jane-doe-homepage.example.com
```

No matching entry just renders the name as plain text — nothing breaks.

## Adding a news item

Open `_data/news.yml` and add an entry at the top (list is newest-first):

```yaml
- date: 2026-08-01
  text: >-
    Markdown works here, including **bold** and [links](https://example.com).
```

The homepage shows the newest 5 (`news_limit` in `_config.yml`); `/news/`
shows the full list.

## Editing the homepage bio, CV, or personal links

- Homepage intro text is the markdown body of `index.md`, below the
  frontmatter.
- The CV is a direct PDF link from the navbar, not a page — to update it,
  replace `assets/pdf/KM_CV_2026.pdf` (keep the same filename), or give the
  new file a different name and update the href in `_includes/nav.html`.
- Personal links (Goodreads, HowLongToBeat, etc.) live on `personal.md` as
  plain markdown list items — add new ones the same way.

## Styling

Colors and fonts are controlled by CSS custom properties at the top of
`assets/css/main.scss`:

```scss
--global-bg-color: #fffef7;       /* cream background */
--global-theme-color: #009db5;    /* teal — links, year dividers, hovers */
```

Bootstrap 4.6.1 CSS is loaded from a CDN for the grid/navbar/button base
styles (see `_includes/head.html`); everything else is hand-written and
scoped to the classes actually used (`.publications`, `.profile`, `.navbar`,
`.news`, `.social`). There's no dark mode — the old site had one, but it was
never reachable there either (`enable_darkmode` was off in its config).

## Deployment

`.github/workflows/deploy-lean.yml` (at the repo root, not in here) builds
this directory and publishes it via GitHub Pages' native Actions flow
(`actions/configure-pages` → `actions/upload-pages-artifact` →
`actions/deploy-pages`) on every push to `master`. It runs independently of
the root site's `deploy.yml` workflow.

**Important:** this workflow only takes effect once the repository's Pages
source (Settings → Pages → Build and deployment) is switched from
"Deploy from a branch" to **"GitHub Actions"**. Until that switch is made,
this workflow builds and uploads an artifact but kushinm.com keeps being
served by the old workflow's `gh-pages` branch, unaffected. Switching back
to "Deploy from a branch" reverts to the old site at any time.

## What's intentionally not here

Compared to the root site: no blog, no projects page, no dark mode, no
comments (giscus/disqus), no analytics, no Altmetric/Dimensions badges, no
MathJax, no jQuery, no jekyll-scholar. If you need one of these back, it's
probably easier to look at how the root site did it than to reintroduce the
whole dependency for one feature — ask first, since most of these were cut
because nothing on these three pages used them.
