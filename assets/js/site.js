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
