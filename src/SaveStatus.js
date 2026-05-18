import React from 'react';

/* global cartickAdminSettings */

/**
 * Right side of every page-head in the mockup:
 *   <status text> · <version>
 *
 * Plain text, the mockup uses a single dot color (text-muted). We keep
 * the same look but swap the status word based on current save state.
 */

const STATUS_LABEL = {
    idle:   'All changes saved',
    saving: 'Saving…',
    saved:  'Saved',
    error:  'Couldn\'t save',
};

const SaveStatus = ( { status = 'idle' } ) => {
    return (
        <div className="cartick-page-head__right">
            <span className={ `cartick-save-dot is-${ status }` } />
            <span>{ STATUS_LABEL[ status ] }</span>
            <span>·</span>
            <span className="cartick-page-head__version">v{ cartickAdminSettings.version }</span>
        </div>
    );
};

export default SaveStatus;
