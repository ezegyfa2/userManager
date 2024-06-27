<template>
    <layout :title="$t('Dashboard')">
        <v-row class="justify-center">
            <v-col cols="12" md="6">
                <v-row class="card-row">
                    <v-col cols="12" sm="6">
                        <v-card class="bg-green-lighten-1">
                            <v-card-title>{{ $t('ActiveUsers') }}</v-card-title>
                            <v-card-title>{{ activeUserCount }}</v-card-title>
                        </v-card>
                    </v-col>
                    <v-col cols="12" sm="6">
                        <v-card class="bg-red-lighten-1">
                            <v-card-title>{{ $t('InactiveUsers') }}</v-card-title>
                            <v-card-title>{{ inactiveUserCount }}</v-card-title>
                        </v-card>
                    </v-col>
                </v-row>
                <v-card>
                    <v-card-text>
                        <v-data-table-server
                            v-model:page="page"
                            v-model:items-per-page="itemsPerPage"
                            :headers="headers"
                            :items="items"
                            :items-length="itemsTotalCount"
                            :items-per-page-text="$t('MonogramPerPage')"
                            :loading="loading"
                            @update:options="loadItems"
                        />
                    </v-card-text>
                </v-card>
            </v-col>
        </v-row>
    </layout>
</template>

<script lang="ts" setup>
import { ref, Ref, computed } from 'vue';
import { t } from '@/i18n';
import Layout from '@/components/Layout';
import MonogramCount from '@/models/MonogramCount';
import MonogramCountDataProvider from '@/dataProviders/localStorage/MonogramCountDataProvider';

let dataProvider = new MonogramCountDataProvider();
let page = ref(1);
let itemsPerPage = ref(10);
let headers = computed(() => [
    {
        title: t('Monogram'),
        sortable: false,
        key: 'monogram',
    },
    {
        title: t('Count'),
        sortable: false,
        key: 'count',
    },
]);
let itemsTotalCount = ref(0);
let loading = ref(false);
let items: Ref<MonogramCount[]> = ref([]);

let activeUserCount = computed(() => {
    return dataProvider.filter(1, 1, {
        search: '',
        active: true,
    }).itemsTotalCount;
});
let inactiveUserCount = computed(() => {
    return dataProvider.filter(1, 1, {
        search: '',
        active: false,
    }).itemsTotalCount;
});

function loadItems() {
    let filterResult = dataProvider.filter(page.value, itemsPerPage.value, {});
    items.value = filterResult.items;
    itemsTotalCount.value = filterResult.itemsTotalCount;
}
</script>

<style>
.card-row {
    padding-top: 2rem;
    padding-bottom: 3rem;
}
</style>
