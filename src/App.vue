<template>
    <div id="app">
        <div class="container-fluid">
            <div class="row">
                <div class="col">
                    <banner/>
                    <git-graph-display />
                </div>
            </div>
        </div>
    </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import Banner from './components/Banner.vue';
import GitGraphDisplay from './components/GitGraphDisplay.vue';

@Component({
  components: {
    Banner,
    GitGraphDisplay,
  },
})
export default class App extends Vue {}
</script>

<style>
#app {
    margin: 1em 0;
}
</style>
