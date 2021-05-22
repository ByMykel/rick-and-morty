<template>
    <div
        class="bg-white w-full h-full p-2 overflow-auto overflow-x-hidden cursor-pointer"
    >
        <input
            v-model="searchText"
            type="text"
            class="w-full mb-2 p-1 rounded-md"
        />
        <div
            v-for="(item, index) in filteredOptions"
            :key="name + index"
            class="px-2 py-0.5 mb-1 rounded hover:bg-gray-200 flex items-center"
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
                class="border-gray-400 rounded ml-1 mr-2"
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
    },

    data() {
        return {
            selected: [],
            searchText: "",
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