import React, { useEffect, useRef, useState, useCallback } from "react";
import Api from "./Utilites/Api";
import Dashboard from "./Dashboard";
import FeatureView from "./FeatureView";
import Sidebar from "./Sidebar";
import MODULES, { isModuleEnabled } from "./modules";
import { viewToHref, navigateToView } from "./Utilites/urls";

const AUTOSAVE_DEBOUNCE_MS = 600;

/* global cartickAdminSettings */

function Settings(){
    const initialView = ( typeof cartickAdminSettings !== 'undefined' && cartickAdminSettings.view ) || 'dashboard';
    const [settings, setSettings] = useState(null);
    const [view, setView] = useState(initialView);
    const [saveStatus, setSaveStatus] = useState('idle');
    const saveTimer = useRef(null);
    const settingsRef = useRef(null);

    useEffect(() => { settingsRef.current = settings; }, [settings]);

    useEffect(() => {
        Api.get('/cartick/v1/settings').then((res) => {
            setSettings(res.data || null);
        });
    }, []);

    const flattenSettings = (s) => {
        if (!s) return {};
        const out = {};
        Object.keys(s).forEach((group) => {
            const groupVal = s[group];
            if (groupVal && typeof groupVal === 'object') {
                Object.assign(out, groupVal);
            }
        });
        return out;
    };

    const persist = useCallback(() => {
        const next = settingsRef.current;
        if (!next) return;
        setSaveStatus('saving');
        Api.post('/cartick/v1/settings', flattenSettings(next))
            .then(() => {
                setSaveStatus('saved');
                setTimeout(() => setSaveStatus('idle'), 1500);
            })
            .catch(() => setSaveStatus('error'));
    }, []);

    const scheduleSave = useCallback(() => {
        if (saveTimer.current) clearTimeout(saveTimer.current);
        saveTimer.current = setTimeout(persist, AUTOSAVE_DEBOUNCE_MS);
    }, [persist]);

    const updateField = useCallback((groupKey, fieldKey, value) => {
        setSettings((s) => {
            if (!s) return s;
            return {
                ...s,
                [groupKey]: { ...(s[groupKey] || {}), [fieldKey]: value },
            };
        });
        scheduleSave();
    }, [scheduleSave]);

    const handleToggle = (mod, enabled) => {
        const [group, field] = mod.statusPath;
        updateField(group, field, enabled);
    };

    const handleConfigure = (mod) => navigateToView(mod.id);
    const handleBack = () => navigateToView('dashboard');

    const currentModule = view === 'dashboard'
        ? null
        : MODULES.find((m) => m.id === view);

    return (
        <div className="cartick-wrap__inner">
            <div className="cartick-shell">
                <Sidebar view={view} onNavigate={navigateToView} />
                <main className="cartick-shell__main">
                    { view === 'dashboard' && (
                        <Dashboard
                            settings={settings}
                            saveStatus={saveStatus}
                            onToggle={handleToggle}
                            onConfigure={handleConfigure}
                        />
                    ) }
                    { view !== 'dashboard' && currentModule && (
                        <FeatureView
                            module={currentModule}
                            enabled={isModuleEnabled(settings, currentModule)}
                            values={settings ? settings[currentModule.settingsKey] : null}
                            saveStatus={saveStatus}
                            onBack={handleBack}
                            onToggle={handleToggle}
                            onFieldChange={(field, value) => updateField(currentModule.settingsKey, field, value)}
                        />
                    ) }
                </main>
            </div>
        </div>
    );
}

export default Settings;
