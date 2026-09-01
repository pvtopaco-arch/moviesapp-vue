<template>
    <section class="hero-section">
        <div class="container">
            <div class="row align-items-center g-5">
                <div class="col-lg-7">
                    <div class="section-eyebrow mb-3">A comprehensive catalog of films</div>
                    <h1 class="hero-title mb-4">
                       STORIES THAT,<br />
                        <span class="line-gold">MOVE YOU.</span>
                    </h1>
                    <p class="hero-sub mb-4">
                       Cinematic is a universal movie catalog app built to explore titles across every genre, look up deep details on each one, and manage your watchlist seamlessly.
                    </p>
                    <div class="d-flex gap-3 flex-wrap">
                        <router-link :to="{ name: 'Movies' }" class="btn btn-gold btn-lg px-4">
                            Browse the catalog
                        </router-link>
                        <router-link
                            :to="{ name: 'Register' }"
                            class="btn btn-ghost btn-lg px-4"
                            v-if="!auth.isLoggedIn"
                        >
                            Create an account
                        </router-link>
                    </div>
                </div>
                <div class="col-lg-5">
                    <div class="reel-strip">
                        <div class="reel-tile" v-for="(poster, index) in posters" :key="index">
                            <img v-if="poster" :src="poster" alt="Movie poster" class="reel-img" />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </section>

    <section class="container py-5">
        <div class="row g-4">
            <div class="col-md-4">
                <h5 class="mb-2"><i class="bi bi-grid-3x3-gap text-warning me-2"></i>Browse everything</h5>
                <p class="text-muted">Explore every title by genre and release year in one place.</p>
            </div>
            <div class="col-md-4">
                <h5 class="mb-2"><i class="bi bi-info-circle text-warning me-2"></i>Full movie details</h5>
                <p class="text-muted">Open any card for deep descriptions, cast info, and reviews.</p>
            </div>
            <div class="col-md-4">
                <h5 class="mb-2"><i class="bi bi-shield-check text-warning me-2"></i>Curated library</h5>
                <p class="text-muted">Discover a hand-picked collection kept fresh with new titles..</p>
            </div>
        </div>
    </section>
</template>

<script setup>
import { useAuthStore } from "../stores/auth";

const auth = useAuthStore();

// Drop image files into the `public/posters/` folder and list their
// filenames here. Anything left as `null` falls back to the plain
// gold-gradient tile (see .reel-tile in main.css).
const posters = [
    "/posters/poster-1.jpg",
    "/posters/poster-2.jpg",
    "/posters/poster-3.jpg",
    "/posters/poster-4.jpg",
    "/posters/poster-5.jpg",
    "/posters/poster-6.jpg"
];
</script>