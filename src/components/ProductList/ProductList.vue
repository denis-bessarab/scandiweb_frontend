<script lang="ts">

import {getProducts} from "../../api/api.ts";
import {AxiosError, AxiosResponse} from "axios";
import {Product} from "../../interfaces/interfaces.ts";
import Product from "../Product/Product.vue";

export default {
  components: {Product},
  data() {
    return {
      model: {
        products : [] as Product[]
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
  <h1>Hi, I am Product List Component <VIcon icon="mdi mdi-access-point"/></h1>
  <Product v-for="product in this.model.products" :product="product" />
</template>