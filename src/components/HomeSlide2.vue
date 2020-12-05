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
        <b-col sm="6">
          <b-form-group label="Brand">
            <b-form-select/>
          </b-form-group>
        </b-col>

        <b-col sm="6">
          <b-form-group label="Model">
            <b-form-select/>
          </b-form-group>
        </b-col>

        <b-col sm="4">
          <b-form-group label="Year">
            <b-form-input/>
          </b-form-group>
        </b-col>

        <b-col sm="4">
          <b-form-group label="Km">
            <b-form-input/>
          </b-form-group>
        </b-col>

        <b-col sm="4">
          <b-form-group label="Transmission">
            <b-form-select/>
          </b-form-group>
        </b-col>
      </b-form-row>

      <b-button @click="$emit('next')" class="mt-3" variant="primary" block>Aniqlash</b-button>
    </div>
  </div>
</template>

<script>
export default {
  name: 'HomeSlide2'
}
</script>

<style scoped>

</style>
