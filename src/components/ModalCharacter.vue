<template>
    <transition
        enter-active-class="duration-200 ease-in-out"
        enter-class="opacity-0"
        enter-to-class="opacity-100"
        leave-active-class="duration-200 ease-in"
        leave-class="opacity-100"
        leave-to-class="opacity-0"
    >
        <div
            v-show="showing"
            class="fixed inset-0 z-50 flex items-center justify-center w-full h-screen bg-black bg-opacity-40"
            @click.self="closeIfShown"
        >
            <transition
                enter-active-class="transition duration-300 ease-out"
                leave-active-class="transition duration-100 ease-in"
                enter-class="transform -translate-y-32 opacity-0"
                enter-to-class="transform translate-y-0 opacity-100"
                leave-class="transform translate-y-0 opacity-100"
                leave-to-class="transform -translate-y-32 opacity-0"
            >
                <div
                    v-show="showing"
                    class="relative flex w-full mx-2 bg-gray-200 rounded-lg shadow-lg sm:mx-2 md:h-4/5 h-5/6 max-h-5/6 md:w-2/3"
                >
                    <button
                        v-if="showClose"
                        class="absolute mx-2 my-1 -right-3 -top-8"
                        @click.prevent="close"
                    >
                        <icons class="text-white" icon="cross"></icons>
                    </button>

                    <div class="w-full max-h-screen overflow-auto no-scrollbar">
                        <character-details
                            :character="character"
                        ></character-details>
                    </div>
                </div>
            </transition>
        </div>
    </transition>
</template>

<script>
import Icons from "./Icons.vue";
import CharacterDetails from "./CharacterDetails.vue";

export default {
    name: "Modal",

    components: {
        Icons,
        CharacterDetails,
    },

    props: {
        character: Object,

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