import React from 'react';
import './style.css';
import { Select, Button, MenuItem, InputLabel, FormControl, Slider, TextField } from '@mui/material';
import { propertyType } from '../../data/houses';
import { connect } from 'react-redux';
import { addFilters } from '../../redux/filters/filtersActions';
import { Country, State } from 'country-state-city';

class LeftNav extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            formData: {
                country: null,
                state: null,
                location: null,
                propertyType: "",
                minPrice: '',
                maxPrice: '',
            },
            states: [],
            countries: Country.getAllCountries(),
        }
    }
    handlePropertyChange = (e,field) => {
        const value = e.target.value;
        let _formData = this.state.formData;
        _formData[[field]] = value;
        this.setState({formData:_formData});
    }
    handleCountryChange = (e) => {
        let _formData = this.state.formData;
        let countryCode = e.target.value;
        let selectedCountry = this.props.selectedCountries.filter((country) => country.isoCode == countryCode)[0];
        _formData['country'] = selectedCountry;
        let _states = State.getStatesOfCountry(countryCode);
        this.setState({ formData: _formData, states: _states });
    }
    // handleStateChange = (e) => {
    //     let stateCode = e.target.value;
    //     let selectedState = this.state.states.length?this.state.states.filter((state) => state.isoCode == stateCode)[0]:{isoCode:stateCode,name:stateCode};
    //     let _formData = this.state.formData;
    //     _formData['state'] = selectedState;
    //     this.setState({ formData: _formData });
    // }
    handleChange = (e) =>{
        let _formData = this.state.formData;
        _formData[[e.target.id]] = e.target.value;
        this.setState({formData: _formData});
    }
    render(){
        let {formData} = this.state;
        console.log(this.props.selectedCountries);
    return (
        <div className={'leftNavContainer'}>
            <FormControl sx={{ m: 1, width: '80%', marginBottom:'20px', textAlign: 'left' }}>
                <InputLabel className='inputLabel' id="demo-simple-select-helper-label">Country</InputLabel>
                <Select
                    labelId="demo-simple-select-helper-label"
                    id="demo-simple-select-helper"
                    value={this.state.formData.country && this.state.formData.country.isoCode}
                    label="Country"
                    className='selectStyles'
                    onChange={this.handleCountryChange}
                >
                    <MenuItem value="">
                        <em>None</em>
                    </MenuItem>
                    {this.state.countries.map((country)=>{
                        return <MenuItem value={country.isoCode}>
                        <em>{country.name}</em>
                    </MenuItem>
                    })}
                </Select>
            </FormControl>
            <FormControl sx={{ m: 1, width: '80%', marginBottom:'20px' }}>
                {/* <InputLabel className='inputLabel' id="demo-simple-select-helper-label1">State</InputLabel> */}
                {/* {this.state.formData.country && this.state.states.length ? <Select
                    labelId="demo-simple-select-helper-label1"
                    id="demo-simple-select-helper1"
                    value={this.state.formData.state && this.state.formData.state.isoCode}
                    label="State"
                    className='selectStyles'
                    onChange={this.handleStateChange}
                >
                    <MenuItem value="">
                        <em>None</em>
                    </MenuItem>
                    {this.state.states.map((state)=>{
                        return <MenuItem value={state.isoCode}>
                        <em>{state.name}</em>
                    </MenuItem>
                    })}
                </Select>: */}
                <TextField 
                    className='textStyles'
                    id="state"
                    label="State"
                    value={this.state.formData.state&&this.state.formData.state.name}
                    onChange={this.handleChange}
                />
            </FormControl>
            <FormControl sx={{ m: 1, width: '80%', marginBottom:'20px' }}>
                <TextField 
                    className='textStyles'
                    id="location"
                    labelId="demo-simple-select-helper-label2"
                    label="Location"
                    value={this.state.formData.location}
                    onChange={this.handleChange}
                />
            </FormControl>
            <FormControl sx={{ m: 1, width: '38%'  }}>
                <TextField 
                    className='textStyles'
                    id="minPrice"
                    labelId="demo-simple-select-helper-label2"
                    label="Min Price"
                    type="number"
                    value={this.state.formData.minPrice}
                    onChange={this.handleChange}
                />
            </FormControl>
            <FormControl sx={{ m: 1, width: '38%' }}>
                <TextField 
                    className='textStyles'
                    id="maxPrice"
                    labelId="demo-simple-select-helper-label2"
                    label="Max Price"
                    type="number"
                    value={this.state.formData.maxPrice}
                    onChange={this.handleChange}
                />
            </FormControl>
            <FormControl sx={{ m: 1, width: '80%', marginBottom:'20px', textAlign: 'left' }}>
                <InputLabel className='inputLabel' id="demo-simple-select-helper-label2">Type</InputLabel>
                <Select
                    labelId="demo-simple-select-helper-label2"
                    id="demo-simple-select-helper2"
                    value={formData.propertyType}
                    label="Type"
                    className='selectStyles'
                    onChange={(e)=>this.handlePropertyChange(e,'propertyType')}
                >
                    <MenuItem value="">
                        <em>None</em>
                    </MenuItem>
                    <MenuItem value={propertyType.Apartment}>
                        <em>Apartments</em>
                    </MenuItem>
                    <MenuItem value={propertyType.Villa}>
                        <em>Villas</em>
                    </MenuItem>
                    <MenuItem value={propertyType.IndependentHouse}>
                        <em>Independent House</em>
                    </MenuItem>
                    <MenuItem value={propertyType.Land}>
                        <em>Land</em>
                    </MenuItem>
                </Select>
            </FormControl>
            <Button className='search-button' onClick={()=> this.props.addFilters(this.state.formData) }>Search</Button>
        </div>
    )
        }
}

const mapStateToProps = state =>{
    return {
        selectedCountries: state.selectedCountries.selectedCountries
    }
}

const mapDispatchToProps = dispatch => {
    return {
        addFilters: (data) => dispatch(addFilters(data))
    }
}

export default connect(mapStateToProps,mapDispatchToProps)(LeftNav);