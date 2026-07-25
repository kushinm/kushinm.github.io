# kushinm.com

Source for [kushinm.com](https://kushinm.com), a small Jekyll site: a
homepage, a publications list, a direct link to a CV PDF, and a
personal-links page.

This used to be a fork of the [al-folio](https://github.com/alshedivat/al-folio)
academic theme, which came with a lot of surface — demo posts, an unused CV
system, `jekyll-scholar` and its dependency chain, 1000+ lines of Sass — that
these four pages never touched. That's been replaced with a small
from-scratch site that looks the same but is much easier to extend; this is
now the only codebase (the old al-folio tree has been removed, and its
history is still in git if you ever need to look back at it).

If you just want to add a paper or a news item, skip to
["Adding a publication"](#adding-a-publication) or
["Adding a news item"](#adding-a-news-item) below.

## Directory layout

```
.
├── _config.yml              site settings (title, social handles, plugins)
├── Gemfile / Gemfile.lock    5 gems
├── CNAME                    kushinm.com
├── 404.html / robots.txt
│
├── index.md                 homepage (about text + profile photo + news)
├── publications.md          publications page
├── personal.md              personal links (Goodreads, HowLongToBeat, etc.)
├── news.md                  full news list (linked from the homepage)
│
├── bin/
│   └── add_publication      interactive script to add a paper — see below
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
│   ├── footer.html          "Last updated" line, shown on every page
│   ├── news.html            renders a list from _data/news.yml
│   └── publication.html     renders one row from _data/publications.yml
│
└── assets/
    ├── css/main.scss        ~200 lines
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
bundle install
bundle exec jekyll serve
```

Then open `http://localhost:4000`. Use `bundle exec jekyll build` (no
`serve`) if you just want the static output in `_site/` without a dev
server.

## Adding a publication

**The easy way:** run `bin/add_publication` and answer its prompts (authors,
title, year, venue, and optionally a PDF/preview image to copy in). It
computes the filename key for you, checks for collisions, copies the files,
and inserts the new entry at the top of `_data/publications.yml`. Review the
diff, then `bundle exec jekyll build` to check it renders before committing.

**By hand:** open `_data/publications.yml` and add an entry near the top
(entries are newest-first; the publications page groups them by `year`
automatically — there's no separate list to keep in sync). Each entry looks
like:

```yaml
- key: doe_cogsci_2026
  title: Your paper title
  authors:
    - {first: Kushin, last: Mukherjee}   # use this exact spelling — it renders bold as "you"
    - {first: Jane, last: Doe}
  journal: Some Conference or Journal
  year: 2026
```

`key` names the paper's files — `assets/pdf/{key}.pdf` and
`assets/img/publication_preview/{key}.png` — and both are optional; if a
file at that path doesn't exist, its element (PDF button / preview image)
is just omitted. There's no separate `pdf:`/`preview:` field to keep in
sync, so the two can't drift apart the way they used to.

**Key naming convention:**

| Case | Pattern | Example |
|------|---------|---------|
| Published | `{first-author-lastname}_{venue-abbrev}_{year}` | `mukherjee_vis_2021`, `suresh_cogsci_2025` |
| Unpublished / pre-print | `{first-author-lastname}_{topic-word}_prepub` | `verma_chart6_prepub` — rename to a real key once it's accepted somewhere |
| Same author, same venue+year twice | append a short disambiguator | `studdiford_colm_2026_steering` / `studdiford_colm_2026_factors` |

Reuse an existing venue abbreviation where one already exists (`cogsci` for
Cognitive Science Society proceedings, `vis` for IEEE VIS/TVCG, `neurips`,
`emnlp`, `iclr`, `iclrtiny`, `ccn`, `nrp`, `srvhm`, `mc`, `brm`, `pnas`,
`chi`, `colm`, `vispsych`, ...) rather than inventing a new one for the same
venue — check `_data/publications.yml` for what's already there.

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

The homepage title uses Rubik (loaded in `index.md`); everywhere else uses
Roboto (loaded in `_includes/head.html`), with real bold and italic weights
so `<strong>`/`<em>` render true glyphs rather than browser-faked ones.

Bootstrap 4.6.1 CSS is loaded from a CDN for the grid/navbar/button base
styles (see `_includes/head.html`); everything else is hand-written and
scoped to the classes actually used (`.publications`, `.profile`, `.navbar`,
`.news`, `.social`). There's no dark mode.

## Deployment

`.github/workflows/deploy.yml` builds the site and publishes it via GitHub
Pages' native Actions flow (`actions/configure-pages` →
`actions/upload-pages-artifact` → `actions/deploy-pages`) on every push to
`master`.

This requires the repository's Pages source (Settings → Pages → Build and
deployment) to be set to **"GitHub Actions"** rather than "Deploy from a
branch." If it's still set to a branch, switch it once — this is a repo
setting, not something a commit can flip.

## What's intentionally not here

No blog, no projects page, no dark mode, no comments (giscus/disqus), no
analytics, no Altmetric/Dimensions badges, no MathJax, no jQuery, no
jekyll-scholar. Most of these were cut because nothing on these four pages
used them — if you want one back, it's worth checking `git log` for how the
old al-folio-based version did it before reintroducing a whole dependency
for one feature.
