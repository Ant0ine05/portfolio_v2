<div align="center">

# 🚀 Portfolio v2

### Portfolio personnel moderne et interactif

[![Vue.js](https://img.shields.io/badge/Vue.js-3.x-4FC08D?style=for-the-badge&logo=vue.js&logoColor=white)](https://vuejs.org/)
[![JavaScript](https://img.shields.io/badge/JavaScript-ES6+-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black)](https://developer.mozilla.org/fr/docs/Web/JavaScript)
[![HTML5](https://img.shields.io/badge/HTML5-E34F26?style=for-the-badge&logo=html5&logoColor=white)](https://developer.mozilla.org/fr/docs/Web/HTML)
[![CSS3](https://img.shields.io/badge/CSS3-1572B6?style=for-the-badge&logo=css3&logoColor=white)](https://developer.mozilla.org/fr/docs/Web/CSS)

[🌐 Voir le site](#portfolio-v2-czf.pages.dev) • [📝 Documentation](#fonctionnalités) • [🐛 Signaler un bug](https://github.com/Ant0ine05/portfolio_v2/issues)

</div>

---

## ✨ Aperçu

Portfolio personnel développé avec Vue.js, présentant mes projets, compétences et expériences de manière moderne et interactive. Design minimaliste avec une palette de couleurs rouge professionnel, animations fluides et interface responsive.

### 🎯 Points forts

- 🎨 **Design moderne** - Interface élégante avec animations CSS et transitions fluides
- 📱 **Responsive** - Adapté à tous les écrans (mobile, tablette, desktop)
- ⚡ **Performance** - Optimisé pour un chargement rapide
- 🎭 **Interactif** - Modales de projets avec carrousel d'images
- 🌊 **Fond animé** - Arrière-plan dynamique et immersif
- 🔗 **Navigation fluide** - Scroll smooth entre les sections

---

## 🛠️ Technologies

| Frontend | Outils | Déploiement |
|----------|--------|-------------|
| Vue.js 3 | NPM | Cloudflare Pages |
| JavaScript ES6+ | Babel | Wrangler |
| HTML5 / CSS3 | ESLint | - |

---

## 📦 Installation

### Prérequis

- [Node.js](https://nodejs.org/) (v14 ou supérieur)
- [NPM](https://www.npmjs.com/) (v6 ou supérieur)

### Étapes

```bash
# Cloner le repository
git clone https://github.com/Ant0ine05/portfolio_v2.git

# Accéder au dossier
cd portfolio_v2

# Installer les dépendances
npm install

# Lancer le serveur de développement
npm run serve
```

Le site sera accessible sur `http://localhost:8080` 🎉

---

## 🚀 Commandes

| Commande | Description |
|----------|-------------|
| `npm run serve` | Lance le serveur de développement avec hot-reload |
| `npm run build` | Compile et minifie pour la production |
| `npm run lint` | Analyse et corrige les fichiers |

---

## 📁 Structure du projet

```
portfolio_v2/
├── public/
│   ├── assets/          # Images et ressources statiques
│   └── index.html       # Template HTML principal
├── src/
│   ├── components/      # Composants Vue
│   │   ├── About.vue    # Section À propos
│   │   ├── Contact.vue  # Formulaire de contact
│   │   ├── Hero.vue     # Section hero/bannière
│   │   ├── Navbarre.vue # Navigation
│   │   ├── Projet.vue   # Grille de projets
│   │   ├── ProjectModal.vue # Modale détail projet
│   │   ├── Skills.vue   # Compétences techniques
│   │   ├── Footer.vue   # Pied de page
│   │   └── Background.vue # Fond animé
│   ├── App.vue          # Composant racine
│   └── main.js          # Point d'entrée
├── babel.config.js      # Configuration Babel
├── vue.config.js        # Configuration Vue CLI
└── package.json         # Dépendances du projet
```

---

## 🎨 Fonctionnalités

### 🏠 Section Hero
- Présentation dynamique avec typographie impactante
- Boutons d'action vers les sections importantes
- Animation d'apparition progressive

### 👨‍💻 À propos
- Présentation personnelle et parcours
- Statistiques et réalisations
- Design avec cartes interactives

### 💼 Portfolio
- **Grille de projets** avec cartes interactives
- **Modale détaillée** pour chaque projet :
  - Carrousel d'images avec navigation
  - Description complète
  - Technologies utilisées
  - Liens GitHub et site web
  - Informations sur la durée, rôle et objectifs

### 🔧 Compétences
- Présentation visuelle des technologies maîtrisées
- Organisation par catégories
- Tags colorés et animés

### 📬 Contact
- Formulaire de contact fonctionnel
- Validation des champs
- Liens vers réseaux sociaux

### 🎯 Navigation
- Barre de navigation fixe
- Menu burger responsive
- Smooth scroll entre sections

---

## 🎨 Palette de couleurs

```css
--primary: #dc2626        /* Rouge principal */
--primary-dark: #b91c1c   /* Rouge foncé */
--primary-light: #ef4444  /* Rouge clair */
--accent: #f59e0b         /* Accent orange */
--bg-dark: #111827        /* Fond sombre */
--bg-card: #1f2937        /* Fond carte */
--text-primary: #f9fafb   /* Texte principal */
--text-secondary: #9ca3af /* Texte secondaire */
```

---

## 📝 Personnalisation

### Modifier les projets

Éditez le fichier `src/App.vue`, section `data()` :

```javascript
projets: {
  CARDS: [
    {
      NAMEGIT: "nom-du-repo",
      NAME: "Titre du projet",
      DESCRIPTION: "Description courte",
      DESCRIPTIONMODAL: "Description détaillée...",
      LANGAGUES: ["Vue.js", "JavaScript"],
      IMAGES: ["image1.png", "image2.png"],
      LINK: {
        GITHUB: true,
        LINK: { VALUE: false, HREF: "" }
      }
    }
  ]
}
```

### Modifier les couleurs

Éditez les variables CSS dans `src/App.vue`, section `<style>` :

```css
:root {
  --primary: #votrecouleur;
  /* ... */
}
```

---

## 🚀 Déploiement

### Cloudflare Pages

```bash
# Build du projet
npm run build

# Déploiement avec Wrangler
npx wrangler pages deploy dist
```

### Autres plateformes

Le dossier `dist/` généré par `npm run build` peut être déployé sur :
- Netlify
- Vercel
- GitHub Pages
- Serveur OVH
- Ou tout autre hébergement statique

---

## 🤝 Contribution

Les contributions sont les bienvenues ! N'hésitez pas à :

1. 🍴 Fork le projet
2. 🌿 Créer une branche (`git checkout -b feature/AmazingFeature`)
3. 💾 Commit vos changements (`git commit -m 'Add AmazingFeature'`)
4. 📤 Push vers la branche (`git push origin feature/AmazingFeature`)
5. 🔃 Ouvrir une Pull Request

---

## 📄 Licence

Ce projet est sous licence MIT - voir le fichier [LICENSE](LICENSE) pour plus de détails.

---

## 👨‍💻 Auteur

**Antoine**

- 🌐 Portfolio : [Votre site](#)
- 💼 LinkedIn : [Votre profil](#)
- 🐙 GitHub : [@Ant0ine05](https://github.com/Ant0ine05)

---

## 📚 Ressources

- [Documentation Vue.js](https://vuejs.org/)
- [Vue CLI Configuration](https://cli.vuejs.org/config/)
- [MDN Web Docs](https://developer.mozilla.org/fr/)

---

<div align="center">

**⭐ N'oubliez pas de laisser une étoile si vous aimez ce projet ! ⭐**

Fait avec ❤️ et Vue.js

</div>
