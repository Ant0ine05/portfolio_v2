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
                <div v-for="(projectItem, index) in projet.CARDS" :key="index" class="project-card">
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
    border-radius: 12px;
    overflow: hidden;
    border: 1px solid var(--border);
    transition: all 0.3s;
}

.project-card:hover {
    transform: translateY(-8px);
    border-color: var(--primary);
    box-shadow: 0 20px 40px rgba(0, 0, 0, 0.3);
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
    background: rgba(220, 38, 38, 0.1);
    border: 1px solid rgba(220, 38, 38, 0.3);
    border-radius: 6px;
    font-size: 0.85rem;
    color: var(--primary-light);
    font-weight: 500;
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
