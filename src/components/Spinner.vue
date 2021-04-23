<template>
    <half-circle-spinner
        v-show="show"
        :animation-duration="1500"
        :size="50"
        :class="classes"
        color="gray"
        class="mx-auto pt-2"
    />
</template>

<script>
import { HalfCircleSpinner } from "epic-spinners";

export default {
    name: "Spinner",

    components: {
        HalfCircleSpinner,
    },

    props: {
        show: Boolean,
        classes: String,
    },
};
</script>