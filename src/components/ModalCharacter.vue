<template>
    <transition
        enter-active-class="transition ease-out duration-300"
        leave-active-class="transition ease-in duration-100"
        enter-class="transform opacity-0 -translate-y-32"
        enter-to-class="transform opacity-100 translate-y-0"
        leave-class="transform opacity-100 translate-y-0"
        leave-to-class="transform opacity-0 -translate-y-32"
    >
        <div
            v-show="showing"
            :class="{ 'bg-black bg-opacity-40 duration-500': bgColorDelay }"
            class="
                fixed
                inset-0
                w-full
                h-screen
                flex
                items-center
                justify-center
                z-50
            "
            @click.self="closeIfShown"
        >
            <div
                class="
                    relative
                    md:h-4/5
                    h-5/6
                    max-h-5/6
                    md:w-2/3
                    w-11/12
                    bg-gray-200
                    shadow-lg
                    rounded-lg
                    pt-10
                    flex
                "
            >
                <button
                    v-if="showClose"
                    class="absolute top-1 right-0 my-1 mx-2"
                    @click.prevent="close"
                >
                    <icons class="text-black" icon="cross"></icons>
                </button>

                <div class="overflow-auto max-h-screen w-full no-scrollbar">
                    <character-details
                        :character="character"
                    ></character-details>
                </div>
            </div>
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

    data() {
        return {
            bgColorDelay: false,
        };
    },

    watch: {
        showing(value) {
            if (value) {
                setTimeout(() => {
                    this.bgColorDelay = true;
                }, 300);
                return document
                    .querySelector("body")
                    .classList.add("overflow-hidden");
            }

            this.bgColorDelay = false;

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