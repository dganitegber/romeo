/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
<template>
    <v-card
        @click.stop="openMe(user)"
        max-width="fit-content"
        min-width="25vw"
        class="userCard mr-5 mb-5 wrap"
        elevation="2"
        color="white"
        outlined
    >
        <v-img min-width="300px" max-width="28vw" :src="pictureUrl" />
        <v-col>
            <v-row class="justify-center">
                <v-card-title>
                    <span
                        >{{ individualAge }} | {{ user.name }}</span
                    ></v-card-title
                >
                <v-tooltip bottom>
                    <template v-slot:activator="{ on, attrs }">
                        <span
                            class="dot"
                            :style="`background-color: ${onlineStatus}`"
                            color="primary"
                            dark
                            v-bind="attrs"
                            v-on="on"
                        >
                        </span>
                    </template>
                    <span>{{ user.online_status }}</span>
                </v-tooltip>
            </v-row>
            <v-row>
                <v-card-text>
                    Last online: {{ formatDate() }} | Distance:
                    {{ individualLocation }}km
                </v-card-text>
                <v-card-subtitle>
                    <span class="headline"> "{{ headline }}" </span>
                </v-card-subtitle>
            </v-row>
        </v-col>
    </v-card>
</template>

<script lang="ts">
    import { Component, Vue, Prop } from "vue-property-decorator";
    import { EventBus } from "../plugins/event-bus";
    import { User, UserProfile } from "@/models/User";
    import axios from "axios";
    import moment from "moment";

    @Component
    export default class Card extends Vue {
        @Prop({ type: Object, required: true }) user!: User;

        public mainUrl = "http://localhost:3000";
        public selectedUser = {};
        private userProfile: UserProfile | null = null;

        public async beforeMount(): Promise<void> {
            try {
                await axios({
                    url: `${this.mainUrl}/api/profiles?ids=${this.user.id}`,
                    method: "GET",
                }).then((res: any) => {
                    this.userProfile = res?.data[0];
                });
            } catch {
                (err: any) => {
                    console.log(err);
                };
            }
        }
        private get onlineStatus() {
            if (this.user.online_status === "OFFLINE") {
                return "red";
            } else if (this.user.online_status === "ONLINE") {
                return "green";
            } else {
                return "purple";
            }
        }
        private openMe(user: User) {
            EventBus.$emit("openFullProfile", user, this.userProfile);
        }

        private formatDate() {
            return moment(this.user.last_login.toString()).fromNow();
        }

        private get pictureUrl(): string {
            return this.user?.picture?.url || require("@/assets/no-image.jpg");
        }

        private get individualLocation() {
            return this.userProfile?.location?.distance;
        }

        private get individualAge() {
            return this.userProfile?.personal?.age;
        }

        private get headline() {
            return this.userProfile?.headline;
        }
    }
</script>

<style>
    .headline {
        font-size: 0.8rem !important;
        font-style: italic !important;
    }
    .dot {
        height: 15px;
        width: 15px;
        margin-top: 20px;
        border-radius: 50%;
        display: inline-block;

        background: radial-gradient(circle at 50% 120%);
    }
    .online {
        background-color: green;
    }
    .offline {
        background-color: red;
    }
    .v-dialog {
        overflow-y: unset !important;
    }
</style>
