<template>
    <nav class="navbar navbar-expand-lg navbar-cine sticky-top">
        <div class="container-fluid px-3 px-lg-4">
            <router-link :to="{ name: 'Home' }" class="navbar-brand">
                Cine<span class="brand-accent">matic</span>
            </router-link>

            <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navMenu">
                <span class="navbar-toggler-icon"></span>
            </button>

            <div class="collapse navbar-collapse" id="navMenu">
                <div class="navbar-nav ms-auto align-items-lg-center gap-lg-1">
                    <router-link :to="{ name: 'Movies' }" class="nav-link">
                        Catalog
                    </router-link>
                    <router-link :to="{ name: 'Admin' }" class="nav-link" v-if="auth.isAdmin">
                        Admin Dashboard
                    </router-link>

                    <router-link :to="{ name: 'Login' }" class="nav-link" v-if="!auth.isLoggedIn">
                        Log in
                    </router-link>
                    <router-link :to="{ name: 'Register' }" v-if="!auth.isLoggedIn" class="btn btn-gold btn-sm ms-lg-2 mt-2 mt-lg-0">
                        Sign up
                    </router-link>

                    <router-link :to="{ name: 'Logout' }" class="nav-link" v-if="auth.isLoggedIn">
                        Log out
                    </router-link>
                </div>
            </div>
        </div>
    </nav>
</template>

<script setup>
import { useAuthStore } from "../stores/auth";

const auth = useAuthStore();
</script>
