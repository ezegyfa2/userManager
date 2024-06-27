import { defineStore } from 'pinia';
import User from '../models/User';

export default defineStore('user', {
    state(): { userData: {}[] } {
        return {
            userData: [
                {
                    name: "John Doe",
                    email: "johndoe@example.com",
                    active: true,
                    id: 1,
                    createdAt: "2023-03-25",
                },
                {
                    name: "Jane Smith",
                    email: "janesmith@example.com",
                    active: false,
                    id: 2,
                    createdAt: "2023-04-09",
                },
                {
                    name: "Alice Johnson",
                    email: "alicejohnson@example.com",
                    active: true,
                    id: 3,
                    createdAt: "2023-10-09",
                },
                {
                    name: "Bob Brown",
                    email: "bobbrown@example.com",
                    active: false,
                    id: 4,
                    createdAt: "2023-03-21",
                },
                {
                    name: "Charlie Davis",
                    email: "charliedavis@example.com",
                    active: true,
                    id: 5,
                    createdAt: "2023-01-15",
                },
                {
                    name: "Diana Evans",
                    email: "dianaevans@example.com",
                    active: false,
                    id: 6,
                    createdAt: "2023-05-02",
                },
                {
                    name: "Ethan Foster",
                    email: "ethanfoster@example.com",
                    active: true,
                    id: 7,
                    createdAt: "2023-07-23",
                },
                {
                    name: "Fiona Garcia",
                    email: "fionagarcia@example.com",
                    active: false,
                    id: 8,
                    createdAt: "2023-03-17",
                },
                {
                    name: "George Harris",
                    email: "georgeharris@example.com",
                    active: true,
                    id: 9,
                    createdAt: "2023-11-04",
                },
                {
                    name: "Hannah Lee",
                    email: "hannahlee@example.com",
                    active: false,
                    id: 10,
                    createdAt: "2023-02-25",
                },
                {
                    name: "Ian King",
                    email: "ianking@example.com",
                    active: true,
                    id: 11,
                    createdAt: "2023-07-03",
                },
                {
                    name: "Jasmine Lewis",
                    email: "jasminelewis@example.com",
                    active: false,
                    id: 12,
                    createdAt: "2023-05-11",
                },
                {
                    name: "Kevin Martin",
                    email: "kevinmartin@example.com",
                    active: true,
                    id: 13,
                    createdAt: "2023-12-23",
                },
                {
                    name: "Laura Nelson",
                    email: "lauranelson@example.com",
                    active: false,
                    id: 14,
                    createdAt: "2023-01-14",
                },
                {
                    name: "Michael Owens",
                    email: "michaelowens@example.com",
                    active: true,
                    id: 15,
                    createdAt: "2023-03-07",
                },
            ],
        };
    },
    getters: {
        users(): User[] {
            return this.userData.map((data: User) => new User(
                data.name,
                data.email,
                data.active,
                data.id,
                new Date(data.createdAt)
            ));
        },
    },
    actions: {
        filter(search: string|undefined, active: boolean|undefined) {
            return this.users.filter((user: User) => {
                if (active !== undefined && active != user.active) {
                    return false;
                }
                if (search !== undefined && search != '' && !user.name.includes(search) && !user.email.includes(search)) {
                    return false;
                }
                return true;
            });
        },
        get(id: number) {
            let foundUsers: User[] = this.users.filter((user: User) => user.id == id);
            if (foundUsers.length == 0) {
                throw new Error(`Can't find user with id: ${id}`);
            } else if (foundUsers.length > 1) {
                throw new Error("An error occured while processing update");
            } else {
                return foundUsers[0];
            }
        },
        store(user: User): void {
            user.id = Math.max(...this.users.map((user: User) => user.id ?? 0)) + 1;
            this.userData.push(user);
        },
        update(id: number, user: User): void {
            let keyToUpdate: number = this.users.indexOf(this.get(id));
            if (!user.id) {
                user.id = id;
            }
            this.users[keyToUpdate] = user;
        },
        delete(id: number): void {
            this.userData = this.userData.filter((user: User) => user.id != id);
        },
        deleteAll(): void {
            this.userData = [];
        }
    },
    persist: true,
})