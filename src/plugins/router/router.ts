import ProductList from "../../components/ProductList/ProductList.vue";
import AddProduct from "../../components/AddProduct/AddProduct.vue";
import {createRouter, createWebHistory, Router, RouterOptions} from "vue-router";

const routes = [
	{path: '/', component: ProductList},
	{path: '/add-product', component: AddProduct},
]

export const router:Router = createRouter({
	history: createWebHistory(),
	routes
} as RouterOptions)