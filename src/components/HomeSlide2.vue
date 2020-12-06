<template>
  <div class="mx-auto home-card-wide">
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
            <b-form-select v-model="form.model_id" :options="models" text-field="name" value-field="id"/>
          </b-form-group>
        </b-col>

        <b-col sm="4">
          <b-form-group label="Uzatmalar qutisi">
            <b-form-select :options="transmissions" value-field="id" v-model="form.transmission_type"/>
          </b-form-group>
        </b-col>

        <b-col sm="4">
          <b-form-group label="Year">
            <b-form-input v-model="form.manufactured_year"/>
          </b-form-group>
        </b-col>

        <b-col sm="4">
          <b-form-group label="Bosgan yo‘li">
            <b-form-input v-model="form.driven_km"/>
          </b-form-group>
        </b-col>

        <b-col sm="4">
          <b-form-group label="Holati">
            <b-form-select :options="condition" value-field="id" v-model="form.condition"/>
          </b-form-group>
        </b-col>
      </b-form-row>

      <div v-if="hasInfo" class="text-left mt-4" style="font-size: 18px; line-height: 28px">
        <div class="row">
          <div class="col-6">
            <div style="font-size: 28px; line-height: 50px">
              <b>${{ toPrice(priceInfo.prices.avg_price_usd) }}</b>
            </div>

            <div>Min: <b>${{ toPrice(priceInfo.prices.min_price_usd) }}</b></div>
            <div>Maks: <b>${{ toPrice(priceInfo.prices.max_price_usd) }}</b></div>
          </div>

          <div class="col-6">
            <div style="font-size: 28px; line-height: 50px">
              <b>{{ toPrice(priceInfo.prices.avg_price_uzs) }} so'm</b>
            </div>

            <div>Min: <b>{{ toPrice(priceInfo.prices.min_price_uzs) || '0' }} so'm</b></div>
            <div>Maks: <b>{{ toPrice(priceInfo.prices.max_price_uzs) }} so'm</b></div>
          </div>
        </div>

        <div class="mt-4">Narxlar <b>{{ priceInfo.similar_ads_total }}</b> ta e'lon asosida taklif qilindi</div>
      </div>


      <div v-if="hasInfo" class="mt-3 form-row">
        <div class="col-6 col-sm-12 col-md-6">
          <line-chart
              :chartdata="chartInfo.chartKmValues"
              :options="chartInfo.chartKmOptions"/>
        </div>
        <div class="col-6 col-sm-12 col-md-6">
          <line-chart
              :chartdata="chartInfo.chartYearValues"
              :options="chartInfo.chartYearOptions"/>
        </div>
      </div>

      <div v-if="hasInfo">
        <div style="font-size: 28px; line-height: 50px" class="mt-4">
          <b>Boshqa takliflar</b>
        </div>

        <div :key="p.id" v-for="p in priceInfo.similar_ads" class="d-inline-block rec-item">
          <a :href="p.url" style="color: #333" target="_blank">
            {{ p.manufactured_year }} yil, {{ p.driven_km }} km,
            <b>${{ toPrice(p.price_usd) || '0' }}</b>
          </a>
        </div>
      </div>
    </div>
  </div>
</template>

<script>

import LineChart from '@/components/LineChart'

export default {
  name: 'HomeSlide2',
  components: { LineChart },
  chimera: {
    brandsApi: '/vehicle/reference/',

    findPrice: {
      url: '/vehicle/buyer/recommendations_by_parameters/',
      auto: false,
    }
  },

  props: {
    value: {}
  },

  data () {
    return {
      form: this.value || {
        brand_id: undefined,
        model_id: undefined,
        manufactured_year: undefined,
        driven_km: undefined,
        transmission_type: undefined,
        condition: undefined
      },

      oldBrand: -1,
      priceInfo: null
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
    },

    hasInfo () {
      try {
        return this.priceInfo.similar_ads_total > 0 && this.form.model_id
      } catch {
        return false
      }
    },

    chartInfo () {
      try {
        let labelsKm = this.priceInfo.stats_by_driven_km.map(x => x.driven_km + ' km')
        let labelsYear = this.priceInfo.stats_by_manufactured_year.map(x => x.manufactured_year + ' yil')

        return {
          chartKmOptions: {
            responsive: true,
            maintainAspectRatio: false
          },

          chartYearOptions: {
            responsive: true,
            maintainAspectRatio: false
          },

          chartKmValues: {
            labels: labelsKm,
            datasets: [{
              label: 'Narx',
              backgroundColor: '#8298e3',
              data: this.priceInfo.stats_by_driven_km.map(x => x.avg_price_usd)
            }]
          },

          chartYearValues: {
            labels: labelsYear,
            datasets: [{
              label: 'Narx',
              backgroundColor: '#9ce382',
              data: this.priceInfo.stats_by_manufactured_year.map(x => x.avg_price_usd)
            }]
          },
        }
      } catch {
        return null
      }
    }
  },

  methods: {
    findPrice () {
      this.$chimera.findPrice.send(this.form).then(({ data }) => {
        if (data) {
          this.priceInfo = null
          this.$nextTick(() => {
            this.priceInfo = data
          })
        }
      })
    },

    toPrice (price) {
      if (price) {
        return new Intl.NumberFormat('ru-RU').format(price)
      } else {
        ''
      }
    }
  },

  watch: {
    form: {
      deep: true,
      immediate: true,
      handler (v) {
        this.$emit('input', v)

        if (v.brand_id !== this.oldBrand && this.oldBrand !== -1) {
          v.model_id = null
          v.priceInfo = null
        }

        this.oldBrand = v.brand_id

        if (v.model_id) {
          this.findPrice()
        }
      }
    }
  }
}
</script>

<style scoped lang="scss">
.rec-item {
  width: 210px;
  border: 1px solid #dedede;
  padding: 4px;
  margin: 4px;
  border-radius: 5px;

  &:hover {
    background: #e1edf9;
  }
}
</style>
