var menu = $('.navbar .menu');
var menuIcon = $('.navbar .menu-icon');
var dropdownIcon = $('.nav .mobile-dropdown-icon');
var menuOverlay = $('#menu-overlay');

menuIcon.on('click', function() {
  menu.toggleClass('open');
  menuIcon.toggleClass('x');
  $('body').toggleClass('mobile-menu-open');
  menuOverlay.fadeToggle('300');
});

dropdownIcon.on('click', function() {
  var item = $(this);

  item.toggleClass('open');
  item.parent().find('.dropdown-menu').slideToggle(300);
});
