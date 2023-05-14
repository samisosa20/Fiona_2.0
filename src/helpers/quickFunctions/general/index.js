const useGeneral = () => {
  /**
     *
     * @param {Date} date
     * @description Transform only `DD/MM/YYYY HH:MM` format to UTC
     * @returns UTC Date
     */
  const transformDateToUTC = (date )=> {
    const dateSendSplit = date.split(' ')
    const onlyDate = dateSendSplit[0]
    const onlyTime = dateSendSplit[1]
    const ddmmyyyy = onlyDate.split('/')
    const hhmm = onlyTime.split(':')
    return new Date(
        Date.UTC(
            Number(ddmmyyyy[2]),
            Number(ddmmyyyy[1]) - 1,
            Number(ddmmyyyy[0]),
            Number(hhmm[0]),
            Number(hhmm[1])
        )
    )
}

  const currencyFormat = (num) => {
    return "$ " + num.toFixed(2).replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1,");
  };
  return { transformDateToUTC, currencyFormat };
};

export default useGeneral;
