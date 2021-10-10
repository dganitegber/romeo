<template>
    <v-dialog v-model="fullProfileDialog" width="500">
        <v-card>
            <v-card-title class="text-h5">
                {{ $props.user }}
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
    </v-dialog>
</template>

<script lang="ts">
    import { Component, Vue } from "vue-property-decorator";
    import axios from "axios";
    import { EventBus } from "@/plugins/event-bus";

    @Component({
        props: [],
    })
    export default class FullProfile extends Vue {
        public fullProfileDialog = false;
        public mounted() {
            EventBus.$on("openFullUser", (disable: unknown) => {
                this.fullProfileDialog = !this.fullProfileDialog;
            });
        }
    }
</script>

<style></style>
