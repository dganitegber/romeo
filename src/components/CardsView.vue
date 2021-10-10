/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
<template>
    <v-container d-flex flex-wrap>
        <div v-for="(user, i) in users" :key="i">
            <v-card
                @click.stop="openMe(user)"
                max-width="fit-content"
                class="userCard mr-5 mb-5 wrap"
                elevation="2"
                outlined
            >
                <v-img max-width="200px" :src="getUserPictureUrl(user)"></v-img>
                <v-card-title> {{ user.name }}</v-card-title>
                <!-- <v-card-subtitle>User ID: {{ user.id }}</v-card-subtitle>
                <v-card-subtitle
                    >Last Login: {{ user.last_login }}</v-card-subtitle
                >
                
                <v-card-subtitle>{{ user.is_plus }}</v-card-subtitle>
                <v-card-subtitle
                    >Online Status: {{ user.online_status }}</v-card-subtitle
                > -->
            </v-card>
        </div>
    </v-container>
</template>

<script lang="ts">
    import { Component, Vue } from "vue-property-decorator";
    import axios from "axios";
    import { EventBus } from "../plugins/event-bus";
    import FullProfile from "./FullProfile.vue";
    import { User } from "@/models/User";

    @Component({
        components: { FullProfile },
    })
    export default class Card extends Vue {
        public mainUrl = "http://localhost:3000";
        public users: User[] = [];

        private openMe(user: User) {
            EventBus.$emit("openFullProfile", user);
        }
            
        private getUserPictureUrl(user: User): string {
            return user?.picture?.url || require("@/assets/no-image.jpg");
        }

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
