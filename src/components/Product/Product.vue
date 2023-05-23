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
}
</script>

<template>
  <div id="product">
    <VCard>
      <VContainer>
        <VCheckbox class="delete-checkbox" color="deep-purple-accent-3" @input="$emit('updateDeleteList',product.id)" />
        <h4>{{product.sku}}</h4>
        <p>{{product.attributes.name}}</p>
        <p>{{product.attributes.price_usd}} $</p>
        <p v-if="product.attributes.height">
          Dimensions:
          {{product.attributes.height}}x{{product.attributes.width}}x{{product.attributes.length}}
        </p>
        <p v-if="product.attributes.size_mb">{{product.attributes.size_mb}} MB</p>
        <p v-if="product.attributes.weight">{{product.attributes.weight}} Kg</p>
      </VContainer>
    </VCard>
  </div>
</template>