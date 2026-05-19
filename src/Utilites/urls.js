/* global cartickAdminSettings */

/**
 * Map a React view id → the WP admin URL for that view.
 *
 * All views share a single WP admin page (`cartick-options`) — modules
 * disambiguate via the `module=<id>` query param. This keeps the WP
 * admin sidebar to one Cartick entry even as the module catalogue grows.
 *
 *   'dashboard'   → admin.php?page=cartick-options
 *   '<module-id>' → admin.php?page=cartick-options&module=<module-id>
 */
export function viewToHref( view ) {
    const base = ( typeof cartickAdminSettings !== 'undefined' && cartickAdminSettings.pageBase )
        || '/wp-admin/admin.php';
    if ( ! view || view === 'dashboard' ) {
        return `${ base }?page=cartick-options`;
    }
    return `${ base }?page=cartick-options&module=${ encodeURIComponent( view ) }`;
}

/**
 * Drive a real navigation to the URL above. Full page load —
 * matches WordPress admin convention. Autosave (600ms debounce) is the
 * dirty-state safety net: settings are already on disk before nav.
 */
export function navigateToView( view ) {
    window.location.href = viewToHref( view );
}
