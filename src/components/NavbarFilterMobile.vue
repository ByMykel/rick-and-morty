<template>
    <div>
        <navbar-filter-mobile-item
            v-for="(item, index) in [
                'Status',
                'Gender',
                'Type',
                'Species',
                'Origin',
                'Location',
            ]"
            :key="index"
            :index="index"
            :name="item"
        ></navbar-filter-mobile-item>
        <!-- <div
            class="px-3 py-2 rounded-md text-sm font-medium hover:bg-gray-200 cursor-pointer"
            :class="{ 'bg-gray-200': selected == 1 }"
            @click="(selected = 1), (showOptions = false)"
        >
            Status
        </div> -->
        <!-- <div
            class="px-3 py-2 rounded-md text-sm font-medium hover:bg-gray-200 cursor-pointer"
            :class="{ 'bg-gray-200': selected === 2 }"
            @click="(selected = 2), (showOptions = false)"
        >
            Gender
        </div>
        <div
            class="px-3 py-2 rounded-md text-sm font-medium hover:bg-gray-200 cursor-pointer"
            :class="{ 'bg-gray-200': selected === 3 }"
            @click="(selected = 3), (showOptions = false)"
        >
            Type
        </div>
        <div
            class="px-3 py-2 rounded-md text-sm font-medium hover:bg-gray-200 cursor-pointer"
            :class="{ 'bg-gray-200': selected === 4 }"
            @click="(selected = 4), (showOptions = false)"
        >
            Species
        </div>
        <div
            class="px-3 py-2 rounded-md text-sm font-medium hover:bg-gray-200 cursor-pointer"
            :class="{ 'bg-gray-200': selected === 5 }"
            @click="(selected = 5), (showOptions = false)"
        >
            Origin
        </div>
        <div
            class="px-3 py-2 rounded-md text-sm font-medium hover:bg-gray-200 cursor-pointer"
            :class="{ 'bg-gray-200': selected === 6 }"
            @click="(selected = 6), (showOptions = false)"
        >
            Location
        </div> -->
    </div>
</template>

<script>
import NavbarFilterMobileItem from "./NavbarFilterMobileItem.vue";

export default {
    name: "NavbarFilter",

    components: {
        NavbarFilterMobileItem,
    },
};
</script>