import React, {useEffect, useState} from "react";

import "assets/scss/argon-dashboard-react.scss";

const Alert = (props) => {
    const {visible, code} = props;
    const [state, setState] = useState();
    useEffect(()=>{
        if (!visible) {
            setState("alert fixed-bottom mx-auto col-8 col-md-3 mb-2 text-dark bg-success-lighten-20 d-none")
        } else {
            if (code === 200){
                setState("alert fixed-bottom mx-auto col-8 col-md-3 mb-2 text-dark bg-success-lighten-20")
            } else if (code === 400) {
                setState("alert fixed-bottom mx-auto col-8 col-md-3 mb-2 text-dark bg-wrong-darken-10")
            } else {
                setState("alert fixed-bottom mx-auto col-8 col-md-3 mb-2 text-dark bg-warn-lighten-10")
            }
        }
    },[visible, code])
    return (
        <div
          className={state}
          role="alert"
        >
          <i className="far fa-check-circle mr-3 mr-md-5"></i>
          {code === 200 ? "Data save success!" : code === 400 ? "Data doens't save!" :
          code === 300 ? "Data already exists!" : code === 500 ? "Email doens't exists!" : "Fill in all fields"}
        </div>
    )
}

export default Alert;