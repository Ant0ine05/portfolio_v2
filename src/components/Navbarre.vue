<template>
<div>
   <nav>
        <div class="nav-content">
            <a href="#" class="logo">Antoine<span>.</span></a>
            <ul class="nav-menu" id="navMenu">
                <li><a href="#home">Accueil</a></li>
                <li><a href="#about">À propos</a></li>
                <li><a href="#skills">Compétences</a></li>
                <li><a href="#portfolio">Projets</a></li>
                <li><a href="#contact">Contact</a></li>
            </ul>
            <div class="burger" id="burger">
                <span></span>
                <span></span>
                <span></span>
            </div>
        </div>
    </nav>
</div>
</template>
<script>
export default {
  name: 'App',
  components: {
   
  },
    data() {
        return {
    
        };
    },

    mounted() {
    
    },

    methods: {

    }
  
}
</script>
<style scoped>
nav {
    position: fixed;
    top: 0;
    width: 100%;
    background: rgba(17, 24, 39, 0.95);
    backdrop-filter: blur(10px);
    border-bottom: 1px solid var(--border);
    z-index: 1000;
}

.nav-content {
    /* max-width: var(--container-width); */
    margin: 0 auto;
    padding: 1.2rem var(--padding);
    display: flex;
    justify-content: space-between;
    align-items: center;
}

.logo {
    font-size: 1.4rem;
    font-weight: 700;
    color: var(--text-primary);
    text-decoration: none;
}

.logo span {
    color: var(--primary);
}

.nav-menu {
    display: flex;
    gap: 2.5rem;
    list-style: none;
}

.nav-menu a {
    color: var(--text-secondary);
    text-decoration: none;
    font-weight: 500;
    transition: color 0.3s;
    position: relative;
}

.nav-menu a::after {
    content: '';
    position: absolute;
    bottom: -5px;
    left: 0;
    width: 0;
    height: 2px;
    background: var(--primary);
    transition: width 0.3s;
}

.nav-menu a:hover {
    color: var(--text-primary);
}

.nav-menu a:hover::after {
    width: 100%;
}
</style>
