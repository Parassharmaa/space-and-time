import axios from "axios";
import config from "./../config/";

const EditContribution = (data, title) => {
  return axios({
    method: "post",
    data: data,
    headers: { Authorization: localStorage.getItem("token") },
    url: `${config.baseUrl}/contributions/add/${title}`
  });
};

const ListContribution = title => {
  return axios({
    method: "get",
    headers: { Authorization: localStorage.getItem("adminToken") },
    url: `${config.baseUrl}/contributions/${title}`
  });
};

const ReviewContribution = (data, title) => {
  return axios({
    method: "post",
    data: data,
    headers: { Authorization: localStorage.getItem("adminToken") },
    url: `${config.baseUrl}/contributions/review/${title}`
  });
};

export { ReviewContribution, EditContribution, ListContribution };
