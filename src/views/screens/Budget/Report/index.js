import React from "react";

// Components
import {
  Card,
  CardBody,
  Table,
  Container,
  Button,
  Label,
  Row,
  CardHeader,
} from "reactstrap";
import { Form, InputGroup } from "react-bootstrap";

import { BsChevronDown, BsChevronUp } from "react-icons/bs";

import useComponents from "views/components";

// Controllers
import useControllers from "controllers";

const ReportBudget = () => {
  // Components
  const { Headers } = useComponents();
  const { Header } = Headers();

  const { useScreenHooks } = useControllers();
  const { useBudgetReport } = useScreenHooks();
  let {
    getDateLocal,
    stateDate,
    consultdate,
    state,
    utilidadBudget,
    aux_catego,
    acuBudget,
    acuReal,
    aux_cat_print,
    aux_variation,
    acuReal_print,
    utilidadReal,
    formatter,
    acuBudget_print,
    showDetail,
    displayDetail,
    stateFilter,
    aux_group,
  } = useBudgetReport();

  return (
    <>
      <Header />
      <Container className="mt--7 pb-150" fluid>
        <Row className="col justify-content-end mb-3">
          <div className="col-md-4">
            <Label className="text-dark">View Mode</Label>
            <Form.Control
              as="select"
              name="catego"
              onChange={(e) => getDateLocal(e.target.value)}
            >
              <option value="1">THIS MONTH</option>
              <option value="-1">LAST MONTH</option>
              <option value="0">CUSTOM DATE</option>
            </Form.Control>
          </div>
          <div className="col-md-4" hidden={stateDate.hidden}>
            <Label className="text-dark">Start Date</Label>
            <InputGroup>
              <Form.Control
                type="date"
                name="Sdate"
                id="Sdate"
                aria-describedby="SignalAppend"
                defaultValue={stateDate.Sdate}
                required
              ></Form.Control>
            </InputGroup>
          </div>
          <div className="col-md-4" hidden={stateDate.hidden}>
            <Label className="text-dark">End Date</Label>
            <InputGroup>
              <Form.Control
                type="date"
                name="Edate"
                id="Edate"
                aria-describedby="SignalAppend"
                defaultValue={stateDate.Fdate}
                required
              ></Form.Control>
            </InputGroup>
          </div>
          <div className="mt-4">
            <Button className="mr-3 btn-success" onClick={() => consultdate()}>
              <i className="fas fa-search mr-2"></i>
              Search
            </Button>
          </div>
        </Row>
        {window.innerWidth >= 768 ? (
          <Card>
            <CardBody className="overflow-x-auto">
              <Table hover>
                <thead>
                  <tr className="text-dark">
                    <th>Category</th>
                    <th>Budget</th>
                    <th>Real</th>
                    <th>Variation</th>
                  </tr>
                </thead>
                <tbody>
                  {state ? (
                    state.map((data, index) => {
                      if (data.grupo === "4") {
                        utilidadBudget =
                          parseFloat(utilidadBudget) + parseFloat(data.budget);
                        utilidadReal =
                          parseFloat(utilidadReal) + parseFloat(data.realValue);
                      } else {
                        utilidadBudget =
                          parseFloat(utilidadBudget) - parseFloat(data.budget);
                        utilidadReal =
                          parseFloat(utilidadReal) - parseFloat(data.realValue);
                      }
                      // if is the first render
                      if (data.nameSub !== aux_catego && aux_catego === "") {
                        aux_catego = data.nameSub;
                        acuBudget =
                          parseFloat(acuBudget) + parseFloat(data.budget);
                        acuReal =
                          parseFloat(acuReal) + parseFloat(data.realValue);
                        aux_group = data.groupFather
                        let color = "text-warning"
                        if((parseInt(data.groupFather) === 4 && parseFloat(data.variation) < 0) || (parseInt(data.groupFather) !== 4 && parseFloat(data.variation) > 0)){
                          color = "text-danger"
                        } else if((parseInt(data.groupFather) !== 4 && parseFloat(data.variation) < 0) || (parseInt(data.groupFather) === 4 && parseFloat(data.variation) > 0)){
                          color = "text-success"
                        }
                        return (
                          <tr key={index}>
                            <td>{data.categoria}</td>
                            <td>{formatter.format(data.budget)}</td>
                            <td>{formatter.format(data.realValue)}</td>
                            <td
                              className={color}
                            >
                            <i className={`fas ${parseFloat(data.variation) < 0 ? "fa-arrow-down" : parseFloat(data.variation) > 0 ? "fa-arrow-up" : "fa-minus"}`}></i>
                              {parseFloat(data.variation).toFixed(2)}
                            </td>
                          </tr>
                        );
                        // total by category father and new subcategory
                      } else if (data.nameSub !== aux_catego) {
                        aux_cat_print = aux_catego;
                        aux_catego = data.nameSub;
                        acuBudget_print = acuBudget;
                        acuReal_print = acuReal;
                        aux_variation =
                          ((acuReal_print - acuBudget_print) / acuReal_print) *
                          100;
                        acuBudget = parseFloat(data.budget);
                        acuReal = parseFloat(data.realValue);
                        let color = "text-warning"
                        let color_aux = "text-warning"
                        if((parseInt(data.groupFather) === 4 && parseFloat(data.variation) < 0) || (parseInt(data.groupFather) !== 4 && parseFloat(data.variation) > 0)){
                          color = "text-danger"
                        } else if((parseInt(data.groupFather) !== 4 && parseFloat(data.variation) < 0) || (parseInt(data.groupFather) === 4 && parseFloat(data.variation) > 0)){
                          color = "text-success"
                        }
                        if((parseInt(aux_group) === 4 && parseFloat(aux_variation) < 0) || (parseInt(aux_group) !== 4 && parseFloat(aux_variation) > 0)){
                          color_aux = "text-danger"
                        } else if((parseInt(aux_group) !== 4 && parseFloat(aux_variation) < 0) || (parseInt(aux_group) === 4 && parseFloat(aux_variation) > 0)){
                          color_aux = "text-success"
                        }
                        aux_group = data.groupFather
                        // need last group
                        return [
                          <tr
                            key={index * 100}
                            className="table-dark text-dark font-weight-600"
                          >
                            <td>{aux_cat_print}</td>
                            <td>{formatter.format(acuBudget_print)}</td>
                            <td>{formatter.format(acuReal_print)}</td>
                            <td
                              className={color_aux}
                            >
                            <i className={`fas ${parseFloat(aux_variation) < 0 ? "fa-arrow-down" : "fa-arrow-up"}`}></i>
                              {parseFloat(aux_variation).toFixed(2)}
                            </td>
                          </tr>,
                          <tr key={index}>
                            <td>{data.categoria}</td>
                            <td>{formatter.format(data.budget)}</td>
                            <td>{formatter.format(data.realValue)}</td>
                            <td
                              className={color}
                            >
                            <i className={`fas ${parseFloat(data.variation) < 0 ? "fa-arrow-down" : parseFloat(data.variation) > 0 ? "fa-arrow-up" : "fa-minus"}`}></i>
                              {parseFloat(data.variation).toFixed(2)}
                            </td>
                          </tr>,
                        ];
                        // render sub categories
                      } else {
                        aux_catego = data.nameSub;
                        acuBudget =
                          parseFloat(acuBudget) + parseFloat(data.budget);
                        acuReal =
                          parseFloat(acuReal) + parseFloat(data.realValue);
                        aux_group = data.groupFather
                        let color = "text-warning"
                        if((parseInt(data.groupFather) === 4 && parseFloat(data.variation) < 0) || (parseInt(data.groupFather) !== 4 && parseFloat(data.variation) > 0)){
                          color = "text-danger"
                        } else if((parseInt(data.groupFather) !== 4 && parseFloat(data.variation) < 0) || (parseInt(data.groupFather) === 4 && parseFloat(data.variation) > 0)){
                          color = "text-success"
                        }
                        return (
                          <tr key={index}>
                            <td>{data.categoria}</td>
                            <td>{formatter.format(data.budget)}</td>
                            <td>{formatter.format(data.realValue)}</td>
                            <td
                              className={color}
                            >
                            <i className={`fas ${parseFloat(data.variation) < 0 ? "fa-arrow-down" : parseFloat(data.variation) > 0 ? "fa-arrow-up" : "fa-minus"}`}></i>
                              {parseFloat(data.variation).toFixed(2)}
                            </td>
                          </tr>
                        );
                      }
                    })
                  ) : (
                    <tr></tr>
                  )}
                  <tr className="table-dark text-dark font-weight-600">
                    <td className="font-weight-bold">{aux_catego}</td>
                    <td>{formatter.format(acuBudget)}</td>
                    <td>{formatter.format(acuReal)}</td>
                    <td
                      className={
                        (parseInt(aux_group) === 4 && parseFloat(((acuReal - acuBudget) / acuReal) * 100) < 0) || (parseInt(aux_group) !== 4 && parseFloat(((acuReal - acuBudget) / acuReal) * 100) > 0)
                          ? "text-danger"
                          : (parseInt(aux_group) !== 4 && parseFloat(((acuReal - acuBudget) / acuReal) * 100) < 0) || (parseInt(aux_group) === 4 && parseFloat(((acuReal - acuBudget) / acuReal) * 100) > 0) ? 
                          "text-success"
                          : "text-warning"
                      }
                    >
                      <i className={`fas ${parseFloat(((acuReal - acuBudget) / acuReal) * 100) < 0 ? "fa-arrow-down" : parseFloat(((acuReal - acuBudget) / acuReal) * 100) > 0 ? "fa-arrow-up" : "fa-minus"}`}></i>
                      {parseFloat(
                        ((acuReal - acuBudget) / acuReal) * 100
                      ).toFixed(2)}
                    </td>
                  </tr>
                  <tr>
                    <td className="font-weight-bold">Utility</td>
                    <td
                      className={
                        utilidadBudget < 0 ? "text-danger" : "text-success"
                      }
                    >
                      {formatter.format(utilidadBudget)}
                    </td>
                    <td
                      className={
                        utilidadReal < 0 ? "text-danger" : "text-success"
                      }
                    >
                      {formatter.format(utilidadReal)}
                    </td>
                    <td
                      className={
                        parseFloat(
                          ((utilidadReal - utilidadBudget) / utilidadReal) * 100
                        ) < 0
                          ? "text-danger"
                          : "text-success"
                      }
                    >
                      <i className={`fas ${parseFloat(((utilidadReal - utilidadBudget) / utilidadReal) * 100) < 0 ? "fa-arrow-down" : parseFloat(((utilidadReal - utilidadBudget) / utilidadReal) * 100) > 0 ? "fa-arrow-up" : "fa-minus"}`}></i>
                      {parseFloat(
                        ((utilidadReal - utilidadBudget) / utilidadReal) * 100
                      ).toFixed(2)}
                    </td>
                  </tr>
                </tbody>
              </Table>
            </CardBody>
          </Card>
        ) : (
          <>
            {state ? (
              // eslint-disable-next-line array-callback-return
              state.map((data, index) => {
                if (data.grupo === "4") {
                  utilidadBudget =
                    parseFloat(utilidadBudget) + parseFloat(data.budget);
                  utilidadReal =
                    parseFloat(utilidadReal) + parseFloat(data.realValue);
                } else {
                  utilidadBudget =
                    parseFloat(utilidadBudget) - parseFloat(data.budget);
                  utilidadReal =
                    parseFloat(utilidadReal) - parseFloat(data.realValue);
                }
                if (data.nameSub !== aux_catego && aux_catego === "") {
                  aux_catego = data.nameSub;
                  acuBudget = parseFloat(acuBudget) + parseFloat(data.budget);
                  acuReal = parseFloat(acuReal) + parseFloat(data.realValue);
                  aux_group = data.groupFather
                } else if (data.nameSub !== aux_catego) {
                  aux_cat_print = aux_catego;
                  aux_catego = data.nameSub;
                  acuBudget_print = acuBudget;
                  acuReal_print = acuReal;
                  aux_variation =
                    ((acuReal_print - acuBudget_print) / acuReal_print) * 100;
                  acuBudget = parseFloat(data.budget);
                  acuReal = parseFloat(data.realValue);
                  let color = "text-warning"
                  const group = aux_group
                  if((parseInt(data.groupFather) === 4 && parseFloat(data.variation) < 0) || (parseInt(data.groupFather) !== 4 && parseFloat(data.variation) > 0)){
                    color = "text-danger"
                  } else if((parseInt(data.groupFather) !== 4 && parseFloat(data.variation) < 0) || (parseInt(data.groupFather) === 4 && parseFloat(data.variation) > 0)){
                    color = "text-success"
                  }
                  aux_group = data.groupFather
                  return (
                    <Card
                      id={`card-primary-${index * 100}`}
                      key={index * 100}
                      className="mb-2 shadow"
                      onClick={() => showDetail(index * 100)}
                    >
                      <CardHeader className="px-3 pb-3">
                        <div className="row justify-content-between m-0 p-0 col-12">
                          <h3>{aux_cat_print}</h3>
                          {displayDetail.key === index * 100 &&
                          displayDetail.chevron ? (
                            <BsChevronUp />
                          ) : (
                            <BsChevronDown />
                          )}
                        </div>
                        <div className="row col-12 p-0 justify-content-between m-0">
                          <h5 className="m-0">Budget</h5>
                          <h5 className="m-0">Real</h5>
                          <h5 className="m-0">Variation</h5>
                        </div>
                        <div className="row col-12 p-0 justify-content-between m-0">
                          <p className="m-0 font-weight-normal">
                            {formatter.format(acuBudget_print)}
                          </p>
                          <p className="m-0 font-weight-normal">
                            {formatter.format(acuReal_print)}
                          </p>
                          <p
                            className={`${color} m-0 font-weight-bold`}
                          >
                            <i className={`fas ${parseFloat(aux_variation) < 0 ? "fa-arrow-down" : parseFloat(aux_variation) > 0 ? "fa-arrow-up" : "fa-minus"}`}></i>
                            {parseFloat(aux_variation).toFixed(2)}
                          </p>
                        </div>
                      </CardHeader>
                      {displayDetail.key === index * 100 &&
                      displayDetail.chevron ? (
                        <CardBody className={`p-0 border rounded`}>
                          {stateFilter.length > 0
                            ? stateFilter.map((v, i) => (
                                <div
                                  className={`border-bottom p-3 ${
                                    i % 2 === 0 ? "bg-secondary" : ""
                                  }`}
                                  key={i}
                                >
                                  <h4>{v.categoria}</h4>
                                  <div className="row col-12 p-0 justify-content-between m-0">
                                    <p className="m-0 font-weight-normal">
                                      {formatter.format(v.budget)}
                                    </p>
                                    <p className="m-0 font-weight-normal">
                                      {formatter.format(v.realValue)}
                                    </p>
                                    <p
                                      className={(parseInt(group) === 4 && parseFloat(v.variation) < 0) || (parseInt(group) !== 4 && parseFloat(v.variation) > 0) ?
                                        "text-danger m-0 font-weight-bold" : (parseInt(group) !== 4 && parseFloat(v.variation) < 0) || (parseInt(group) === 4 && parseFloat(v.variation) > 0) ?
                                        "text-success m-0 font-weight-bold" : "text-warning m-0 font-weight-bold"
                                      }
                                    >
                                      <i className={`fas ${parseFloat(v.variation) < 0 ? "fa-arrow-down" : parseFloat(v.variation) > 0 ? "fa-arrow-up" : "fa-minus"}`}></i>
                                      {parseFloat(v.variation).toFixed(2)}
                                    </p>
                                  </div>
                                </div>
                              ))
                            : ""}
                        </CardBody>
                      ) : null}
                    </Card>
                  );
                } else {
                  aux_catego = data.nameSub;
                  acuBudget = parseFloat(acuBudget) + parseFloat(data.budget);
                  acuReal = parseFloat(acuReal) + parseFloat(data.realValue);
                  aux_group = data.groupFather
                }
              })
            ) : (
              <Card></Card>
            )}
            <Card className="mb-2 shadow">
              <CardHeader className="px-3 pb-3">
                <div className="row justify-content-between m-0 p-0 col-12">
                  <h3>{"Utility"}</h3>
                </div>
                <div className="row col-12 p-0 justify-content-between m-0">
                  <h5 className="m-0">Budget</h5>
                  <h5 className="m-0">Real</h5>
                  <h5 className="m-0">Variation</h5>
                </div>
                <div className="row col-12 p-0 justify-content-between m-0">
                  <p
                    className={
                      utilidadBudget < 0
                        ? "text-danger m-0 font-weight-normal"
                        : "text-success m-0 font-weight-normal"
                    }
                  >
                    {formatter.format(utilidadBudget)}
                  </p>
                  <p
                    className={
                      utilidadReal < 0
                        ? "text-danger m-0 font-weight-normal"
                        : "text-success m-0 font-weight-normal"
                    }
                  >
                    {formatter.format(utilidadReal)}
                  </p>
                  <p
                    className={
                      parseFloat(
                        ((utilidadReal - utilidadBudget) / utilidadReal) * 100
                      ) < 0
                        ? "text-danger m-0 font-weight-bold"
                        : parseFloat(
                          ((utilidadReal - utilidadBudget) / utilidadReal) * 100
                        ) > 0 ? "text-success m-0 font-weight-bold" : "text-warning m-0 font-weight-bold"
                    }
                  >
                    <i className={`fas ${parseFloat(((utilidadReal - utilidadBudget) / utilidadReal) * 100) < 0 ? "fa-arrow-down" : parseFloat(((utilidadReal - utilidadBudget) / utilidadReal) * 100) > 0 ? "fa-arrow-up" : "fa-minus"}`}></i>
                    {parseFloat(
                      ((utilidadReal - utilidadBudget) / utilidadReal) * 100
                    ).toFixed(2)}
                  </p>
                </div>
              </CardHeader>
            </Card>
          </>
        )}
      </Container>
    </>
  );
};

export default ReportBudget;
