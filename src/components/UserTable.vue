<template>
    <v-row class="button-row">
        <v-col cols="12" class="d-flex justify-space-between">
            <v-btn
                elevation="0"
                @click="createItem()"
                color="primary"
            >
                <v-icon>mdi-plus</v-icon>
                {{ $t('CreateNew') }}
            </v-btn>
            <v-btn
                elevation="0"
                @click="showDeleteAllModal = true"
                color="error"
            >
                <v-icon>mdi-trash</v-icon>
                {{ $t('DeleteAll') }}
            </v-btn>
        </v-col>
    </v-row>
    <v-row class="filter-row">
        <v-col cols="12" sm="6" md="4" class="d-flex align-center">
            <v-text-field
                v-model="search"
                density="compact"
                :placeholder="$t('Search')"
                hide-details="auto"
            ></v-text-field>
        </v-col>
        <v-col cols="12" sm="6" md="4">
            <v-checkbox
                class="d-flex align-center"
                v-model="onlyActives"
                :label="$t('OnlyActives')"
            ></v-checkbox>
        </v-col>
    </v-row>
    <v-data-table-server
        v-model:page="page"
        v-model:items-per-page="itemsPerPage"
        :headers="headers"
        :items="items"
        :items-length="itemsTotalCount"
        :items-per-page-text="$t('UsersPerPage')"
        :loading="loading"
        item-value="name"
        @update:options="loadItems"
    >
        <template v-slot:item.actions="{ item }">
            <v-menu rounded>
                <template v-slot:activator="{ props }">
                    <v-btn elevation="0" icon v-bind="props">
                        <v-icon>
                            mdi-dots-vertical
                        </v-icon>
                    </v-btn>
                </template>
                <v-list dense>
                    <v-list-item
                        @click="editItem(item)"
                    >
                        <template v-slot:prepend>
                            <v-icon>
                                mdi-pencil-outline
                            </v-icon>
                        </template>

                        <v-list-item-title v-text="$t('Edit')"></v-list-item-title>
                    </v-list-item>
                    <v-list-item
                        @click="showConfirmDelete(item)"
                    >
                        <template v-slot:prepend>
                            <v-icon>
                                mdi-delete-outline
                            </v-icon>
                        </template>

                        <v-list-item-title v-text="$t('Delete')"></v-list-item-title>
                    </v-list-item>
                </v-list>
            </v-menu>
        </template>
    </v-data-table-server>
    <confirms-modal 
        v-model:show="showDeleteModal"
        :title="$t('confirmDelete.title')"
        :content="$t('confirmDelete.content')"
        @confirmed="deleteItem()"
    />
    <confirms-modal 
        v-model:show="showDeleteAllModal"
        :title="$t('confirmDeleteAll.title')"
        :content="$t('confirmDeleteAll.content')"
        @confirmed="deleteAll()"
    />
    <v-dialog
        v-model="showFormModal"
        max-width="600px"
    >
        <user-form
            :title="formTitle"
            :user="userToEdit"
            @confirmed="saveItem"
            @canceled="closeForm"
        ></user-form>
    </v-dialog>
</template>

<script lang="ts" setup>
import { ref, Ref, computed, watch } from 'vue';
import { t } from '@/i18n';
import UserForm from '@/components/UserForm.vue';
import User from '@/models/User';
import UserDataProvider from '@/dataProviders/localStorage/UserDataProvider';
import UserFilters from '@/dataProviders/UserFilters';
import ConfirmsModal from '@/components/ConfirmsModal.vue';
import flash from '@/components/Flash';

let dataProvider = new UserDataProvider();
let page = ref(1);
let itemsPerPage = ref(10);
let search = ref('');
let onlyActives = ref(false);
let headers = computed(() => [
    {
        title: 'ID',
        sortable: false,
        key: 'id',
    },
    {
        title: t('Name'),
        sortable: false,
        key: 'name',
    },
    {
        title: t('Email'),
        sortable: false,
        key: 'email',
    },
    {
        title: t('Status'),
        sortable: false,
        key: 'status',
    },
    {
        title: t('CreatedAt'),
        sortable: false,
        key: 'createdAtText',
    },
    {
        value: 'actions',
        sortable: false,
        align: 'end',
    },
]);
let loading = ref(false);
let items: Ref<User[]> = ref([]);
let itemsTotalCount = ref(0);
let selectedId = ref();
let formTitle = ref('');
let showFormModal = ref(false);
let showDeleteModal = ref(false);
let showDeleteAllModal = ref(false);

let userToEdit = computed(() => {
    if (selectedId.value) {
        let foundUsers: User[] = items.value.filter((user: User) => user.id == selectedId.value);
        if (foundUsers.length == 0) {
            flash.error(t('errors.cantFindUser', { id: selectedId.value }));
        } else if (foundUsers.length > 1) {
            flash.error(t('errors.updateError'));
        } else {
            return foundUsers[0];
        }
    } else {
        return null;
    }
});
let filters = computed(() => {
    let filters: UserFilters = {
        search: search.value,
    };
    if (onlyActives.value) {
        filters.active = true;
    }

    return filters;
});

watch(search, () => loadItems());
watch(onlyActives, () => loadItems());

function createItem() {
    formTitle.value = 'CreateNew';
    showFormModal.value = true;
}

function editItem(item: User): void {
    if (item.id) {
        formTitle.value = 'Edit';
        selectedId.value = item.id;
        showFormModal.value = true;
    } else {
        flash.error(t('errors.updateError'));
    }
}

function saveItem(item: User): void {
    if (selectedId.value) {
        item.id = selectedId.value;
        dataProvider.update(selectedId.value, item);
        flash.success(t('updateSuccess'));
    } else {
        dataProvider.store(item);
        flash.success(t('storeSuccess'));
    }
    closeForm();
    loadItems();
}

function closeForm(): void {
    selectedId.value = null;
    showFormModal.value = false;
}

function deleteItem(): void {
    dataProvider.delete(selectedId.value);
    selectedId.value = null;
    flash.success(t('deleteSuccess'));
    loadItems();
}

function loadItems(): void {
    let filterResult = dataProvider.filter(page.value, itemsPerPage.value, filters.value);
    items.value = filterResult.items;
    itemsTotalCount.value = filterResult.itemsTotalCount;
}

function showConfirmDelete(item: User): void {
    if (item.id) {
        selectedId.value = item.id;
        showDeleteModal.value = true;
    } else {
        flash.error(t('errors.deleteError'));
    }
}

function deleteAll(): void {
    dataProvider.deleteAll();
    flash.success(t('deleteSuccess'));
    loadItems();
}
</script>

<style>
.button-row {
    padding-top: 2rem;
}
.filter-row {
    padding-bottom: 2rem;
}
</style>
