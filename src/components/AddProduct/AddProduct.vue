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
          price_usd: null,
          size_mb: null,
          weight: null,
          height: null,
          width: null,
          length: null,
        }
      } as AddProductModel,
      selectItems: ['DVD', 'Book', 'Furniture'] as string[],
      productType: null as null | string,
      rules: {
        required: value => !!value || 'Please, submit required data',
        number: value => /^\d+(([.])+[0-9]{1,2})?$/.test(value) || 'Please, provide the data of indicated type'
      },
      error: {
        errorState: false as boolean,
        errorMessage: '' as string,
      },
    }
  },
  methods: {
    saveProduct: function () {
      this.$refs.product_form.validate()
          .then(res => {
            if (res.valid) {
              let data = JSON.stringify(this.removeNullFields())
              saveProduct(data)
                  .then((res: AxiosResponse) => {
                    if(res.status === 200) {
                      this.$router.push('/')
                    } else {
                      console.log(res)
                    }
                  })
                  .catch((err: AxiosError) => {
                    this.error.errorState = true
                    this.error.errorMessage = "Error: " + err.response.data
                    console.log(err)
                  })
            }
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
    },
    clearRequestErrorField: function () {
      setTimeout(() => {
        this.error.errorState = false
        this.error.errorMessage = ''
      },500)
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
      <VMessages :messages=this.error.errorMessage :active=this.error.errorState id="error-message"></VMessages>
      <VBtn id="cancel-btn" variant="outlined" color="deep-purple-accent-3" @click="backToProductList">Cancel</VBtn>
    </VContainer>

    <VContainer class="add-product-container-main">
      <VForm id="product_form" ref="product_form">
        <VRow>
          <VListSubheader>SKU</VListSubheader>
          <VTextField
              variant="underlined"
              density="comfortable"
              v-model="model.sku"
              id="sku"
              :rules="[rules.required]"
              @update:model-value="clearRequestErrorField"
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
              :rules="[rules.required]"
              @update:model-value="clearRequestErrorField"
          >
          </VTextField>
        </VRow>
        <VRow>
          <VListSubheader>Price $</VListSubheader>
          <VTextField
              variant="underlined"
              density="comfortable"

              v-model="model.attributes.price_usd"
              min="0"
              id="price"
              :rules="[rules.required,rules.number]"
              @update:model-value="clearRequestErrorField"
          >
          </VTextField>
        </VRow>
        <VRow>
          <VSelect
              class="select-field"
              v-model="productType"
              label="Product Type"
              :items="selectItems"
              @update:model-value="clearAttributeFields;clearRequestErrorField"
              variant="underlined"
              id="productType"
              :rules="[rules.required]"
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
                v-model="model.attributes.size_mb"
                min="0"
                id="size"
                :rules="[rules.required,rules.number]"
                @update:model-value="clearRequestErrorField"
            >
            </VTextField>
          </VRow>

          <VRow v-if="productType === 'Book'">
            <VListSubheader>Weight (KG)</VListSubheader>
            <VTextField
                class="attribute-field"
                variant="underlined"
                density="comfortable"
                v-model="model.attributes.weight"
                min="0"
                id="weight"
                :rules="[rules.required,rules.number]"
                @update:model-value="clearRequestErrorField"
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
                  v-model="model.attributes.height"
                  min="0"
                  id="height"
                  :rules="[rules.required,rules.number]"
                  @update:model-value="clearRequestErrorField"
              >
              </VTextField>
            </VRow>
            <VRow>
              <VListSubheader>Width (CM)</VListSubheader>
              <VTextField
                  class="attribute-field"
                  variant="underlined"
                  density="comfortable"
                  v-model="model.attributes.width"
                  min="0"
                  id="width"
                  :rules="[rules.required,rules.number]"
                  @update:model-value="clearRequestErrorField"
              >
              </VTextField>
            </VRow>
            <VRow>
              <VListSubheader>Length (CM)</VListSubheader>
              <VTextField
                  class="attribute-field"
                  variant="underlined"
                  density="comfortable"
                  v-model="model.attributes.length"
                  min="0"
                  id="length"
                  :rules="[rules.required,rules.number]"
                  @update:model-value="clearRequestErrorField"
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