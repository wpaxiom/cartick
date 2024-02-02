/* global cartickSettings */

( function( $, document ) {
    "use strict";
    /**
     * Sticky Cart button toggle
     */
    $('button.cartick-oc-cart-btn').on( 'click', function() {
        $(this).closest('.cartick-oc-cart-wrap').toggleClass('show');
    });

    /**
     *  Cartick Cart Quantity
     */
    $(document).ready(function (){
        let cartInput = $('.cartick-sticky-cart__qty-form');
        $( cartInput ).on('click', '.cartick-sticky-cart__qty-plus', function(e) {
            let input = $(this).prev('input.cartick-sticky-cart__qty'),
                val = parseInt( input.val() );

            input.val( val+1 ).change();
        });

        $( cartInput ).on('click', '.cartick-sticky-cart__qty-minus', function(e) {
            let input = $(this).next('input.cartick-sticky-cart__qty'),
                val = parseInt( input.val() );

            console.log( val );

            if (val > 0) {
                input.val( val-1 ).change();
            }
        });
    });

    /**
     * Cart Sticky cart show on scroll
     */
    $('.cartick-sticky-cart__wrap.show_on_scroll').hide();
    $(window).scroll( function(){
        if ( $(window).scrollTop() > cartickSettings.sc_offset ) {
            $('.cartick-sticky-cart__wrap.show_on_scroll').slideDown();
        } else {
            $('.cartick-sticky-cart__wrap.show_on_scroll').slideUp();
        }
    });

} )( jQuery, document );