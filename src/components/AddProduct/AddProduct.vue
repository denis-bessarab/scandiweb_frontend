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
      selectItems: ["DVD", 'Book', 'Furniture'] as string[],
      productType: null as null | string,
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
      switch (this.productType) {
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
              let data = JSON.stringify(this.removeNullFields())
              saveProduct(data)
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
      this.model.attributes.size_mb = null
      this.model.attributes.weight = null
      this.model.attributes.height = null
      this.model.attributes.width = null
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
          <div class="ugly_select_for_test_container">
            <label for="productType" class="ugly_select_for_test_label">Select Product Type</label>
            <select class="ugly_select_for_test v-card-title" id="productType" name="productType" v-model="productType" @update:model-value="clearAttributeFields();clearRequestErrorField()" required>
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
          </div>
          <p class="description">{{ descriptionCopy }}</p>
        </VCard>
      </VForm>
    </VContainer>
  </div>
</template>