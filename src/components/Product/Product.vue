<script lang="ts">
import {PropType} from "vue";

import {ProductInterface} from "../../interfaces/interfaces.ts";

export default {
  props: {
    product: {
      type: Object as PropType<ProductInterface>,
      required: true,
    },
  },
  data() {
    return {

    }
  }
}
</script>

<template>
  <div id="product">
    <VCard class="product-card">
      <VContainer>
        <VCheckbox class="delete-checkbox" color="deep-purple-accent-3" @input="$emit('updateDeleteList',product.id)"></VCheckbox>
        <h4>{{product.sku}}</h4>
        <p>{{product.attributes.name}}</p>
        <p>{{product.attributes.price_usd}} $</p>
        <p v-if="product.attributes.dimensions">
          Dimensions:
          {{product.attributes.dimensions.height.toString()}}x{{product.attributes.dimensions.wide.toString()}}x{{product.attributes.dimensions.length.toString()}}
        </p>
        <p v-if="product.attributes.size_mb">{{product.attributes.size_mb}} MB</p>
        <p v-if="product.attributes.weight">{{product.attributes.weight}} KG</p>
      </VContainer>
    </VCard>
  </div>
</template>