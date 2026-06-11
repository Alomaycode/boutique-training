<script setup>
    import { computed, ref, watch } from 'vue'

    const props = defineProps({
        product: {
            type: Object,
            default: null
        }
    })

    const emit = defineEmits(['close', 'add-to-cart'])
    const selectedImage = ref('')

    const images = computed(() => {
        if (!props.product) {
            return []
        }

        return props.product.images?.length ? props.product.images : [props.product.thumbnail]
    })

    const discountPrice = computed(() => {
        if (!props.product?.discountPercentage) {
            return null
        }

        return props.product.price / (1 - props.product.discountPercentage / 100)
    })

    const formatPrice = (value) => {
        return new Intl.NumberFormat('fr-FR', {
            style: 'currency',
            currency: 'EUR'
        }).format(Number(value))
    }

    const formatCategory = (category) => {
        return category?.replaceAll('-', ' ') ?? ''
    }

    watch(
        () => props.product,
        (product) => {
            selectedImage.value = product?.thumbnail || product?.images?.[0] || ''
        },
        { immediate: true }
    )
</script>

<template>
    <Teleport to="body">
        <div v-if="product" class="product-detail-backdrop" @click.self="emit('close')">
            <article class="product-detail-modal" aria-modal="true" role="dialog">
                <button
                    type="button"
                    class="product-detail-close"
                    @click="emit('close')"
                    aria-label="Fermer le detail du produit"
                >
                    <i class="bi bi-x-lg"></i>
                </button>

                <div class="product-detail-gallery">
                    <img
                        :src="selectedImage"
                        :alt="product.title"
                        class="product-detail-main-image"
                    >

                    <div v-if="images.length > 1" class="product-detail-thumbs">
                        <button
                            v-for="image in images"
                            :key="image"
                            type="button"
                            :class="{ active: selectedImage === image }"
                            @click="selectedImage = image"
                        >
                            <img :src="image" :alt="product.title">
                        </button>
                    </div>
                </div>

                <div class="product-detail-content">
                    <p class="product-detail-category">{{ formatCategory(product.category) }}</p>
                    <h2>{{ product.title }}</h2>
                    <p class="product-detail-description">{{ product.description }}</p>

                    <div class="product-detail-rating">
                        <span class="stars">★★★★★</span>
                        <strong>{{ product.rating?.toFixed(1) }}</strong>
                        <span v-if="product.reviews?.length">({{ product.reviews.length }} avis)</span>
                    </div>

                    <div class="product-detail-price">
                        <strong>{{ formatPrice(product.price) }}</strong>
                        <span v-if="discountPrice">{{ formatPrice(discountPrice) }}</span>
                    </div>

                    <div class="product-detail-meta">
                        <div>
                            <span>Marque</span>
                            <strong>{{ product.brand || 'Non precisee' }}</strong>
                        </div>
                        <div>
                            <span>Stock</span>
                            <strong>{{ product.stock }} disponible(s)</strong>
                        </div>
                        <div>
                            <span>Livraison</span>
                            <strong>{{ product.shippingInformation || 'Standard' }}</strong>
                        </div>
                    </div>

                    <button
                        type="button"
                        class="btn product-detail-cart-btn"
                        @click="emit('add-to-cart', product)"
                    >
                        Ajouter au panier
                    </button>
                </div>
            </article>
        </div>
    </Teleport>
</template>
