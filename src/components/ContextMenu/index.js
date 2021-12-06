// Package
import MenuItem from "@mui/material/MenuItem";

import { StyledMenu } from "./ContextMenu.styles";

const ContextMenuCustom = (props) => {
  const { handleClose, contextMenu } =
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
      {contextMenu?.onClickEdit && (
        <MenuItem
          className="py-1 pl-2 pr-4 font-weight-semibold"
          onClick={(e) => handleClick(e, contextMenu !== null ? contextMenu.onClickEdit : undefined)}
        >
          <i className="fas fa-pencil-alt mr-2 text-blue"></i>Edit
        </MenuItem>
      )}
      {contextMenu?.onClickCopy && (
        <MenuItem
          className="py-1 pl-2 pr-4 font-weight-semibold"
          onClick={(e) => handleClick(e, contextMenu !== null ? contextMenu.onClickCopy : undefined)}
        >
          <i className="far fa-copy mr-2 text-blue"></i>Copy
        </MenuItem>
      )}
      {contextMenu?.onClickShare && (
        <MenuItem
        className="py-1 pl-2 pr-4 font-weight-semibold"
        onClick={(e) => handleClick(e, contextMenu !== null ? contextMenu.onClickShare : undefined)}
        >
          <i className="fas fa-share mr-2 text-blue"></i>Share
        </MenuItem>
      )}
      {contextMenu?.onClickDelete && (
        <MenuItem
          className="py-1 pl-2 pr-4 font-weight-semibold text-danger"
          onClick={(e) => handleClick(e, contextMenu !== null ? contextMenu.onClickDelete : undefined)}
        >
          <i className="far fa-trash-alt mr-2 "></i>Delete
        </MenuItem>
      )}
    </StyledMenu>
  );
};

export default ContextMenuCustom;
