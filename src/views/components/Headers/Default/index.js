import React from "react";
import PropTypes from "prop-types";

// Components
import { Modal } from "react-bootstrap";
import ContainerHeader from "./ContainsHeader";

// Controllers
import useControllers from "controllers";

const Header = (props) => {
  const {refreshData} = props
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
  } = useHeader(refreshData);

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

Header.defaultProps = {
  refreshData: false,
};

Header.propTypes = {
  refreshData: PropTypes.bool
}

export default Header;
