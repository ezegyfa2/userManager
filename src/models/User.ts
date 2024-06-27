import { t } from '@/i18n';

export default class User {
    id: number|null;
    name: string;
    email: string;
    active: boolean;
    createdAt: Date;

    constructor(name: string, email: string, active: boolean, id: number|null, createdAt: Date|null) {
        this.name = name;
        this.email = email;
        this.active = active;
        this.id = id;
        if (!createdAt) {
            createdAt = new Date();
        }
        this.createdAt = createdAt;
    }

    get status(): string {
        return this.active ? t('Active') : t('Inactive');
    }

    get createdAtText(): string {
        return this.createdAt.toLocaleDateString("en-US");
    }

    get monogram(): string {
        let firstLetters = this.name.split(' ').map((name: string) => name[0]);
        return firstLetters.join('');
    }
}