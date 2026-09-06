<template>
  <div>
    <section class="hero" id="home">
      <Background />
      <Hero3D />
      <div class="container hero-grid">
        <div class="hero-content">
          <span class="hero-tag animate-in" style="animation-delay: 0.1s">DÉVELOPPEUR FULL-STACK</span>
          <h1 class="animate-in" style="animation-delay: 0.25s">
            Créateur d'expériences <span class="highlight">numériques</span>
          </h1>
          <p class="animate-in" style="animation-delay: 0.4s">
            Développeur passionné spécialisé dans la création de solutions web modernes, performantes et UX design.
          </p>
          <div class="hero-buttons animate-in" style="animation-delay: 0.55s">
            <a href="#portfolio" class="btn btn-primary">Voir mes projets</a>
            <a href="#contact" class="btn btn-secondary">Me contacter</a>
          </div>
        </div>
        <div class="hero-portrait animate-in" style="animation-delay: 0.3s" ref="portrait" @mousemove="onPortraitMove" @mouseleave="onPortraitLeave">
          <div class="portrait-blob"></div>
          <div class="portrait-frame" ref="portraitFrame">
            <img src="/assets/1774604050959.jpg" alt="Antoine Dalstein">
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script>
import Background from './Background.vue';
import Hero3D from './Hero3D.vue';

export default {
  name: 'App',
  components: {
    Background,
    Hero3D
  },
  mounted() {
    window.addEventListener('scroll', this.onScroll, { passive: true });
  },
  beforeUnmount() {
    window.removeEventListener('scroll', this.onScroll);
  },
  methods: {
    onScroll() {
      const hero = this.$el.querySelector('.hero-content');
      if (!hero) return;
      const y = window.scrollY;
      const fade = Math.max(0, 1 - y / 600);
      hero.style.opacity = fade;
      hero.style.transform = `translateY(${y * 0.25}px)`;
    },
    onPortraitMove(e) {
      const frame = this.$refs.portraitFrame;
      if (!frame) return;
      const rect = this.$refs.portrait.getBoundingClientRect();
      const x = (e.clientX - rect.left) / rect.width - 0.5;
      const y = (e.clientY - rect.top) / rect.height - 0.5;
      frame.style.transform = `rotateY(${x * 16}deg) rotateX(${-y * 16}deg) scale(1.04)`;
    },
    onPortraitLeave() {
      const frame = this.$refs.portraitFrame;
      if (frame) frame.style.transform = 'rotateY(0) rotateX(0) scale(1)';
    }
  }
}
</script>

<style scoped>
.hero {
  position: relative;
  min-height: 100vh;
  display: flex;
  align-items: center;
  padding-top: 80px;
  overflow: hidden;
}

.container {
  position: relative;
  z-index: 10;
  max-width: 1600px;
  margin: 0 auto;
  padding: 0 5%;
}

.hero-grid {
  display: grid;
  grid-template-columns: 1.15fr 0.85fr;
  align-items: center;
  gap: 3rem;
}

.hero-content {
  max-width: 900px;
}

.hero-tag {
  display: inline-block;
  padding: 0.55rem 1.3rem;
  background: var(--primary);
  border-radius: 50px;
  color: #fff;
  font-size: 0.85rem;
  font-weight: 700;
  letter-spacing: 0.5px;
  margin-bottom: 1.5rem;
  box-shadow: 0 10px 24px rgba(220, 38, 38, 0.25);
}

.hero h1 {
  font-size: clamp(2.5rem, 6vw, 4rem);
  font-weight: 800;
  line-height: 1.1;
  letter-spacing: -0.02em;
  margin-bottom: 1.5rem;
  color: var(--text-primary);
}

.hero .highlight {
  color: var(--primary);
  position: relative;
  display: inline-block;
}

.hero .highlight::after {
  content: '';
  position: absolute;
  bottom: 4px;
  left: 0;
  width: 100%;
  height: 10px;
  background: var(--accent);
  opacity: 0.6;
  z-index: -1;
  border-radius: 4px;
}

.hero p {
  font-size: 1.2rem;
  color: var(--text-secondary);
  margin-bottom: 2.5rem;
  line-height: 1.7;
  max-width: 560px;
}

.hero-buttons {
  display: flex;
  gap: 1rem;
  flex-wrap: wrap;
}

/* Portrait décoratif, façon en-tête de CV */
.hero-portrait {
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  min-height: 340px;
  perspective: 900px;
}

.portrait-blob {
  position: absolute;
  width: 280px;
  height: 280px;
  background: var(--accent);
  opacity: 0.5;
  border-radius: 42% 58% 63% 37% / 41% 44% 56% 59%;
  animation: blobMorph 10s ease-in-out infinite;
}

.portrait-frame {
  position: relative;
  width: 260px;
  height: 260px;
  border-radius: 50%;
  overflow: hidden;
  border: 6px solid #fff;
  box-shadow: var(--shadow-card);
  transform-style: preserve-3d;
  transition: transform 0.4s var(--ease-out), box-shadow 0.4s var(--ease-out);
  will-change: transform;
}

.hero-portrait:hover .portrait-frame {
  box-shadow: var(--shadow-card-hover);
}

.portrait-frame img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

@keyframes blobMorph {
  0%, 100% {
    border-radius: 42% 58% 63% 37% / 41% 44% 56% 59%;
    transform: rotate(0deg) scale(1);
  }
  50% {
    border-radius: 58% 42% 37% 63% / 56% 59% 41% 44%;
    transform: rotate(8deg) scale(1.05);
  }
}

.btn {
  padding: 1rem 2rem;
  border-radius: 50px;
  text-decoration: none;
  font-weight: 600;
  font-size: 1rem;
  transition: all 0.35s var(--ease-out);
  position: relative;
  overflow: hidden;
}

.btn-primary {
  background: var(--primary);
  color: white;
  box-shadow: 0 10px 30px rgba(220, 38, 38, 0.25);
}

.btn-primary::before {
  content: '';
  position: absolute;
  top: 0;
  left: -100%;
  width: 100%;
  height: 100%;
  background: linear-gradient(90deg, transparent, rgba(255,255,255,0.3), transparent);
  transition: left 0.5s;
}

.btn-primary:hover::before {
  left: 100%;
}

.btn-primary:hover {
  background: var(--primary-dark);
  transform: translateY(-3px);
  box-shadow: 0 15px 35px rgba(220, 38, 38, 0.35);
}

.btn-secondary {
  background: #fff;
  color: var(--text-primary);
  border: 2px solid var(--border);
}

.btn-secondary:hover {
  border-color: var(--primary);
  color: var(--primary);
  transform: translateY(-3px);
}

.fade-in {
  animation: fadeInUp 1s ease;
}

.animate-in {
  opacity: 0;
  animation: slideInUp 0.9s cubic-bezier(0.16, 1, 0.3, 1) forwards;
  will-change: transform, opacity;
}

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

@keyframes slideInUp {
  0% {
    opacity: 0;
    transform: translateY(60px) scale(0.95);
  }
  100% {
    opacity: 1;
    transform: translateY(0) scale(1);
  }
}

@media (max-width: 900px) {
  .hero-grid {
    grid-template-columns: 1fr;
    text-align: center;
    gap: 2.5rem;
  }

  .hero-content {
    margin: 0 auto;
  }

  .hero p {
    margin-left: auto;
    margin-right: auto;
  }

  .hero-buttons {
    justify-content: center;
  }

  .hero-portrait {
    order: -1;
    min-height: 240px;
  }

  .portrait-frame {
    width: 200px;
    height: 200px;
  }

  .portrait-blob {
    width: 220px;
    height: 220px;
  }
}

@media (max-width: 768px) {
  .hero {
    padding-top: 100px;
  }

  .hero-buttons {
    flex-direction: column;
  }

  .btn {
    width: 100%;
    text-align: center;
  }
}
</style>
