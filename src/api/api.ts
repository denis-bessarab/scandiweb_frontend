import axios, {AxiosError, AxiosResponse} from "axios"
// const ENV = import.meta.env
// const API_URL:string = ENV.VITE_API_URL
const axiosConfig = {
	headers: {

	}
}

export async function getProducts() : Promise<AxiosResponse | AxiosError> {
		return await axios.get('../../test_db.json',axiosConfig)
}