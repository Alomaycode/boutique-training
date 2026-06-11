<script setup>
import { useCartStore } from '../stores/cart.js'
import CartItem from '../components/CartItem.vue'

const cartStore = useCartStore()

const formatPrice = (value) => {
    return new Intl.NumberFormat('fr-FR', {
        style: 'currency',
        currency: 'EUR'
    }).format(Number(value))
}
</script>

<template>
    <main class="cart-page">
        <div class="container">
            <div class="cart-header">
                <div>
                    <p class="section-kicker">Panier</p>
                    <h1>Vos produits selectionnes</h1>
                    <p>Retrouvez ici les articles que vous souhaitez acheter.</p>
                </div>

                <RouterLink class="cart-back-link" to="/">
                    <i class="bi bi-arrow-left"></i>
                    Continuer mes achats
                </RouterLink>
            </div>

            <div v-if="cartStore.items.length" class="cart-layout">
                <section class="cart-list" aria-label="Produits du panier">
                    <CartItem
                        v-for="item in cartStore.items"
                        :key="item.id"
                        :item="item"
                        @increase="cartStore.increaseQuantity"
                        @decrease="cartStore.decreaseQuantity"
                        @remove="cartStore.removeFromCart"
                    />
                </section>

                <aside class="cart-summary">
                    <h2>Resume</h2>

                    <div class="cart-summary-line">
                        <span>Articles</span>
                        <strong>{{ cartStore.totalItems }}</strong>
                    </div>

                    <div class="cart-summary-line">
                        <span>Sous-total</span>
                        <strong>{{ formatPrice(cartStore.totalPrice) }}</strong>
                    </div>

                    <div class="cart-summary-line">
                        <span>Livraison</span>
                        <strong>Gratuite</strong>
                    </div>

                    <div class="cart-summary-total">
                        <span>Total</span>
                        <strong>{{ formatPrice(cartStore.totalPrice) }}</strong>
                    </div>

                    <button type="button" class="btn cart-checkout-btn">
                        Valider le panier
                    </button>

                    <button type="button" class="cart-clear-btn" @click="cartStore.clearCart">
                        Vider le panier
                    </button>
                </aside>
            </div>

            <section v-else class="cart-empty">
                <div class="cart-empty-icon">
                    <i class="bi bi-bag"></i>
                </div>
                <h2>Votre panier est vide</h2>
                <p>Ajoutez quelques produits depuis la page d'accueil pour les retrouver ici.</p>
                <RouterLink class="btn cart-checkout-btn" to="/">
                    Voir les produits
                </RouterLink>
            </section>
        </div>
    </main>
</template>
