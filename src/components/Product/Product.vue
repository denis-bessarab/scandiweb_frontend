<script lang="ts">

import {Product} from "../../interfaces/interfaces.ts";

export default {
  props: {
    product: Object as Product
  },
  data() {
    return {

    }
  }
}
</script>

<template>
  <VCard class="product">
    <h1>{{$props.product.id}}</h1>
  </VCard>
</template>