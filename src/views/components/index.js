import Footers from "./Footers"
import Sidebar from "./Sidebar"
import Headers from "./Headers"
import Alert from "./Alert"
import Modals from './Modals'
import AcountAdd from "./Acount"
import ContextMenuCustom from "./ContextMenu"
import ExcelExport from "./Excel"
import ValidShareAccount from "./Acount/Share"
import Charts from "./Charts"

const useComponents = () => {
    return {
      Footers,
      Sidebar,
      Headers,
      Alert,
      Modals,
      AcountAdd,
      ContextMenuCustom,
      ExcelExport,
      ValidShareAccount,
      Charts,
    };
  };
  
  export default useComponents;