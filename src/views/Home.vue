<template>
  <div class="home">
    <div class="mx-auto home-card">
      <div class="text-center h3">
        <img src="/imgs/thinking.png" width="300px">

        <div style="line-height: 2.5rem">
        Narxni baholay olmayapsizmi? <br> Unda biz sizga yordam beramiz!
        </div>

        <b-button size="lg" variant="outline-primary" class="mt-4">
          <b-icon-search class="mr-2"/>
          Aniqlash
        </b-button>
      </div>
    </div>
  </div>
</template>

<script>

export default {
  name: 'Home',
}
</script>

<style scoped>
.home {
  height: 100vh;
  padding-top: 4rem;
  background: #e1ecf9;
}

.home-card {
  border-radius: 4px;
  padding: 2rem;
  background: white;
  width: 600px;
}
</style>
