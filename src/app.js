import React from 'react';
import ReactDOM from 'react-dom';
import Counter from './counter';
import { AppContainer } from 'react-hot-loader';

function render(Component){
    ReactDOM.render(
        <AppContainer>
            <Component />
        </AppContainer>,
        document.getElementById("react-root")
    )
}

render(Counter);

// Deprecated as of hot-loader-v4^
// -module.hot is handled on component level

// if (module.hot) {
//     module.hot.accept("./counter.js", () => {
//         //default at the end because it exported default
//         const NewCounter = require("./counter.js").default;
//         render(NewCounter);
//     })
// }