//? Здесь все запросы к апи, присвоение этих данных состояниями в AssingApiData

import axios from "axios";
const server = "http://192.168.43.254:3000";

export const Login = async (data) => {
  try {
    const response = await axios.post(`${server}/auth/login`, data);
    return response;
  } catch (response) {
        return response;
      }
};

export const GetDataWarehouse = async () => {
  try {
    const response = await axios.get(`${server}/warehouse`);
    return response.data;
  } catch (error) {
    console.error("Error:", error);
    throw error;
  }
};

export const GetdataWarehouse = async () => {
  try {
    const response = await axios.get(`${server}/warehouse`);
    return response;
  } catch (error) {
    console.error("Error:", error);
    throw error;
  }
};

export const GetProductsDataWarehouse = async (data) => {
  try {
    const response = await axios.get(`${server}/warehouse/${data}/products`);
    return response.data;
  } catch (error) {
    console.error("Error:", error);
    throw error;
  }
};

  export const GetdataShop = async () => {
    try {
      const response = await axios.get(`${server}/shop`);
      return response.data;
    } catch (error) {
      console.error("Error:", error);
      throw error;
    }
  };

export const GetProductsDataShop = async (data) => {
  try {
    const response = await axios.get(`${server}/shop/${data}/products`);
    return response.data;
  } catch (error) {
    console.error("Error:", error);
    throw error;
  }
};

export const getAllOrders = async () => {
  try {
    const response = await axios.get(`${server}/order/getAllOrders`);
    console.log("orders", response)
    return response.data;
  } catch (error) {
    console.error("Error:", error);
    throw error;
  }
};

export const GetDataClientsExport = async (data) => {
    try {
      const response = await axios.post(`${server}/parser/downloadProductsFromShop`, data);
      return response.data;
    } catch (error) {
      console.error("Error:", error);
      throw error;
    }
  };

  export const GetDataWarehousExport = async () => {
    try {
      const response = await axios.get(`${server}/parser/downloadProductsFromWarehouse`);
      return response.data;
    } catch (error) {
      console.error("Error:", error);
      throw error;
    }
  };

  export const SendDataClientsExport = async (file) => {
    try {
      const response = await axios.post(`${server}/parser/uploadProducts`, file);
      return response.data;
    } catch (error) {
      console.error("Error:", error);
      throw error;
    }
  };

  export const SendDataWarehous = async (file) => {
    try {
      const formData = new FormData();
      formData.append('file', file);
  
      const response = await axios.post(`${server}/parser/uploadProducts`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });
      return response.data;
    } catch (error) {
      console.error("Произошла ошибка:", error);
      throw error;
    }
  };
