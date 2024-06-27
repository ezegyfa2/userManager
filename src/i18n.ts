import { createI18n } from 'vue-i18n';
import en from "@/locales/en";
import hu from "@/locales/hu";

const i18n = createI18n({
    locale: 'hu',
    fallbackLocale: 'en',
    messages: {
        en: en,
        hu: hu,
    }
});
const t = i18n.global.t

export { i18n, t };