<template>
  <div>
    <section class="hero" id="home">
      <Background />
      <div class="container">
        <div class="hero-content">
          <span class="hero-tag animate-in" style="animation-delay: 0.2s">👋 Bienvenue</span>
          <h1 class="animate-in" style="animation-delay: 0.4s">
            Créateur d'expériences <span class="highlight">numériques</span>
          </h1>
          <p class="animate-in" style="animation-delay: 0.6s">
            Développeur passionné spécialisé dans la création de solutions web modernes, performantes et UX design.
          </p>
          <div class="hero-buttons animate-in" style="animation-delay: 0.8s">
            <a href="#portfolio" class="btn btn-primary">Voir mes projets</a>
            <a href="#contact" class="btn btn-secondary">Me contacter</a>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script>
import Background from './Background.vue';

export default {
  name: 'App',
  components: {
    Background
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

.hero-content {
  max-width: 900px;
}

.hero-tag {
  display: inline-block;
  padding: 0.5rem 1.2rem;
  background: rgba(220, 38, 38, 0.15);
  border: 1px solid rgba(220, 38, 38, 0.4);
  border-radius: 50px;
  color: #ef4444;
  font-size: 0.9rem;
  font-weight: 600;
  margin-bottom: 1.5rem;
  backdrop-filter: blur(10px);
  animation: pulse 3s ease-in-out infinite;
}

.hero h1 {
  font-size: clamp(2.5rem, 6vw, 4rem);
  font-weight: 800;
  line-height: 1.1;
  margin-bottom: 1.5rem;
  color: #f9fafb;
}

.hero .highlight {
  color: #dc2626;
  position: relative;
  display: inline-block;
}

.hero .highlight::after {
  content: '';
  position: absolute;
  bottom: 0;
  left: 0;
  width: 100%;
  height: 3px;
  background: linear-gradient(90deg, #dc2626, #f59e0b);
  animation: shimmer 2s ease-in-out infinite;
}

.hero p {
  font-size: 1.2rem;
  color: #9ca3af;
  margin-bottom: 2.5rem;
  line-height: 1.7;
}

.hero-buttons {
  display: flex;
  gap: 1rem;
  flex-wrap: wrap;
}

.btn {
  padding: 1rem 2rem;
  border-radius: 8px;
  text-decoration: none;
  font-weight: 600;
  font-size: 1rem;
  transition: all 0.3s ease;
  position: relative;
  overflow: hidden;
}

.btn-primary {
  background: linear-gradient(135deg, #dc2626, #b91c1c);
  color: white;
  box-shadow: 0 10px 30px rgba(220, 38, 38, 0.3);
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
  transform: translateY(-3px);
  box-shadow: 0 15px 40px rgba(220, 38, 38, 0.5);
}

.btn-secondary {
  background: rgba(255, 255, 255, 0.05);
  color: #f9fafb;
  border: 2px solid rgba(220, 38, 38, 0.3);
  backdrop-filter: blur(10px);
}

.btn-secondary:hover {
  background: rgba(220, 38, 38, 0.1);
  border-color: #dc2626;
  color: #dc2626;
  transform: translateY(-3px);
}

.fade-in {
  animation: fadeInUp 1s ease;
}

.animate-in {
  opacity: 0;
  animation: slideInUp 0.8s cubic-bezier(0.16, 1, 0.3, 1) forwards;
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

@keyframes pulse {
  0%, 100% {
    transform: scale(1);
    box-shadow: 0 0 0 0 rgba(220, 38, 38, 0.4);
  }
  50% {
    transform: scale(1.05);
    box-shadow: 0 0 20px 5px rgba(220, 38, 38, 0.2);
  }
}

@keyframes shimmer {
  0%, 100% {
    transform: translateX(-100%);
  }
  50% {
    transform: translateX(100%);
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
