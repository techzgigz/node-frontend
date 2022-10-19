import React from 'react';
import { Map,GoogleApiWrapper } from 'google-maps-react';
import Geocode from "react-geocode";

class MapContainer extends React.Component{
    constructor(props){
        super(props);
        this.state={
            dimensions: {
                lat: 28.704060,
                lng: 77.102493
                }
        }
    }
    componentDidMount(){
        Geocode.setApiKey("AIzaSyC3hQvLmM9ut1DEWKPmsX08C09v0AbcpjQ");
        Geocode.setLanguage("en");
        Geocode.setRegion(this.props.countryCode.toLowerCase());
        Geocode.setLocationType("ROOFTOP");
        Geocode.fromAddress(this.props.location).then(
            (response) => {
              const { lat, lng } = response.results[0].geometry.location;
              console.log(lat, lng);
              this.setState({dimensions:response.results[0].geometry.location})
            },
            (error) => {
              console.error(error);
            }
          );
          
    }
    render(){
        return <Map
        google={this.props.google}
        style={{heigth: '300px', width: '400px'}}
        zoom = {10}
        initialCenter = {
            this.state.dimensions
        }
    />
    }
}

export default GoogleApiWrapper({
    apiKey: 'AIzaSyC3hQvLmM9ut1DEWKPmsX08C09v0AbcpjQ'
})(MapContainer)