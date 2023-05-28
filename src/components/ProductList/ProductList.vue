<script lang="ts">

import {deleteProduct, getProducts} from "../../api/api.ts";
import {AxiosError, AxiosResponse} from "axios";
import {ProductListModel} from "../../interfaces/interfaces.ts";

import Product from "../Product/Product.vue";

export default {
  components: {Product},
  data() {
    return {
      model: {
        products: [],
        deleteList: [],
      } as ProductListModel
    }
  },
  methods: {
    addProduct: function (): void {
      this.$router.push('/add-product');
    },
    updateDeleteList: function (product_id: number) {
      if (this.model.deleteList.includes(product_id)) {
        this.model.deleteList = this.model.deleteList.filter(id => {
          return id !== product_id
        })
      } else {
        this.model.deleteList.push(product_id)
      }
    },
    getData() {
      getProducts()
          .then((res: AxiosResponse) => {
            this.model.products = res.data
            console.log(res)
          })
          .catch((err: AxiosError) => {
            console.log(err)
          })
    },
    massDelete: function() {
      deleteProduct(this.model.deleteList)
          .then(res => {
            if(res.status === 200) {
              this.getData()
            }
          })
          .catch(err => {
            console.log(err)
          })
    }
  },
  mounted() {
    this.getData()
  }
}
</script>

<template>
  <div id="product-list">
    <VContainer class="app-bar">
      <h1>Product List </h1>
      <VSpacer class="spacer"/>
      <VBtn color="deep-purple-accent-3" @click="addProduct">ADD</VBtn>
      <VBtn id="delete-product-btn" variant="outlined" color="deep-purple-accent-3" @click="massDelete">MASS DELETE</VBtn>
    </VContainer>

    <VContainer class="product-container-main">
      <Product v-for="product in model.products" :product="product"
               @updateDeleteList="updateDeleteList"/>
    </VContainer>
  </div>
</template>