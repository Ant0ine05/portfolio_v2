
<!-- ================================== -->
<!-- Background.vue - Fond animé spectaculaire -->
<template>
  <div class="background-container">
    <!-- Gradient de base -->
    <div class="gradient-base"></div>
    
    <!-- Orbes flottants animés -->
    <div class="orbs">
      <div class="orb orb-1"></div>
      <div class="orb orb-2"></div>
      <div class="orb orb-3"></div>
      <div class="orb orb-4"></div>
    </div>

    <!-- Particules flottantes -->
    <div class="particles">
      <span v-for="n in 30" :key="n" class="particle"></span>
    </div>

    <!-- Lignes lumineuses -->
    <div class="light-lines">
      <div class="line line-1"></div>
      <div class="line line-2"></div>
      <div class="line line-3"></div>
    </div>

    <!-- Grille animée -->
    <div class="grid-overlay"></div>

    <!-- Cercles ondulants -->
    <div class="ripple-container">
      <div class="ripple ripple-1"></div>
      <div class="ripple ripple-2"></div>
      <div class="ripple ripple-3"></div>
    </div>

    <!-- Étoiles scintillantes -->
    <div class="stars">
      <span v-for="n in 50" :key="n" class="star" 
            :style="getStarStyle(n)"></span>
    </div>
  </div>
</template>

<script>
export default {
  name: 'App',
  methods: {
    getStarStyle() {
      return {
        left: Math.random() * 100 + '%',
        top: Math.random() * 100 + '%',
        animationDelay: Math.random() * 3 + 's',
        animationDuration: (Math.random() * 2 + 2) + 's'
      };
    }
  }
}
</script>

<style scoped>
.background-container {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  overflow: hidden;
  z-index: 1;
}

/* Gradient de base */
.gradient-base {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: radial-gradient(ellipse at top left, #1a0b2e 0%, #0f172a 50%, #000 100%);
}

/* Orbes flottants */
.orbs {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
}

.orb {
  position: absolute;
  border-radius: 50%;
  filter: blur(60px);
  opacity: 0.4;
  animation: float 20s ease-in-out infinite;
}

.orb-1 {
  width: 500px;
  height: 500px;
  background: radial-gradient(circle, #dc2626, transparent);
  top: -10%;
  left: -10%;
  animation-delay: 0s;
}

.orb-2 {
  width: 400px;
  height: 400px;
  background: radial-gradient(circle, #f59e0b, transparent);
  top: 50%;
  right: -10%;
  animation-delay: 5s;
}

.orb-3 {
  width: 350px;
  height: 350px;
  background: radial-gradient(circle, #b91c1c, transparent);
  bottom: -10%;
  left: 40%;
  animation-delay: 10s;
}

.orb-4 {
  width: 300px;
  height: 300px;
  background: radial-gradient(circle, #ef4444, transparent);
  top: 30%;
  left: 50%;
  animation-delay: 15s;
}

@keyframes float {
  0%, 100% {
    transform: translate(0, 0) scale(1) rotate(0deg);
  }
  33% {
    transform: translate(50px, -80px) scale(1.1) rotate(120deg);
  }
  66% {
    transform: translate(-50px, 50px) scale(0.9) rotate(240deg);
  }
}

/* Particules */
.particles {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
}

.particle {
  position: absolute;
  background: rgba(220, 38, 38, 0.6);
  border-radius: 50%;
  pointer-events: none;
  animation: particleFloat linear infinite;
}

.particle:nth-child(odd) {
  background: rgba(245, 158, 11, 0.6);
}

.particle {
  width: 4px;
  height: 4px;
  left: calc(var(--i) * 3.33%);
  animation-duration: calc(10s + var(--i) * 1s);
  animation-delay: calc(var(--i) * -0.5s);
}

.particle:nth-child(1) { --i: 1; }
.particle:nth-child(2) { --i: 2; }
.particle:nth-child(3) { --i: 3; }
.particle:nth-child(4) { --i: 4; }
.particle:nth-child(5) { --i: 5; }
.particle:nth-child(6) { --i: 6; }
.particle:nth-child(7) { --i: 7; }
.particle:nth-child(8) { --i: 8; }
.particle:nth-child(9) { --i: 9; }
.particle:nth-child(10) { --i: 10; }
.particle:nth-child(11) { --i: 11; }
.particle:nth-child(12) { --i: 12; }
.particle:nth-child(13) { --i: 13; }
.particle:nth-child(14) { --i: 14; }
.particle:nth-child(15) { --i: 15; }
.particle:nth-child(16) { --i: 16; }
.particle:nth-child(17) { --i: 17; }
.particle:nth-child(18) { --i: 18; }
.particle:nth-child(19) { --i: 19; }
.particle:nth-child(20) { --i: 20; }
.particle:nth-child(21) { --i: 21; }
.particle:nth-child(22) { --i: 22; }
.particle:nth-child(23) { --i: 23; }
.particle:nth-child(24) { --i: 24; }
.particle:nth-child(25) { --i: 25; }
.particle:nth-child(26) { --i: 26; }
.particle:nth-child(27) { --i: 27; }
.particle:nth-child(28) { --i: 28; }
.particle:nth-child(29) { --i: 29; }
.particle:nth-child(30) { --i: 30; }

@keyframes particleFloat {
  0% {
    top: 110%;
    opacity: 0;
    transform: translateX(0) scale(0);
  }
  10% {
    opacity: 1;
  }
  90% {
    opacity: 1;
  }
  100% {
    top: -10%;
    opacity: 0;
    transform: translateX(100px) scale(1);
  }
}

/* Lignes lumineuses */
.light-lines {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
}

.line {
  position: absolute;
  width: 2px;
  height: 100%;
  background: linear-gradient(180deg, 
    transparent 0%, 
    rgba(220, 38, 38, 0.5) 50%, 
    transparent 100%);
  animation: lineMove 15s ease-in-out infinite;
}

.line-1 {
  left: 20%;
  animation-delay: 0s;
}

.line-2 {
  left: 50%;
  animation-delay: 5s;
}

.line-3 {
  left: 80%;
  animation-delay: 10s;
}

@keyframes lineMove {
  0%, 100% {
    transform: translateY(-100%);
    opacity: 0;
  }
  50% {
    transform: translateY(0);
    opacity: 0.3;
  }
}

/* Grille animée */
.grid-overlay {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-image: 
    linear-gradient(rgba(220, 38, 38, 0.05) 1px, transparent 1px),
    linear-gradient(90deg, rgba(220, 38, 38, 0.05) 1px, transparent 1px);
  background-size: 50px 50px;
  animation: gridMove 20s linear infinite;
  opacity: 0.3;
}

@keyframes gridMove {
  0% {
    transform: translateY(0) scale(1);
  }
  100% {
    transform: translateY(50px) scale(1.05);
  }
}

/* Cercles ondulants */
.ripple-container {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 100%;
  height: 100%;
}

.ripple {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  border: 2px solid rgba(220, 38, 38, 0.3);
  border-radius: 50%;
  animation: ripple 8s ease-out infinite;
}

.ripple-1 {
  width: 300px;
  height: 300px;
  animation-delay: 0s;
}

.ripple-2 {
  width: 500px;
  height: 500px;
  animation-delay: 2s;
}

.ripple-3 {
  width: 700px;
  height: 700px;
  animation-delay: 4s;
}

@keyframes ripple {
  0% {
    transform: translate(-50%, -50%) scale(0.5);
    opacity: 0;
  }
  10% {
    opacity: 0.5;
  }
  100% {
    transform: translate(-50%, -50%) scale(2);
    opacity: 0;
  }
}

/* Étoiles scintillantes */
.stars {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
}

.star {
  position: absolute;
  width: 2px;
  height: 2px;
  background: rgba(255, 255, 255, 0.8);
  border-radius: 50%;
  box-shadow: 0 0 4px rgba(220, 38, 38, 0.8);
  animation: twinkle 3s ease-in-out infinite;
}

@keyframes twinkle {
  0%, 100% {
    opacity: 0.2;
    transform: scale(1);
  }
  50% {
    opacity: 1;
    transform: scale(1.5);
  }
}

/* Responsive */
@media (max-width: 768px) {
  .orb {
    filter: blur(40px);
  }
  
  .particle {
    width: 3px;
    height: 3px;
  }
}
</style>