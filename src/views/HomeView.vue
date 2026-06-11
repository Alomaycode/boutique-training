<script setup>
    import { onMounted, ref, computed } from 'vue'
    import ProductCard from '../components/ProductCard.vue'
    import ProductDetail from '../components/ProductDetail.vue'
    import Hero from '../components/hero.vue'
    import CategoryFilter from '../components/CategoryFilter.vue'
    
    import { useCartStore } from '../stores/cart.js'

    const cartStore = useCartStore()
    const products = ref([])
    const selectedProduct = ref(null)
    const selectedCategory = ref('all')

    const categories = computed(() => {
        const uniqueCategories = new Set(products.value.map(product => product.category))
        return Array.from(uniqueCategories).sort()
    })

    const categoryCounts = computed(() => {
        return products.value.reduce((counts, product) => {
            counts[product.category] = (counts[product.category] || 0) + 1
            return counts
        }, {})
    })

    const currentPage = ref(1)
    const productsPerPage = 9

    const filteredProducts = computed(() => {
        if (selectedCategory.value === 'all') {
            return products.value
        }

        return products.value.filter(product => product.category === selectedCategory.value)
    })

    const totalPages = computed(() => {
        return Math.max(1, Math.ceil(filteredProducts.value.length / productsPerPage))
    })

    const displayedProducts = computed(() => {
        const start = (currentPage.value - 1) * productsPerPage
        const end = start + productsPerPage

        return filteredProducts.value.slice(start, end)
    })

    const formatCategory = (category) => {
        return category.replaceAll('-', ' ')
    }

    const selectCategory = (category) => {
        selectedCategory.value = category
        currentPage.value = 1
    }

    const nextPage = () => {
        if (currentPage.value === totalPages.value) {
            currentPage.value = 1
        } else {
            currentPage.value++
        }
    }

    const previousPage = () => {
        if (currentPage.value === 1) {
            currentPage.value = totalPages.value
        } else {
            currentPage.value--
        }
    }

    function ajouterPanier(product) {
        cartStore.addToCart(product)
    }

    function showProductDetails(product) {
        selectedProduct.value = product
    }

    async function loadProducts() {
        try {
            const response = await fetch('https://dummyjson.com/products?limit=0')

            if (!response.ok) {
                throw new Error('Erreur lors du chargement des produits')
            }

            const data = await response.json()
            products.value = [...data.products].sort((a, b) => b.rating - a.rating);
            // console.log('Catégories chargées :', categories.value)
        } catch (error) {
            console.error(error)
        }
    }

    onMounted(() => {
        loadProducts()
    })
</script>

<template>
    <Hero />

    <CategoryFilter
        :categories="categories"
        :selected-category="selectedCategory"
        :filtered-count="filteredProducts.length"
        :total-count="products.length"
        :category-counts="categoryCounts"
        @select-category="selectCategory"
    />

    <section id="produits" class="products-section">
        <div class="container">
            <div class="products-header">
                <div>
                    <p class="section-kicker">Boutique</p>
                    <h2>
                        {{ selectedCategory === 'all' ? 'Nos produits populaires' : formatCategory(selectedCategory) }}
                    </h2>
                    <p>Decouvrez une selection de produits choisis pour vous.</p>
                </div>
                <!-- PAGINATION  -->
                <div class="products-pagination products-pagination-top" aria-label="Pagination des produits">
                    <button
                        type="button"
                        class="pagination-btn"
                        @click="previousPage"
                        aria-label="Page precedente"
                    >
                        <i class="bi bi-chevron-left"></i>
                    </button>

                    <span class="pagination-current">
                        <span class="pagination-label">Page</span>
                        <strong>{{ currentPage }}</strong>
                        <span>/ {{ totalPages }}</span>
                    </span>

                    <button
                        type="button"
                        class="pagination-btn pagination-btn-primary"
                        @click="nextPage"
                        aria-label="Page suivante"
                    >
                        <i class="bi bi-chevron-right"></i>
                    </button>
                </div>
            </div>
            <!-- AFFICHER LES PRODUITS -->
            <div class="row g-4">
                <div
                    v-for="(product, index) in displayedProducts"
                    :key="product.id"
                    class="col-12 col-md-6 col-lg-4"
                >
                    <ProductCard
                        :name="product.title"
                        :category="product.category"
                        :description="product.description"
                        :price="product.price"
                        :image="product.thumbnail"
                        :rating="product.rating"
                        :reviews="product.reviews?.length"
                        :image-loading="index < 3 ? 'eager' : 'lazy'"
                        :image-fetch-priority="index < 3 ? 'high' : 'auto'"
                        @add-to-cart="ajouterPanier(product)"
                        @show-details="showProductDetails(product)"
                    />
                </div>
            </div>
            <!-- PAGINATION -->
            <div class="products-pagination products-pagination-bottom" aria-label="Pagination des produits">
                <button
                    type="button"
                    class="pagination-btn"
                    @click="previousPage"
                    aria-label="Page precedente"
                >
                    <i class="bi bi-chevron-left"></i>
                </button>

                <span class="pagination-current">
                    <span class="pagination-label">Page</span>
                    <strong>{{ currentPage }}</strong>
                    <span>/ {{ totalPages }}</span>
                </span>

                <button
                    type="button"
                    class="pagination-btn pagination-btn-primary"
                    @click="nextPage"
                    aria-label="Page suivante"
                >
                    <i class="bi bi-chevron-right"></i>
                </button>
            </div>
        </div>
    </section>

    <ProductDetail
        :product="selectedProduct"
        @close="selectedProduct = null"
        @add-to-cart="ajouterPanier"
    />
</template>
