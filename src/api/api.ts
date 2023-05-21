import axios, {AxiosError, AxiosResponse} from "axios"
import {ProductToSave} from "../interfaces/interfaces.ts";

const ENV = import.meta.env
const API_URL: string = ENV.VITE_API_URL
const axiosConfig = {
	headers: {}
}

export async function getProducts(): Promise<AxiosResponse | AxiosError> {
	return await axios.get(API_URL, axiosConfig)
}

export async function saveProduct(data: ProductToSave): Promise<AxiosResponse | AxiosError> {
	return await axios.post(API_URL, data, axiosConfig)
}