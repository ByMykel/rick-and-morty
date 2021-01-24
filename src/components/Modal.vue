<template>
    <div
        v-if="showing"
        class="fixed inset-0 w-full h-screen flex items-center justify-center bg-black bg-opacity-80 z-50"
        @click.self="closeIfShown"
    >
        <div
            class="relative md:h-2/3 h-5/6 max-h-5/6 md:w-2/3 w-11/12 bg-white shadow-lg rounded-lg p-6 pt-10 flex"
        >
            <button
                v-if="showClose"
                aria-label="close"
                class="absolute top-1 right-0 my-1 mx-2"
                @click.prevent="close"
            >
                <svg
                    class="w-7 h-7"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                >
                    <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        stroke-width="2"
                        d="M6 18L18 6M6 6l12 12"
                    ></path>
                </svg>
            </button>
            <div class="overflow-auto max-h-screen w-full">
                <slot />
            </div>
        </div>
    </div>
</template>

<script>
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