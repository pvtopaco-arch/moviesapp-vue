<template>
    <div class="container py-5" style="max-width: 860px;">
        <router-link :to="{ name: 'Movies' }" class="d-inline-flex align-items-center gap-1 mb-4 text-muted">
            <i class="bi bi-arrow-left"></i> Back to catalog
        </router-link>

        <div v-if="store.loading" class="text-muted">Loading...</div>

        <div v-else-if="!movie" class="empty-state">
            <i class="bi bi-question-circle fs-3 d-block mb-2"></i>
            We couldn't find that movie.
        </div>

        <div v-else class="detail-shell">
            <div class="d-flex justify-content-between align-items-start flex-wrap gap-3 mb-3">
                <div>
                    <span class="genre-chip mb-2 d-inline-block">{{ movie.genre }}</span>
                    <h1 class="detail-title">{{ movie.title }}</h1>
                </div>
                <div class="detail-meta text-end">
                    <div>Directed by <strong class="text-light">{{ movie.director }}</strong></div>
                    <div>{{ movie.year }}</div>
                </div>
            </div>

            <p class="mt-4" style="line-height: 1.7; color: var(--text-primary);">
                {{ movie.description }}
            </p>

            <hr class="my-4" style="border-color: var(--line);" />

            <h6 class="text-muted mb-3">
                <i class="bi bi-chat-square-text me-1"></i>
                Comments <span v-if="comments.length">({{ comments.length }})</span>
            </h6>

            <div v-if="comments.length === 0" class="text-muted">No comments yet.</div>
            <div v-else class="comment-item" v-for="(comment, i) in comments" :key="i">
                {{ comment }}
            </div>
        </div>
    </div>
</template>

<script setup>
import { computed, onMounted } from "vue";
import { useMovieStore } from "../stores/movies";

const props = defineProps({
    id: {
        type: String,
        required: true
    }
});

const store = useMovieStore();

onMounted(() => {
    if (!store.loaded) store.fetchMovies();
});

const movie = computed(() => store.getById(props.id));
const comments = computed(() => movie.value?.comments || []);
</script>
