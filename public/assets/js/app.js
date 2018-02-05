
// CORE APP OBJECT
// ======================

var APP = function() {

    // PATHS
    // ======================
    this.ASSETS_PATH = '../assets/';
    this.PLUGINS_PATH = this.ASSETS_PATH + 'plugins/';
    this.IMG_PATH = this.ASSETS_PATH + 'img/';
    this.SERVER_PATH = this.ASSETS_PATH + 'demo/server/';

    // GLOBAL HELPERS
    // ======================
    this.is_touch_device = function() {
        return !!('ontouchstart' in window) || !!('onmsgesturechange' in window);
    };
};

var APP = new APP();

// APP UI SETTINGS
// ======================

APP.UI = {
    scrollTop: 0, // Minimal scrolling to show scrollTop button
};

$(window).on('load resize scroll', function () {
    if ($(this).width() < 992) $('body').removeClass('sidebar-mini').addClass('drawer-sidebar');
});

$(function () {

	// BACK TO TOP
    $(window).scroll(function() {
        if($(this).scrollTop() > APP.UI.scrollTop) $('.to-top').fadeIn();
        else $('.to-top').fadeOut();
    });    

    // Backdrop functional
    $.fn.backdrop = function() {
        $(this).toggleClass('shined');
        $('body').toggleClass('has-backdrop');
        return $(this);
    };
});

