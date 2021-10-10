/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
<template>
    <v-container d-flex flex-wrap justify-content="center">
        <div v-for="(user, i) in users" :key="i">
            <Card :user="user" />
        </div>
    </v-container>
</template>

<script lang="ts">
    import { Component, Vue } from "vue-property-decorator";
    import axios from "axios";
    import FullProfile from "./FullProfile.vue";
    import Card from "./Card.vue";
    import { User } from "@/models/User";

    @Component({
        components: { FullProfile, Card },
    })
    export default class CardsView extends Vue {
        public mainUrl = "http://localhost:3000";
        public users: User[] = [];

        public async beforeMount(): Promise<void> {
            //neesd to be async to enable to axios function which is asynchronous.
            try {
                await axios({
                    url: `${this.mainUrl}/api/search?length=32`,
                    method: "GET",
                }).then((res: any) => {
                    this.users = res?.data?.items || [];
                });
            } catch {
                (err: any) => {
                    console.log(err);
                };
            }
        }

        // eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
    }
</script>

<style></style>
