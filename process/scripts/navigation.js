var menu = $('.navbar .menu');
var menuIcon = $('.navbar .menu-icon');

menuIcon.on('click', function() {
  menu.toggleClass('open');
  menuIcon.toggleClass('x');
});
