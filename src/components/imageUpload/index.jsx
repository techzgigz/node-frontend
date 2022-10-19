// imports the React Javascript Library
import React from "react";
//Card
import CardActionArea from "@mui/material/CardActionArea";

import Fab from "@mui/material/Fab";
import Grid from "@mui/material/Grid";

import red from "@mui/material/colors/red";
import blue from "@mui/material/colors/blue";
import AddPhotoAlternateIcon from "@mui/icons-material/AddPhotoAlternate";
import './style.css';


//Tabs
// import { withStyles } from "@mui/styles";

const styles = (theme) => ({
  root: {
    backgroundColor: theme.palette.background.paper,
    width: 500,
    display: "flex",
    justifyContent: "center",
    alignItems: "flex-end"
  },
  icon: {
    margin: theme.spacing.unit * 2
  },
  iconHover: {
    margin: theme.spacing.unit * 2,
    "&:hover": {
      color: red[800]
    }
  },
  cardHeader: {
    textalign: "center",
    align: "center",
    backgroundColor: "white"
  },
  input: {
    display: "none"
  },
  title: {
    color: blue[800],
    fontWeight: "bold",
    fontFamily: "Montserrat",
    align: "center"
  },
  button: {
    color: blue[900],
    margin: 10
  },
  secondaryButton: {
    color: "gray",
    margin: 10
  },
  typography: {
    margin: theme.spacing.unit * 2,
    backgroundColor: "default"
  },

  searchRoot: {
    padding: "2px 4px",
    display: "flex",
    alignItems: "center",
    width: 400
  },
  searchInput: {
    marginLeft: 8,
    flex: 1
  },
  searchIconButton: {
    padding: 10
  },
  searchDivider: {
    width: 1,
    height: 28,
    margin: 4
  }
});

class ImageUploadCard extends React.Component {
  constructor(props){
    super(props);
  this.state = {
    mainState: props.selectedFile?"uploaded":"initial", // initial, search, gallery, uploaded
    imageUploaded: 0,
    selectedFile: props.selectedFile || null,
  };
  }

  handleUploadClick = (event) => {
    console.log("Called");
    var file = event.target.files[0];
    const reader = new FileReader();
    var url = reader.readAsDataURL(file);

    reader.onloadend = function (e) {
      this.setState({
        selectedFile: [reader.result]
      },this.props.onChange([reader.result]));
    }.bind(this);
    console.log(url); // Would see a path?

    this.setState({
      mainState: "uploaded",
      selectedFile: event.target.files[0],
      imageUploaded: 1,
    });
  };

  renderInitialState() {
    const {  theme } = this.props;
    const { value } = this.state;

    return (
      <React.Fragment>
        <Grid container justify="center" alignItems="center">
          <input
            accept="image/*"
            className={'input'}
            id="contained-button-file"
            multiple
            type="file"
            onChange={this.handleUploadClick}
          />
          <label htmlFor="contained-button-file" className="button-file">
            <Fab component="span" className={'button'}>
              <AddPhotoAlternateIcon />
            {/* <div>1024x720</div> */}
            </Fab>
          </label>
        </Grid>
      </React.Fragment>
    );
  }

  handleSearchURL = (event) => {
    console.log();
    var file = event.target.files[0];
    var reader = new FileReader();
    var url = reader.readAsDataURL(file);

    reader.onloadend = function (e) {
      this.setState({
        selectedFile: [reader.result]
      });
    }.bind(this);
    console.log(url); // Would see a path?

    this.setState({
      selectedFile: event.target.files[0],
      imageUploaded: 1
    });
  };

  handleImageSearch(url) {
    var filename = url.substring(url.lastIndexOf("/") + 1);
    console.log(filename);
    this.setState({
      mainState: "uploaded",
      imageUploaded: true,
      selectedFile: url,
      fileReader: undefined,
      filename: filename
    });
  }

  handleSeachClose = (event) => {
    this.setState({
      mainState: "initial"
    });
  };

  handleAvatarClick(value) {
    var filename = value.url.substring(value.url.lastIndexOf("/") + 1);
    console.log(filename);
    this.setState({
      mainState: "uploaded",
      imageUploaded: true,
      selectedFile: value.url,
      fileReader: undefined,
      filename: filename
    });
  }

  renderUploadedState() {
    const {  theme } = this.props;

    return (
      <React.Fragment>
        <CardActionArea onClick={this.imageResetHandler}>
          <img
            width="100%"
            className={'media'}
            src={this.state.selectedFile}
          />
        </CardActionArea>
      </React.Fragment>
    );
  }

  imageResetHandler = (event) => {
    console.log("Click!");
    this.setState({
      mainState: "initial",
      selectedFile: null,
      imageUploaded: 0
    },this.props.onChange(null));
  };

  shouldComponentUpdate(newProps,newState){
    if(this.props.selectedFile!==newProps.selectedFile || JSON.stringify(newState)!==JSON.stringify(this.state)){
      if(this.props.selectedFile!==newProps.selectedFile)
        this.setState({
          mainState: newProps.selectedFile?"uploaded":"initial", // initial, search, gallery, uploaded
          imageUploaded: 0,
          selectedFile: newProps.selectedFile || null,
        })
      return true;
    }
    return false;
  }

  render() {
    const {  theme } = this.props;

    return (
      <React.Fragment>
        <div className={'root'}>
          {(this.state.mainState == "initial" && this.renderInitialState()) ||
            (this.state.mainState == "uploaded" && this.renderUploadedState())}
        </div>
      </React.Fragment>
    );
  }
}

export default ImageUploadCard;
