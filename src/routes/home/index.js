import { h, Component } from "preact";
import { InputField } from "../../components/";
import { planets } from "./data";

const toTitleCase = str =>
  `${str[0].toUpperCase()}${str.substring(1, str.length)}`;
const PlanetList = ({ planets }) => {
  const headings = Object.keys(planets[0]).filter(key => key !== "description");
  return (
    <table>
      <thead>
        <tr>
          {headings.map(heading => (
            <th className="f4 pa3">{toTitleCase(heading)}</th>
          ))}
        </tr>
      </thead>
      <tbody>
        {planets.map(({ ordinality, name, size, distance }) => {
          return (
            <tr className="f2">
              <td className="pa3">{ordinality}</td>
              <td className="pa3">
                <a
                  className="no-underline black"
                  href={`/planet/${ordinality}`}
                >
                  {name}
                </a>
              </td>
              <td className="pa3">{size}</td>
              <td className="pa3">{distance}</td>
            </tr>
          );
        })}
      </tbody>
    </table>
  );
};

const validateInput = enteredValue => !!enteredValue;

class PlanetInput extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: "",
      size: "",
      distance: "",
      ordinality: "",
      description: ""
    };

    this.onSubmit = this.onSubmit.bind(this);
  }

  onSubmit() {
    const { name, size, distance, ordinality, description } = this.state;
    if (
      validateInput(name) &&
      validateInput(size) &&
      validateInput(distance) &&
      validateInput(ordinality)
    ) {
      this.props.onSubmitInput({
        ordinality,
        name,
        size,
        distance,
        description
      });

      this.setState({
        name: "",
        size: "",
        distance: "",
        ordinality: "",
        description: ""
      });
    }
  }

  render() {
    return (
      <div className="mt4">
        <InputField
          id="name"
          labelText="Name"
          type="text"
          value={this.state.name}
          onInput={val => this.setState({ name: val })}
        />
        <InputField
          id="size"
          labelText="Size"
          type="number"
          value={this.state.size}
          onInput={val => this.setState({ size: val })}
        />
        <InputField
          id="distance"
          labelText="Distance"
          type="number"
          value={this.state.distance}
          onInput={val => this.setState({ distance: Number(val) })}
        />
        <InputField
          id="ordinality"
          labelText="Ordinality"
          type="number"
          value={this.state.ordinality}
          onInput={val => this.setState({ ordinality: Number(val) })}
        />
        <div className="flex flex-column">
          <label className="mt2" htmlFor="description">
            Description
          </label>
          <textarea
            id="description"
            rows={4}
            cols={50}
            value={this.state.description}
            onInput={ev => this.setState({ description: ev.target.value })}
          ></textarea>
        </div>
        <button onClick={this.onSubmit} className="pa2 mt2">
          Submit
        </button>
      </div>
    );
  }
}

const savePlanetsToLocalStorage = planets => {
  if (localStorage) {
    localStorage.setItem("planets", JSON.stringify(planets));
  }
};

class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      planets
    };

    this.addPlanet = this.addPlanet.bind(this);
  }

  addPlanet(planet) {
    const newPlanets = this.state.planets.slice();
    newPlanets.push(planet);
    this.setState({
      planets: newPlanets
    });
    savePlanetsToLocalStorage(newPlanets);
  }

  componentWillUnmount() {
    if (localStorage) {
      savePlanetsToLocalStorage(this.state.planets);
    }
  }

  render() {
    const { planets } = this.state;
    return (
      <div>
        <PlanetList planets={planets} />
        <PlanetInput onSubmitInput={this.addPlanet} />
      </div>
    );
  }
}

export default Home;
