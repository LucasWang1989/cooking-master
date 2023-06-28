import React from 'react';
import axios from 'axios';

const serviceUrl = "http://127.0.0.1:8080/cms";

export const getRecipe = async (coords) => {
    const url = serviceUrl;
    const response = await axios.get(url);
    return response.data.location[0];

}
