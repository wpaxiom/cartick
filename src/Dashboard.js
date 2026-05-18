import React from 'react';
import MODULES, { isModuleEnabled } from './modules';
import FeatureCard from './FeatureCard';
import SaveStatus from './SaveStatus';

/**
 * Dashboard — direct translation of docs/mockups/dashboard-cards.html.
 * Renders the page-head (brand + Cartick + status), summary line, then the
 * cards grid. Outer shell is provided by Settings.js.
 */
const Dashboard = ( { settings, saveStatus, onToggle, onConfigure } ) => {
    const enabledCount = MODULES.filter( ( m ) => isModuleEnabled( settings, m ) ).length;

    return (
        <>
            <div className="cartick-page-head">
                <div className="cartick-page-head__left">
                    <span className="cartick-brand-mark" aria-hidden="true">
                        <svg width="20" height="20" viewBox="0 0 200 200" fill="currentColor">
                            <path d="M 166.38 0 L 33.61 0 C 15.05 0 0 15.05 0 33.62 L 0 166.38 C 0 184.95 15.05 200 33.61 200 L 166.38 200 C 184.94 200 200 184.95 200 166.38 L 200 33.62 C 200 15.05 184.94 0 166.38 0 Z M 170.5 81.16 C 166.69 87.47 159.77 91.69 151.86 91.69 C 144.04 91.69 137.18 87.56 133.35 81.37 C 132.31 80.08 131.21 78.78 130.05 77.41 C 125.54 72.07 120.47 66.03 118.38 59.7 C 117.25 56.39 118.97 46.35 119.7 42.79 C 119.86 42.1 119.53 41.4 118.91 41.06 C 118.68 40.91 116.58 39.77 111.43 39.77 L 109.97 39.77 C 103.08 40.07 97.58 47.68 96.58 58.42 C 96.02 64.75 96.91 70.29 97.68 73.61 L 71.51 73.61 C 66.65 73.61 62.39 78.15 62.39 83.3 C 62.39 86.75 63.67 89.38 65.28 91.01 C 63.24 92.44 61.7 95.07 61.7 98.43 C 61.7 101.2 62.83 103.82 64.78 105.8 C 63.57 107.53 62.93 109.61 62.93 111.69 C 62.93 115.99 65.65 119.8 69.64 121.43 C 69.28 122.52 69.08 123.6 69.08 124.74 C 69.08 130.23 73.35 134.73 78.93 135.27 C 79.19 135.27 79.45 135.33 79.73 135.33 L 132.28 135.33 L 133.57 135.39 C 134.08 135.36 134.59 135.33 135.1 135.3 C 135.15 135.3 135.2 135.29 135.26 135.29 L 135.27 135.29 C 135.38 135.28 135.48 135.28 135.59 135.27 C 136.25 135.23 136.91 135.19 137.58 135.16 C 146.61 135.32 153.88 142.69 153.88 151.76 C 153.88 156.4 151.98 160.6 148.9 163.61 C 148.3 164.21 147.64 164.75 146.95 165.25 C 146.38 165.63 145.88 165.94 145.38 166.25 C 145.12 166.41 144.86 166.57 144.6 166.73 C 144.16 167 143.72 167.26 143.27 167.51 C 131.81 174.14 118.51 177.94 104.31 177.94 C 96.52 177.94 89 176.79 81.89 174.66 C 49.78 165.03 26.38 135.25 26.38 100 C 26.38 65.39 48.95 36.04 80.16 25.88 C 87.77 23.4 95.88 22.06 104.31 22.06 C 131.22 22.06 154.94 35.69 168.94 56.43 C 169.79 57.68 170.6 58.95 171.36 60.25 C 172.82 63.16 173.63 66.45 173.63 69.92 C 173.63 74.03 172.49 77.88 170.5 81.16 Z" />
                        </svg>
                    </span>
                    <h1 className="cartick-page-title">Cartick</h1>
                </div>
                <SaveStatus status={ saveStatus } />
            </div>

            <div className="cartick-dashboard__summary">
                <strong>{ enabledCount }</strong> of <strong>{ MODULES.length }</strong> modules enabled
            </div>

            <div className="cartick-dashboard__grid">
                { MODULES.map( ( m ) => (
                    <FeatureCard
                        key={ m.id }
                        module={ m }
                        enabled={ isModuleEnabled( settings, m ) }
                        onToggle={ onToggle }
                        onConfigure={ onConfigure }
                    />
                ) ) }
            </div>
        </>
    );
};

export default Dashboard;
