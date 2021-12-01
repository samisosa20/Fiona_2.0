// Package
import MenuItem from "@mui/material/MenuItem";

import { StyledMenu } from "./ContextMenu.styles";

const ContextMenuCustom = (props) => {
  const { onClickShare, onClickEdit, onClickDelete, onClickCopy, handleClose, contextMenu } =
    props;

  const handleClick = (e, customClick) => {
    handleClose();
    customClick(e);
  };

  return (
    <StyledMenu
      open={contextMenu !== null}
      onClose={handleClose}
      anchorReference="anchorPosition"
      anchorPosition={
        contextMenu !== null
          ? { top: contextMenu.mouseY, left: contextMenu.mouseX }
          : undefined
      }
    >
      {onClickEdit && (
        <MenuItem
          className="py-1 pl-2 pr-4 font-weight-semibold"
          onClick={(e) => handleClick(e, onClickEdit)}
        >
          <i className="fas fa-pencil-alt mr-2 text-blue"></i>Edit
        </MenuItem>
      )}
      {onClickCopy && (
        <MenuItem
          className="py-1 pl-2 pr-4 font-weight-semibold"
          onClick={(e) => handleClick(e, onClickCopy)}
        >
          <i className="far fa-copy mr-2 text-blue"></i>Copy
        </MenuItem>
      )}
      {onClickShare && (
        <MenuItem
        className="py-1 pl-2 pr-4 font-weight-semibold"
        onClick={(e) => handleClick(e, onClickShare)}
        >
          <i className="fas fa-share mr-2 text-blue"></i>Share
        </MenuItem>
      )}
      {onClickDelete && (
        <MenuItem
          className="py-1 pl-2 pr-4 font-weight-semibold text-danger"
          onClick={(e) => handleClick(e, onClickDelete)}
        >
          <i className="far fa-trash-alt mr-2 "></i>Delete
        </MenuItem>
      )}
    </StyledMenu>
  );
};

export default ContextMenuCustom;
