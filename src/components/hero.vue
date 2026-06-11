<script setup>
    import HeroImage from '../assets/img/hero-shop.png'
</script>

<template>
    <section id="accueil" class="hero-section">
        <img :src="HeroImage" alt="Selection de produits ShopEasy" class="hero-bg">
        <div class="hero-overlay"></div>

        <div class="container hero-content">
            <p class="section-kicker">Boutique en ligne</p>
            <h1>Trouvez vos produits preferes en quelques clics</h1>
            <p class="hero-text">
                High-tech, accessoires, maison et idees cadeaux: decouvrez une selection de produits populaires,
                bien notes et prets a rejoindre votre panier.
            </p>

            <div class="hero-actions">
                <a href="#produits" class="btn hero-btn-primary">Voir les produits</a>
                <a href="#promotions" class="btn hero-btn-secondary">Voir les promotions</a>
            </div>

            <div class="hero-highlights" aria-label="Avantages de la boutique">
                <div>
                    <strong>194+</strong>
                    <span>produits</span>
                </div>
                <div>
                    <strong>4.5/5</strong>
                    <span>notes moyennes</span>
                </div>
                <div>
                    <strong>24h/24</strong>
                    <span>achat en ligne</span>
                </div>
            </div>
        </div>
    </section>
</template>
