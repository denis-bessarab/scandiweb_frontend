export interface ProductInterface {
	id: number,
	sku: string,
	attributes: ProductAttributes
}

export interface ProductAttributes {
	[k: string]: string | number | null,
	name: string,
	price_usd: number,
	weight: number,
	size_mb: number,
	width: number,
	height: number,
	length: number
}

export interface ProductListModel {
	products: ProductInterface[],
	deleteList: number[],
}

export interface AddProductModel {
	sku: null | string,
	attributes: {
		name: null | string
		price_usd: null | number,
		size_mb: null | number,
		weight: null | number,
		height: null | number,
		width: null | number,
		length: null | number,
	}
}

export interface ProductToSave {
	sku: string,
	name: string,
	price_usd: number,
	attributes: ProductAttributes
}