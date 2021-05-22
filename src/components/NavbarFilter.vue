<template>
    <div>
        <navbar-filter-item
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
        ></navbar-filter-item>
    </div>
</template>

<script>
import NavbarFilterItem from "./NavbarFilterItem.vue";

export default {
    name: "NavbarFilter",

    components: {
        NavbarFilterItem,
    },
};
</script>