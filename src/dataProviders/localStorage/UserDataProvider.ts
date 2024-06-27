import useUserStore from '@/stores/UserStore';
import User from '@/models/User';
import UserFilters from '../UserFilters';

export default class UserDataProvider {
    userStore = useUserStore();

    filter(page: number, itemsPerPage: number, filters: UserFilters) {
        const startIndex = (page - 1) * itemsPerPage;
        let filteredItems = this.userStore.filter(filters.search, filters.active);

        return {
            items: filteredItems.slice(startIndex, startIndex + itemsPerPage),
            itemsTotalCount: filteredItems.length,
        };
    }

    store(userData: User) {
        this.userStore.store(userData);
    }

    update(id: number, userData: User) {
        this.userStore.update(id, userData);
    }

    delete(id: number) {
        this.userStore.delete(id);
    }

    deleteAll() {
        this.userStore.deleteAll();
    }
}
