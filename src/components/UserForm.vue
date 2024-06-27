<template>
    <v-card>
        <v-card-title>
            {{ $t(title).toUpperCase() }}
        </v-card-title>

        <v-card-text>
            <v-form ref="userForm">
                <v-text-field
                    v-model="name"
                    :counter="50"
                    :rules="nameRules"
                    :label="$t('Name')"
                    hide-details="auto"
                    required
                ></v-text-field>

                <v-text-field
                    v-model="email"
                    :counter="50"
                    :rules="emailRules"
                    :label="$t('Email')"
                    hide-details="auto"
                    required
                ></v-text-field>

                <v-checkbox
                    v-model="active"
                    :label="$t('Active')"
                ></v-checkbox>
            </v-form>
        </v-card-text>

        <v-card-actions>
            <v-btn 
                :text="$t('Save')"
                @click="confirm"
            ></v-btn>

            <v-btn 
                :text="$t('Cancel')"
                @click="emit('canceled')"
            ></v-btn>
        </v-card-actions>
    </v-card>
</template>

<script lang="ts" setup>
import { ref, computed } from 'vue';
import { t } from '@/i18n';
import User from '@/models/User';

const props = defineProps({
    title: {
        required: true,
        type: String,
    },
    user: {
        type: User,
    },
});
const emit = defineEmits([ 'confirmed', 'canceled' ]);

let userForm = ref();
let valid = false;
let name = ref(props.user?.name);
let nameRules = [
    value => {
        if (value) {
            return true;
        } else {
            return t('validations.required', {
                fieldName: 'Name',
            });
        }
    },
    value => {
        if (value?.length <= 50) {
            return true;
        } else {
            return t('validations.lessThan', {
                fieldName: 'Name',
                characterCount: 50
            });
        }
    },
];
let email = ref(props.user?.email);
let emailRules = [
    value => {
        if (value) {
            return true;
        } else {
            return t('validations.required', {
                fieldName: 'Email',
                characterCount: 50
            });
        }
    },
    value => {
        if (value?.length <= 50) {
            return true;
        } else {
            return t('validations.lessThan', {
                fieldName: 'Email',
                characterCount: 50
            });
        }
    },
    value => {
        if (/.+@.+\..+/.test(value)) {
            return true;
        } else {
            return t('validations.mustValid', {
                fieldName: 'Email',
            });
        }
    },
];
let active = ref(props.user?.active);

async function confirm(): void {
    const isValid = await userForm.value.validate();

    if (isValid) {
        emit('confirmed', new User(name.value, email.value, active.value, Date.now()));
    }
}
</script>