import { CONTEXT_TYPEs } from "@/context";

export const generateAlert = (data, type, alert) => {
  let objs = [];
  if (type === "success") {
    objs.push({
      id: crypto.randomUUID(),
      text: data,
    });
  } else if (!data?.response && data?.message) {
    objs.push({
      id: crypto.randomUUID(),
      text: data.message,
    });
  } else {
    const err = data?.response?.data;
    if (err?.error) {
      objs.push({
        id: crypto.randomUUID(),
        text: err?.error,
      });
    } else if (err?.errors && err?.errors?.length > 0) {
      for (let obj of err?.errors) {
        objs.push({
          text: obj?.msg,
          id: crypto.randomUUID(),
        });
      }
    } else if (err?.message) {
      objs.push({
        text: err.message,
        id: crypto.randomUUID(),
      });
    } else {
      objs.push({
        id: crypto.randomUUID(),
        text: data,
      });
    }
  }

  return objs.forEach((err) => {
    let id = crypto.randomUUID();
    countAlert(alert, id);
    removeAlertAutomatically(alert, id);
    alert({
      type: CONTEXT_TYPEs.ADD_ALERT,
      payload: {
        id,
        text: err.text,
        type: type,
        time: 5,
        show: true,
      },
    });
  });
};
export function handleCopy(text) {
  var textarea = document.createElement("textarea");

  textarea.value = text;

  document.body.appendChild(textarea);

  textarea.select();

  document.execCommand("copy");

  document.body.removeChild(textarea);
}
const countAlert = async (alert, id) => {
  for (let i = 0; i < 5; i++) {
    await new Promise((resolve) => setTimeout(resolve, 1000));
    if (i == 3) {
      alert({
        type: CONTEXT_TYPEs.TOGGLE_ALERT_SHOW,
        payload: id,
      });
    }
    alert({
      type: CONTEXT_TYPEs.DECREASE_ALERT_TIME,
      payload: id,
    });
  }
};

const removeAlertAutomatically = (alert, id) => {
  setTimeout(() => {
    alert({
      type: CONTEXT_TYPEs.DELETE_ALERT,
      payload: id,
    });
  }, 5000);
};

export const convertTimeStampToDate = (date) => {
  let currentDate;

  if (date) {
    currentDate = new Date(date);
  } else {
    currentDate = new Date();
  }
  let month = currentDate.getMonth() + 1;
  let day = currentDate.getDate();
  let year = currentDate.getFullYear();
  if (day < 10) {
    day = "0" + day;
  }
  if (month < 10) {
    month = `0${month}`;
  }
  const formattedDate = `${year}-${month}-${day}`;
  return formattedDate;
};

export const convertTimeStampToDateWithoutZero = (date) => {
  let currentDate;

  if (date) {
    currentDate = new Date(date);
  } else {
    currentDate = new Date();
  }
  let month = currentDate.getMonth() + 1;
  let day = currentDate.getDate();
  let year = currentDate.getFullYear();

  const formattedDate = `${year}-${month}-${day}`;
  return formattedDate;
};

export const convertTimeStampToTime = (date) => {
  let currentDate;
  if (date) {
    currentDate = new Date(date);
  } else {
    currentDate = new Date();
  }
  const hours = String(currentDate.getHours()).padStart(2, "0");
  const minutes = String(currentDate.getMinutes()).padStart(2, "0");
  const formattedTime = `${hours}:${minutes}`;
  return formattedTime;
};

export const convertDateToTimeStamp = (stamp) => {
  const dateString = stamp;
  const [year, month, day] = dateString.split("-");
  const date = new Date(`${year}-${month}-${day}`);
  const timestamp = date.getTime();
  return timestamp;
};

export const convertTimeStampToMoment = (date) => {
  let currentDate;
  if (date) {
    currentDate = new Date(date);
  } else {
    currentDate = new Date();
  }
  let month = currentDate.getMonth() + 1;
  let day = currentDate.getDate();
  let year = currentDate.getFullYear();
  if (day < 10) {
    day = "0" + day;
  }
  if (month < 10) {
    month = `0${month}`;
  }
  const formattedDate = `${year}/${month}/${day}`;
  return formattedDate;
};

export const convertTimeStampToMomentMonth = (date) => {
  let currentDate;
  const months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];
  if (date) {
    currentDate = new Date(date);
  } else {
    currentDate = new Date();
  }
  let month = months[currentDate.getMonth()];
  let day = currentDate.getDate();
  let year = currentDate.getFullYear();
  if (day < 10) {
    day = "0" + day;
  }
  if (month < 10) {
    month = `0${month}`;
  }
  const formattedDate = `${month} ${day}, ${year}`;
  return formattedDate;
};
