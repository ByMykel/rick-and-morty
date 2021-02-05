<template>
    <div class="bg-gray-100 rounded-md w-11/12 mx-auto m-1 shadow">
        <div
            class="bg-white cursor-pointer p-2 flex justify-between"
            :class="[show ? 'rounded-t-md' : 'rounded-md']"
            @click="show = !show"
        >
            <h2>{{ episode.name }}</h2>
            <div class="flex items-center">
                <Icons v-if="show" icon="chevron-up" />
                <Icons v-else icon="chevron-down" />
            </div>
        </div>

        <div v-show="show" class="p-2 border-gray-200 border-t">
            <div>{{ seasonAndEpisode }}</div>
            <div>Number of characters {{ episode.characters.length }}</div>
            <div>Episode aired {{ episode.air_date }}</div>
        </div>
    </div>
</template>

<script>
import Icons from "@/components/Icons.vue";

export default {
    name: "EpisodeCard",
    props: {
        episode: Object,
    },
    data() {
        return {
            show: false,
        };
    },
    components: {
        Icons,
    },
    computed: {
        seasonAndEpisode() {
            const season = parseInt(this.episode.episode.match(/S(\d+)/).pop());
            const episode = parseInt(
                this.episode.episode.match(/E(\d+)/).pop()
            );

            return `Season ${season} · Episode ${episode}`;
        },
    },
};
</script>