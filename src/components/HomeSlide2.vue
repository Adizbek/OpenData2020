<template>
  <div class="mx-auto home-card">
    <div class="text-left">
      <div class="h3 d-flex align-items-center">
        <div class="back-button" @click="$emit('prev')">
          <b-icon-arrow-left class="mt-2 h3"/>
        </div>

        <span class="ml-3">Ma'lumotlarni to'ldiring</span>
      </div>

      <b-form-row>
        <b-col sm="4">
          <b-form-group label="Brand">
            <b-form-select v-model="form.brand_id" :options="brands" text-field="name" value-field="id"/>
          </b-form-group>
        </b-col>

        <b-col sm="4">
          <b-form-group label="Model">
            <b-form-select v-model="form.model" :options="models" text-field="name" value-field="id"/>
          </b-form-group>
        </b-col>

        <b-col sm="4">
          <b-form-group label="Uzatmalar qutisi">
            <b-form-select :options="transmissions" value-field="id" v-model="form.transmission"/>
          </b-form-group>
        </b-col>

        <b-col sm="4">
          <b-form-group label="Year">
            <b-form-input v-model="form.year"/>
          </b-form-group>
        </b-col>

        <b-col sm="4">
          <b-form-group label="Bosgan yo‘li">
            <b-form-input v-model="form.km"/>
          </b-form-group>
        </b-col>

        <b-col sm="4">
          <b-form-group label="Holati">
            <b-form-select :options="condition" value-field="id" v-model="form.condition"/>
          </b-form-group>
        </b-col>
      </b-form-row>

      <b-button @click="$emit('next')" class="mt-3" variant="primary" block>Aniqlash</b-button>
    </div>
  </div>
</template>

<script>

export default {
  name: 'HomeSlide2',

  chimera: {
    brandsApi: '/vehicle/reference/'
  },

  props: {
    value: {}
  },

  data () {
    return {
      form: this.value || {
        brand_id: null,
        model_id: null,
        year: 2020,
        km: 0,
        transmission: 'manual',
        condition: 'good'
      }
    }
  },

  computed: {
    brands () {
      try {
        return this.$chimera.brandsApi.data.brands
      } catch {
        return []
      }
    },

    models () {
      try {
        return this.brands.find(x => x.id === this.form.brand_id).models
      } catch {
        return []
      }
    },

    transmissions () {
      return [
        { id: 'manual', text: 'Механическая' },
        { id: 'automatic', text: 'Автоматическая' },
        { id: 'other', text: 'Другая' }
      ]
    },

    condition () {
      return [
        { id: 'perfect', text: 'Отличное' },
        { id: 'good', text: 'Хорошее' },
        { id: 'mediocre', text: 'Среднее' },
        { id: 'needs_repairs', text: 'Требует ремонта' },
      ]
    }
  },

  watch: {
    form: {
      deep: true,
      handler (v) {
        this.$emit('input', v)
      }
    }
  }
}
</script>

<style scoped>

</style>
