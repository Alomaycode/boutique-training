<script setup>
    import LogoImage from '../assets/img/logo.png'
    import { useCartStore } from '../stores/cart.js'

    const cartStore = useCartStore()
</script>

<template>
    <header class="site-header">
        <nav class="navbar navbar-expand-lg modern-navbar">
            <div class="container">
                <a class="navbar-brand d-flex align-items-center gap-3" href="#accueil">
                    <img :src="LogoImage" alt="Logo ShopEasy" class="logo">
                </a>

                <button
                    class="navbar-toggler"
                    type="button"
                    data-bs-toggle="collapse"
                    data-bs-target="#menu"
                    aria-controls="menu"
                    aria-expanded="false"
                    aria-label="Ouvrir le menu de navigation"
                >
                    <span class="navbar-toggler-icon"></span>
                </button>

                <div class="collapse navbar-collapse" id="menu">
                    <ul class="navbar-nav mx-auto align-items-lg-center gap-lg-2">
                        <li class="nav-item">
                            <RouterLink class="nav-link" exact-active-class="active" to="/#accueil">Accueil</RouterLink>
                        </li>
                        <li class="nav-item">
                            <RouterLink class="nav-link" exact-active-class="active" to="/#promotions">Promotions</RouterLink>
                        </li>
                        <li class="nav-item">
                            <RouterLink class="nav-link" exact-active-class="active" to="/#contact">Contact</RouterLink>
                        </li>
                    </ul>

                    <div class="navbar-actions d-flex align-items-lg-center gap-2">
                        <form class="navbar-search" role="search" @submit.prevent>
                            <input
                                type="search"
                                class="form-control"
                                placeholder="Rechercher un produit"
                                aria-label="Rechercher un produit"
                            >
                            <button class="btn btn-search" type="submit" aria-label="Lancer la recherche">
                                OK
                            </button>
                        </form>

                        <RouterLink class="btn btn-icon-action" exact-active-class="active" to="/#compte" aria-label="Mon compte">
                            <span class="action-label">Compte</span>
                        </RouterLink>

                        <RouterLink class="btn btn-cart" exact-active-class="active" to="/cart" aria-label="Voir le panier">
                            <span class="action-label">Panier</span>
                            <span class="cart-count">{{ cartStore.totalItems }}</span>
                        </RouterLink>
                    </div>
                </div>
            </div>
        </nav>
    </header>
</template>
