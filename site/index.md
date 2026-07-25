---
layout: default
title: home
permalink: /
---
<link rel="stylesheet" href="https://fonts.googleapis.com/css?family=Lato">
<link rel="stylesheet" href="https://fonts.googleapis.com/css?family=Montserrat">

<div class="post">
  <header class="post-header" style="font-family:'Rubik', sans-serif;">
    <h1 class="post-title">{{ site.title }}</h1>
    <p class="desc">kushinm at stanford dot edu</p>
  </header>

  <article>
    <div class="profile float-right">
      <img class="img-fluid z-depth-1 rounded-circle" src="{{ '/assets/img/prof_pic.jpeg' | relative_url }}" alt="prof_pic.jpeg" width="auto" height="auto">
    </div>

    <div class="clearfix">
<div style="width:470px">
<p>
I,KM, am a postdoctoral scholar in the <a href="https://cogtoolslab.github.io/" target="_blank">Cognitive Tools Lab</a> at <a href="https://www.stanford.edu/" target="_blank">Stanford University</a>.
I'm broadly interested in the human ability to use and understand <strong>visualizations</strong> (charts, graphs, drawings) in service of communication and discovery. My research focuses on developing computational cognitive models of visualization understanding to both (1) better characterize human cognition and (2) bridge the gap between modern AI systems and human-like understanding of visual concepts.
</p>

<p>
I completed my PhD in Psychology at <a href="https://www.wisc.edu/" target="_blank"> UW-Madison</a> while based in the <a href="http://concepts.psych.wisc.edu/" target="_blank">Knowledge and Concepts Lab</a> and the <a href="https://schlosslab.discovery.wisc.edu/" target="_blank">Schloss Visual Reasoning Lab</a>. I also interned at <a href="https://machinelearning.apple.com/" target = "_blank"> Apple AIML</a> working with the Vis team on chart understanding in vision-language models.
I was also fortunate to be a <a href="https://kohlerfellows.illuminatingdiscovery.wisc.edu/" target="_blank">Kohler Fellow</a> at the <a href="https://wid.wisc.edu/" target="_blank">Wisconsin Institute for Discovery</a>, which has let me think about how science and art can intersect to give rise to fun<a href="https://vimeo.com/755598302" target="_blank"> new ideas</a>.
Much of my work has been the product of engaging and thoughtful collaborations with members of the <a href="https://socialinteractionlab.github.io/" target="_blank">Social Interaction Lab (SoIL) </a> at Stanford, the <a href="https://vital-kolab.org/" target="_blank">Visual Intelligence and Technological Advances Lab</a> at York, and the <a href="https://ncclab.princeton.edu/" target="_blank">Neuroscience of Cognitive Control Lab</a> at Princeton.
Prior to grad school, I received my BA in Cognitive Science and Japanese from <a href="https://www.vassar.edu/" target="_blank">Vassar College</a>, where I was advised by <a href="https://www.vassar.edu/faculty/livingst/" target="_blank">Ken Livingston</a> and <a href="https://www.vassar.edu/faculty/jdeleeuw/" target="_blank">Josh de Leeuw</a>.
I also spent a summer at the <a href="https://cocolab.stanford.edu/ndg.html" target="_blank">Computation and Cognition Lab</a> at Stanford as a <a href="https://www-csli.stanford.edu/" target="_blank">CSLI intern</a>, working with <a href="https://cogtoolslab.github.io/" target="_blank">Judy Fan</a> and <a href="https://rxdhawkins.com/" target="_blank">Robert Hawkins</a> (and continue to today!).
</p>
</div>
    </div>

    <h2><a href="{{ '/news/' | relative_url }}" style="color: inherit;">news</a></h2>
    {% include news.html limit=site.news_limit %}
  </article>
</div>
