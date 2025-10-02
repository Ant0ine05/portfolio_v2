<template>
  <div>
    <!-- Navigation -->
    <Navbarre></Navbarre>

    <!-- Hero -->
     <Hero></Hero>
     
    <!-- À propos -->
    <About></About>

    <!-- Compétences -->
    <Skills></Skills>

    <!-- Portfolio -->
    <Projet :projet="projets"></Projet>

    <!-- Contact -->
    <Contact></Contact>

    <!-- Footer -->
    <Footer></Footer>
</div>
</template>
<script>
import About from './components/About.vue';
import Contact from './components/Contact.vue';
import Hero from './components/Hero.vue';
import Navbarre from './components/Navbarre.vue';
import Projet from './components/Projet.vue';
import Skills from './components/Skills.vue';
import Footer from './components/Footer.vue';

export default {
  name: 'App',
  components: {
    Hero,
    About,
    Navbarre,
    Skills,
    Projet,
    Contact,
    Footer
  },
  data() {
    return {
        projets: {
        CARDS: [
          {
            NAMEGIT: "Pendu_Maui",
            NAME: "Pendu MAUI",
            DESCRIPTION: "Réalisation d'un jeu de pendu avec une interface graphique.",
            DESCRIPTIONMODAL: "J’ai développé une application mobile autonome du jeu du pendu. Le joueur doit deviner un mot choisi aléatoirement, lettre par lettre, avec un nombre limité d’erreurs. À chaque mauvaise réponse, une illustration du pendu se dévoile progressivement jusqu’à la défaite. En cas de victoire, le joueur peut enregistrer son score avec un pseudo. L’application propose un menu principal permettant de jouer, gérer la liste des mots à deviner, consulter les scores ou quitter l’application. L’utilisateur peut ajouter ou supprimer des mots, la liste étant stockée localement et initialisée avec quelques mots par défaut. Les scores sont également enregistrés en local et sont basés sur un système prenant en compte la difficulté du mot et le nombre d’erreurs. L’application fonctionne en autonomie complète sans connexion nécessaire.",
            LANGAGUES: [
              "C#",
            ],
            IMAGES: [
              "playpendu.png",
              'gameo_over.png',
              "modifmot.png",
            ],
            LINK: {
              GITHUB: true,
              ZIP: false,
              LINK: {
                VALUE: false,
                HREF: ""
              }
            },
          },
          {
            NAMEGIT: "portfolio",
            NAME: "Site Portfolio",
            DESCRIPTION: "Réalisation de mon portfolio en vue.js",
            DESCRIPTIONMODAL: "J’ai réalisé mon portfolio personnel en utilisant le framework Vue.js, en me fixant des objectifs progressifs pour structurer efficacement mon avancement. J’ai commencé par la création d’une barre de navigation, permettant un accès fluide aux différentes sections du site. Ensuite, j’ai intégré un fond animé pour apporter une touche dynamique et moderne à l’interface. J’ai poursuivi avec la mise en place de cartes interactives pour présenter mes projets, chacune affichant les détails essentiels et les technologies utilisées. Ce développement m’a permis de renforcer mes compétences en Vue.js, en gestion de composants, et en animation web, tout en créant une vitrine claire et fonctionnelle de mes réalisations.",
            LANGAGUES: [
              "VUE.JS",
              "HTML/CSS",
              "JS",
            ],
            IMAGES: [
              'portfolio_image1.png',
              'screen_portfolio.png',
              "logo-site-removebg.png",
            ],
            LINK: {
              GITHUB: true,
              ZIP: false,
              LINK: {
                VALUE: false,
                HREF: ""
              }
            },

          },
          {
            NAME: "Générateur de pointage",
            DESCRIPTION: "Réalisation d'un générateur de pointage pour l'application Réglice.",
            DESCRIPTIONMODAL: "Pendant mon stage au sein de l’entreprise Horloge Huchez, j’ai réalisé un générateur de pointage destiné à produire des données de test pour l’application interne de gestion du temps utilisée par les développeurs. À partir d’un cahier des charges, j’ai d’abord conçu un système générant des pointages sur une semaine type, puis j’ai élargi les fonctionnalités pour permettre la création de données sur n’importe quelle période. J’ai également intégré différents types d’horaires, comme les horaires normaux, décalés, les journées incomplètes, les absences complètes ou les jours fériés, ainsi que des erreurs volontairement injectées (oubli, doublon, incohérences) afin de tester la robustesse de l’application dans divers scénarios. Ce projet m’a permis d’appliquer une approche structurée de développement tout en approfondissant mes compétences techniques et ma compréhension des environnements de test professionnels.",
            LANGAGUES: [
              "VUE.JS",
              "HTML/CSS",
              "JS",
              "MONGODB",
            ],
            IMAGES: [
              'pointage.png',
              "pointage_2.png",
              "Reglice.png"
            ],
            LINK: {
              GITHUB: false,
              ZIP: false,
              LINK: {
                VALUE: true,
                HREF: "https://reglice.fr"
              }
            },
          },
          {
            NAME: "Dashboard de L'APP Réglice",
            DESCRIPTION: "Réalisation d'un nouveau tableau de bord pour les utilisateur Réglice.",
            DESCRIPTIONMODAL: "Pendant mon stage au sein de l’entreprise Horloge Huchez, j’ai réalisé un tableau de bord interactif intégrant des icônes menant vers différentes pages de l’application. Ce dashboard était entièrement personnalisable : les utilisateurs pouvaient modifier le nom des catégories, ajuster le nombre d’éléments par catégorie et en ajouter ou supprimer selon leurs besoins. L’objectif de ce projet était de préparer une interface flexible et intuitive destinée à être déployée auprès des utilisateurs après la nouvelle année, afin de leur offrir une expérience adaptée et évolutive. Ce travail m’a permis de travailler sur l’ergonomie, la modularité d’une interface utilisateur et la gestion dynamique de contenus.",
            LANGAGUES: [
              "VUE.JS",
              "HTML/CSS",
              "JS",
              "MONGODB",
            ],
            IMAGES: [
              'dashboard.png',
              "dashboardmodif2.png",
              "dashboard_tuto2.png",

            ],
            LINK: {
              GITHUB: false,
              ZIP: false,
              LINK: {
                VALUE: true,
                HREF: "https://reglice.fr"
              }
            },
          },
          {
            NAME: "Gestion droit d'accés pour l'app Réglice",
            DESCRIPTION: "Réalisation d'une nouvelle pages de gestion des accès au icon du dashboard pour les utilisateurs ",
            DESCRIPTIONMODAL: "Pendant mon stage au sein de l’entreprise Horloge Huchez, j’ai réalisé une page permettant de gérer les droits d’utilisation des icônes présentes sur le tableau de bord, en fonction du type d’abonnement des utilisateurs sur l’application. Pour chaque page de l’application, les droits d’accès à chaque icône pouvaient être définis ou restreints de manière personnalisée. Cette gestion fine des droits d’accès reprenait et centralisait le travail déjà effectué précédemment, en apportant une interface plus complète et intuitive pour les administrateurs. De plus, cette interface permettait également de contrôler l’apparition ou non des tableaux de pointage directement sur le dashboard, offrant ainsi une gestion globale et dynamique des fonctionnalités accessibles selon les profils utilisateurs.",
            LANGAGUES: [
              "VUE.JS",
              "HTML/CSS",
              "JS",
              "MONGODB",
            ],
            IMAGES: [
              'droit_daccès2.png',
              "droit_daccèsmodif2.png",
              "Reglice.png"
            ],
            LINK: {
              GITHUB: false,
              ZIP: false,
              LINK: {
                VALUE: true,
                HREF: "https://reglice.fr"
              }
            },
          },
        ]
      },
    };
  },
  mounted() {
    this.webInit();
  },
  methods: {

    webInit() {
       // Menu burger
        const burger = document.getElementById('burger');
        const navMenu = document.getElementById('navMenu');

        burger.addEventListener('click', () => {
            navMenu.classList.toggle('active');
        });

        // Fermer menu au clic
        document.querySelectorAll('.nav-menu a').forEach(link => {
            link.addEventListener('click', () => {
                navMenu.classList.remove('active');
            });
        });

        // Smooth scroll
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', function (e) {
                e.preventDefault();
                const target = document.querySelector(this.getAttribute('href'));
                if (target) {
                    window.scrollTo({
                        top: target.offsetTop - 70,
                        behavior: 'smooth'
                    });
                }
            });
        });

        // Formulaire
        document.getElementById('contactForm').addEventListener('submit', function(e) {
            e.preventDefault();
            alert('Message envoyé ! Je vous répondrai rapidement.');
            this.reset();
        });

        // Animation au scroll
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.style.opacity = '1';
                    entry.target.style.transform = 'translateY(0)';
                }
            });
        }, { threshold: 0.1 });

        document.querySelectorAll('.skill-card, .project-card, .stat-item').forEach(el => {
            el.style.opacity = '0';
            el.style.transform = 'translateY(30px)';
            el.style.transition = 'all 0.6s ease';
            observer.observe(el);
        });
    }
  }
}
</script>
<style>
/* ======= VARIABLES & RESET ======= */
:root {
    /* Palette Rouge professionnelle */
    --primary: #dc2626;
    --primary-dark: #b91c1c;
    --primary-light: #ef4444;
    --accent: #f59e0b;
    
    /* Neutres */
    --bg-dark: #111827;
    --bg-darker: #0f172a;
    --bg-card: #1f2937;
    --text-primary: #f9fafb;
    --text-secondary: #9ca3af;
    --border: #374151;
    
    /* Layout */
    --container-width: 1500px;
    --padding: 5%;
    --bg-gradient-1: linear-gradient(to bottom, #111827, #1f2937);
    --bg-gradient-2: linear-gradient(to bottom, #1f2937, #111827);
    --bg-light: #1e293b;
    --bg-highlight: rgba(220, 38, 38, 0.05);
}

* {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
}

body {
    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
    background: var(--bg-dark);
    color: var(--text-primary);
    line-height: 1.6;
}

/* ======= LAYOUT & CONTAINERS ======= */
.container {
    max-width: var(--container-width);
    margin: 0 auto;
    padding: 0 var(--padding);
}

section {
     padding: 8rem 0;  /* Augmenté pour éviter les coupures */
    position: relative;
    overflow: hidden;
}

section:nth-child(even) {
    background: linear-gradient(180deg, var(--bg-dark) 0%, var(--bg-card) 100%);
}

section:nth-child(odd) {
    background: linear-gradient(180deg, var(--bg-card) 0%, var(--bg-dark) 100%);
}


section::after {
    content: '';
    position: absolute;
    bottom: 0;
    left: 0;
    width: 100%;
    height: 2px;
    background: linear-gradient(
        90deg,
        transparent,
        var(--primary-dark),
        transparent
    );
    opacity: 0.1;
}
/* ======= BURGER MENU ======= */
.burger {
    display: none;
    flex-direction: column;
    gap: 5px;
    cursor: pointer;
}

.burger span {
    width: 25px;
    height: 2px;
    background: var(--text-primary);
    transition: all 0.3s;
}

/* Boutons */
.btn {
    display: inline-flex;
    align-items: center;
    gap: 0.5rem;
    padding: 1rem 2rem;
    border-radius: 8px;
    text-decoration: none;
    font-weight: 600;
    transition: all 0.3s;
    cursor: pointer;
    border: none;
    font-size: 1rem;
}

.btn-primary {
    background: var(--primary);
    color: white;
}

.btn-primary:hover {
    background: var(--primary-dark);
    transform: translateY(-2px);
    box-shadow: 0 10px 30px rgba(220, 38, 38, 0.4);
}

.btn-secondary {
    background: transparent;
    color: var(--text-primary);
    border: 2px solid var(--border);
}

.btn-secondary:hover {
    border-color: var(--primary);
    color: var(--primary);
}

/* Sections */
section {
    padding: 5rem 0;
}

.section-header {
    text-align: center;
    margin-bottom: 3rem;
}

.section-tag {
    display: inline-block;
    padding: 0.4rem 1rem;
    background: rgba(220, 38, 38, 0.1);
    border-radius: 50px;
    color: var(--primary);
    font-size: 0.85rem;
    font-weight: 700;
    text-transform: uppercase;
    letter-spacing: 1px;
    margin-bottom: 1rem;
}

.section-title {
    font-size: clamp(2rem, 4vw, 2.8rem);
    font-weight: 700;
    margin-bottom: 1rem;
}

.section-subtitle {
    font-size: 1.1rem;
    color: var(--text-secondary);
    max-width: 600px;
    margin: 0 auto;
}

/* Responsive */
@media (max-width: 768px) {
    .nav-menu {
        position: fixed;
        top: 70px;
        right: -100%;
        width: 70%;
        height: calc(100vh - 70px);
        background: var(--bg-darker);
        flex-direction: column;
        padding: 2rem;
        border-left: 1px solid var(--border);
        transition: right 0.3s;
    }

    .nav-menu.active {
        right: 0;
    }

    .burger {
        display: flex;
    }

    .hero {
        padding-top: 100px;
    }

    .hero-buttons {
        flex-direction: column;
    }

    .btn {
        width: 100%;
        justify-content: center;
    }

    .projects-grid,
    .skills-grid {
        grid-template-columns: 1fr;
    }
}

/* Animations */
@keyframes fadeInUp {
    from {
        opacity: 0;
        transform: translateY(30px);
    }
    to {
        opacity: 1;
        transform: translateY(0);
    }
}

.fade-in {
    animation: fadeInUp 0.6s ease;
}
</style>
