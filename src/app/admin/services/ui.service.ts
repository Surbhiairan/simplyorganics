import {Injectable} from '@angular/core';
import {Http} from '@angular/http';

declare var jQuery:any;
declare var $:any;
declare var toastr: any;

@Injectable()
export class UIService {
    constructor(private http: Http){ }
    
    activate() {
        
        // Tooltip
        $('[data-toggle="tooltip"]').tooltip();

        // Popover
        $('[data-toggle="popover"]').popover();

        // slimscroll
        $('.scroller').each(function(){
            $(this).slimScroll({
                height: $(this).attr('data-height'),
                color: $(this).attr('data-color'),
                railOpacity: '0.9',
            });
        });

    }
    
    // SEARCH BAR ACTION
    
    toggleSearch() {
        $('.search-top-bar').backdrop().find('.search-input').focus();
    }

    closeSearch() {
        this.hideBackdrop();
    }

    // TOGGLE THEME-CONFIG BOX

    toggleConfigBox(event) {
        $(event.target).parents('.theme-config').backdrop();
    }


    //
    // LAYOUT SETTINGS
    // ======================


    // SIDEBAR TOGGLE ACTION

    toggleSidebar() {
        if( $('body').hasClass('drawer-sidebar') ) {
            $('#sidebar').backdrop();
        } else {
            $('body').toggleClass('sidebar-mini');
        }
    }

    // FIXED NAVBAR

    fixedNavbar(event) {
        if( event.target.checked ) $('body').addClass('fixed-navbar');
        else $('body').removeClass('fixed-navbar');
    }

    // DRAWER SIDEBAR

    drawerSidebar(event) {
        if( event.target.checked ) {
            $('body').addClass('drawer-sidebar')
        } else {
            $('body').removeClass('drawer-sidebar');
        }
        setTimeout(function(){
            $('body').removeClass('sidebar-mini');
        },200);
    }

    // BOXED | FLUID LAYOUT

    layoutStyle(event) {
        if(+event.target.value) $('body').addClass('boxed-layout');
        else $('body').removeClass('boxed-layout');
    }

    // THEMES CHANGE

    changeTheme(event) {
        var val = event.target.value;
        if(val != 'default') {
            if(! $('#theme-style').length ) {
                $('head').append( "<link href='assets/css/themes/"+val+".css' rel='stylesheet' id='theme-style' >" );
            } else $('#theme-style').attr('href', 'assets/css/themes/'+val+'.css');
        } else $('#theme-style').remove();
    }

    //
    // SESSION TIMEOUT
    // ==========================

    timout = {
        timer: null,

        checkTimer() {
            if(+$('#timeout-count').val()) {
                this.activate(+$('#timeout-count').val());
            }
        },

        reset(){
            $( document ).idleTimer("destroy");
            $('#session-dialog').modal('hide');
            $('.timeout-toggler').removeClass('active');
            $('#timeout-reset-box').hide();
            $('#timeout-activate-box').show();
        },

        activate(count){
            $('#session-dialog').modal('hide');
            $('#timeout-reset-box').show();
            $('#timeout-activate-box').hide();
            $( document ).idleTimer( count * 60000 );
            
            setTimeout(function(){
                $('.timeout-toggler').addClass('active');
            },(count-1) * 60000);

            $( document ).on( "idle.idleTimer", function(event, elem, obj){
                // function you want to fire when the user goes idle
                toastr.warning('Your session is about to expire. The page will redirect after 5 seconds with no activity.','Session Timeout Notification',{
                    "progressBar": true,
                    "timeOut": 5000,
                });
                this.timer = setTimeout(function(){
                    alert('Your session has expired. You can redirect this page or logout');
                },5000);
            });

            $( document ).on( "active.idleTimer", function(event, elem, obj, triggerevent){
                // function you want to fire when the user becomes active again
                clearTimeout(this.timer);
                $( document ).idleTimer("reset");
                toastr.clear();
                toastr.success('You returned to the active mode.','You are back.');
            });
        }
    }

    //
    // PANEL ACTIONS
    // ================

    iboxRemove(event) {
        $(event.target).closest('div.ibox').remove();
    }

    iboxCollapse(event) {
        var ibox = $(event.target).closest('div.ibox');
        ibox.children('.ibox-body').slideToggle(200);
        $(event.target).find('i').toggleClass('glyphicon-menu-up').toggleClass('glyphicon-menu-down');
    }

    iboxFullscreen(event) {
        $('body').toggleClass('fullscreen-mode');
        $(event.target).closest('div.ibox').toggleClass('ibox-fullscreen');
        $(event.target).find('i').toggleClass('fa-expand').toggleClass('fa-compress');
    }

    

    
    hideBackdrop() {
        $('body').removeClass('has-backdrop');
        $('.shined').removeClass('shined');
    }

    toTop() {
        $("html, body").animate({scrollTop:0},500);
    }

}
