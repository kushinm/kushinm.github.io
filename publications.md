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
      {%- assign prev_year = nil -%}
      {%- for entry in site.data.publications -%}
        {%- if entry.year != prev_year -%}
      <h2 class="year">{{ entry.year }}</h2>
          {%- assign prev_year = entry.year -%}
        {%- endif -%}
      {% include publication.html entry=entry %}
      {%- endfor -%}
    </div>
  </article>
</div>
