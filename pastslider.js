import React from "react";

//UI/UX
//I have added Bootstrap, now I need to figure out how to make the scroll box fit the height for pastslider DONE
//I can play around with the visuals of that later

//DATA
//figure out what data I want here --> JUST TITLE
//Add USGS data to these fields
//I need to create logic to filter out the object properties I want
//I need to make another component that maps through the data and displays it
const PastSlider = props => {
  return (
    <div>
      <h4>{props.title}</h4>
      <div className="ui section divider" />
    </div>
  );
};

export default PastSlider;
