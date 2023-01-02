import React from "react";

// Components
import { Button, Container } from "reactstrap";
import useComponents from "views/components";

// Controllers
import useControllers from "controllers";

const Account = () => {
  // Components
  const { Headers, Alert, Modals, AcountAdd } = useComponents();
  const { Header } = Headers();
  const {
    ModalEditAcount,
    Modaldelete,
    ModalAcountAdd,
    ModalAddMovement,
    ModalTranfer,
    ModalshareAccount,
  } = Modals();

  const { useScreenHooks } = useControllers();
  const { useAccounts } = useScreenHooks();
  const {
    stateCatego,
    stateAcount,
    stateEvent,
    stateAlert,
    stateSignal,
    OpenModalNew,
    OpenModalDelete,
    OpenModalShare,
    OpenModalEdit,
    VerifySignal,
    ChangeSignal,
    handleChangeTrans,
    OpenModalMovi,
    OpenModalTrans,
    handleChange,
    handleChangeEdit,
    handleSubmit,
    handleSubmitMovi,
    handleSubmit_trans,
    handleSubmitEdit,
    showNewMod,
    state,
    ModNewCateSate,
    stateform,
    showNewModMovi,
    ModNewMoviSate,
    stateformEdit,
    refreshData,
    setrefreshData,
    showDelMod,
    setshowDelMod,
    setSateAlert,
    showShareMod,
    setshowShareMod,
    showEdiMod,
    ModEdiCateSate,
    showNewTransMod,
    ModNewTransSate,
    stateformtrans,
  } = useAccounts();

  return (
    <>
      <Header />
      <Container className="mt--7" fluid>
        <div className="col justify-content-end row p-0 m-0">
          <Button className="btn-info mb-3" onClick={(e) => OpenModalMovi(e)}>
            <i className="fas fa-plus mr-2"></i>
            Move
          </Button>
          <Button
            className="btn-success mb-3"
            onClick={(e) => OpenModalTrans(e)}
          >
            <i className="fas fa-exchange-alt mr-2"></i>
            Transfer
          </Button>
        </div>
        <AcountAdd
          state={state}
          OpenModalNew={OpenModalNew}
          OpenModalEdit={OpenModalEdit}
          OpenModalDelete={OpenModalDelete}
          OpenModalShare={OpenModalShare}
        />
        <ModalAcountAdd
          showNewMod={showNewMod}
          ModNewCateSate={ModNewCateSate}
          handleSubmit={handleSubmit}
          handleChange={handleChange}
        />
        <ModalAddMovement
          stateSignal={stateSignal}
          ChangeSignal={ChangeSignal}
          VerifySignal={VerifySignal}
          handleChange={handleChange}
          stateAcount={stateAcount}
          stateCatego={stateCatego}
          stateEvent={stateEvent}
          stateform={stateform}
          showNewModMovi={showNewModMovi}
          handleSubmitMovi={handleSubmitMovi}
          ModNewMoviSate={ModNewMoviSate}
        />
        <Modaldelete
          action="account"
          title="Delete account"
          message={
            "Are you sure delete the account " +
            stateformEdit.edit_account +
            "?"
          }
          refreshData={refreshData}
          setrefreshData={setrefreshData}
          state={stateformEdit}
          showDelMod={showDelMod}
          setshowDelMod={setshowDelMod}
          setSateAlert={setSateAlert}
        />
        <ModalshareAccount
          title="Share account"
          message={
            "Are you sure share the account " + stateformEdit.edit_account + "?"
          }
          refreshData={refreshData}
          setrefreshData={setrefreshData}
          state={stateformEdit}
          showShareMod={showShareMod}
          setshowShareMod={setshowShareMod}
          setSateAlert={setSateAlert}
        />
        <ModalEditAcount
          showEdiMod={showEdiMod}
          ModEdiCateSate={ModEdiCateSate}
          handleSubmitEdit={handleSubmitEdit}
          stateformEdit={stateformEdit}
          handleChangeEdit={handleChangeEdit}
        />
        <ModalTranfer
          showNewTransMod={showNewTransMod}
          handleSubmit_trans={handleSubmit_trans}
          stateSignal={stateSignal}
          VerifySignal={VerifySignal}
          stateCatego={stateCatego}
          handleChangeTrans={handleChangeTrans}
          ModNewTransSate={ModNewTransSate}
          stateformtrans={stateformtrans}
        />
        <Alert visible={stateAlert.visible} code={stateAlert.code} />
      </Container>
    </>
  );
};

export default Account;
