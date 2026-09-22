---
layout: default
title: publications
permalink: /publications/
---
<div class="post">
  <header class="post-header">
    <h1 class="post-title">publications</h1>
  </header>

  <article>
    <div class="publications">
      {%- comment -%}
        Order is derived here, not from the order entries appear in
        _data/publications.yml: pre-pub entries first, then published
        entries by year descending (newest first).
      {%- endcomment -%}
      {%- assign prepub = site.data.publications | where_exp: "e", "e.year == 'pre-pub'" -%}
      {%- assign published = site.data.publications | where_exp: "e", "e.year != 'pre-pub'" | sort: "year" | reverse -%}
      {%- assign ordered = prepub | concat: published -%}
      {%- assign prev_year = nil -%}
      {%- for entry in ordered -%}
        {%- if entry.year != prev_year -%}
      <h2 class="year">{{ entry.year }}</h2>
          {%- assign prev_year = entry.year -%}
        {%- endif -%}
      {% include publication.html entry=entry %}
      {%- endfor -%}
    </div>
  </article>
</div>
