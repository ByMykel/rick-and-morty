<template>
    <div class="mx-auto mt-2 max-w-6xl w-full sm:px-6 lg:px-8">
        <div>
            <dropdown
                name="Status"
                :options="['alive', 'dead', 'unknown']"
                event="status-changed"
            ></dropdown>

            <dropdown
                name="Gender"
                :options="['female', 'male', 'genderless', 'unknown']"
                event="gender-changed"
            ></dropdown>
        </div>
    </div>
</template>

<script>
import Dropdown from "./Dropdown.vue";

export default {
    name: "SearchFilter",

    components: {
        Dropdown,
    },

    props: {
        selectedStatus: String,
        selectedGender: String,
    },
};
</script>