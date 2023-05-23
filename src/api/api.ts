import axios, {AxiosResponse} from "axios"

const ENV = import.meta.env
const API_URL: string = ENV.VITE_API_URL
const axiosConfig = {
	headers: {
	}
}

export async function getProducts(): Promise<AxiosResponse> {
	return await axios.get(API_URL + '/getProducts', axiosConfig)
}

export async function saveProduct(data: string): Promise<AxiosResponse> {
	return await axios.post(API_URL + '/addProduct', data, axiosConfig)
}
export async function deleteProduct(data: number[]): Promise<AxiosResponse> {
	let axiosDeleteConfig = {
		headers:{

		},
		data: {
			source: data
		}
	}
	return await axios.delete(API_URL + '/deleteProduct', axiosDeleteConfig)
}