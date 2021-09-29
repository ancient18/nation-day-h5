import { ReactElement, StrictMode } from "react";
import {
    HashRouter as Router,
    Switch,
    Route,
    Link,
} from "react-router-dom";

import Home from "./views/Home";
import Selection from "./views/Selection";
import {
    Harvest,
    TechFuture,
    AntiEpidemic,
    InterstellarTrip,
} from "./views/games";


import "./assets/styles/main.less";

import Music from '../src/components/Music'

const App = (): ReactElement => (
    // <StrictMode>
    <div>
        <Music />
        <Router>
            <Switch>
                <Route path="/selection">
                    <Selection />
                </Route>
                {/* games */}
                <Route path="/harvest">
                    <Harvest />
                </Route>
                <Route path="/tech-future">
                    <TechFuture />
                </Route>
                <Route path="/anti-epidemic">
                    <AntiEpidemic />
                </Route>
                <Route path="/interstellar-trip">
                    <InterstellarTrip />
                </Route>
                {/* homepage */}
                <Route path="/">
                    <Home />
                </Route>
            </Switch>
        </Router>
    </div>
    // </StrictMode>
);

export default App;