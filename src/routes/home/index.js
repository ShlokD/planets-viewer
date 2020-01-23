import { h, Component } from "preact";
import { planets } from "./data";

export const toTitleCase = str =>
  `${str[0].toUpperCase()}${str.substring(1, str.length).toLowerCase()}`;

export const isValidInput = enteredValue => {
  if(typeof enteredValue === "string") return enteredValue.length !== 0;
  return enteredValue !== undefined && enteredValue !== null
}

const savePlanetsToLocalStorage = planets => {
  if (localStorage) {
    localStorage.setItem("planets", JSON.stringify(planets));
  }
};

const getPlanets = () => {
  if (localStorage) {
    const planets = JSON.parse(localStorage.getItem("planets"));
    return planets || [];
  }

  return [];
};

export const InputField = ({ id, labelText, type, value, onInput }) => {
  const setValue = ev => {
    onInput(ev.target.value);
  };

  return (
    <input
      className="br-pill pa2 mt2"
      placeholder={labelText}
      onInput={setValue}
      id={id}
      type={type}
      value={value}
    ></input>
  );
};

const PlanetList = ({ planets }) => {
  const headings = Object.keys(planets[0]).filter(key => key !== "description");
  return (
    <table className="center">
      <thead>
        <tr>
          {headings.map(heading => (
            <th className="f4 pa3 light-blue b--light-blue bw2 bg-navy center">
              {toTitleCase(heading)}
            </th>
          ))}
        </tr>
      </thead>
      <tbody>
        {planets.map(({ ordinality, name, size, distance }) => {
          return (
            <tr className="f3">
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
      isValidInput(name) &&
      isValidInput(size) &&
      isValidInput(distance) &&
      isValidInput(ordinality)
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
      <div className="flex flex-column items-center justify-center mt4">
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

        <textarea
          id="description"
          placeholder="Enter description..."
          className="mt3 pa2"
          rows={4}
          cols={50}
          value={this.state.description}
          onInput={ev => this.setState({ description: ev.target.value })}
        ></textarea>
        <button
          className="pv2 ph4 mt2 bg-navy light-blue br-pill shadow3 fw4"
          onClick={this.onSubmit}
        >
          Submit
        </button>
      </div>
    );
  }
}

class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      planets
    };

    this.addPlanet = this.addPlanet.bind(this);
  }

  componentDidMount() {
    const savedPlanets = getPlanets();
    if (savedPlanets.length > 0) {
      this.setState({
        planets: savedPlanets
      });
    }
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
