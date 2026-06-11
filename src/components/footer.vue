<script setup>
import LogoImage from '../assets/img/logo.png'
</script>

<template>
    <footer class="site-footer">
        <div class="container">
            <div class="footer-grid">
                <div class="footer-brand">
                    <RouterLink class="footer-logo-link" to="/#accueil" aria-label="Retour a l'accueil">
                        <img :src="LogoImage" alt="Logo ShopEasy" class="footer-logo">
                    </RouterLink>

                    <p>
                        ShopEasy selectionne des produits utiles, modernes et accessibles pour simplifier vos achats en ligne.
                    </p>

                    <div class="footer-socials" aria-label="Reseaux sociaux">
                        <a href="#" aria-label="Facebook">
                            <i class="bi bi-facebook"></i>
                        </a>
                        <a href="#" aria-label="Instagram">
                            <i class="bi bi-instagram"></i>
                        </a>
                        <a href="#" aria-label="Twitter">
                            <i class="bi bi-twitter-x"></i>
                        </a>
                    </div>
                </div>

                <div class="footer-column">
                    <h2>Boutique</h2>
                    <ul>
                        <li><RouterLink to="/#produits">Produits populaires</RouterLink></li>
                        <li><RouterLink to="/#promotions">Promotions</RouterLink></li>
                        <li><RouterLink to="/#panier">Panier</RouterLink></li>
                        <li><RouterLink to="/#compte">Mon compte</RouterLink></li>
                    </ul>
                </div>

                <div class="footer-column">
                    <h2>Aide</h2>
                    <ul>
                        <li><a href="#">Livraison</a></li>
                        <li><a href="#">Retours</a></li>
                        <li><a href="#">Paiement securise</a></li>
                        <li><RouterLink to="/#contact">Contact</RouterLink></li>
                    </ul>
                </div>

                <div class="footer-newsletter">
                    <h2>Newsletter</h2>
                    <p>Recevez nos nouveautes et nos offres directement par email.</p>

                    <form class="footer-form" @submit.prevent>
                        <input type="email" placeholder="Votre email" aria-label="Votre email">
                        <button type="submit">OK</button>
                    </form>
                </div>
            </div>

            <div class="footer-bottom">
                <p>&copy; 2026 ShopEasy. Tous droits reserves.</p>
                <div>
                    <a href="#">Confidentialite</a>
                    <a href="#">Conditions</a>
                </div>
            </div>
        </div>
    </footer>
</template>
