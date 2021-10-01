import { ReactElement, StrictMode } from "react";
import {
    HashRouter as Router,
    Switch,
    Route,
    Redirect,
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
                {/* pages */}
                <Route exact path="/" component={Home} />
                <Route exact path="/selection" component={Selection} />
                {/* games */}
                <Route exact path="/harvest" component={Harvest} />
                <Route exact path="/tech-future" component={TechFuture} />
                <Route exact path="/anti-epidemic" component={AntiEpidemic} />
                <Route exact path="/interstellar-trip" component={InterstellarTrip} />
                {/* redirect */}
                <Redirect exact from="/tech-future/reload" to="/tech-future" />
            </Switch>
        </Router>
    </div>
    // </StrictMode>
);

export default App;