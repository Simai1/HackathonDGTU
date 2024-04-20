//? Здесь все запросы к апи, присвоение этих данных состояниями в AssingApiData

import axios from "axios"
const server = "http://192.168.43.254:3000";

//! получаем преподов
export const Login = async (data) => {
  try {
    const response = await axios.post(`${server}/auth/login`, data);
    return response;
  } catch (error) {
    console.error("Error:", error);
    throw error;
  }
};

export const GetData = async (data) => {
    try {
      const response = await axios.post(`${server}/auch/login`, data);
      return response.data;
    } catch (error) {
      console.error("Error:", error);
      throw error;
    }
  };
