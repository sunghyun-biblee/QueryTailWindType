import axios from "../api/axios";

const request = {
  dog: "?name=dog",
  cat: "?name=cat",
};
export const prefetchList = async (name: string) => {
  const res = await axios.get(`?name=${name}`);
  return res.data;
};
export const fetchList = async (name: string) => {
  const res = await axios.get(`?name=${name}`);
  return res.data;
};
export default request;
