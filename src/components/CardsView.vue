/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
<template>
    <v-container d-flex flex-wrap justify-content="center">
        <v-row>
            <SortSelect />
        </v-row>
        <v-row>
            <div v-for="(user, i) in users" :key="i">
                <Card :user="user" />
            </div>
        </v-row>
    </v-container>
</template>

<script lang="ts">
    import { Component, Vue } from "vue-property-decorator";
    import axios from "axios";
    import FullProfile from "./FullProfile.vue";
    import Card from "./Card.vue";
    import { User } from "@/models/User";
    import SortSelect from "./SortSelect.vue";
    import { EventBus } from "@/plugins/event-bus";

    @Component({
        components: { SortSelect, FullProfile, Card },
    })
    export default class CardsView extends Vue {
        public mainUrl = "http://localhost:3000";
        public users: User[] = [];
        public getPhrase = "/api/search?length=32";

        public async beforeMount(): Promise<void> {
            this.getCards();
        }

        private created() {
            EventBus.$on("sortCards", (event: any) => {
                if (event === "Last Seen") {
                    this.getPhrase = this.getPhrase + "&sorting=" + "ACTIVITY";
                    this.getCards();
                } else {
                    this.getPhrase =
                        this.getPhrase + "&sorting=" + event.toUpperCase();
                    this.getCards();
                }
            });
        }

        private async getCards() {
            try {
                await axios({
                    url: `${this.mainUrl}${this.getPhrase}`,
                    method: "GET",
                }).then((res: any) => {
                    this.users = res?.data?.items || [];
                });
            } catch {
                (err: any) => {
                    console.log(err);
                };
            } finally {
                this.getPhrase = "/api/search?length=32";
            }
        }

        // eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
    }
</script>

<style></style>
