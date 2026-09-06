<template>
<div>
   <section id="skills">
        <div class="container">
            <div class="section-header">
                <span class="section-tag">Compétences</span>
                <h2 class="section-title">Mon expertise</h2>
                <p class="section-subtitle">Technologies et domaines dans lesquels j'excelle</p>
            </div>
            <div class="skills-grid">
                <div class="skill-card">
                    <div class="skill-icon">💻</div>
                    <h3>Frontend Development</h3>
                    <p>Maîtrise de HTML, Vue.js, CSS et des technologies web modernes pour créer des interfaces performantes.</p>
                </div>
                <div class="skill-card">
                    <div class="skill-icon">⚙️</div>
                    <h3>Backend Development</h3>
                    <p>Expertise en Node.js, bases de données et conception d’architectures backend performantes et sécurisées.</p>
                </div>
                <div class="skill-card">
                    <div class="skill-icon">🎨</div>
                    <h3>UI/UX Design</h3>
                    <p>Conception d'interfaces centrées utilisateur avec une attention particulière à l'accessibilité.</p>
                </div>
                <div class="skill-card">
                    <div class="skill-icon">📱</div>
                    <h3>Responsive Design</h3>
                    <p>Création d'applications responsives qui fonctionnent parfaitement sur tous les appareils.</p>
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
#skills {
    background: var(--bg-highlight);
}
.skills-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
    gap: 2rem;
}

.skill-card {
    padding: 2rem;
    background: var(--bg-card);
    border-radius: var(--radius-md);
    border: 1px solid var(--border);
    box-shadow: var(--shadow-card);
    transition: all 0.35s var(--ease-out);
}

.skill-card:hover {
    transform: translateY(-8px);
    box-shadow: var(--shadow-card-hover);
}

.skill-icon {
    width: 56px;
    height: 56px;
    background: var(--primary);
    border-radius: var(--radius-sm);
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 1.6rem;
    margin-bottom: 1.5rem;
    box-shadow: 0 10px 24px rgba(220, 38, 38, 0.25);
}

.skill-card h3 {
    font-size: 1.3rem;
    font-weight: 700;
    margin-bottom: 0.8rem;
}

.skill-card p {
    color: var(--text-secondary);
    line-height: 1.6;
}

</style>
