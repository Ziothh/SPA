import React from 'react';
import {BrowserRouter as Router, Route, Switch} from "react-router-dom";

import '../scss/App.scss';

import Navbar from '../components/navbar/Navbar';
// import Topbar from '../components/topbar/Topbar';

import LandingPage from '../pages/LandingPage'
import Schedule from '../pages/Schedule';
import TaskManager from '../pages/TaskManager';

function App() {
  return (
    <Router>
        <div id="app-container" className="theme-dark">
            <Navbar/>
            {/* <Topbar /> */}
            <main>
                <Switch>
                    <Route path="/" exact>
                        <LandingPage />
                    </Route>
                    <Route path="/charts" exact>
                        {/* < /> */}
                    </Route>
                    <Route path="/modules" exact>
                        {/* < /> */}
                    </Route>
                    <Route path="/tasks" exact>
                        <TaskManager/>
                    </Route>
                    <Route path="/schedule" exact>
                        <Schedule />
                    </Route>
                    <Route path="/expense" exact>
                        {/* <CategoriesContextProvider>
                            <ExpenseTracker />
                        </CategoriesContextProvider> */}
                    </Route>
                    {/* <Route path="/about" exact>
                        < />
                    </Route> */}
                    <Route path="/settings" exact>
                        {/* < /> */}
                    </Route>
                </Switch>
            </main>
        </div>
    </Router>
  );
}

export default App;
