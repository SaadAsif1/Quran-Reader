import React from "react";
import { Route, Switch } from "react-router-dom";

import Home from "./Components/Home";
import SingalSurah from "./Components/SingalSurah";
import AudioLibrary from "./Components/AudioLibrary";

function Routes() {
  return (
    <Switch>
      <Route exact path='/' component={Home} />
      <Route exact path='/QuranSurah/:name/:id' component={SingalSurah} />
      <Route exact path='/AudioLibrary' component={AudioLibrary} />
    </Switch>
  );
}

export default Routes;
