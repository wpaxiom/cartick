/* global cartickSettings */

( function( $, document ) {
    "use strict";
    /**
     * Off-canvas cart open/close. The trigger button toggles the drawer; the
     * close button and the dark overlay both close it; opening locks the
     * background scroll so wheel events don't bleed through to the page behind.
     */
    function setOffCanvasOpen( $wrap, open ) {
        $wrap.toggleClass( 'show', open );
        $( 'html' ).toggleClass( 'cartick-oc-lock-scroll', open );
    }

    // All off-canvas handlers are delegated on document so they survive WC's
    // fragment refresh (which swaps .cartick-oc-cart-inner on every cart change).
    $( document ).on( 'click', 'button.cartick-oc-cart-btn', function() {
        var $wrap = $( this ).closest( '.cartick-oc-cart-wrap' );
        setOffCanvasOpen( $wrap, ! $wrap.hasClass( 'show' ) );
    });

    $( document ).on( 'click', '.cartick-oc-cart-close', function() {
        setOffCanvasOpen( $( this ).closest( '.cartick-oc-cart-wrap' ), false );
    });

    // Click on the dark overlay (the wrap itself, not its descendants) closes it.
    $( document ).on( 'click', '.cartick-oc-cart-wrap', function( e ) {
        if ( e.target === this && $( this ).hasClass( 'show' ) ) {
            setOffCanvasOpen( $( this ), false );
        }
    });

    /**
     * Build a WC AJAX endpoint URL. Falls back to a relative path when WC's
     * cart-fragments script (which provides wc_cart_fragments_params) isn't
     * enqueued on the current page.
     */
    function wcAjaxUrl( endpoint ) {
        if ( window.wc_cart_fragments_params && wc_cart_fragments_params.wc_ajax_url ) {
            return wc_cart_fragments_params.wc_ajax_url.toString().replace( '%%endpoint%%', endpoint );
        }
        return '/?wc-ajax=' + endpoint;
    }

    /**
     * Apply the {selector: html} fragment map WC returns from its AJAX
     * endpoints — replaces our drawer markup in place, no full refresh round-trip.
     */
    function applyFragments( fragments ) {
        if ( ! fragments ) return;
        $.each( fragments, function( selector, html ) {
            $( selector ).replaceWith( html );
        });
        $( document.body ).trigger( 'wc_fragments_refreshed' );
    }

    /**
     * Backstop for archive AJAX add-to-cart. WC's `add-to-cart.js` only fires
     * the `added_to_cart` event with the fragment payload — it relies on
     * `cart-fragments.js` being enqueued to actually apply them. When that
     * script isn't on the page (custom themes, page builders, etc.), our
     * drawer never updates. Apply our fragment ourselves to stay independent.
     */
    $( document.body ).on( 'added_to_cart', function( e, fragments ) {
        if ( fragments && fragments['div.cartick-oc-cart-inner'] ) {
            $( 'div.cartick-oc-cart-inner' ).replaceWith( fragments['div.cartick-oc-cart-inner'] );
            $( document.body ).trigger( 'wc_fragments_refreshed' );
        } else {
            // Theme/plugin fired the event without our fragment — go fetch fresh.
            $( document.body ).trigger( 'wc_fragment_refresh' );
        }
    });

    /**
     * Off-canvas cart: auto-open when a product is added (WooCommerce AJAX).
     * Runs after the fragment-apply listener above so the drawer is fresh
     * before it slides in.
     */
    if ( cartickSettings && cartickSettings.oc_auto_open ) {
        $( document.body ).on( 'added_to_cart', function() {
            setOffCanvasOpen( $( '.cartick-oc-cart-wrap' ), true );
        });
    }

    /**
     * Off-canvas cart: quantity +/- buttons. Debounce input → POST to WC's
     * update_cart endpoint → request refreshed fragments to redraw the drawer.
     */
    var qtyTimer = null;
    function scheduleCartUpdate( $input ) {
        clearTimeout( qtyTimer );
        qtyTimer = setTimeout( function() {
            var key   = $input.data( 'cart_item_key' );
            var value = parseInt( $input.val(), 10 ) || 0;
            if ( ! key ) return;

            var data = {};
            data[ 'cart[' + key + '][qty]' ] = value;

            $.ajax({
                type:    'POST',
                url:     wcAjaxUrl( 'update_cart' ),
                data:    data,
                success: function() {
                    // update_cart doesn't return fragments — ask WC for fresh ones.
                    $( document.body ).trigger( 'wc_fragment_refresh' );
                }
            });
        }, 350 );
    }

    $( document ).on( 'click', '.cartick-oc-qty-plus, .cartick-oc-qty-minus', function() {
        var $input = $( this ).siblings( '.cartick-oc-qty-input' );
        var cur    = parseInt( $input.val(), 10 ) || 0;
        var next   = $( this ).hasClass( 'cartick-oc-qty-plus' ) ? cur + 1 : Math.max( 0, cur - 1 );
        $input.val( next );
        scheduleCartUpdate( $input );
    });

    $( document ).on( 'change', '.cartick-oc-qty-input', function() {
        scheduleCartUpdate( $( this ) );
    });

    /**
     * Off-canvas cart: AJAX remove. Calls WC's remove_from_cart endpoint
     * (which returns a fragment map) instead of the form-handler URL.
     */
    $( document ).on( 'click', '.cartick-oc-cart-item__remove', function( e ) {
        e.preventDefault();
        var key = $( this ).data( 'cart_item_key' );
        if ( ! key ) return;

        $.ajax({
            type:    'POST',
            url:     wcAjaxUrl( 'remove_from_cart' ),
            data:    { cart_item_key: key },
            success: function( response ) {
                if ( response && response.fragments ) {
                    applyFragments( response.fragments );
                } else {
                    $( document.body ).trigger( 'wc_fragment_refresh' );
                }
            }
        });
    });

    /**
     * AJAX-ify the single-product add-to-cart form. WC only AJAX-adds from
     * archives by default; the single-product form is a regular POST that
     * reloads the page. We intercept the submit and use WC's add_to_cart
     * endpoint so the drawer refreshes in place.
     *
     * Skipped: external products (navigate out), grouped forms (multi-item
     * payload), and any submit triggered programmatically by another plugin.
     */
    $( document ).on( 'submit', 'form.cart:not(.grouped_form):not(.cart-external)', function( e ) {
        var $form  = $( this );
        var $btn   = $form.find( '.single_add_to_cart_button' );

        // External products use an <a> with target=_blank — bail.
        if ( $btn.length && $btn.hasClass( 'external' ) ) {
            return;
        }
        // Disabled or unselected variable product — let WC's own validation run.
        if ( $btn.length && $btn.hasClass( 'disabled' ) ) {
            return;
        }

        e.preventDefault();

        // Serialize all form fields. WC needs product_id and quantity at minimum;
        // both are already in the form (`name="add-to-cart"` carries the id).
        var data = $form.serializeArray();
        var productId = $form.find( '[name="add-to-cart"]' ).val()
            || $form.find( '[name="product_id"]' ).val()
            || ( $btn.length ? $btn.val() : '' );
        if ( productId ) {
            data.push({ name: 'product_id', value: productId });
        }

        $btn.addClass( 'loading' );

        $.ajax({
            type: 'POST',
            url:  wcAjaxUrl( 'add_to_cart' ),
            data: $.param( data ),
            success: function( response ) {
                $btn.removeClass( 'loading' );

                // WC redirects to the product page when validation fails
                // (e.g. required attribute not chosen) — honor that.
                if ( response && response.error && response.product_url ) {
                    window.location = response.product_url;
                    return;
                }

                if ( response && response.fragments ) {
                    applyFragments( response.fragments );
                    $btn.addClass( 'added' );
                    $( document.body ).trigger(
                        'added_to_cart',
                        [ response.fragments, response.cart_hash, $btn ]
                    );
                }
            },
            error: function() {
                $btn.removeClass( 'loading' );
                // Fall back to a normal submit so the user isn't stuck.
                $form.off( 'submit' );
                $form.trigger( 'submit' );
            }
        });
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