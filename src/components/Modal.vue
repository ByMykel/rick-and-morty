<template>
    <div
        v-if="showing"
        class="fixed inset-0 w-full h-screen flex items-center justify-center bg-black bg-opacity-80 z-50"
        @click.self="closeIfShown"
    >
        <div
            class="relative md:h-4/5 h-5/6 max-h-5/6 md:w-2/3 w-11/12 bg-gray-200 shadow-lg rounded-lg p-6 pt-10 flex"
        >
            <button
                v-if="showClose"
                aria-label="close"
                class="absolute top-1 right-0 my-1 mx-2"
                @click.prevent="close"
            >
                <Icons class="text-black" icon="cross" />
            </button>
            <div class="overflow-auto max-h-screen w-full">
                <slot />
            </div>
        </div>
    </div>
</template>

<script>
import Icons from "@/components/Icons.vue";

export default {
    name: "Modal",
    props: {
        showing: {
            required: true,
            type: Boolean,
        },
        showClose: {
            type: Boolean,
            default: true,
        },
        backgroundClose: {
            type: Boolean,
            default: true,
        },
    },
    components: {
        Icons,
    },
    watch: {
        showing(value) {
            if (value) {
                return document
                    .querySelector("body")
                    .classList.add("overflow-hidden");
            }
            return document
                .querySelector("body")
                .classList.remove("overflow-hidden");
        },
    },
    methods: {
        close() {
            this.$emit("close");
        },
        closeIfShown() {
            if (this.showClose && this.backgroundClose) {
                this.close();
            }
        },
    },
};
</script>