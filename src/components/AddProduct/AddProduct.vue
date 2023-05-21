<script lang="ts">
import {saveProduct} from "../../api/api.ts";
import {AxiosError, AxiosResponse} from "axios";
import {AddProductModel} from "../../interfaces/interfaces.ts";

export default {
  data() {
    return {
      model: {
        sku: null,
        attributes: {
          name: null,
          price: null,
          size: null,
          weight: null,
          height: null,
          width: null,
          length: null,
        }
      } as AddProductModel,
      selectItems: ['DVD', 'Book', 'Furniture'] as string[],
      productType: null as null | string,
    }
  },
  methods: {
    saveProduct: function () {
      let data = this.removeNullFields()
      saveProduct(data)
          .then((res: AxiosResponse) => {
            console.log(res)
          })
          .catch((err: AxiosError) => {
            console.log(err)
          })
    },
    backToProductList: function () {
      this.$router.push('/')
    },
    clearAttributeFields: function () {
      this.model.attributes.size = null
      this.model.attributes.weight = null
      this.model.attributes.height = null
      this.model.attributes.wide = null
      this.model.attributes.length = null
    },
    removeNullFields: function () {
      let productData = this.model
      productData.attributes = Object.fromEntries(Object.entries(productData.attributes).filter(entry => {
        return entry[1] != null
      }))
      return productData
    }
  }
}
</script>

<template>
  <div id="add-product">
    <VContainer class="app-bar">
      <h1>Add Product </h1>
      <VSpacer class="spacer"/>
      <VBtn color="deep-purple-accent-3" @click="saveProduct">Save</VBtn>
      <VBtn id="cancel-btn" variant="outlined" color="deep-purple-accent-3" @click="backToProductList">Cancel</VBtn>
    </VContainer>

    <VContainer class="add-product-container-main">
      <VForm id="product_form">
        <VRow>
          <VListSubheader>SKU</VListSubheader>
          <VTextField
              variant="underlined"
              density="comfortable"
              v-model="model.sku"
              id="sku"
          >
          </VTextField>
        </VRow>
        <VRow>
          <VListSubheader>Name</VListSubheader>
          <VTextField
              variant="underlined"
              density="comfortable"
              v-model="model.attributes.name"
              id="name"
          >
          </VTextField>
        </VRow>
        <VRow>
          <VListSubheader>Price $</VListSubheader>
          <VTextField
              variant="underlined"
              density="comfortable"
              type="number"
              v-model="model.attributes.price"
              min="0"
              id="price"
          >
          </VTextField>
        </VRow>
        <VRow>
          <VSelect
              class="select-field"
              v-model="productType"
              label="Product Type"
              :items="selectItems"
              @update:model-value="clearAttributeFields"
              variant="underlined"
              id="productType"
          ></VSelect>
        </VRow>

        <VCard v-if="productType !== null" class="bg-blue-grey-lighten-5" id="{{this.productType}}">
          <VCardTitle>Product Attributes:</VCardTitle>
          <VRow v-if="productType === 'DVD'">
            <VListSubheader>Size (MB)</VListSubheader>
            <VTextField
                class="attribute-field"
                variant="underlined"
                density="comfortable"
                type="number"
                v-model="model.attributes.size"
                min="0"
                id="size"
            >
            </VTextField>
          </VRow>

          <VRow v-if="productType === 'Book'">
            <VListSubheader>Weight (KG)</VListSubheader>
            <VTextField
                class="attribute-field"
                variant="underlined"
                density="comfortable"
                type="number"
                v-model="model.attributes.weight"
                min="0"
                id="weight"
            >
            </VTextField>
          </VRow>

          <div v-if="productType === 'Furniture'">
            <VRow>
              <VListSubheader>Height (CM)</VListSubheader>
              <VTextField
                  class="attribute-field"
                  variant="underlined"
                  density="comfortable"
                  type="number"
                  v-model="model.attributes.height"
                  min="0"
                  id="height"
              >
              </VTextField>
            </VRow>
            <VRow>
              <VListSubheader>Width (CM)</VListSubheader>
              <VTextField
                  class="attribute-field"
                  variant="underlined"
                  density="comfortable"
                  type="number"
                  v-model="model.attributes.width"
                  min="0"
                  id="width"
              >
              </VTextField>
            </VRow>
            <VRow>
              <VListSubheader>Length (CM)</VListSubheader>
              <VTextField
                  class="attribute-field"
                  variant="underlined"
                  density="comfortable"
                  type="number"
                  v-model="model.attributes.length"
                  min="0"
                  id="length"
              >
              </VTextField>
            </VRow>
            <p v-if="productType === 'DVD'" class="description">Please, provide size</p>
            <p v-if="productType === 'Book'" class="description">Please, provide weight</p>
            <p v-if="productType === 'Furniture'" class="description">Please, provide dimensions</p>
          </div>
        </VCard>
      </VForm>
    </VContainer>
  </div>
</template>