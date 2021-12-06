import React from "react";
import { Modal } from "react-bootstrap";

import FormEditor from "../../Form/Planned/Editor";

const Modaledit = props => {
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
    OpenModalDelete,
    stateCatego,
    stateAcount
  } = props;
  const ModEdiCateSate = () => setshowEdiMod(!showEdiMod);

  return (
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
          refreshData={refreshData}
          setrefreshData={setrefreshData}
          OpenModalDelete={OpenModalDelete}
          stateAcount={stateAcount}
          stateCatego={stateCatego}
        />
      </Modal.Body>
    </Modal>
  );
};

export default Modaledit;
