<script setup>
defineProps({
    categories: {
        type: Array,
        default: () => []
    },
    selectedCategory: {
        type: String,
        default: 'all'
    },
    filteredCount: {
        type: Number,
        default: 0
    },
    totalCount: {
        type: Number,
        default: 0
    },
    categoryCounts: {
        type: Object,
        default: () => ({})
    }
})

const emit = defineEmits(['select-category'])

const formatCategory = (category) => {
    return category.replaceAll('-', ' ')
}

const getCategoryCount = (categoryCounts, category, totalCount) => {
    if (category === 'all') {
        return totalCount
    }

    return categoryCounts[category] ?? 0
}
</script>

<template>
    <section class="category-filter-section" aria-label="Filtrer les produits par categorie">
        <div class="container">
            <div class="category-filter-header">
                <div>
                    <p class="section-kicker">Categories</p>
                    <h2>Explorez par univers</h2>
                </div>
                <p>{{ filteredCount }} produit(s) affiche(s)</p>
            </div>

            <div class="category-filter-list">
                <button
                    type="button"
                    class="category-filter-btn"
                    :class="{ active: selectedCategory === 'all' }"
                    @click="emit('select-category', 'all')"
                >
                    <span>Tous</span>
                    <strong>{{ getCategoryCount(categoryCounts, 'all', totalCount) }}</strong>
                </button>

                <button
                    v-for="category in categories"
                    :key="category"
                    type="button"
                    class="category-filter-btn"
                    :class="{ active: selectedCategory === category }"
                    @click="emit('select-category', category)"
                >
                    <span>{{ formatCategory(category) }}</span>
                    <strong>{{ getCategoryCount(categoryCounts, category, totalCount) }}</strong>
                </button>
            </div>
        </div>
    </section>
</template>
