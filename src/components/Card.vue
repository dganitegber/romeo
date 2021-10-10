/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
<template>
    <v-card
        @click.stop="openMe(user)"
        max-width="fit-content"
        class="userCard mr-5 mb-5 wrap"
        elevation="2"
        outlined
    >
        <v-img max-width="200px" :src="pictureUrl" />
        <v-row>
            <v-card-title> {{ user.age }}|{{ user.name }}</v-card-title>
            <span
                class="dot"
                :style="`background-color: ${onlineStatus}`"
            ></span>
        </v-row>
        <v-row> Last online: {{ formatDate() }} </v-row>
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
    import { User } from "@/models/User";

    @Component
    export default class Card extends Vue {
        @Prop({ type: Object, required: true }) user!: User;
        private get whatamai() {
            console.log(this.onlineStatus);
            return this.onlineStatus;
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
            return new Date(this.user.last_login.toString()).toLocaleString(
                "de-DE"
            );
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
