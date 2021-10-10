<template>
    <v-app>
        <v-main>
            <div id="app">
                <CardsView />
                <FullProfile />
            </div>
        </v-main>
    </v-app>
</template>

<script lang="ts">
    import { Component, Vue } from "vue-property-decorator";
    import CardsView from "./components/CardsView.vue";
    import FullProfile from "./components/FullProfile.vue";

    @Component({
        components: {
            CardsView,
            FullProfile,
        },
    })
    export default class App extends Vue {
        // bus listen to card click:
    }
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
