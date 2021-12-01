// Package
import { ContextMenu, MenuItem } from "react-contextmenu";

const ContextMenuCustom = (props) => {
  const { idContext, onClickShare, onClickEdit, onClickDelete } = props;

  return (
    <ContextMenu id={idContext} className="bg-white border rounded z-10">
      {onClickEdit && (
        <MenuItem
          className="py-1 pl-2 pr-4 font-weight-semibold border-bottom cursor-pointer hover:shadow"
          onClick={onClickEdit}
        >
          <i className="fas fa-pencil-alt mr-2 text-blue"></i>Edit
        </MenuItem>
      )}
      {onClickDelete && (
        <MenuItem
          className="py-1 pl-2 pr-4 font-weight-semibold border-bottom cursor-pointer hover:shadow"
          onClick={onClickDelete}
        >
          <i className="far fa-trash-alt mr-2 text-blue"></i>Delete
        </MenuItem>
      )}
      {onClickShare && (
        <MenuItem
          className="py-1 pl-2 pr-4 font-weight-semibold border-bottom cursor-pointer hover:shadow"
          onClick={onClickShare}
        >
          <i className="fas fa-share mr-2 text-blue"></i>Share
        </MenuItem>
      )}
    </ContextMenu>
  );
};

export default ContextMenuCustom;
