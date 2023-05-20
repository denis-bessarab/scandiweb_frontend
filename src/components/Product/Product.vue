<script lang="ts">

import {ProductIterface} from "../../interfaces/interfaces.ts";
export default {
  props: {
    product: Object as ProductIterface
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