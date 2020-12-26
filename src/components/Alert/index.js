import React, {useEffect, useState} from "react";

import "assets/scss/argon-dashboard-react.scss";

const Alert = (props) => {
    const {visible, code} = props;
    const [state, setState] = useState();
    useEffect(()=>{
        if (!visible) {
            setState("alert fixed-bottom mx-auto col-3 mb-2 text-dark bg-success-lighten-20 d-none")
        } else {
            if (code === 200){
                setState("alert fixed-bottom mx-auto col-3 mb-2 text-dark bg-success-lighten-20")
            } else {
                setState("alert fixed-bottom mx-auto col-3 mb-2 text-dark bg-wrong-darken-10")
            }
        }
    },[visible])
    return (
        <div
          className={state}
          role="alert"
        >
          <i className="far fa-check-circle mr-5"></i>
          {code === 200 ?"Data save success!" : "Data doens't save!"}
        </div>
    )
}

export default Alert;