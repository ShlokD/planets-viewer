import { h, Component } from "preact";

const getSelectedPlanet = ordinality => {
  if (localStorage) {
    const planets = JSON.parse(localStorage.getItem("planets"));
    return planets.find(planet => planet.ordinality === Number(ordinality));
  }

  return {};
};

export default class extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedPlanet: {}
    };
  }

  componentDidMount() {
    const { ordinality } = this.props;
    const selectedPlanet = getSelectedPlanet(ordinality);
    this.setState({
      selectedPlanet: selectedPlanet
    });
  }

  render() {
    const { selectedPlanet } = this.state;
    const { name, description } = selectedPlanet;
    return (
      <div>
        <h1>{name}</h1>
        <p>{description}</p>
      </div>
    );
  }
}
