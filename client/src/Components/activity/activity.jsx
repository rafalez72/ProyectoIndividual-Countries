import React from "react";
import './activity.css'
export default function Activity ({name, difficulty,duration, season}){
    return(
        <ul className="activityUl">
            <li className="activityLo">
                <p><h3 ><u>Activity:</u> </h3>{name}</p>
            </li>

            <li className="activityLo">
               <p><h3><u>Difficulty level:</u> </h3>{difficulty}</p>
            </li >
            <li className="activityLo">
                <p> <h3 ><u>Duration: </u></h3>{duration}</p>
            </li >
            <li className="activityLo">
                <p><h3 ><u>Season:</u> </h3>{season}</p>
            </li >
        </ul>
    )

}
