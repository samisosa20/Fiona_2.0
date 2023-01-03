import React from "react";

// Components
import { Modal } from "react-bootstrap";
import ContainerHeader from "./ContainsHeader";

// Controllers
import useControllers from "controllers";

const Header = () => {
  const { useComponentHooks } = useControllers();
  const { useHeader } = useComponentHooks();
  const {
    OpenViewMovi,
    state,
    ModViewMovi,
    ModViewMoviState,
    stateViewMovi,
    OpenViewMovilvl,
    OpenViewMovilvlMonth,
    formatter,
    BackViewMovi,
  } = useHeader();

  return (
    <ContainerHeader
      OpenViewMovi={OpenViewMovi}
      state={state}
      Modal={Modal}
      ModViewMovi={ModViewMovi}
      ModViewMoviState={ModViewMoviState}
      stateViewMovi={stateViewMovi}
      OpenViewMovilvl={OpenViewMovilvl}
      OpenViewMovilvlMonth={OpenViewMovilvlMonth}
      formatter={formatter}
      BackViewMovi={BackViewMovi}
    />
  );
};

export default Header;
