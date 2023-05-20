<script lang="ts">

import {getProducts} from "../../api/api.ts";
import {AxiosError, AxiosResponse} from "axios";
import {ProductIterface} from "../../interfaces/interfaces.ts";
import Product from "../Product/Product.vue";

export default {
  components: {Product},
  data() {
    return {
      model: {
        products : [] as ProductIterface[]
      }
    }
  },
  methods: {

  },
  mounted() {
    getProducts()
        .then((res:AxiosResponse) => {
          this.model.products = res.data
        })
        .catch((err:AxiosError) => {
          console.log(err)
        })
  }
}
</script>

<template>
  <VContainer class="d-flex align-center">
    <h1 class="d-inline-block">Product List </h1>
    <VSpacer/>
    <VBtn class="mr-5">Add</VBtn>
    <VBtn class="" id="delete-product-btn" variant="outlined">Mass Delete</VBtn>
  </VContainer>
  <VContainer class="pa-0 d-flex flex-row flex-wrap">
      <Product v-for="product in this.model.products" :product="product" />
  </VContainer>
</template>