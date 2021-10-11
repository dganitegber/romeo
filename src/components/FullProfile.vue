<template>
    <v-dialog v-model="isOpen" max-width="70vw">
        <v-card
            d-flex
            dir="col"
            v-if="userInitialized"
            color="black"
            font="white"
        >
            <v-row>
                <v-col class="pt-0">
                    <v-card-title class="text-h5 pa-0">
                        <v-img :src="pictureUrl" />
                    </v-card-title>
                </v-col>
                <v-col>
                    <v-card-text d-flex>
                        <p>Age: {{ fullProfile.personal.age }}</p>
                        <p>Name: {{ user.name }}</p>
                        <p>Heigth (cm): {{ fullProfile.personal.height.cm }}</p>
                    </v-card-text>
                </v-col>
            </v-row>
            <v-card-actions>
                <v-spacer></v-spacer>

                <v-btn color="green darken-1" text @click="isOpen = false">
                    Close
                </v-btn>
            </v-card-actions>
        </v-card>
        <div v-else>
            hi loader
        </div>
    </v-dialog>
</template>

<script lang="ts">
    import { Component, Vue } from "vue-property-decorator";
    import { EventBus } from "@/plugins/event-bus";
    import { User, UserProfile } from "@/models/User";

    @Component({})
    export default class FullProfile extends Vue {

        public fullProfileDialog = false;
        private isOpen = false;
        private user: User | null = null;
        private fullProfile: UserProfile | null = null;

        private get userInitialized(): boolean {
            return !!this.user;
        }

        private get pictureUrl(): string {
            return this.user?.picture?.url || require("@/assets/no-image.jpg");
        }

        private created() {
            EventBus.$on("openFullProfile", this.openFullProfile);
            EventBus.$on("closeFullProfile", this.closeFullProfile);
        }

        private destroyed() {
            EventBus.$off("openFullProfile", this.openFullProfile);
            EventBus.$off("closeFullProfile", this.closeFullProfile);
        }

        private openFullProfile(user: User, fullProfile: UserProfile) {
            this.user = user;
            this.fullProfile = fullProfile;
            this.isOpen = true;
        }

        private closeFullProfile() {
            this.isOpen = false;
            this.user = null;
        }
    }
</script>

<style scoped>
    .v-card {
        overflow: unset;
        color: white !important;
    }

    .v-btn {
        transition: background-color 300ms ease-out 100ms;
    }

    @keyframes color-fade {
        from {
            background-color: transparent;
        }
        to {
            background-color: transparent;
        }
    }

    .v-btn:hover {
        background-color: rgb(54, 121, 54);
    }
</style>
