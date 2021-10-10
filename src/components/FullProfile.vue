<template>
    <v-dialog v-model="isOpen" width="500">
        <v-card v-if="userInitialized">
            <v-card-title class="text-h5">
                <v-img :src="pictureUrl" />
            </v-card-title>

            <v-card-text>
                Let Google help apps determine location. This means sending
                anonymous location data to Google, even when no apps are
                running.
            </v-card-text>

            <v-card-actions>
                <v-spacer></v-spacer>

                <v-btn color="green darken-1" text @click="dialog = false">
                    Disagree
                </v-btn>

                <v-btn color="green darken-1" text @click="dialog = false">
                    Agree
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
    import { User } from "@/models/User";

    @Component({
        props: [],
    })
    export default class FullProfile extends Vue {
        public fullProfileDialog = false;
        private isOpen = false;
        private user: User | null = null;

        private get userInitialized(): boolean {
            console.log(this.user?.name);
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

        private openFullProfile(user: User) {
            this.user = user;
            console.log(this.user);
            this.isOpen = true;
        }

        private closeFullProfile() {
            this.isOpen = false;
            this.user = null;
        }
    }
</script>

<style></style>
