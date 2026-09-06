<template>
<div>
      <section id="portfolio">
        <div class="container">
            <div class="section-header">
                <span class="section-tag">Portfolio</span>
                <h2 class="section-title">Projets récents</h2>
                <p class="section-subtitle">Sélection de mes meilleures réalisations</p>
            </div>
            <div  class="projects-grid">
                <div v-for="(projectItem, index) in projet.CARDS" :key="index" class="project-card"
                     @mousemove="onCardTilt" @mouseleave="onCardLeave">
                    <div class="project-image">
                        <img :src="'assets/'+projectItem.IMAGES[0]" alt="">
                        <div class="project-overlay"></div>
                    </div>
                    <div class="project-content">
                        <h3>{{ projectItem.NAME }}</h3>
                        
                        <p>{{ projectItem.DESCRIPTION }}</p>
                        <div class="project-tags">
                            <span v-for="value in projectItem.LANGAGUES" :key="value" class="tag">{{ value }}</span>
                            
                        </div>
                        <button class="project-link" @click="openProject(projectItem)">
                          Voir le projet →
                        </button>
                        
                    </div>
                </div>
            </div>
        </div>
    </section>
     
    <ProjectModal 
      v-if="selectedProject !== null"
      :project="selectedProject"
      @close="closeModal"
    />
</div>
</template>
<script>
import ProjectModal from './ProjectModal.vue';

export default {
  name: 'App',
  components: {
   ProjectModal
  },
    data() {
        return {
            selectedProject: null
        };
    },

    mounted() {
    
    },

    methods: {
        openProject(projectItem) {
            // Si LINK existe, extraire les valeurs appropriées
            let githubUrl = null;
            let webLink = null;
            
            if (projectItem.LINK) {
                // Si GITHUB est true et NAMEGIT existe, construire l'URL GitHub
                if (projectItem.LINK.GITHUB && projectItem.NAMEGIT) {
                    githubUrl = `https://github.com/Ant0ine05/${projectItem.NAMEGIT}`;
                }
                
                // Si LINK.VALUE est true, prendre le HREF
                if (projectItem.LINK.LINK?.VALUE && projectItem.LINK.LINK?.HREF) {
                    webLink = projectItem.LINK.LINK.HREF;
                }
            }
            
            this.selectedProject = {
                id: projectItem.ID || 1,
                title: projectItem.NAME,
                category: projectItem.CATEGORY || 'Développement Web',
                shortDescription: projectItem.DESCRIPTION,
                fullDescription: projectItem.DESCRIPTIONMODAL || projectItem.DESCRIPTION,
                images: projectItem.IMAGES.map(img => 'assets/' + img),
                technologies: projectItem.LANGAGUES || [],
                duration: projectItem.DURATION || '3 mois',
                role: projectItem.ROLE || 'Développeur',
                objective: projectItem.OBJECTIVE || projectItem.DESCRIPTION,
                link: webLink,
                github: githubUrl
            };
        },

        closeModal() {
            this.selectedProject = null;
        },

        onCardTilt(e) {
            const card = e.currentTarget;
            const rect = card.getBoundingClientRect();
            const x = (e.clientX - rect.left) / rect.width - 0.5;
            const y = (e.clientY - rect.top) / rect.height - 0.5;
            card.style.transform = `perspective(1000px) rotateY(${x * 8}deg) rotateX(${-y * 8}deg) translateY(-10px)`;
        },

        onCardLeave(e) {
            e.currentTarget.style.transform = '';
        }
    },
  props:['projet']
}
</script>
<style scoped>
.projects-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(350px, 1fr));
    gap: 2rem;
}

.project-card {
    background: var(--bg-card);
    border-radius: var(--radius-md);
    overflow: hidden;
    border: 1px solid var(--border);
    box-shadow: var(--shadow-card);
    transition: transform 0.25s var(--ease-out), box-shadow 0.4s var(--ease-out);
    transform-style: preserve-3d;
    will-change: transform;
}

.project-card:hover {
    box-shadow: var(--shadow-card-hover);
}

.project-image {
    position: relative;
    width: 100%;
    height: 220px;
    background: linear-gradient(135deg, var(--primary) 0%, var(--accent) 100%);
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 4rem;
    overflow: hidden; /* Pour masquer les débordements d'image */
}

.project-image img {
    width: 100%;
    height: 100%;
    object-fit: cover; /* Garantit que l'image couvre tout l'espace */
    object-position: center; /* Centre l'image */
    transition: transform 0.3s ease;
}
.project-card:hover .project-image img {
    transform: scale(1.1);
}

/* Ajustement de l'émoji quand il n'y a pas d'image */
.project-image:not(:has(img)) {
    font-size: 4rem;
    background: linear-gradient(135deg, var(--primary) 0%, var(--accent) 100%);
}

.project-overlay {
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: rgba(0, 0, 0, 0.3);
    opacity: 0;
    transition: opacity 0.3s;
}

.project-card:hover .project-overlay {
    opacity: 1;
}

.project-content {
    padding: 2rem;
}

.project-content h3 {
    font-size: 1.5rem;
    font-weight: 700;
    margin-bottom: 0.8rem;
}

.project-content p {
    color: var(--text-secondary);
    margin-bottom: 1.5rem;
    line-height: 1.6;
}

.project-tags {
    display: flex;
    gap: 0.6rem;
    flex-wrap: wrap;
    margin-bottom: 1.5rem;
}

.tag {
    padding: 0.4rem 1rem;
    background: #fff;
    border: 1.5px solid var(--primary);
    border-radius: 50px;
    font-size: 0.8rem;
    color: var(--primary);
    font-weight: 600;
}

.project-link {
    display: inline-flex;
    align-items: center;
    gap: 0.5rem;
    color: var(--primary);
    background: none;
    border: none;
    padding: 0;
    font-family: inherit;
    font-size: inherit;
    text-decoration: none;
    font-weight: 600;
    cursor: pointer;
    transition: gap 0.3s;
}

.project-link:hover {
    gap: 0.8rem;
}
</style>
