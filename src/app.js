import React from 'react';
import ReactDOM from 'react-dom';
import AppRoot from './components/AppRoot';
// import Counter from './counter'
import { AppContainer } from 'react-hot-loader';
import Data from "../data/bio"

function render(Component){
    // we are already rendering in render.js
    // replace render() with hydrate(), this way you get all the events and props without rerendering
    ReactDOM.hydrate(
        <AppContainer>
            <Component heading={Data.heading} content={Data.bioText}/>
        </AppContainer>,
        document.getElementById("react-root")
    )
}

render(AppRoot);

// Deprecated as of hot-loader-v4^
// -module.hot is handled on component level

// if (module.hot) {
//     module.hot.accept("./counter.js", () => {
        // default at the end because it exported default
//         const NewCounter = require("./counter.js").default;
//         render(NewCounter);
//     })
// }