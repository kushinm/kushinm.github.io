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
        Year groups are ordered here (pre-pub first, then years descending),
        but within a year entries keep the order they appear in
        _data/publications.yml.
      {%- endcomment -%}
      {%- assign pubs = site.data.publications -%}
      {%- assign years = pubs | where_exp: "e", "e.year != 'pre-pub'" | map: "year" | uniq | sort | reverse -%}
      {%- assign prepub = pubs | where_exp: "e", "e.year == 'pre-pub'" -%}
      {%- if prepub.size > 0 -%}
      <h2 class="year">pre-pub</h2>
        {%- for entry in prepub -%}
      {% include publication.html entry=entry %}
        {%- endfor -%}
      {%- endif -%}
      {%- for y in years -%}
      <h2 class="year">{{ y }}</h2>
        {%- assign group = pubs | where: "year", y -%}
        {%- for entry in group -%}
      {% include publication.html entry=entry %}
        {%- endfor -%}
      {%- endfor -%}
    </div>
  </article>
</div>
