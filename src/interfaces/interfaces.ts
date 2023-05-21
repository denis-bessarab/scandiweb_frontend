export interface ProductInterface {
	id: number,
	sku: string,
	attributes: ProductAttributes
}

export interface ProductAttributes {
	name: string,
	price_usd: number,
	weight?: number,
	size_mb?: number,
	dimensions?: DimensionsAttribute
}

export interface DimensionsAttribute {
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
		price: null | number,
		size: null | number,
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