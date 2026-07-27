// Minimal replacement for Bootstrap's JS + jQuery, used only for the
// collapsible mobile navbar (data-toggle="collapse" / data-target).
document.addEventListener('DOMContentLoaded', function () {
  var toggler = document.querySelector('.navbar-toggler');
  if (!toggler) return;
  toggler.addEventListener('click', function () {
    var target = document.querySelector(toggler.getAttribute('data-target'));
    if (!target) return;
    target.classList.toggle('show');
    toggler.classList.toggle('collapsed');
  });
});

// Thin bar under the navbar that fills left-to-right as the page is scrolled.
document.addEventListener('DOMContentLoaded', function () {
  var progressBar = document.getElementById('scroll-progress-bar');
  if (!progressBar) return;
  var updateProgress = function () {
    var scrollTop = window.scrollY || document.documentElement.scrollTop;
    var docHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
    var progress = docHeight > 0 ? (scrollTop / docHeight) * 100 : 0;
    progressBar.style.width = progress + '%';
  };
  window.addEventListener('scroll', updateProgress, { passive: true });
  window.addEventListener('resize', updateProgress);
  updateProgress();
});
