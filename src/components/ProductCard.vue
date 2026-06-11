<script setup>
import { ref, watch } from 'vue'

const props = defineProps({
    name: {
        type: String,
        default: 'Nom du produit'
    },
    category: {
        type: String,
        default: 'Catégorie'
    },
    description: {
        type: String,
        default: 'Une courte description du produit pour donner envie au client.'
    },
    price: {
        type: [Number, String],
        default: 0
    },
    oldPrice: {
        type: [Number, String],
        default: null
    },
    image: {
        type: String,
        default: ''
    },
    badge: {
        type: String,
        default: ''
    },
    rating: {
        type: Number,
        default: 4.8
    },
    reviews: {
        type: Number,
        default: 0
    },
    imageLoading: {
        type: String,
        default: 'lazy'
    },
    imageFetchPriority: {
        type: String,
        default: 'auto'
    }
})

const emit = defineEmits(['add-to-cart', 'show-details'])
const isImageLoaded = ref(false)
const hasImageError = ref(false)

const formatPrice = (value) => {
    return new Intl.NumberFormat('fr-FR', {
        style: 'currency',
        currency: 'EUR'
    }).format(Number(value))
}

watch(
    () => props.image,
    () => {
        isImageLoaded.value = false
        hasImageError.value = false
    }
)
</script>

<template>
    <article class="product-card">
        <div class="product-image-wrap">
            <div
                v-if="image && !isImageLoaded && !hasImageError"
                class="product-image-loader"
                aria-hidden="true"
            ></div>

            <img
                v-if="image && !hasImageError"
                :src="image"
                :alt="name"
                :loading="imageLoading"
                :fetchpriority="imageFetchPriority"
                decoding="async"
                width="400"
                height="300"
                class="product-image"
                :class="{ 'is-loaded': isImageLoaded }"
                @load="isImageLoaded = true"
                @error="hasImageError = true"
            >
            <div v-else class="product-image-placeholder">
                Image produit
            </div>

            <span v-if="badge" class="product-badge">
                {{ badge }}
            </span>
        </div>

        <div class="product-card-body">
            <p class="product-category">{{ category }}</p>

            <h3 class="product-title">{{ name }}</h3>

            <p class="product-description">
                {{ description }}
            </p>

            <div class="product-rating" aria-label="Note du produit">
                <span class="stars">★★★★★</span>
                <span>{{ rating.toFixed(1) }}</span>
                <!-- <span v-if="reviews" class="reviews">({{ reviews }} avis)</span> -->
            </div>

            <div class="product-card-footer">
                <div class="product-price-group">
                    <span class="product-price">{{ formatPrice(price) }}</span>
                    <span v-if="oldPrice" class="product-old-price">
                        {{ formatPrice(oldPrice) }}
                    </span>
                </div>

                <button
                    type="button"
                    class="btn product-cart-btn"
                    @click="emit('add-to-cart', props)"
                >
                    Ajouter
                </button>
            </div>

            <button
                type="button"
                class="product-details-btn"
                @click="emit('show-details', props)"
            >
                Voir le détail
            </button>
        </div>
    </article>
</template>
