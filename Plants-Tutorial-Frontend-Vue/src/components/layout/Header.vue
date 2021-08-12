<template>
<b-navbar toggleable="lg" class="px-4">
    <img class="navbar__logo" src="@/assets/camaleon.png" alt=""  />
    <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>
    <b-collapse id="nav-collapse" is-nav>
      <!-- Right aligned nav items -->
      <b-navbar-nav class="ml-auto">
            <router-link class="flex align-items-center" to="#">Home</router-link>
            <router-link class="flex align-items-center" to="#">Plants</router-link>
            <router-link class="flex align-items-center" to="#">Animals</router-link>
            <router-link class="flex align-items-center" to="#">Landscapes</router-link>
      </b-navbar-nav>
    </b-collapse>
  </b-navbar>
</template>

<script lang="ts">
import { Component, Vue, Prop, Watch } from 'vue-property-decorator';

@Component({
    components: {
        
    },
})
export default class Header extends Vue {
  
 
}
</script>

<style lang="scss">

</style>
