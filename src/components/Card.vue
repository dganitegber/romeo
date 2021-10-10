/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
<template>
    <v-card
        @click.stop="openMe(user)"
        max-width="fit-content"
        class="userCard mr-5 mb-5 wrap"
        elevation="2"
        outlined
    >
        <v-img max-width="300px" :src="pictureUrl" />
        <v-col>
            <v-row>
                <v-card-title>
                    {{ userProfile.personal.age }} |
                    {{ user.name }}</v-card-title
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
                </v-tooltip>
            </v-row>
            <v-row>
                <span> Last online: {{ formatDate() }} </span>
            </v-row>
        </v-col>

        <!-- <v-card-subtitle>User ID: {{ user.id }}</v-card-subtitle>
                <v-card-subtitle
                    >Last Login: {{ user.last_login }}</v-card-subtitle
                >
                
                <v-card-subtitle>{{ user.is_plus }}</v-card-subtitle>
                <v-card-subtitle
                    >Online Status: {{ user.online_status }}</v-card-subtitle
                > -->
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
        public userProfile = {};

        public async beforeMount(): Promise<void> {
            //neesd to be async to enable to axios function which is asynchronous.
            try {
                await axios({
                    url: `${this.mainUrl}/api/profiles?ids=${this.user.id}`,
                    method: "GET",
                }).then((res: any) => {
                    this.userProfile = res.data[0];
                    console.log("this.userProfile", this.userProfile);
                });
            } catch {
                (err: any) => {
                    console.log(err);
                };
            }
        }
        private get onlineStatus() {
            console.log("status", this.user.online_status);
            console.log(this.user.online_status);
            if (this.user.online_status === "OFFLINE") {
                return "red";
            } else if (this.user.online_status === "ONLINE") {
                return "green";
            } else {
                return "purple";
            }
        }
        private openMe(user: User) {
            EventBus.$emit("openFullProfile", user);
        }

        private formatDate() {
            return moment(this.user.last_login.toString()).fromNow();
        }

        private get pictureUrl(): string {
            return this.user?.picture?.url || require("@/assets/no-image.jpg");
        }

        // eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
    }
</script>

<style>
    .dot {
        height: 15px;
        width: 15px;
        margin-top: 25px;
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
</style>
