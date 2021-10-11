<template>
    <v-col class="d-flex" cols="12" sm="6">
        <v-select
            :items="items"
            label="Distance"
            @change="sort($event)"
        ></v-select>
    </v-col>
</template>

<script lang="ts">
    import { Component, Vue } from "vue-property-decorator";
    import { EventBus } from "@/plugins/event-bus";

    @Component({})
    export default class SortSelect extends Vue {
        private items = ["Distance", "Last Seen"];

        private sort(event: any) {
            EventBus.$emit("sortCards", event);
        }
    }
</script>

<style></style>
