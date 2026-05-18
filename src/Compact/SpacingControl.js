import React, { useState } from 'react';

/**
 * Spacing control — adapted from axiom-blocks' SpacingPanel for the cartick
 * admin. Single-axis (padding only); cartick has no margin settings today.
 *
 * Props:
 *   - label:    Display label (uppercase string).
 *   - values:   { top, right, bottom, left } as numbers.
 *   - defaults: Same shape — drives the "Reset" affordance and the
 *               "is-applied" highlight on each side.
 *   - onChange: (side, value) => void  -- called per side.
 */

const SIDES = [
    { key: 'top',    label: 'TOP' },
    { key: 'right',  label: 'RIGHT' },
    { key: 'bottom', label: 'BOTTOM' },
    { key: 'left',   label: 'LEFT' },
];

const BoxIcon = () => (
    <svg
        className="cartick-sp-box"
        width="20"
        height="20"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
        aria-hidden="true"
    >
        <rect x="3" y="3" width="18" height="18" rx="1.5" strokeDasharray="3 2" />
        <rect x="8" y="8" width="8" height="8" rx="1" />
    </svg>
);

const LinkSvg = () => (
    <svg width="12" height="12" viewBox="0 0 24 24" fill="none"
        stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" aria-hidden="true">
        <path d="M10 13a5 5 0 007.54.54l3-3a5 5 0 00-7.07-7.07l-1.72 1.71" />
        <path d="M14 11a5 5 0 00-7.54-.54l-3 3a5 5 0 007.07 7.07l1.71-1.71" />
    </svg>
);

const UnlinkSvg = () => (
    <svg width="12" height="12" viewBox="0 0 24 24" fill="none"
        stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" aria-hidden="true">
        <path d="M18.84 12.25l1.72-1.71a5 5 0 00-7.07-7.07l-1.72 1.71" />
        <path d="M5.17 11.75l-1.72 1.71a5 5 0 007.07 7.07l1.71-1.71" />
        <line x1="2" y1="2" x2="22" y2="22" />
    </svg>
);

const parseNum = ( v ) => ( v === '' || v == null ) ? null : ( parseInt( v, 10 ) || 0 );

const SpacingControl = ( { label = 'PADDING', values, defaults, onChange } ) => {
    const vals = SIDES.map( ( s ) => parseNum( values?.[ s.key ] ) );

    const allSame = vals.every( ( v ) => v === vals[ 0 ] );
    const [ linked, setLinked ] = useState( allSame );
    const linkedVal = vals[ 0 ];

    const hasNonDefault = defaults
        ? SIDES.some( ( s ) => parseNum( values?.[ s.key ] ) !== parseNum( defaults[ s.key ] ) )
        : vals.some( ( v ) => v !== null && v !== 0 );

    const isApplied = ( v, sideKey ) => {
        if ( defaults && defaults[ sideKey ] !== undefined ) {
            return v !== parseNum( defaults[ sideKey ] );
        }
        return v !== null && v !== 0;
    };

    const setAll = ( v ) => {
        const n = parseNum( v ) ?? 0;
        SIDES.forEach( ( s ) => onChange( s.key, n ) );
    };

    const setSide = ( i, v ) => {
        const n = parseNum( v ) ?? 0;
        onChange( SIDES[ i ].key, n );
    };

    const reset = () => {
        SIDES.forEach( ( s ) => onChange( s.key, defaults?.[ s.key ] ?? 0 ) );
    };

    return (
        <div className="cartick-sp-control">
            <div className="cartick-sp-label-row">
                <div className="cartick-sp-actions">
                    <button
                        type="button"
                        className="cartick-sp-reset"
                        onClick={ reset }
                        disabled={ ! hasNonDefault }
                    >
                        Reset
                    </button>
                    <button
                        type="button"
                        className={ `cartick-sp-link${ linked ? ' is-linked' : '' }` }
                        onClick={ () => setLinked( ( l ) => ! l ) }
                        title={ linked ? 'Unlink sides' : 'Link all sides' }
                        aria-pressed={ linked }
                    >
                        { linked ? <LinkSvg /> : <UnlinkSvg /> }
                    </button>
                </div>
            </div>

            { linked ? (
                <div className="cartick-sp-input-row">
                    <BoxIcon />
                    <div className={ `cartick-sp-px-wrap${ isApplied( linkedVal, 'top' ) ? ' is-applied' : '' }` }>
                        <input
                            type="number"
                            className="cartick-sp-px-input"
                            value={ linkedVal === null ? '' : linkedVal }
                            onChange={ ( e ) => setAll( e.target.value ) }
                            min={ 0 }
                            max={ 200 }
                            placeholder="—"
                        />
                        <span className="cartick-sp-unit">PX</span>
                    </div>
                    <input
                        type="range"
                        className="cartick-sp-slider"
                        min={ 0 }
                        max={ 200 }
                        value={ linkedVal === null ? 0 : linkedVal }
                        onChange={ ( e ) => setAll( e.target.value ) }
                        style={ { '--sp-pct': `${ ( linkedVal === null ? 0 : linkedVal ) / 2 }%` } }
                    />
                </div>
            ) : (
                <>
                    <div className="cartick-sp-input-row cartick-sp-input-row--head">
                        <BoxIcon />
                        <span className="cartick-sp-sides-hint">Per side</span>
                    </div>
                    <div className="cartick-sp-sides-grid">
                        { SIDES.map( ( side, i ) => (
                            <div key={ side.key } className="cartick-sp-side">
                                <div className="cartick-sp-side-label">{ side.label }</div>
                                <div className={ `cartick-sp-px-wrap${ isApplied( vals[ i ], side.key ) ? ' is-applied' : '' }` }>
                                    <input
                                        type="number"
                                        className="cartick-sp-px-input"
                                        value={ vals[ i ] === null ? '' : vals[ i ] }
                                        onChange={ ( e ) => setSide( i, e.target.value ) }
                                        min={ 0 }
                                        max={ 200 }
                                        placeholder="—"
                                    />
                                    <span className="cartick-sp-unit">PX</span>
                                </div>
                            </div>
                        ) ) }
                    </div>
                </>
            ) }
        </div>
    );
};

export default SpacingControl;
