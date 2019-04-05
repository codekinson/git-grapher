<template>
    <div id="app">
        <div class="container-fluid">
            <div class="row">
                <div class="col">
                    <banner/>
                </div>
            </div>
        </div>
    </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import Banner from './components/Banner.vue';
import GitGraph from './components/GitGraph.vue';

@Component({
  components: {
    Banner,
    GitGraph,
  },
})
export default class App extends Vue {}
</script>

<style>
#app {
    margin: 1em 0;
}
</style>
