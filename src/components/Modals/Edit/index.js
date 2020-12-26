import React from "react";
import {Button} from "reactstrap";
import { Modal } from "react-bootstrap";

import FormEditor from "../../Form/Categorie/Editor"

const Modaledit = (props) => {
    const {
        title,
        refreshData,
        setrefreshData,
        stateformEdit,
        setformEdit,
        showEdiMod,
        setshowEdiMod,
        handle,
        setSateAlert,
        listCategorie} = props;
    const ModEdiCateSate = () => setshowEdiMod(!showEdiMod);
    
    return(
        <Modal show={showEdiMod} id="ModalEdit" onHide={ModEdiCateSate}>
            <Modal.Header closeButton>
            <Modal.Title>{title}</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <FormEditor
                handle={handle}
                ModEdiCateSate={ModEdiCateSate}
                setSateAlert={setSateAlert}
                stateformEdit={stateformEdit}
                setformEdit={setformEdit}
                listCategorie={listCategorie}
                refreshData={refreshData}
                setrefreshData={setrefreshData}
                />
            </Modal.Body>
        </Modal>
    )

}

export default Modaledit;