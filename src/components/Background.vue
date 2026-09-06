
<!-- ================================== -->
<!-- Background.vue - Fond clair, décoratif, façon en-tête de CV -->
<template>
  <div class="background-container">
    <!-- Orbes flottants doux (parallax au scroll) -->
    <div class="orbs" ref="orbsLayer1">
      <div class="orb orb-1"></div>
    </div>
    <div class="orbs" ref="orbsLayer2">
      <div class="orb orb-2"></div>
    </div>
    <div class="orbs" ref="orbsLayer3">
      <div class="orb orb-3"></div>
    </div>

    <!-- Grille subtile -->
    <div class="grid-overlay"></div>

    <!-- Ligne "gribouillis" décorative -->
    <svg class="squiggle" viewBox="0 0 300 200" fill="none">
      <path d="M10 100 C 60 20, 140 10, 180 50 S 280 120, 250 170"
            stroke="var(--primary)" stroke-width="2.5" stroke-linecap="round" />
    </svg>
  </div>
</template>

<script>
export default {
  name: 'BackgroundDecor',
  mounted() {
    this.onScroll = () => {
      const y = window.scrollY;
      if (this.$refs.orbsLayer1) this.$refs.orbsLayer1.style.transform = `translateY(${y * 0.15}px)`;
      if (this.$refs.orbsLayer2) this.$refs.orbsLayer2.style.transform = `translateY(${y * -0.1}px)`;
      if (this.$refs.orbsLayer3) this.$refs.orbsLayer3.style.transform = `translateY(${y * 0.08}px)`;
    };
    window.addEventListener('scroll', this.onScroll, { passive: true });
  },
  beforeUnmount() {
    window.removeEventListener('scroll', this.onScroll);
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
  pointer-events: none;
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
  filter: blur(70px);
  opacity: 0.35;
  animation: float 22s ease-in-out infinite;
}

.orb-1 {
  width: 420px;
  height: 420px;
  background: radial-gradient(circle, #f6a1a1, transparent 70%);
  top: -10%;
  left: -8%;
  animation-delay: 0s;
}

.orb-2 {
  width: 360px;
  height: 360px;
  background: radial-gradient(circle, #fcd9a1, transparent 70%);
  top: 45%;
  right: -8%;
  animation-delay: 6s;
}

.orb-3 {
  width: 300px;
  height: 300px;
  background: radial-gradient(circle, #dc2626, transparent 70%);
  bottom: -12%;
  left: 35%;
  opacity: 0.12;
  animation-delay: 12s;
}

@keyframes float {
  0%, 100% {
    transform: translate(0, 0) scale(1);
  }
  33% {
    transform: translate(40px, -60px) scale(1.08);
  }
  66% {
    transform: translate(-40px, 40px) scale(0.94);
  }
}

/* Grille subtile */
.grid-overlay {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-image:
    linear-gradient(rgba(23, 23, 26, 0.035) 1px, transparent 1px),
    linear-gradient(90deg, rgba(23, 23, 26, 0.035) 1px, transparent 1px);
  background-size: 56px 56px;
  opacity: 0.5;
  mask-image: radial-gradient(ellipse at center, black 0%, transparent 75%);
}

/* Gribouillis décoratif */
.squiggle {
  position: absolute;
  bottom: 6%;
  left: 4%;
  width: 160px;
  height: auto;
  opacity: 0.25;
}

@media (max-width: 768px) {
  .orb {
    filter: blur(50px);
  }

  .squiggle {
    width: 100px;
  }
}
</style>
