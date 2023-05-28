<script lang="ts">
import {createProduct} from "../../api/api.ts";
import {AxiosError, AxiosResponse} from "axios";
import {AddProductModel} from "../../interfaces/interfaces.ts";

export default {
  data() {
    return {
      model: {
        sku: null,
        product_name: null,
        price_usd: null,
        product_type: null,
        size_mb: null,
        weight_kg: null,
        height_cm: null,
        width_cm: null,
        length_cm: null,
      } as AddProductModel,
      selectItems: ["DVD", 'Book', 'Furniture'] as string[],
      rules: {
        required: (value: string) => !!value || 'Please, submit required data',
        number: (value: string) => /^\d+(([.])+[0-9]{1,2})?$/.test(value) || 'Please, provide the data of indicated type'
      },
      error: {
        errorState: false as boolean,
        errorMessage: '' as string,
      },
    }
  },
  computed: {
    descriptionCopy() {
      switch (this.model.product_type) {
        case 'DVD':
          return 'Please, provide size'
        case 'Book':
          return 'Please, provide weight'
        case 'Furniture':
          return 'Please, provide dimensions'
      }

    }
  },
  methods: {
    saveProduct: function () {
      const form = this.$refs.product_form as any & { validate: () => boolean }
        if(typeof form === 'object' && form !== null){
          form.validate()
          .then((res: { valid: boolean }) => {
            if (res.valid) {
              createProduct(JSON.stringify(this.model))
                  .then((res: AxiosResponse) => {
                    if (res.status === 200) {
                      this.$router.push('/')
                    } else {
                      console.log(res)
                    }
                  })
                  .catch((err: AxiosError) => {
                    this.error.errorState = true
                    if (err.response) {
                      this.error.errorMessage = "Error: " + err.response.data
                    }
                    console.log(err)
                  })
            }
          })
        }
    },
    backToProductList: function () {
      this.$router.push('/')
    },
    clearAttributeFields: function () {
      this.model.size_mb = null
      this.model.weight = null
      this.model.height = null
      this.model.width = null
      this.model.length = null
    },
    removeNullFields: function (productData : object) {
      productData.attributes = Object.fromEntries(Object.entries(productData).filter(entry => {
        return entry[1] != null
      }))
      return productData
    },
    clearRequestErrorField: function () {
      setTimeout(() => {
        this.error.errorState = false
        this.error.errorMessage = ''
      }, 500)
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
      <VMessages :messages=error.errorMessage :active=error.errorState id="error-message"></VMessages>
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
              v-model="model.product_name"
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

              v-model="model.price_usd"
              min="0"
              id="price"
              :rules="[rules.required,rules.number]"
              @update:model-value="clearRequestErrorField"
          >
          </VTextField>
        </VRow>
        <VRow>
          <div class="ugly_select_for_test_container">
            <label for="productType" class="ugly_select_for_test_label">Select Product Type</label>
            <select class="ugly_select_for_test v-card-title" id="productType" name="productType" v-model="model.product_type" @update:model-value="clearAttributeFields();clearRequestErrorField()" required>
              <option value="DVD">{{selectItems[0]}}</option>
              <option value="Book">{{selectItems[1]}}</option>
              <option value="Furniture">{{selectItems[2]}}</option>
            </select>
          </div>
<!--          <VSelect-->
<!--              class="select-field"-->
<!--              v-model="productType"-->
<!--              label="Product Type"-->
<!--              :items="selectItems"-->
<!--              @update:model-value="clearAttributeFields();clearRequestErrorField()"-->
<!--              variant="underlined"-->
<!--              id="productType"-->
<!--              :rules="[rules.required]"-->
<!--          >-->
<!--          </VSelect>-->
        </VRow>

        <VCard v-if="model.product_type !== null" class="bg-blue-grey-lighten-5" id="{{this.model.product_type}}">
          <VCardTitle>Product Attributes:</VCardTitle>
          <VRow v-if="model.product_type === 'DVD'">
            <VListSubheader>Size (MB)</VListSubheader>
            <VTextField
                class="attribute-field"
                variant="underlined"
                density="comfortable"
                v-model="model.size_mb"
                min="0"
                id="size"
                :rules="[rules.required,rules.number]"
                @update:model-value="clearRequestErrorField"
            >
            </VTextField>
          </VRow>

          <VRow v-if="model.product_type === 'Book'">
            <VListSubheader>Weight (KG)</VListSubheader>
            <VTextField
                class="attribute-field"
                variant="underlined"
                density="comfortable"
                v-model="model.weight_kg"
                min="0"
                id="weight"
                :rules="[rules.required,rules.number]"
                @update:model-value="clearRequestErrorField"
            >
            </VTextField>
          </VRow>

          <div v-if="model.product_type === 'Furniture'">
            <VRow>
              <VListSubheader>Height (CM)</VListSubheader>
              <VTextField
                  class="attribute-field"
                  variant="underlined"
                  density="comfortable"
                  v-model="model.height_cm"
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
                  v-model="model.width_cm"
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
                  v-model="model.length_cm"
                  min="0"
                  id="length"
                  :rules="[rules.required,rules.number]"
                  @update:model-value="clearRequestErrorField"
              >
              </VTextField>
            </VRow>
          </div>
          <p class="description">{{ descriptionCopy }}</p>
        </VCard>
      </VForm>
    </VContainer>
  </div>
</template>