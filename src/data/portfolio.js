// Contenu du portfolio — repris du CV et des projets existants.

export const profile = {
  firstName: 'Antoine',
  lastName: 'Dalstein',
  role: 'Développeur Full-Stack',
  location: 'Amiens, France',
  email: 'antoine.dalstein@gmail.com',
  linkedin: 'https://www.linkedin.com/in/antoine-dalstein-999474266',
  github: 'https://github.com/Ant0ine05',
  photo: '/assets/1774604050959.jpg',
  tagline: "Je conçois des applications web et mobiles utiles, rapides et agréables à utiliser.",
  statement:
    "Du tableau de bord métier à l'application mobile connectée à des pointeuses, je transforme des besoins concrets en interfaces claires et en code solide.",
  stats: [
    { value: 2, suffix: '+', label: "Années d'expérience" },
    { value: 20, suffix: '+', label: 'Projets réalisés' },
    { value: 5, suffix: '+', label: 'Sites web livrés' }
  ]
};

export const stack = [
  'JavaScript', 'Vue.js', 'Ionic', 'MongoDB', 'Python', 'SQL', 'C#', 'HTML / CSS', 'Node.js'
];

export const skillGroups = [
  {
    key: 'front',
    icon: 'code',
    title: 'Front-end',
    text: "Interfaces réactives et soignées, du composant au design system.",
    items: ['Vue.js', 'JavaScript', 'HTML / CSS', 'Responsive']
  },
  {
    key: 'back',
    icon: 'database',
    title: 'Back-end & Data',
    text: 'APIs, bases de données et traitement de données fiables.',
    items: ['Node.js', 'MongoDB', 'SQL', 'Python']
  },
  {
    key: 'mobile',
    icon: 'mobile',
    title: 'Mobile',
    text: 'Applications mobiles hybrides connectées au matériel.',
    items: ['Ionic', 'C# / .NET MAUI']
  }
];

export const languages = [
  { name: 'Français', level: 3 },
  { name: 'Anglais', level: 2 },
  { name: 'Allemand', level: 1 }
];

export const certifications = ['Certification CNIL MOOC (2024)', 'Pix (2024)'];

export const interests = ['Appétence IA', 'Sport & Voyages'];

export const experiences = [
  {
    title: 'Alternance — Développeur Web Junior',
    place: 'Horloges-Huchez · Ferrières',
    date: 'Sept. 2025 — Juil. 2026',
    points: [
      "Développement d'une application mobile Ionic pour la gestion des pointages",
      'Gestion et configuration des pointeuses connectées',
      'Traitement des données de pointage entre pointeuse et RegliCe'
    ]
  },
  {
    title: 'CDI — Employé polyvalent',
    place: "McDonald's · Breteuil",
    date: 'Mai 2025 — Présent',
    points: [
      'Travail en équipe dans un environnement dynamique',
      "Gestion de la pression et des périodes d'affluence",
      'Contact client au quotidien'
    ]
  },
  {
    title: 'Stage — Développeur Web Junior',
    place: 'Horloges-Huchez · Ferrières',
    date: 'Nov. — Déc. 2024',
    points: [
      "Prise en main de l'infrastructure technique de l'entreprise",
      "Gestion des droits d'accès des utilisateurs",
      "Développement d'un tableau de bord pour l'app RegliCe"
    ]
  }
];

export const formations = [
  { title: 'Bachelor — Chef de Projet Développement et Data', place: 'LA MANU · Amiens', date: '2026 — 2027' },
  { title: "Bachelor — Concepteur Développeur d'Applications", place: 'Ecole-IT · Amiens', date: '2025 — 2026' },
  { title: 'BTS SIO — Option SLAM', place: 'Edouard Gand · Amiens', date: '2023 — 2025' },
  { title: 'Baccalauréat STI2D', place: 'Edouard Gand · Amiens', date: '2022 — 2023' }
];

export const projects = [
  {
    NAMEGIT: 'Tusmo',
    NAME: 'TOMUS',
    CATEGORY: 'Jeu web · Projet perso',
    DESCRIPTION: "Jeu type Wordle / Motus en ligne, du code jusqu'à la mise en production.",
    DESCRIPTIONMODAL: "J'ai développé en autonomie TOMUS, un jeu inspiré de Wordle et Motus, où le joueur doit deviner un mot en un nombre limité de tentatives. À chaque proposition, des indices visuels (couleurs) indiquent si les lettres sont bien placées, mal placées ou absentes du mot à trouver. Ce projet personnel m'a permis de travailler sur la logique de jeu, l'interface utilisateur et l'expérience utilisateur. Au-delà du développement, j'ai géré l'intégralité du déploiement en ligne : achat et configuration d'un serveur OVH, acquisition d'un nom de domaine, et paramétrage complet des DNS pour rendre le jeu accessible au public. Ce projet m'a permis de maîtriser l'ensemble de la chaîne de production d'une application web, du développement jusqu'à la mise en production.",
    LANGAGUES: ['HTML/CSS', 'JS'],
    IMAGES: ['Tomus_1.png', 'Tomus_2.png', 'Tomus_3.png'],
    LINK: { GITHUB: true, ZIP: true, LINK: { VALUE: true, HREF: 'https://tomus.fr' } }
  },
  {
    NAME: 'Dashboard RegliCe',
    CATEGORY: 'Stage · Horloges-Huchez',
    DESCRIPTION: 'Nouveau tableau de bord personnalisable pour les utilisateurs RegliCe.',
    DESCRIPTIONMODAL: "Pendant mon stage au sein de l'entreprise Horloge Huchez, j'ai réalisé un tableau de bord interactif intégrant des icônes menant vers différentes pages de l'application. Ce dashboard était entièrement personnalisable : les utilisateurs pouvaient modifier le nom des catégories, ajuster le nombre d'éléments par catégorie et en ajouter ou supprimer selon leurs besoins. L'objectif de ce projet était de préparer une interface flexible et intuitive destinée à être déployée auprès des utilisateurs après la nouvelle année, afin de leur offrir une expérience adaptée et évolutive. Ce travail m'a permis de travailler sur l'ergonomie, la modularité d'une interface utilisateur et la gestion dynamique de contenus.",
    LANGAGUES: ['VUE.JS', 'HTML/CSS', 'JS', 'MONGODB'],
    IMAGES: ['dashboard.png', 'dashboardmodif2.png', 'dashboard_tuto2.png'],
    LINK: { GITHUB: false, ZIP: false, LINK: { VALUE: true, HREF: 'https://reglice.fr' } }
  },
  {
    NAME: "Gestion des droits d'accès",
    CATEGORY: 'Stage · Horloges-Huchez',
    DESCRIPTION: "Page d'administration des droits d'accès aux icônes du dashboard selon l'abonnement.",
    DESCRIPTIONMODAL: "Pendant mon stage au sein de l'entreprise Horloge Huchez, j'ai réalisé une page permettant de gérer les droits d'utilisation des icônes présentes sur le tableau de bord, en fonction du type d'abonnement des utilisateurs sur l'application. Pour chaque page de l'application, les droits d'accès à chaque icône pouvaient être définis ou restreints de manière personnalisée. Cette gestion fine des droits d'accès reprenait et centralisait le travail déjà effectué précédemment, en apportant une interface plus complète et intuitive pour les administrateurs. De plus, cette interface permettait également de contrôler l'apparition ou non des tableaux de pointage directement sur le dashboard, offrant ainsi une gestion globale et dynamique des fonctionnalités accessibles selon les profils utilisateurs.",
    LANGAGUES: ['VUE.JS', 'HTML/CSS', 'JS', 'MONGODB'],
    IMAGES: ['droit_daccès2flou.png', 'droit_daccèsmodif2.png', 'Reglice.png'],
    LINK: { GITHUB: false, ZIP: false, LINK: { VALUE: true, HREF: 'https://reglice.fr' } }
  },
  {
    NAME: 'Générateur de pointage',
    CATEGORY: 'Stage · Horloges-Huchez',
    DESCRIPTION: "Génération de jeux de données de pointage réalistes pour tester l'application RegliCe.",
    DESCRIPTIONMODAL: "Pendant mon stage au sein de l'entreprise Horloge Huchez, j'ai réalisé un générateur de pointage destiné à produire des données de test pour l'application interne de gestion du temps utilisée par les développeurs. À partir d'un cahier des charges, j'ai d'abord conçu un système générant des pointages sur une semaine type, puis j'ai élargi les fonctionnalités pour permettre la création de données sur n'importe quelle période. J'ai également intégré différents types d'horaires, comme les horaires normaux, décalés, les journées incomplètes, les absences complètes ou les jours fériés, ainsi que des erreurs volontairement injectées (oubli, doublon, incohérences) afin de tester la robustesse de l'application dans divers scénarios. Ce projet m'a permis d'appliquer une approche structurée de développement tout en approfondissant mes compétences techniques et ma compréhension des environnements de test professionnels.",
    LANGAGUES: ['VUE.JS', 'HTML/CSS', 'JS', 'MONGODB'],
    IMAGES: ['pointage.png', 'pointage_2.png', 'Reglice.png'],
    LINK: { GITHUB: false, ZIP: false, LINK: { VALUE: true, HREF: 'https://reglice.fr' } }
  },
  {
    NAMEGIT: 'Pendu_Maui',
    NAME: 'Pendu MAUI',
    CATEGORY: 'Application mobile',
    DESCRIPTION: 'Jeu du pendu mobile, autonome, avec gestion des mots et des scores.',
    DESCRIPTIONMODAL: "J'ai développé une application mobile autonome du jeu du pendu. Le joueur doit deviner un mot choisi aléatoirement, lettre par lettre, avec un nombre limité d'erreurs. À chaque mauvaise réponse, une illustration du pendu se dévoile progressivement jusqu'à la défaite. En cas de victoire, le joueur peut enregistrer son score avec un pseudo. L'application propose un menu principal permettant de jouer, gérer la liste des mots à deviner, consulter les scores ou quitter l'application. L'utilisateur peut ajouter ou supprimer des mots, la liste étant stockée localement et initialisée avec quelques mots par défaut. Les scores sont également enregistrés en local et sont basés sur un système prenant en compte la difficulté du mot et le nombre d'erreurs. L'application fonctionne en autonomie complète sans connexion nécessaire.",
    LANGAGUES: ['C#'],
    IMAGES: ['playpendu.png', 'gameo_over.png', 'modifmot.png'],
    LINK: { GITHUB: true, ZIP: false, LINK: { VALUE: false, HREF: '' } }
  },
  {
    NAMEGIT: 'portfolio',
    NAME: 'Site Portfolio',
    CATEGORY: 'Site web · Vue.js',
    DESCRIPTION: 'Ce portfolio : Vue.js, Three.js et motion design avec GSAP.',
    DESCRIPTIONMODAL: "J'ai réalisé mon portfolio personnel en utilisant le framework Vue.js, en me fixant des objectifs progressifs pour structurer efficacement mon avancement. J'ai commencé par la création d'une barre de navigation, permettant un accès fluide aux différentes sections du site. Ensuite, j'ai intégré un fond animé pour apporter une touche dynamique et moderne à l'interface. J'ai poursuivi avec la mise en place de cartes interactives pour présenter mes projets, chacune affichant les détails essentiels et les technologies utilisées. Ce développement m'a permis de renforcer mes compétences en Vue.js, en gestion de composants, et en animation web, tout en créant une vitrine claire et fonctionnelle de mes réalisations.",
    LANGAGUES: ['VUE.JS', 'HTML/CSS', 'JS'],
    IMAGES: ['portfolio_image1.png', 'screen_portfolio.png', 'logo-site-removebg.png'],
    LINK: { GITHUB: true, ZIP: false, LINK: { VALUE: false, HREF: '' } }
  }
];
