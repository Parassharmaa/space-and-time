import moment from "moment";

const TimestampToDate = timestamp => {
  return moment.unix(timestamp).format("DD/MM/YYYY");
};

export { TimestampToDate };
