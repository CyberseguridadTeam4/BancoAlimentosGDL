import React from 'react'
import "./PasswordMeter.css"
import PopUp from "../PopUp/PopUp"

export default function PasswordMeter({password, updatePassword, updateValidPassword}) {
    const [lightStatus, updateLightStatus] = React.useState("red")
    const [showPopUp, updateShowPopUp] = React.useState(false)
    const [points, updatePoints] = React.useState([false, false, false])

    function PasswordMeter(){
        var points = [false, false, false]
        var counter = 0
        let specialChars = "@#%-_!?$=+*1234567890"

        if (password.length >= 8){ points[0] = true; counter++ } else { points[0] = false }

        for (let i = 0; i < specialChars.length; i++){
            if (password.includes(specialChars[i])){ points[1] = true; counter++ }
        }

        for (let i = 0; i < password.length; i++){
            if (password.charAt(i) == password.charAt(i).toUpperCase() && password !== ""){ points[2] = true; counter++ }
        }

        updatePoints(points)

        if (counter >= 3 && counter < 8 && points.every(Boolean)){
            updateLightStatus("yellow")
            updateValidPassword(true)
        }
        else if (counter >= 8 && points.every(Boolean)){
            updateLightStatus("green")
            updateValidPassword(true)
        }
        else{
            updateLightStatus("red")
            updateValidPassword(false)
        }
    }

    return (
        <div className="password-meter">
            <input className="password-input" type="password" placeholder="Password" onChange={(e) => {PasswordMeter(); updatePassword(e.target.value)}} />
            <div onClick={() => updateShowPopUp(true)} className={`password-light ${lightStatus}`}></div>
            {showPopUp
            ? <PopUp title={"Password Requirements"} description={<PopUpDescription points={points}/>} closeFunc={updateShowPopUp} />
            : "" }
        </div>
    )
}

export function PopUpDescription({points}){
    return(
        <div className="password-description">
            <ul>
                <li>- Use more than 8 characters</li>
                <li>- Include at least a number or symbol (@#%-_!?$=+*)</li>
                <li>- Includes at least Uppercase letter</li>
            </ul>
        </div>
    )
}
