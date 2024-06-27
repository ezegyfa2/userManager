import useUserStore from '@/stores/UserStore';
import UserFilters from '@/dataProviders/UserFilters';
import User from '@/models/User';
import MonogramCount from '@/models/MonogramCount';

export default class MonogramCountDataProvider {
    userStore = useUserStore();

    filter(page: number, itemsPerPage: number, filters: UserFilters) {
        const startIndex = (page - 1) * itemsPerPage;
        let filteredItems = this.userStore.filter(filters.search, filters.active);
        let monograms = filteredItems.map((user: User) => user.monogram);
        let uniqueMonograms = Array.from(new Set(monograms));
        let monogramCounts = uniqueMonograms.map((monogram: string) => new MonogramCount(monogram, 0));
        monograms.forEach((monogram: string) => {
            let currentMonogramCount = monogramCounts.find((monogramCount: MonogramCount) => monogramCount.monogram == monogram);
            if (currentMonogramCount) {
                ++currentMonogramCount.count;
            } else {
                throw new Error(`Invalid user monogram: ${monogram}`);
            }
        });

        return {
            items: monogramCounts.slice(startIndex, startIndex + itemsPerPage),
            itemsTotalCount: monogramCounts.length,
        };
    }
}
