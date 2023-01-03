const useGeneralHooks = () => {
  const convertDateForIos = (date) => {
    const arr = date.split(/[- : T .]/);
    date = new Date(arr[0], arr[1] - 1, arr[2], arr[3], arr[4], arr[5]);
    return date;
  };

  // convert date in whatever format that you want
  const formatDate = (date, format = "Y-mm-dd", convert = true) => {
    if (convert)
        date = new Date(convertDateForIos(date))

    const map = {
      dd: date.getDate(),
      mm: date.getMonth() + 1 > 9 ? date.getMonth() + 1 : "0" + (date.getMonth() + 1),
      Y: date.getFullYear(),
      yy: date.getFullYear().toString().slice(-2),
      HH: date.getHours() > 9 ? date.getHours() : "0" + date.getHours(),
      MM: date.getMinutes() > 9 ? date.getMinutes() : "0" + date.getMinutes(),
      SS: date.getSeconds() > 9 ? date.getSeconds() : "0" + date.getSeconds(),
    };

    return format.replace(/dd|mm|yy|Y|HH|MM|SS/gi, (matched) => map[matched]);
  };

  // convert date to this format (yyyy-mm-dd) to send to the back
  const dateFormatUTC = (FieldsDate) => {
    const date = formatDate(new Date(FieldsDate[0]), "Y-mm-dd", false);
    const time = new Date(FieldsDate[1]);
    const hour =
      FieldsDate[2] === "pm" && time.getHours() < 12 ? time.getHours() + 12 : time.getHours();

    return new Date(
      `${date}T${hour.toString().padStart(2, "0")}:${time
        .getMinutes()
        .toString()
        .padStart(2, "0")}:00`
    );
  };

  const prepareDataFilterDownload = (filters) => {
    const objFiltersKeys = Object.keys(filters)
    .filter((key) => filters[key] !== "")
    .map((item) => {
      if (filters[item] !== null && typeof filters[item] === "object"){
        return filters[item].map(v => {return `${item}[]=${v}`}).join('&')
      } else {
        return `${item}=${filters[item]}`;
      }
    });
    
    const stringDownloadFilter = objFiltersKeys.toString().replace(/,/g, "&");

    return stringDownloadFilter !== "" ? `?${stringDownloadFilter}` : "?";
  };

  const createDownloadExel = (response) => {
    const url = window.URL.createObjectURL(new Blob([response]));

    const link = document.createElement("a");
    link.href = url;
    link.setAttribute("download", `${Date.now()}.${response.type.split("/")[1]}`);
    document.body.appendChild(link);
    link.click();
  };

  return { dateFormatUTC, formatDate, prepareDataFilterDownload, createDownloadExel };
};

export default useGeneralHooks;
