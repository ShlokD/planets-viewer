import { h, Component } from "preact";
import { Router } from "preact-router";

// Code-splitting is automated for routes
import Home from "./routes/home";
import Planets from "./routes/planets";

export default class App extends Component {
  handleRoute = e => {
    this.currentUrl = e.url;
  };

  render() {
    return (
      <div id="app" className="pa4 ma4">
        <Router onChange={this.handleRoute}>
          <Home path="/" />
          <Planets path="/planet/:ordinality" />
        </Router>
      </div>
    );
  }
}
