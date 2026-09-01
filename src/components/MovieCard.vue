<template>
    <div class="card-cine">
        <div class="card-poster">
            <span class="poster-year">{{ movie.year }}</span>
            <img
                v-if="!imgFailed"
                :src="posterSrc"
                alt="Movie poster"
                class="poster-img"
                @error="imgFailed = true"
            />
            <i v-else class="bi bi-emoji-laughing"></i>
        </div>
        <div class="card-body-cine">
            <div class="card-title-cine">{{ movie.title }}</div>
            <div class="card-director">Dir. {{ movie.director }}</div>
            <div class="d-flex align-items-center justify-content-between">
                <span class="genre-chip">{{ movie.genre }}</span>
                <router-link
                    :to="{ name: 'MovieDetail', params: { id: movie._id || movie.id } }"
                    class="btn btn-outline-gold btn-sm"
                >
                    View Movie
                </router-link>
            </div>
        </div>
    </div>
</template>
<script setup>
import { computed, ref } from "vue";

const props = defineProps({
    movie: {
        type: Object,
        required: true
    },
    index: {
        type: Number,
        default: 0
    }
});

const imgFailed = ref(false);

// Cycles through poster-1.jpg to poster-6.jpg based on the card's position
const posterSrc = computed(() => {
    const posterNumber = (props.index % 6) + 1;
    return `/posters/poster-${posterNumber}.jpg`;
});
</script>