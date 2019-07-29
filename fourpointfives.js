import React from "react";

//UI/UX

//DATA
//I have props object in here DONE
//Fill in fields with data from USGS DONE
//will take all EQs above 4.5 from that day and place them in DONE IN APP.js
//will need to map out each eq after checking to see if it is above a 4.5 mag DONE

const FourPointFives = props => {
  return (
    <div>
      <p>Location : {props.location}</p>
      <p>Magnitude : {props.magnitude}</p>
      <div className="ui section divider" />
    </div>
  );
};

export default FourPointFives;
