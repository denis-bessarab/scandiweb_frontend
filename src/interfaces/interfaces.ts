export interface Product {
	id: number,
	sku: string,
	attributes: ProductAttributes
}

export interface ProductAttributes {
	name: string,
	price_usd: number,
	weight?:number,
	size_mb?:number,
	dimensions?: DimensionsAttribute
}

export interface DimensionsAttribute {
	wide: number,
	height: number,
	length: number
}