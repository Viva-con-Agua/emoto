<template>
  <div class="MoodPicture"> 
    <h1> Last Mood</h1>
    <mood-chart />
    <mood-chart />
  </div>
</template>

<script>
import MoodChart from '@/components/MoodChart'
export default {
  components: {MoodChart}
}
</script>

<style scoped>
</style>