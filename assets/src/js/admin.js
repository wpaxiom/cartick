( function( $ ) {
    "use strict";

    /**
     *  Cartick Navigation
     */
    $(document).ready(function (){
        /**
         * Active tab for Main Tab
         */
        let cartickTab = localStorage.getItem( 'cartick-tab' );

        if ( cartickTab ) {
            let mainTabNav = $('.cartick-tab__nav.mainTab'),
                mainTabContent = $('.cartick-tab__content'),
                currentMainTab = $( `.` + cartickTab );

            mainTabNav.find('li').removeClass('active');
            currentMainTab.closest('li').addClass('active');

            $(mainTabContent).find('.mainTab').removeClass('active');
            $(mainTabContent).find( `.` + cartickTab ).addClass('active');
        }

        /**
         * Active tab for Sub Tab
         */

        const subTabs = [ 'add-to-cart', 'sticky-cart' ];

        $.each( subTabs, function( index, subTab ) {
            let tab = localStorage.getItem( subTab );
            if ( tab ) {
                let mainTab = $(`.` + tab).closest('.mainTab').attr('id'),
                    mainTabNav = $(`.` + mainTab +` .cartick-tab__nav.subTab`),
                    mainTabContent = $(`.` + mainTab +` .tab-content`),
                    currentMainTab = $(`.` + mainTab +` .` + tab );

                mainTabNav.find('li').removeClass('active');
                currentMainTab.closest('li').addClass('active');

                $(mainTabContent).removeClass('active');
                $(currentMainTab).addClass('active');
            }
        });

        /**
         * Tab & Sub tab click events
         */
        $( '.cartick-tab__nav.mainTab a, .cartick-tab__nav.subTab a').on('click', function( e ) {
            e.preventDefault();

            let self = $(this),
                subTab = self.closest('.tab-content').attr('id'),
                tabContent = self.attr('href'),
                tabNav = self.closest('.cartick-tab__nav').attr('class').split(' ');

            // Main Tab Nav link active
            $( '.cartick-tab__nav.' + tabNav[1] + ' li' ).removeClass('active');
            self.closest('li').addClass('active');

            // Main Tab Content show/hide
            $( '.cartick-tab__content .' + tabNav[1] ).removeClass('active');
            $(tabContent).addClass('active');

            if ( subTab ) {
                localStorage.setItem( subTab, self.attr('class') );
            } else {
                let subTab = localStorage.getItem(  self.attr('class') ),
                    subTabCls = $('.' + subTab),
                    subTabId = $('#' + subTab);

                subTabCls.closest('li').addClass('active');
                subTabId.addClass('active');

                localStorage.setItem( 'cartick-tab', self.attr('class') );
            }
        });
    });

    /**
     * Cartick Ajax save Options
     */
    $('.cartick-setting-form').on('submit', function (e){
        e.preventDefault();
        let data = $(this).serialize(),
            messageEl = $('#message');

        let formatAlertReview = function formatAlertReview(message, type) {
            let html = '';
            html += '<div class="cartick-notice cartick-notice-' + type + '">';
            html += message;
            html += '</div>';
            return html;
        };

        messageEl.html("<div class='cartick-notice cartick-notice-info'>" + "Saving Settings" + "</div>");
        messageEl.fadeIn(200);

        $.post('options.php', data)
        .error(function () {
            messageEl.html( formatAlertReview( 'Something went wrong !!!', 'error', true ) );
            messageEl.fadeOut(3000);
        })
        .success(function ( ) {
            messageEl.html(formatAlertReview( 'Settings Saved ', 'success', true));
            messageEl.fadeOut(3000);
        });

        return false;
    });
} )( jQuery );