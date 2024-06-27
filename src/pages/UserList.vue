<template>
    <layout :title="$t('UserList')">
        <v-row class="justify-center">
            <v-col cols="12" lg="9">
                <user-table/>
            </v-col>
        </v-row>
    </layout>
</template>

<script lang="ts" setup>
import Layout from '@/components/Layout.vue'
import UserTable from '@/components/UserTable.vue';
</script>
  