import axios from 'axios';

const instance = axios.create({
  baseURL: process.env.REACT_APP_BASE_URL,
  timeout: 4000,
});

export const get = (url: string) =>
  instance
    .get(url)
    .then((res) => res.data)
    .catch(function (error) {
      throw Error(error);
    });

export const post = <T>(url: string, data: T) =>
  instance
    .post(url, data)
    .then((res) => res.data)
    .catch(function (error) {
      throw Error(error);
    });

export const put = <T>(url: string, data: T) =>
  instance
    .put(url, data)
    .then((res) => res.data)
    .catch(function (error) {
      throw Error(error);
    });

export const del = (url: string) =>
  instance
    .delete(url)
    .then((res) => res.data)
    .catch(function (error) {
      throw Error(error);
    });
