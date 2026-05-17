// Tab navigation for the admin React app.
//
// The React components render the tab markup but don't manage active-tab
// state in React; the .active class is toggled by jQuery here. This is a
// stopgap until the tabs are migrated to React state, at which point this
// file can be removed entirely.
//
// The legacy save-to-options.php form handler that used to live here has
// been removed — saves go through the /cartick/v1/* REST API.

( function( $ ) {
	"use strict";

	$( document ).ready( function () {
		/**
		 * Restore the active main tab from localStorage.
		 */
		let cartickTab = localStorage.getItem( 'cartick-tab' );

		if ( cartickTab ) {
			let mainTabNav     = $( '.cartick-tab__nav.mainTab' ),
				mainTabContent = $( '.cartick-tab__content' ),
				currentMainTab = $( '.' + cartickTab );

			mainTabNav.find( 'li' ).removeClass( 'active' );
			currentMainTab.closest( 'li' ).addClass( 'active' );

			$( mainTabContent ).find( '.mainTab' ).removeClass( 'active' );
			$( mainTabContent ).find( '.' + cartickTab ).addClass( 'active' );
		}

		/**
		 * Restore active sub-tabs from localStorage.
		 */
		const subTabs = [ 'add-to-cart', 'sticky-cart' ];

		$.each( subTabs, function ( index, subTab ) {
			let tab = localStorage.getItem( subTab );
			if ( tab ) {
				let mainTab        = $( '.' + tab ).closest( '.mainTab' ).attr( 'id' ),
					mainTabNav     = $( '.' + mainTab + ' .cartick-tab__nav.subTab' ),
					mainTabContent = $( '.' + mainTab + ' .tab-content' ),
					currentMainTab = $( '.' + mainTab + ' .' + tab );

				mainTabNav.find( 'li' ).removeClass( 'active' );
				currentMainTab.closest( 'li' ).addClass( 'active' );

				$( mainTabContent ).removeClass( 'active' );
				$( currentMainTab ).addClass( 'active' );
			}
		} );

		/**
		 * Tab & sub-tab click handler.
		 */
		$( '.cartick-tab__nav.mainTab a, .cartick-tab__nav.subTab a' ).on( 'click', function ( e ) {
			e.preventDefault();

			let self       = $( this ),
				subTab     = self.closest( '.tab-content' ).attr( 'id' ),
				tabContent = self.attr( 'href' ),
				tabNav     = self.closest( '.cartick-tab__nav' ).attr( 'class' ).split( ' ' );

			$( '.cartick-tab__nav.' + tabNav[ 1 ] + ' li' ).removeClass( 'active' );
			self.closest( 'li' ).addClass( 'active' );

			$( '.cartick-tab__content .' + tabNav[ 1 ] ).removeClass( 'active' );
			$( tabContent ).addClass( 'active' );

			if ( subTab ) {
				localStorage.setItem( subTab, self.attr( 'class' ) );
			} else {
				let subTabKey = localStorage.getItem( self.attr( 'class' ) ),
					subTabCls = $( '.' + subTabKey ),
					subTabId  = $( '#' + subTabKey );

				subTabCls.closest( 'li' ).addClass( 'active' );
				subTabId.addClass( 'active' );

				localStorage.setItem( 'cartick-tab', self.attr( 'class' ) );
			}
		} );
	} );
} )( jQuery );
