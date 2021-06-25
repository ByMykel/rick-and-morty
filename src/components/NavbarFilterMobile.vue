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