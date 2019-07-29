import React from "react";

const EqCount = props => {
  return (
    <div className="ui raised very padded text container segment">
      <h2 className="ui center aligned header">
        USGS Magnitude 2.5+ Earthquakes, Past Day
      </h2>
      <div className="ui center aligned container">
        There have been:
        {props.loading || !props.dataObject ? (
          <div>loading...</div>
        ) : (
          <div>{props.dataObject.metadata.count}</div>
        )}{" "}
        earthquakes in the past 24 hours.
      </div>
    </div>
  );
};

export default EqCount;
