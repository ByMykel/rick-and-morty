<template>
    <div class="relative inline-block text-left mr-1" ref="showOptions">
        <div>
            <button
                type="button"
                class="inline-flex justify-center w-full rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-sm font-medium text-gray-700 hover:bg-gray-50 capitalize"
                @click="show = !show"
            >
                {{ name }}:
                <span class="font-bold pl-1">{{
                    selected ? selected : "All"
                }}</span>
                <Icons icon="chevron-down-dropdown" />
            </button>
        </div>
        <transition
            enter-active-class="transition ease-out duration-100"
            leave-active-class="transition ease-in duration-75"
            enter-class="transform opacity-0 -translate-y-3"
            enter-to-class="transform opacity-100 translate-y-0"
            leave-class="transform opacity-100 translate-y-0"
            leave-to-class="transform opacity-0 -translate-y-3"
        >
            <div
                class="z-50 origin-top-right absolute left-0 mt-2 w-56 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 focus:outline-none"
                v-show="show"
            >
                <div class="py-1" role="none">
                    <div
                        class="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900"
                        @click="
                            (selected = ''),
                                (show = false),
                                $parent.$emit(event, selected)
                        "
                    >
                        All
                    </div>
                    <div
                        class="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900 capitalize"
                        v-for="(tag, index) in options"
                        :key="index"
                        @click="
                            (selected = tag),
                                (show = false),
                                $parent.$emit(event, selected)
                        "
                    >
                        {{ tag }}
                    </div>
                </div>
            </div>
        </transition>
    </div>
</template>

<script>
import Icons from "@/components/Icons.vue";

export default {
    name: "FilterTag",
    props: {
        name: String,
        event: String,
        options: Array,
    },
    data() {
        return {
            selected: "",
            show: false,
        };
    },
    components: {
        Icons,
    },
    methods: {
        onClickOutside(event) {
            const { showOptions } = this.$refs;
            if (!showOptions || showOptions.contains(event.target)) return;
            this.show = false;
        },
    },
    mounted() {
        document.addEventListener("click", this.onClickOutside);
    },
};
</script>