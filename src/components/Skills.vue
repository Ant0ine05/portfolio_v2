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
    background: var(--bg-light);
    border-radius: 12px;
    border: 1px solid rgba(255, 255, 255, 0.1);
    transition: all 0.3s ease;
    transform: translateY(0);  /* Position initiale */
}

.skill-card:hover {
    transform: translateY(-5px);  /* Monte au survol */
    border-color: var(--primary);
    box-shadow: 0 10px 30px rgba(0, 0, 0, 0.2);
    background: linear-gradient(145deg, 
        var(--bg-light) 0%, 
        var(--bg-card) 100%
    );
}

.skill-icon {
    width: 60px;
    height: 60px;
    background: rgba(220, 38, 38, 0.1);
    border-radius: 12px;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 1.8rem;
    margin-bottom: 1.5rem;
}

.skill-card h3 {
    font-size: 1.3rem;
    margin-bottom: 0.8rem;
}

.skill-card p {
    color: var(--text-secondary);
    line-height: 1.6;
}

</style>
