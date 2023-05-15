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
import InputControl from "./InputControl"

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
      InputControl,
    };
  };
  
  export default useComponents;