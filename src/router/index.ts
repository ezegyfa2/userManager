import { createRouter, createWebHistory } from "vue-router";
import Dashboard from "../pages/Dashboard.vue";

const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes: [
        {
            path: "/",
            name: "dashboard",
            component: Dashboard,
        },
        {
            path: "/user-list",
            name: "userList",
            component: () => import("../pages/UserList.vue"),
        },
    ],
});

export default router;