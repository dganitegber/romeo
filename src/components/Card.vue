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
                <v-img max-width="200px" :src="user.url"></v-img>
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
        <FullProfile />
    </v-container>
</template>

<script lang="ts">
    export interface user {
        id: number;
        name: "";
        is_plus: boolean;
        last_login: Date;
        online_status: "";
        url: "";
    }

    import { Component, Vue } from "vue-property-decorator";
    import axios from "axios";
    import { EventBus } from "../plugins/event-bus";
    import FullProfile from "./FullProfile.vue";

    @Component({
        components: { FullProfile },
        props: {
            user: { type: Object, default: () => ({}) },
        },
    })
    export default class Card extends Vue {
        public mainUrl = "http://localhost:3000";
        public users = [];
        public selectedUser = [];

        public openMe(user: any) {
            this.selectedUser = user;
            // this.$props.user = user;
            // console.log("props", this.$props);
            EventBus.$emit("openFullUser", true);
        }
        public async beforeMount() {
            console.log("this.user", this.$props.user);
            //neesd to be async to enable to axios function which is asynchronous.
            console.log("hi");
            try {
                await axios({
                    url: `${this.mainUrl}/api/search?length=32`,
                    method: "GET",
                }).then((res) => {
                    //there has to be a better way to assign a type to this but multiple options i tried did not work
                    res.data.items.forEach((element) => {
                        if (element.picture) {
                            // element.picure.comment = element.comment;
                            element.url = element.picture.url;
                        } else {
                            element.url =
                                "https://images.unsplash.com/photo-1444703686981-a3abbc4d4fe3?ixid=MnwxMjA3fDB8MHxzZWFyY2h8MXx8dW5pdmVyc2V8ZW58MHx8MHx8&ixlib=rb-1.2.1&w=1000&q=80";
                        }
                    });
                    this.users = res.data.items;
                });
            } catch {
                (err: undefined) => {
                    console.log(err);
                };
            }
        }

        // eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
    }
</script>

<style></style>
