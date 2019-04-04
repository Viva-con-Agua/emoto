<template>
  <div class="Settings">
    <info />

    <privacy-settings />
  </div>
</template>

<script>
import Info from '@/components/Info'
import PrivacySettings from '@/components/PrivacySettings'

export default {
  name: 'Settings',
  components: {Info, PrivacySettings},
  data() {
   return {}
  },
  created () {},
  methods: {}
}
</script>

<style scoped>
p {
  text-align:left;
}
</style>