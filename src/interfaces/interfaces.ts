export interface ProductInterface {
	active:number,
	id: number,
	sku: string,
	price_usd: number,
	product_name: string,
	product_type:string,
	weight_kg: null | number,
	size_mb: null | number,
	width_cm: null | number,
	height_cm: null | number,
	length_cm: null | number
}


export interface ProductListModel {
	products: ProductInterface[],
	deleteList: number[],
}

export interface AddProductModel {
	sku: null | string,
	product_name: null | string
	price_usd: null | number,
	product_type: null | string,
	size_mb: null | number,
	weight_kg: null | number,
	height_cm: null | number,
	width_cm: null | number,
	length_cm: null | number,
}