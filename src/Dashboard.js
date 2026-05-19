import React from 'react';
import MODULES, { isModuleEnabled } from './modules';
import FeatureCard from './FeatureCard';
import SaveStatus from './SaveStatus';

/* global cartickAdminSettings */

const SparkIcon = ( props ) => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" { ...props }>
        <path d="M12 3v4M12 17v4M3 12h4M17 12h4M5.6 5.6l2.8 2.8M15.6 15.6l2.8 2.8M5.6 18.4l2.8-2.8M15.6 8.4l2.8-2.8" />
    </svg>
);

const SkeletonCard = () => (
    <div className="cartick-fcard cartick-fcard--skeleton" aria-hidden="true">
        <div className="cartick-fcard__head">
            <span className="cartick-sk cartick-sk--icon" />
            <span className="cartick-sk cartick-sk--toggle" />
        </div>
        <div className="cartick-fcard__body">
            <span className="cartick-sk cartick-sk--line cartick-sk--w-60" />
            <span className="cartick-sk cartick-sk--line cartick-sk--w-90" />
            <span className="cartick-sk cartick-sk--line cartick-sk--w-70" />
        </div>
        <div className="cartick-fcard__foot">
            <span className="cartick-sk cartick-sk--line cartick-sk--w-30" />
            <span className="cartick-sk cartick-sk--line cartick-sk--w-25" />
        </div>
    </div>
);

const Dashboard = ( { settings, saveStatus, onToggle, onConfigure } ) => {
    const enabledCount = MODULES.filter( ( m ) => isModuleEnabled( settings, m ) ).length;
    const version = ( typeof cartickAdminSettings !== 'undefined' && cartickAdminSettings.version ) || '';
    const isLoading  = settings === null;
    const isFirstRun = ! isLoading && enabledCount === 0;

    return (
        <>
            <div className="cartick-page-head">
                <div className="cartick-page-head__left">
                    <h1 className="cartick-page-title">Dashboard</h1>
                </div>
                <SaveStatus status={ saveStatus } />
            </div>

            { isFirstRun && (
                <div className="cartick-welcome">
                    <div className="cartick-welcome__icon">
                        <SparkIcon width="20" height="20" />
                    </div>
                    <div className="cartick-welcome__body">
                        <h2 className="cartick-welcome__title">Welcome to Cartick</h2>
                        <p className="cartick-welcome__sub">
                            Toggle any module below to start customising your store's cart experience.
                            Click <strong>Configure</strong> on a card to dial in the details.
                        </p>
                    </div>
                </div>
            ) }

            <div className="cartick-stats-bar">
                { isLoading ? (
                    <>
                        <span className="cartick-sk cartick-sk--metric" />
                        <div className="cartick-stats-bar__divider" />
                        <span className="cartick-sk cartick-sk--chip" />
                    </>
                ) : (
                    <>
                        <div className="cartick-stats-bar__metric">
                            <span className="cartick-stats-bar__count">
                                { enabledCount }
                                <span className="cartick-stats-bar__count-total">/{ MODULES.length }</span>
                            </span>
                            <span className="cartick-stats-bar__label">modules enabled</span>
                        </div>
                        { version && (
                            <>
                                <div className="cartick-stats-bar__divider" />
                                <div className="cartick-stats-bar__metric">
                                    <span className="cartick-chip"><span className="cartick-chip__mono">v{ version }</span></span>
                                    <span className="cartick-stats-bar__label">Plugin version</span>
                                </div>
                            </>
                        ) }
                    </>
                ) }
            </div>

            <div className="cartick-dashboard__grid">
                { isLoading
                    ? MODULES.map( ( m ) => <SkeletonCard key={ m.id } /> )
                    : MODULES.map( ( m ) => (
                        <FeatureCard
                            key={ m.id }
                            module={ m }
                            enabled={ isModuleEnabled( settings, m ) }
                            onToggle={ onToggle }
                            onConfigure={ onConfigure }
                        />
                    ) )
                }
            </div>
        </>
    );
};

export default Dashboard;
