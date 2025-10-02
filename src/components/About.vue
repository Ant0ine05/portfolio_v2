<template>
<div>
   <section id="about">
        <div class="container">
            <div class="section-header">
                <span class="section-tag">À propos</span>
                <h2 class="section-title">Qui suis-je ?</h2>
                <p class="section-subtitle">Développeur passionné avec une expertise en création d'applications web</p>
            </div>
            <div class="about-content">
                <p class="about-text">
                    Fort de plusieurs années d'expérience dans le développement web, je me spécialise dans la création d'expériences numériques exceptionnelles. Mon approche combine expertise technique, sensibilité design et attention aux détails pour livrer des solutions qui dépassent les attentes.
                </p>
                <p class="about-text">
                    Je crois que la technologie doit être au service de l'humain. Chaque projet est une opportunité de résoudre des problèmes concrets tout en créant des interfaces intuitives et élégantes.
                </p>

                <div class="stats">
                    <div class="stat-item">
                        <div class="stat-number">2+</div>
                        <div class="stat-label">Années d'expérience</div>
                    </div>
                    <div class="stat-item">
                        <div class="stat-number">20+</div>
                        <div class="stat-label">Projets réalisés</div>
                    </div>
                    <div class="stat-item">
                        <div class="stat-number">5+</div>
                        <div class="stat-label">Site WEB réaliser</div>
                    </div>
                </div>
            </div>
        </div>
    </section>
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
.about-content {
    max-width: 900px;
    margin: 0 auto;
}

.about-text {
    font-size: 1.1rem;
    color: var(--text-secondary);
    line-height: 1.8;
    margin-bottom: 2rem;
}

.stats {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
    gap: 2rem;
    margin-top: 3rem;
}

.stat-item {
    text-align: center;
    padding: 2rem;
    background: var(--bg-card);
    border-radius: 12px;
    border: 1px solid var(--border);
    transition: all 0.3s;
}

.stat-item:hover {
    transform: translateY(-5px);
    border-color: var(--primary);
}

.stat-number {
    font-size: 2.8rem;
    font-weight: 700;
    color: var(--primary);
    margin-bottom: 0.5rem;
}

.stat-label {
    color: var(--text-secondary);
    font-weight: 500;
}
</style>
