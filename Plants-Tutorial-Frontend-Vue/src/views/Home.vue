<template>
    <b-row class="w-100">
        <b-col cols="12" sm="12" md="8" lg="8" class="mx-auto">
          <router-link class="button primary-button" to="/plants">Ver plantas</router-link>
        </b-col>
    </b-row>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';

@Component({
  components: {
  },
})
export default class Home extends Vue {}
</script>
