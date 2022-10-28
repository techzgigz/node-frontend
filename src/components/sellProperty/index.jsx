import React from 'react';
import './style.css';
import { TextField, Button, Select, FormControl, MenuItem, File, Avatar, OutlinedInput, InputAdornment } from '@mui/material';
import { propertyType, timeFrame, category, propertySizeType } from '../../data/houses';
import { addProperty } from '../../services/api.js';
import { Country, State, City } from 'country-state-city';
import { useEffect } from 'react';
import ImageUpload from '../imageUpload';
import { Link, useNavigate } from 'react-router-dom';
import LocationPicker from 'react-location-picker';
import { previewItem } from '../../redux/previewItem/previewItemActions';
import { connect } from 'react-redux';
import { GoogleComponent } from 'react-google-location';
import { initialState } from '../../redux/previewItem/previewItemReducer';
import ApiRequest from "../../services/sellProperty.js";



// import {useHistroy} from 'react-router-dom';

const defaultPosition = {
    lat: 27.9878,
    lng: 86.9250
};

class SellProperty extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            formData: props.preview,
            errorData: {
                timeFrame: '',
                subsciptionDate: '',
                currentlySubscribed: '',
                country: '',
                state: '',
                location: '',
                pincode: '',
                category: '',
                propertySize: '',
                propertySizeType: '',
                propertyType: '',
                price: '',
                bedrooms: '',
                bathrooms: '',
                parking: '',
                contactName: '',
                contactNumber: '',
                contactEmail: '',
                overview: '',
                img1: '',
                img2: '',
                img3: '',
                img4: '',
                img5: '',
            },
            isSubmitDisabled: this.enableSubmit(),
            countries: Country.getAllCountries(),
            states: props.preview.country ? State.getStatesOfCountry(props.preview.country.isoCode) : [],
            address: "Kala Pattar Ascent Trail, Khumjung 56000, Nepal",
            position: {
                lat: 0,
                lng: 0
            }
        }
    }
    handleLocationChange({ position, address, places }) {
        // Set new location
        this.setState({ position, address });
    }
    handlePreview = () => {
        let formKeys = Object.keys(this.state.formData);
        let errorData = {};
        if (this.state.isSubmitDisabled) {
            formKeys.map((key) => {
                if (this.state.formData[[key]] !== 0 && !this.state.formData[[key]]) {
                    errorData[[key]] = '*'
                }
            })
            this.setState({ errorData: errorData });
        }
        else {
            const history = useNavigate();
            this.props.previewItem(this.state.formData);
            console.log(this.state.formData)
            history('/preview');
        }
        console.log('formKeys', this.state.formData)
    }





    enableSubmit = () => {
        if (this.state) {
            let formKeys = Object.keys(this.state.formData);
            let _disabled = false;
            formKeys.map((key) => {
                if (this.state.formData[[key]] !== 0 && !this.state.formData[[key]]) {
                    _disabled = true;
                }
            })
            this.setState({ isSubmitDisabled: _disabled });
        }
        else
            this.setState({ isSubmitDisabled: false });
    }
    setFormState = (field, value) => {
        let _formData = this.state.formData;
        _formData[[field]] = value;
        let errorData = this.state.errorData;
        if (errorData[[field]] && value) errorData[[field]] = '';
        this.setState({ formData: _formData, errorData: errorData }, this.enableSubmit);
        console.log("formData--setFormState", this.state.formData)
    }
    handleChange = (e) => {
        let id = e.target.id;
        let value = e.target.value;
        this.setFormState(id, value);
    }
    handleCountryChange = (e) => {
        let _formData = this.state.formData;
        let countryCode = e.target.value;
        let selectedCountry = this.state.countries.filter((country) => country.isoCode == countryCode)[0];
        _formData['country'] = selectedCountry;
        let _states = State.getStatesOfCountry(countryCode);
        let errorData = this.state.errorData;
        if (errorData.country) errorData.country = '';
        this.setState({ formData: _formData, states: _states, errorData: errorData });
    }
    // handleStateChange = (e) => {
    //     let stateCode = e.target.value;
    //     let selectedState = this.state.states.length?this.state.states.filter((state) => state.isoCode == stateCode)[0]:{isoCode:stateCode,name:stateCode};
    //     this.setFormState('state', selectedState);
    // }
    handleTimeFrameChange = (e) => {
        this.setFormState('timeFrame', e.target.value);
    }
    handleCategoryChange = (e) => {
        this.setFormState('category', e.target.value);
    }
    handlePropertySizeChange = (e) => {
        this.setFormState('propertySizeType', e.target.value);
    }
    handlePropertyChange = (e) => {
        this.setFormState('propertyType', e.target.value);
    }
    componentDidMount() {
        console.log(initialState.preview)
        if (this.props.preview.id) {
            this.props.previewItem(initialState.preview);
            this.setState({ formData: initialState.preview }, this.enableSubmit);
        }
        this.enableSubmit();
    }
    render() {
        let { countries, states, formData } = this.state;
        return (
            <div className={'sellProperty'}>
                <div className='form-header'>
                    <span><b>POSTING CHARGES: </b></span>
                    <span className='charges-heading'>$2/month</span>
                    <span>/</span>
                    <span className='charges-heading'>$20/year</span>
                </div>
                <div className='formContainer'>
                    <table>
                        <tr className='formControl'>
                            <td>
                                <span>TIME-FRAME:</span>
                            </td>
                            <td>
                                <Select
                                    className='formelement'
                                    id="timeFrame"
                                    value={formData.timeFrame}
                                    placeholder='ex:Montly/yearly etc'
                                    onChange={this.handleTimeFrameChange}
                                >
                                    <MenuItem value={timeFrame.Monthly}>
                                        <em>Monthly</em>
                                    </MenuItem>
                                    <MenuItem value={timeFrame.Yearly}>
                                        <em>Yearly</em>
                                    </MenuItem>
                                </Select>
                            </td>
                        </tr>
                        <tr className='formControl'>
                            <td>
                                <span>COUNTRY:</span><span className='error'>{this.state.errorData.country}</span>
                            </td>
                            <td>
                                <Select
                                    className='formelement'
                                    id="country"
                                    value={formData.country && formData.country.isoCode}
                                    placeholder='ex:U.A.E/U.S.A/Australia,etc'
                                    onChange={this.handleCountryChange}
                                >
                                    {countries.map((country) => {
                                        return <MenuItem value={country.isoCode}>
                                            {country.name}
                                        </MenuItem>
                                    })}
                                </Select>
                            </td>

                        </tr>
                        <tr className='formControl'>
                            <td>
                                <span>STATE:</span><span className='error'>{this.state.errorData.state}</span>
                            </td>
                            <td>
                                {/* {this.state.formData.country && this.state.states.length ? <Select
                                    className='formelement'
                                    id="state"
                                    value={formData.state && formData.state.isoCode}
                                    placeholder='ex:Dubai/Newyork/Victoria,etc'
                                    onChange={this.handleStateChange}
                                >
                                    {states.map((state) => {
                                        return <MenuItem value={state.isoCode}>
                                            <em>{state.name}</em>
                                        </MenuItem>
                                    })}
                                </Select>: */}
                                <TextField
                                    className='formelement'
                                    placeholder='ex:Newyork,Alabama,Tabuk,etc.'
                                    id="state"
                                    value={formData.state.name}
                                    onChange={this.handleChange}
                                />
                            </td>
                        </tr>
                        <tr className='formControl'>
                            <td>
                                <span>LOCATION:</span><span className='error'>{this.state.errorData.location}</span>
                            </td>
                            <td>
                                <TextField
                                    className='formelement'
                                    placeholder='ex:Arlington Heights 735 S Roosevelt Avenue'
                                    id="location" value={formData.location}
                                    onChange={this.handleChange}
                                />
                            </td>
                        </tr>
                        <tr className='formControl'>
                            <td>
                                <span>PINCODE:</span><span className='error'>{this.state.errorData.pincode}</span>
                            </td>
                            <td>
                                <TextField
                                    className='formelement' placeholder='ex:100001,234783, etc' id="pincode" value={formData.pincode} onChange={this.handleChange} />
                            </td>

                        </tr>
                        <tr className='formControl'>

                            <td>
                                <span>CATEGORY:</span><span className='error'>{this.state.errorData.category}</span>
                            </td>
                            <td>
                                <Select
                                    className='formelement'
                                    id="category"
                                    value={formData.category}
                                    placeholder='ex:Residential/Commercial'
                                    onChange={this.handleCategoryChange}
                                >
                                    <MenuItem value={category.Residential}>
                                        <em>Residential</em>
                                    </MenuItem>
                                    <MenuItem value={category.Commercial}>
                                        <em>Commercial</em>
                                    </MenuItem>
                                </Select>
                            </td>
                        </tr>
                        <tr className='formControl'>
                            <td>
                                <span>PROPERTY SIZE:</span><span className='error'>{this.state.errorData.propertySize}</span>
                            </td>
                            <td>
                                <div className='formelement'>
                                    <TextField placeholder='ex: 500sqm/2Acre' id="propertySize" value={formData.propertySize} onChange={this.handleChange}></TextField>
                                    <Select
                                        id="propertySizeType"
                                        value={formData.propertySizeType}
                                        onChange={this.handlePropertySizeChange}
                                    >
                                        <MenuItem value={propertySizeType.sqm}>SQM</MenuItem>
                                        <MenuItem value={propertySizeType.acer}>Acre</MenuItem>
                                    </Select>
                                </div>
                            </td>
                        </tr>
                        <tr className='formControl'>
                            <td>
                                <span>PROPERTY TYPE:</span>
                            </td>
                            <td>
                                <Select
                                    className='formelement'
                                    id="propertyType"
                                    value={formData.propertyType}
                                    placeholder='ex:Apts/Villa/Independent House/land/etc'
                                    onChange={this.handlePropertyChange}
                                >
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
                            </td>
                        </tr>
                        <tr className='formControl'>
                            <td>
                                <span>PRICE:</span><span className='error'>{this.state.errorData.price}</span>
                            </td>
                            <td>
                                <OutlinedInput
                                    className='formelement'
                                    id="price"
                                    value={formData.price}
                                    onChange={this.handleChange}
                                    startAdornment={<InputAdornment position="start">$</InputAdornment>}
                                />
                            </td>
                        </tr>
                        <tr className='formControl'>
                            <td>
                                <span>BEDROOM:</span><span className='error'>{this.state.errorData.bedrooms}</span>
                            </td>
                            <td>
                                <TextField
                                    className='formelement' placeholder='ex:0/1/2/3/4 etc' id="bedrooms" value={formData.bedrooms} onChange={this.handleChange}></TextField>
                            </td>
                        </tr>
                        <tr className='formControl'>
                            <td>
                                <span>BATHROOM:</span><span className='error'>{this.state.errorData.bathrooms}</span>
                            </td>
                            <td>
                                <TextField
                                    className='formelement' placeholder='ex:0/1/2/3/4 etc' id="bathrooms" value={formData.bathrooms} onChange={this.handleChange}></TextField>
                            </td>
                        </tr>
                        <tr className='formControl'>
                            <td>
                                <span>PARKING:</span><span className='error'>{this.state.errorData.parking}</span>
                            </td>
                            <td>
                                <TextField
                                    className='formelement' placeholder='ex:0/1/2/3/4 etc' id="parking" value={formData.parking} onChange={this.handleChange}></TextField>
                            </td>
                        </tr>
                        <tr className='formControl'>
                            <td>
                                <span>CONTACT NAME:</span><span className='error'>{this.state.errorData.contactName}</span>
                            </td>
                            <td>
                                <TextField
                                    className='formelement' placeholder='ex: Elise Rinalsi' id="contactName" value={formData.contactName} onChange={this.handleChange}></TextField>
                            </td>
                        </tr>
                        <tr className='formControl'>
                            <td>
                                <span>CONTACT NUMBER:</span><span className='error'>{this.state.errorData.contactNumber}</span>
                            </td>
                            <td>
                                <TextField
                                    className='formelement' placeholder='ex:[+022 -7543543454]' id="contactNumber" value={formData.contactNumber} onChange={this.handleChange}></TextField>
                            </td>
                        </tr>
                        <tr className='formControl'>
                            <td>
                                <span>CONTACT EMAIL:</span><span className='error'>{this.state.errorData.contactEmail}</span>
                            </td>
                            <td>
                                <TextField
                                    className='formelement' placeholder='ex:eluserinalsi@gmail.com' id="contactEmail" value={formData.contactEmail} onChange={this.handleChange}></TextField>
                            </td>

                        </tr>
                    </table>
                    <div>
                        <div className='formControl'>
                            <div className='formLabel boldLabel'>OVERVIEW:<span className='error'>{this.state.errorData.overview}</span></div>
                            <TextField className='overview' rows={15} multiline={true} id="overview" value={formData.overview} onChange={this.handleChange}
                                placeholder={'Description:\nAIM Realty has started taking Expression of Interest for this beautiful 7-Bedroom Mansion.Enjoy Breathtaking Views Facing the Crystal Lagoons at DAMAC LAGOONS New Launch ( Portofino). There are a lot of factors to consider like the value of the property, goodwill of the developer, legal aspect, quality of house design, availability of amenities & a lot more.\nAmenities:\nArchitecture Style:Villa\nExterior Type:Residential floor\nLiving Room:2\nBedroom:7\nBathroom:8\nParking:covered\nProperty size:7,268 SqFt\ncategory: Residential'}
                            ></TextField>
                        </div>
                        <div className='image-control'>
                            <div className='formLabel boldLabel'>UPLOAD IMAGES<span className='error'>{this.state.errorData.img1 || this.state.errorData.img2 || this.state.errorData.img3 || this.state.errorData.img4 || this.state.errorData.img5}</span></div>
                            <div className='imageContainer'>
                                <ImageUpload cardName="Input Image" selectedFile={this.state.formData.img1} onChange={(value) => this.setFormState("img1", value)} />
                                <ImageUpload cardName="Input Image" selectedFile={this.state.formData.img2} onChange={(value) => this.setFormState("img2", value)} />
                                <ImageUpload cardName="Input Image" selectedFile={this.state.formData.img3} onChange={(value) => this.setFormState("img3", value)} />
                                <ImageUpload cardName="Input Image" selectedFile={this.state.formData.img4} onChange={(value) => this.setFormState("img4", value)} />
                                <ImageUpload cardName="Input Image" selectedFile={this.state.formData.img5} onChange={(value) => this.setFormState("img5", value)} />
                            </div>
                        </div>
                        <div className='actionContainer'>
                            <Button variant="contained" onClick={this.handlePreview}><Link to={this.state.isSubmitDisabled ? '/sellproperty' : '/preview'}>PREVIEW</Link></Button>
                            {/* <Button variant="contained" disabled={this.state.isSubmitDisabled}><Link to="/payment">SUBMIT</Link></Button> */}
                        </div>

                    </div>
                </div>
            </div>
        )
    }
}

const mapStateToProps = state => {
    return {
        preview: state.preview.preview
    }
}

const mapDispatchToProps = dispatch => {
    return {
        previewItem: (data) => dispatch(previewItem(data))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(SellProperty);