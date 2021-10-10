<template>
    <v-dialog v-model="isOpen" width="60vw">
        <v-card d-flex dir="col" v-if="userInitialized">
            <v-row>
                <v-col>
                    <v-card-title class="text-h5">
                        <v-img :src="pictureUrl" />
                    </v-card-title>
                </v-col>
                <v-col>
                    <v-card-text d-flex>
                        <p>
                            {{ fullProfile.personal.age }}
                        </p>
                        <p>
                            {{ user.name }}
                        </p>
                        <p>
                            {{ fullProfile.personal.height.cm }}
                        </p>
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
        // @Prop({ type: Object, required: true }) userProfile!: UserProfile;

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

        private openFullProfile(user: User, fullProfile: FullProfile) {
            this.user = user;
            this.fullProfile = fullProfile;
            console.log(this.fullProfile);
            this.isOpen = true;
        }

        private closeFullProfile() {
            this.isOpen = false;
            this.user = null;
        }
    }
</script>

<style></style>
