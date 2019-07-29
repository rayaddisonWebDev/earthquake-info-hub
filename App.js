import React from "react";

import "./App.css";
import FourPointFives from "./fourpointfives";
import HighlightEq from "./highlighteq";
import PastSlider from "./pastslider";
import EqCount from "./eqcount";

//big idea! Think about components in terms of what each one needs

//UX/UI
//create a footer that has all sorts of time, date information. and other sciency, EQ things
//make each component take up the whole size of the page.
//Add basic info to top of page.
//    there have been X amount of earthquakes today. Make into separate component. DONE

//DATA
//Identify a single source of truth for my app
//    I think I can make this my shared state ancestor
//map out state flow and find out where my single source of truth needs to be
//    App will make API request and pass the data into each component via props? NOT QUITE
//    each component will need different data, from the same source
//finish API request
//    log data object to console DONE
class App extends React.Component {
  state = {
    loading: true,
    listObj: null
  };

  async componentDidMount() {
    const url =
      "http://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/2.5_day.geojson";
    await fetch(url)
      .then(response => {
        return response.json();
      })
      .then(data => {
        this.setState({ listObj: data, loading: false });
      })
      .catch(error => console.log(error));
  }

  filterForBigEqs(listObj) {
    console.log("in filter for big eqs", listObj);

    if (listObj == null) {
      console.log("returning empty array");
      return [];
    }
    return listObj.features
      .map(feature => {
        return {
          magnitude: feature.properties.mag,
          location: feature.properties.place
        };
      })
      .filter(eq => {
        console.log(eq);
        return eq.magnitude >= 4.5;
      });
  }

  mapAllEqs(listObj) {
    console.log("in filter for all eqs", listObj);

    if (listObj == null) {
      console.log("returning empty array");
      return [];
    }
    return listObj.features.map(feature => {
      return {
        title: feature.properties.title
      };
    });
  }

  render() {
    const { listObj } = this.state;
    console.log(listObj);

    //I basically filtered down props into parts I want

    //this is a mock thing, used to test if we have data flowing properly
    // Big eqs will look like this [{magnitude: 1.2, location: CA}]
    const bigEqs = this.filterForBigEqs(listObj);

    const allEqs = this.mapAllEqs(listObj);

    return (
      <div>
        <h1 className="maintitle">Earthquake News: What 's Shakin'</h1>
        <div className="maindescription">
          See all the latest reports from the USGS, get information on
          earthquakes happening today, and see details on significant siesemic
          events around the world.{" "}
        </div>
        <EqCount dataObject={listObj} loading={this.state.loading} />
        <div className="container">
          <div className="col-10">
            <h4 id="list-item-1">
              {allEqs.map(eq => {
                return <PastSlider title={eq.title} />;
              })}
            </h4>
          </div>
        </div>
        <HighlightEq dataObject={listObj} />
        <div className="ui basic segment">
          <h2 className="ui header">Earthquakes over 4.5 magnitude today</h2>
          {bigEqs.map(eq => {
            return (
              <FourPointFives magnitude={eq.magnitude} location={eq.location} />
            );
          })}
        </div>
      </div>
    );
  }
}

export default App;
