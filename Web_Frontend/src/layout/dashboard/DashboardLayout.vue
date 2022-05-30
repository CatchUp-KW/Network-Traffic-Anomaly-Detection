<template>
  <div class="wrapper">
    <side-bar>
      <template slot="links">
        <sidebar-link to="/home" name="Home" icon="ti-home"/>
        <sidebar-link to="/result" name="Result" icon="ti-view-list"/>
        <sidebar-link to="/abnormal" name="Abnormal" icon="ti-stats-up"/>
        <sidebar-link to="/attack" name="Attack" icon="ti-target"/>
        <sidebar-link to="/information" name="Information" icon="ti-info-alt"/>
        <sidebar-link to="/setting" name="Setting" icon="ti-settings"/>
      </template>
    </side-bar>
    <div class="main-panel">

      <dashboard-content @click.native="toggleSidebar">

      </dashboard-content>

    </div>
  </div>
</template>
<style lang="scss">
</style>
<script>
import DashboardContent from "./Content.vue";
export default {
  components: {
    DashboardContent
  },
  methods: {
    toggleSidebar() {
      if (this.$sidebar.showSidebar) {
        this.$sidebar.displaySidebar(false);
      }
    }
  }
};
</script>
