<template>
    <v-snackbar
        v-model="flash.show.value"
        :color="flash.color.value"
        :timeout="2000"
        bottom
        right
    >
        {{ flash.message }}
    </v-snackbar>
</template>

<script lang="ts" setup>
import flash from '@/components/Flash';
</script>
