<template>
    <v-layout>
        <v-app-bar
            class="px-4"
            prominent
        >
            <v-app-bar-nav-icon variant="text" @click.stop="drawer = !drawer"></v-app-bar-nav-icon>
            <v-toolbar-title>{{ title }}</v-toolbar-title>
            <language-selector/>
        </v-app-bar>

        <v-navigation-drawer
            v-model="drawer"
            :location="$vuetify.display.mobile ? 'bottom' : undefined"
            temporary
        >
            <v-list>
                <v-list-item to="/">
                    <v-list-item-title v-text="$t('Dashboard')"></v-list-item-title>
                </v-list-item>
                <v-list-item to="/user-list">
                    <v-list-item-title v-text="$t('UserList')"></v-list-item-title>
                </v-list-item>
            </v-list>
        </v-navigation-drawer>

        <v-main class="px-5">
            <slot/>
        </v-main>

        <flash-message-box/>
    </v-layout>
</template>

<script lang="ts" setup>
import { ref } from 'vue';
import LanguageSelector from '@/components/LanguageSelector';
import FlashMessageBox from '@/components/FlashMessageBox';

let drawer = ref(false);
let props = defineProps({
    title: {
        type: String,
        required: true,
    },
});
</script>
