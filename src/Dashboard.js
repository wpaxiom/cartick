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
                    <svg width="28" height="28" viewBox="0 0 200 200" fill="#6B66F7" aria-hidden="true">
                        <path d="M166.38 0H33.61C15.05 0 0 15.05 0 33.62V166.38C0 184.95 15.05 200 33.61 200H166.38C184.94 200 200 184.95 200 166.38V33.62C200 15.05 184.94 0 166.38 0ZM170.5 81.16C166.69 87.47 159.77 91.69 151.86 91.69C144.04 91.69 137.18 87.56 133.35 81.37C133.34 81.35 133.32 81.33 133.3 81.31C132.31 80.08 131.21 78.78 130.05 77.41C125.54 72.07 120.47 66.03 118.38 59.7C117.25 56.39 118.97 46.35 119.7 42.79C119.86 42.1 119.53 41.4 118.91 41.06C118.68 40.91 116.58 39.77 111.43 39.77H109.97C103.08 40.07 97.58 47.68 96.58 58.42C96.02 64.75 96.91 70.29 97.68 73.61H71.51C66.65 73.61 62.39 78.15 62.39 83.3C62.39 86.75 63.67 89.38 65.28 91.01C63.24 92.44 61.7 95.07 61.7 98.43C61.7 101.2 62.83 103.82 64.78 105.8C63.57 107.53 62.93 109.61 62.93 111.69C62.93 115.99 65.65 119.8 69.64 121.43C69.28 122.52 69.08 123.6 69.08 124.74C69.08 130.23 73.35 134.73 78.93 135.27C79.19 135.27 79.45 135.33 79.73 135.33H132.28L133.57 135.39C134.08 135.36 134.59 135.33 135.1 135.3C135.15 135.3 135.2 135.29 135.26 135.29H135.27C135.38 135.28 135.48 135.28 135.59 135.27C136.25 135.23 136.91 135.19 137.58 135.16C146.61 135.32 153.88 142.69 153.88 151.76C153.88 156.4 151.98 160.6 148.9 163.61C148.3 164.21 147.64 164.75 146.95 165.25C146.93 165.27 146.9 165.29 146.87 165.31C146.38 165.63 145.88 165.94 145.38 166.25C145.12 166.41 144.86 166.57 144.6 166.73C144.16 167 143.72 167.26 143.27 167.51C131.81 174.14 118.51 177.94 104.31 177.94C96.52 177.94 89 176.79 81.89 174.66C49.78 165.03 26.38 135.25 26.38 100C26.38 65.39 48.95 36.04 80.16 25.88C87.77 23.4 95.88 22.06 104.31 22.06C131.22 22.06 154.94 35.69 168.94 56.43C169.79 57.68 170.6 58.95 171.36 60.25C172.82 63.16 173.63 66.45 173.63 69.92C173.63 74.03 172.49 77.88 170.5 81.16Z" />
                    </svg>
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
