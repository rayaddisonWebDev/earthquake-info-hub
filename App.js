import React from "react";

//css
import "./App.css";
//images
import Eqimage1 from "./eq.jpg";
import Eqimage3 from "./eqthree.jpg";
//components
import Nav from "./nav";
import FourPointFives from "./fourpointfives";
import HighlightEq from "./highlighteq";
import PastSlider from "./pastslider";
import EqCount from "./eqcount";
import Footer from "./footer";

//big idea! Think about components in terms of what each one needs

//UX/UI
//create a Nav bar that stays as you scroll, has links to each section
//import two images for backgrounds
//create a footer that has all sorts of time, date information. and other sciency, EQ things
//make each component take up the whole size of the page.
//Add basic info to top of page. DONE
//    there have been X amount of earthquakes today. Make into separate component. DONE

//DATA
//Identify a single source of truth for my app DONE
//    I think I can make this my shared state ancestor DONE
//map out state flow and find out where my single source of truth needs to be DONE
//    App will make API request and pass the data into each component via props? DONE
//    each component will need different data, from the same source DONE
//finish API request DONE
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
    if (listObj == null) {
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
        return eq.magnitude >= 4.5;
      });
  }

  mapAllEqs(listObj) {
    if (listObj == null) {
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

    //I basically filtered down props into parts I want

    //this is a mock thing, used to test if we have data flowing properly
    // Big eqs will look like this [{magnitude: 1.2, location: CA}]
    const bigEqs = this.filterForBigEqs(listObj);

    const allEqs = this.mapAllEqs(listObj);

    return (
      <div>
        <Nav />
        <div id="count" className="jumbotron">
          <h1 className="maintitle">Earthquake News: What 's Shakin'</h1>
          <div className="maindescription">
            See all the latest reports from the USGS, get information on
            earthquakes happening today, and see details on significant siesemic
            events around the world.{" "}
          </div>
          <EqCount dataObject={listObj} loading={this.state.loading} />
        </div>
        <div id="border-div" />
        <img src={Eqimage1} alt="earthquake1" />
        <div id="history" className="ui basic segment">
          <h2 id="section-header" className="ui header">
            Scroll to see earthquakes around the world from the past 24 hours.
          </h2>
          <div className="container">
            <div className="col-10">
              <h4 id="list-item-1">
                {allEqs.map(eq => {
                  return <PastSlider title={eq.title} />;
                })}
              </h4>
            </div>
          </div>
        </div>
        <div id="border-div" />
        <img className="imgtwo" src={Eqimage3} alt="earthquake3" />
        <HighlightEq dataObject={listObj} />
        <div id="mags" className="ui basic segment">
          <h2 id="section-header" className="ui header">
            Earthquakes over 4.5 magnitude today
          </h2>
          {bigEqs.map(eq => {
            return (
              <FourPointFives magnitude={eq.magnitude} location={eq.location} />
            );
          })}
        </div>
        <Footer />
      </div>
    );
  }
}

export default App;
