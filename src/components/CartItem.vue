<script setup>
defineProps({
    item: {
        type: Object,
        required: true
    }
})

const emit = defineEmits(['increase', 'decrease', 'remove'])

const formatPrice = (value) => {
    return new Intl.NumberFormat('fr-FR', {
        style: 'currency',
        currency: 'EUR'
    }).format(Number(value))
}
</script>

<template>
    <article class="cart-item">
        <img
            :src="item.thumbnail"
            :alt="item.title"
            class="cart-item-image"
            loading="lazy"
            decoding="async"
        >

        <div class="cart-item-info">
            <p class="cart-item-category">{{ item.category }}</p>
            <h2>{{ item.title }}</h2>
            <p>{{ item.description }}</p>
        </div>

        <div class="cart-item-controls">
            <div class="cart-quantity" aria-label="Quantite du produit">
                <button type="button" @click="emit('decrease', item.id)" aria-label="Diminuer la quantite">
                    <i class="bi bi-dash"></i>
                </button>
                <span>{{ item.quantity }}</span>
                <button type="button" @click="emit('increase', item.id)" aria-label="Augmenter la quantite">
                    <i class="bi bi-plus"></i>
                </button>
            </div>

            <div class="cart-item-price">
                <strong>{{ formatPrice(item.price * item.quantity) }}</strong>
                <span>{{ formatPrice(item.price) }} / unite</span>
            </div>

            <button
                type="button"
                class="cart-remove-btn"
                @click="emit('remove', item.id)"
                aria-label="Supprimer le produit"
            >
                <i class="bi bi-trash"></i>
            </button>
        </div>
    </article>
</template>
