<template>
    <div class="mx-auto mt-2 max-w-6xl w-full sm:px-6 lg:px-8">
        <div>
            <FilterTag
                name="Status"
                :options="['alive', 'dead', 'unknown']"
                event="statusChanged"
            />
            <FilterTag
                name="Gender"
                :options="['female', 'male', 'genderless', 'unknown']"
                event="genderChanged"
            />
        </div>
    </div>
</template>

<script>
import FilterTag from "@/components/FilterTag.vue";

export default {
    name: "SearchFilter",
    components: {
        FilterTag,
    },
    props: {
        selectedStatus: String,
        selectedGender: String,
    },
};
</script>