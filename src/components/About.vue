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
                    <div class="stat-item" v-for="(stat, index) in stats" :key="index">
                        <div class="stat-number" :ref="'statNumber' + index">0+</div>
                        <div class="stat-label">{{ stat.label }}</div>
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
            stats: [
                { value: 2, label: "Années d'expérience" },
                { value: 20, label: "Projets réalisés" },
                { value: 5, label: "Site WEB réaliser" }
            ],
            hasAnimated: false
        };
    },

    mounted() {
        const section = this.$el.querySelector('.stats');
        if (!section) return;
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting && !this.hasAnimated) {
                    this.hasAnimated = true;
                    this.animateCounters();
                    observer.disconnect();
                }
            });
        }, { threshold: 0.4 });
        observer.observe(section);
    },

    methods: {
        animateCounters() {
            this.stats.forEach((stat, index) => {
                const target = this.$refs['statNumber' + index];
                const node = Array.isArray(target) ? target[0] : target;
                if (!node) return;
                const duration = 1400;
                const start = performance.now();
                const step = (now) => {
                    const progress = Math.min((now - start) / duration, 1);
                    const eased = 1 - Math.pow(1 - progress, 3);
                    node.textContent = Math.round(eased * stat.value) + '+';
                    if (progress < 1) requestAnimationFrame(step);
                };
                requestAnimationFrame(step);
            });
        }
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
    border-radius: var(--radius-md);
    border: 1px solid var(--border);
    box-shadow: var(--shadow-card);
    transition: all 0.35s var(--ease-out);
}

.stat-item:hover {
    transform: translateY(-6px);
    box-shadow: var(--shadow-card-hover);
}

.stat-number {
    font-size: 2.8rem;
    font-weight: 800;
    color: var(--primary);
    margin-bottom: 0.5rem;
}

.stat-label {
    color: var(--text-secondary);
    font-weight: 500;
}
</style>
