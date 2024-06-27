<template>
    <v-menu v-model="languageMenu" offset-y>
        <template v-slot:activator="{ props }">
            <v-btn class="text-capitalize" v-bind="props" text>
                {{ activeLang }}
                <v-icon small right>mdi-menu-down</v-icon>
            </v-btn>
        </template>
        <v-list dense>
            <v-list-item v-for="(lang, index) in langs" :key="index" @click="handleMenuItemClick(lang)">
                <v-list-item-title>{{ lang.title }}</v-list-item-title>
            </v-list-item>
        </v-list>
    </v-menu>
</template>

<script lang="ts" setup>
import { ref } from 'vue';
import { i18n } from '@/i18n';

let langs = i18n.global.availableLocales.map((lang: string) => { 
    return { title: lang.toUpperCase() };
});
let activeLang = ref(i18n.global.locale.toUpperCase());
let dialog = ref(false);
let languageMenu = ref(false);

function handleMenuItemClick(lang: { title: string }): void {
    activeLang.value = lang.title;
    i18n.global.locale = lang.title.toLowerCase();
}
</script>