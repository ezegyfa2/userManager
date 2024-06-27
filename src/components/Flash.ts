import { ref, Ref } from 'vue';

class Flash { 
    message: Ref<string>;
    color: Ref<string>;
    show: Ref<boolean>;

    constructor(message: string, color: string) {
        this.message = ref(message);
        this.color = ref(color);
        this.show = ref(false);
    }

    error(message: string) {
        this.message.value = message;
        this.color.value = 'error';
        this.show.value = true;
    }

    success(message: string) {
        this.message.value = message;
        this.color.value = 'success';
        this.show.value = true;
    }
}

const flash = new Flash('', 'error');

export default flash;