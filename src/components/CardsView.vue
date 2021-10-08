<template>
    <v-container class="cards">
        <!-- <Card :card="card"></Card> -->
    </v-container>
</template>

<script lang="ts">
    import { Component, Vue } from "vue-property-decorator";
    import axios from "axios";
    import Card from "./Card.vue";
    @Component({
        components: {
            Card,
        },
    })
    export default class CardsView extends Vue {
        public mainUrl = "http://localhost:3000";
        // eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
        // public async mounted() {
        //     //neesd to be async to enable to axios function which is asynchronous.
        //     console.log("hi");
        //     try {
        //         await axios({
        //             url: `${this.mainUrl}/api/search?length=32`,
        //             method: "GET",
        //         }).then((res) => {
        //             console.log(res.data);
        //         });
        //     } catch {
        //         (err) => {
        //             console.log(err);
        //         };
        //     }
        // }
    }
</script>

<style></style>
