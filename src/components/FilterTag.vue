<template>
    <button
        class="m-1 px-2 rounded-sm text-white"
        :class="[opacity, bgcolor]"
        @click="
            selected != name
                ? $parent.$emit(event, name)
                : $parent.$emit(event, '')
        "
    >
        <slot />
    </button>
</template>

<script>
export default {
    name: "FilterTag",
    props: {
        selected: String,
        name: String,
        event: String,
        bgcolor: String,
    },
    computed: {
        opacity() {
            return this.selected != this.name && this.selected
                ? "opacity-60"
                : "opacity-100";
        },
    },
    data() {
        return {
            status: "",
            gender: "",
        };
    },
};
</script>