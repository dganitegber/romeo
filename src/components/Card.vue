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
    </v-container>
</template>

<script lang="ts">
    // interface user {
    //     id: number;
    //     name: "";
    //     is_plus: boolean;
    //     last_login: Date;
    //     online_status: "";
    //     picture: {
    //         comment: "";
    //         url: "";
    //     };
    // picture_url:

    // }

    import { Component, Vue } from "vue-property-decorator";
    import axios from "axios";
    @Component({
        props: ["card"],
    })
    export default class Card extends Vue {
        public mainUrl = "http://localhost:3000";
        public users = [];
        public openMe(user) {
            
        }
        public async beforeMount() {
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
                            element.url = "../assets/no-picture.jpg";
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
