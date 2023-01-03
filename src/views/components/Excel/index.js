import React from "react";
import { Button } from "reactstrap";
import ReactExport from "react-export-excel";

const ExcelFile = ReactExport.ExcelFile;
const ExcelSheet = ReactExport.ExcelFile.ExcelSheet;
const ExcelColumn = ReactExport.ExcelFile.ExcelColumn;

const ExcelExport = (props) => {
  const { data } = props;
  return (
    <>
      <ExcelFile
        element={<Button className="btn-warning"><i className="fas fa-download mr-2"></i>Download Data</Button>}
        filename="move data fiona"
      >
        <ExcelSheet data={data} name="Employees">
          <ExcelColumn label="Acount" value="nombre" />
          <ExcelColumn label="Categorie" value="categoria" />
          <ExcelColumn label="Description" value="descripcion" />
          <ExcelColumn label="Value" value="valor_int" />
          <ExcelColumn label="Badge" value="divisa" />
          <ExcelColumn label="Date" value="fecha" />
          <ExcelColumn label="Day" value="dia" />
          <ExcelColumn label="Month" value="mes" />
          <ExcelColumn label="Year" value="ano" />
        </ExcelSheet>
      </ExcelFile>
    </>
  );
}
export default ExcelExport;
