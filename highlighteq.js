import React from "react";

//UX/UI
//render data in an appealing way DONE
//mayby get button to hide after initial click DONE

//DATA
//Add USGS data to this component DONE
//data will take one random EQ and fill in the box with all its details DONE
//will fill in when the button is pressed DONE
//will have its own state to handle click event DONE
//add logic to make felt read as 0 if felt value is null DONE

//this comp needs state to handle the click of the button DONE
//    click needs to reset state to update button with correct data

//data formatting is correct line 23, but it won't display in render? DONE
//figure out TypeError: Cannot read property 'features' of null error DONE
//    This hapened because I needed to "return" the data result from the API request

//destructure props obj more to make code cleaner
class HighlightEq extends React.Component {
  state = {
    clicked: false,
    isShowing: true
  };

  handleOnClick(event) {
    event.preventDefault();
    this.setState({ clicked: true, isShowing: false });
  }

  render() {
    const { dataObject } = this.props;
    return (
      <div
        id="feature"
        className="ui raised very padded text container segment"
      >
        <h2 id="section-header">Featured Earthquake</h2>
        <div id="section-body">
          {!this.state.clicked ? (
            <p>
              Click below to see a featured earthquake from the past 24 hours!
            </p>
          ) : (
            <div>
              <div>Location: {dataObject.features[0].properties.place}</div>
              <div>
                Coordinates: {dataObject.features[0].geometry.coordinates[0]} ,{" "}
                {dataObject.features[0].geometry.coordinates[1]}
              </div>
              <div>Magnitude: {dataObject.features[0].properties.mag}</div>
              <div>
                People reported feeling it to USGS:{" "}
                {dataObject.features[0].properties.felt == null ? (
                  <span>0</span>
                ) : (
                  <span>{dataObject.features[0].properties.felt}</span>
                )}
              </div>
            </div>
          )}
        </div>
        <button
          id="section-body"
          className="ui button"
          style={{ display: this.state.isShowing ? "block" : "none" }}
          onClick={this.handleOnClick.bind(this)}
        >
          Show
        </button>
      </div>
    );
  }
}

export default HighlightEq;
