<template>
    <v-app>
        <v-main>
            <div id="app">
                <img alt="Vue logo" src="./assets/logo.png" />
                <Card />
            </div>
        </v-main>
    </v-app>
</template>

<script lang="ts">
    import { Component, Vue } from "vue-property-decorator";
    import Card from "./components/Card.vue";
    // import CardsView from "./components/CardsView.vue";

    @Component({
        components: {
            Card,
        },
    })
    export default class App extends Vue {}
</script>

<style lang="scss">
    #app {
        font-family: Avenir, Helvetica, Arial, sans-serif;
        -webkit-font-smoothing: antialiased;
        -moz-osx-font-smoothing: grayscale;
        text-align: center;
        color: #2c3e50;
        margin-top: 60px;
    }
</style>
