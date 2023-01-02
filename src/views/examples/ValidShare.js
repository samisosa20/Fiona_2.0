import React, {useEffect} from "react";
import { Link } from "react-router-dom";

// reactstrap components
import {
  Button,
  Card,
  CardBody
} from "reactstrap";
import API from "variables/API";


function ValidShareAccount(props) {
    const {idUSer, owner, idAccount} = props;
    useEffect(() => {
        let url = window.location.href;
        let div = url.split("=");
        API.post("edit_data", 
        {
            id: 8,
            owner: owner,
            idu: idUSer,
            account: idAccount
        }
        ).then((response) => {
            //console.log(response.data);
            if (response.data === 200){
                document.getElementById("message").innerHTML = `Everything is ready!
                <br/>
                You can now use ${div[1].replace("%20", " ")}'s account
                <br/>`;
            } else {
                document.getElementById("message").innerHTML = `
                Something went wrong
                <br/>
                Refresh the page or try again later
                <br/>`;
            }
        });
    }, []);
  return (
    <>
        <Card className="col-6 shadow m-auto">
            <CardBody>
                <p id="message"></p>
                <Link to="/auth"><Button
                color="success"
                >
                    Go to page
                </Button>
                </Link>
            </CardBody>
        </Card>
    </>
  );
}
export default ValidShareAccount;
