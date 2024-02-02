import React from 'react';
import { render } from 'react-dom';
import Settings from "./Settings";

const App = () => {
    return (
        <React.StrictMode>
            <Settings />
        </React.StrictMode>
    );
}

render( <App/>, document.getElementById( 'cartick-admin' ) );
