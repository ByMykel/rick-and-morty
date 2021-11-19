<template>
    <div class="w-full h-full p-2 overflow-x-hidden bg-white">
        <div
            v-for="(item, index) in filteredOptions"
            :key="name + index"
            class="px-2 py-0.5 mb-1 rounded hover:bg-gray-200 flex items-center cursor-pointer"
            @click="
                handleSelected(item),
                    $store.dispatch(`characters/setFilter`, {
                        type: name.toLowerCase(),
                        filter: item,
                    })
            "
        >
            <input
                type="checkbox"
                :checked="selected.includes(item)"
                class="ml-1 mr-2 border-gray-400 rounded"
            />
            <span class="text-black">
                {{ item ? item : "None" }}
            </span>
        </div>
    </div>
</template>

<script>
export default {
    name: "FilterMenu",

    props: {
        name: String,
        options: Array,
        searchText: String,
    },

    data() {
        return {
            selected: [],
        };
    },

    computed: {
        filteredOptions() {
            return this.options.filter((name) =>
                name
                    .toString()
                    .toLowerCase()
                    .includes(this.searchText.toLowerCase())
            );
        },
    },

    methods: {
        handleSelected(filter) {
            if (this.selected.includes(filter)) {
                this.selected = this.selected.filter(
                    (element) => element !== filter
                );
                return;
            }

            this.selected.push(filter);
        },
    },
};
</script>