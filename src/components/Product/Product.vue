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
        <p>{{product.product_name}}</p>
        <p>{{product.price_usd}} $</p>
        <p v-if="product.product_type === 'Furniture'">
          Dimensions:
          {{product.height_cm}}x{{product.width_cm}}x{{product.length_cm}}
        </p>
        <p v-if="product.product_type === 'DVD'">Size: {{product.size_mb}} MB</p>
        <p v-if="product.product_type === 'Book'">Weight: {{product.weight_kg}} Kg</p>
      </VContainer>
    </VCard>
  </div>
</template>