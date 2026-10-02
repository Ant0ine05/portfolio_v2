<template>
  <section id="portfolio" class="projects">
    <div class="pin" ref="pin">
      <div class="container head">
        <SectionHeading index="04" label="Projets" title="Projets sélectionnés." highlight="sélectionnés." />
        <div class="meta">
          <span class="counter">
            <strong>{{ String(current).padStart(2, '0') }}</strong> / {{ String(projets.length).padStart(2, '0') }}
          </span>
          <span class="bar"><span :style="{ transform: `scaleX(${progress})` }"></span></span>
        </div>
      </div>

      <div class="track" ref="track">
        <article
          v-for="(p, i) in projets"
          :key="p.NAME"
          class="p-card"
          data-cursor="Voir"
          tabindex="0"
          role="button"
          :aria-label="'Voir le projet ' + p.NAME"
          @click="openProject(p)"
          @keydown.enter="openProject(p)"
        >
          <div class="p-media">
            <img :src="'assets/' + p.IMAGES[0]" :alt="p.NAME" loading="lazy">
            <span class="p-num">{{ String(i + 1).padStart(2, '0') }}</span>
          </div>
          <div class="p-info">
            <span class="p-cat">{{ p.CATEGORY }}</span>
            <h3>{{ p.NAME }}</h3>
            <p>{{ p.DESCRIPTION }}</p>
            <div class="p-foot">
              <div class="pills">
                <span v-for="tag in p.LANGAGUES" :key="tag" class="pill">{{ tag }}</span>
              </div>
              <span class="p-arrow" aria-hidden="true">→</span>
            </div>
          </div>
        </article>

        <a :href="githubUrl" target="_blank" rel="noopener" class="p-end" data-cursor="GitHub">
          <span class="p-end-label">Envie d'en voir plus ?</span>
          <span class="p-end-title">Tout mon code<br>sur GitHub <span class="arrow">↗</span></span>
        </a>
      </div>
    </div>

    <ProjectModal v-if="selectedProject !== null" :project="selectedProject" @close="closeModal" />
  </section>
</template>

<script>
import { gsap } from 'gsap';
import SectionHeading from './SectionHeading.vue';
import ProjectModal from './ProjectModal.vue';
import { profile } from '../data/portfolio';

export default {
  name: 'ProjectsSection',
  components: { SectionHeading, ProjectModal },
  props: { projets: { type: Array, required: true } },
  data() {
    return {
      selectedProject: null,
      progress: 0,
      current: 1,
      githubUrl: profile.github
    };
  },
  mounted() {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    this.mm = gsap.matchMedia();
    const { pin, track } = this.$refs;
    const cards = track.querySelectorAll('.p-card, .p-end');

    // Desktop : scroll horizontal épinglé
    this.mm.add('(min-width: 1000px)', () => {
      const distance = () => track.scrollWidth - window.innerWidth;
      const tween = gsap.to(track, {
        x: () => -distance(),
        ease: 'none',
        scrollTrigger: {
          trigger: pin,
          pin: true,
          start: 'top top',
          end: () => '+=' + distance(),
          scrub: 1,
          invalidateOnRefresh: true,
          onUpdate: (self) => {
            this.progress = self.progress;
            this.current = Math.min(this.projets.length, Math.floor(self.progress * this.projets.length) + 1);
          }
        }
      });

      // Parallax des images à l'intérieur des cartes
      track.querySelectorAll('.p-media img').forEach((img) => {
        gsap.fromTo(img, { xPercent: -8 }, {
          xPercent: 8,
          ease: 'none',
          scrollTrigger: {
            trigger: img.parentElement,
            containerAnimation: tween,
            start: 'left right',
            end: 'right left',
            scrub: true
          }
        });
      });

      gsap.from(cards, {
        x: 200,
        opacity: 0,
        duration: 1.3,
        stagger: 0.08,
        ease: 'expo.out',
        clearProps: 'transform,opacity',
        scrollTrigger: { trigger: pin, start: 'top 60%', once: true }
      });
    });

    // Mobile / tablette : simple apparition au scroll
    this.mm.add('(max-width: 999px)', () => {
      cards.forEach((card) => {
        gsap.from(card, {
          y: 60,
          opacity: 0,
          duration: 1,
          ease: 'expo.out',
          clearProps: 'transform,opacity',
          scrollTrigger: { trigger: card, start: 'top 90%', once: true }
        });
      });
    });
  },
  beforeUnmount() {
    if (this.mm) this.mm.revert();
  },
  methods: {
    openProject(projectItem) {
      let githubUrl = null;
      let webLink = null;

      if (projectItem.LINK) {
        if (projectItem.LINK.GITHUB && projectItem.NAMEGIT) {
          githubUrl = `${profile.github}/${projectItem.NAMEGIT}`;
        }
        if (projectItem.LINK.LINK?.VALUE && projectItem.LINK.LINK?.HREF) {
          webLink = projectItem.LINK.LINK.HREF;
        }
      }

      this.selectedProject = {
        title: projectItem.NAME,
        category: projectItem.CATEGORY || 'Développement Web',
        shortDescription: projectItem.DESCRIPTION,
        fullDescription: projectItem.DESCRIPTIONMODAL || projectItem.DESCRIPTION,
        images: projectItem.IMAGES.map((img) => 'assets/' + img),
        technologies: projectItem.LANGAGUES || [],
        link: webLink,
        github: githubUrl
      };
    },
    closeModal() {
      this.selectedProject = null;
    }
  }
};
</script>

<style scoped>
.projects {
  padding-top: clamp(5rem, 12vw, 9rem);
}

.pin {
  display: flex;
  flex-direction: column;
  justify-content: center;
  overflow: hidden;
}

.head {
  position: relative;
}

.head :deep(.section-heading) {
  margin-bottom: 2rem;
}

.meta {
  display: flex;
  align-items: center;
  gap: 1.2rem;
  margin-bottom: 2.5rem;
}

.counter {
  font-size: 0.9rem;
  font-weight: 600;
  color: var(--text-secondary);
  font-variant-numeric: tabular-nums;
}

.counter strong {
  color: var(--ink);
  font-weight: 800;
}

.bar {
  flex: 0 0 160px;
  height: 3px;
  border-radius: 3px;
  background: var(--border);
  overflow: hidden;
}

.bar span {
  display: block;
  height: 100%;
  background: var(--primary);
  transform-origin: left;
  transform: scaleX(0);
}

.track {
  display: flex;
  gap: 1.5rem;
  width: max-content;
  padding: 0 var(--padding) 1rem calc((100vw - min(100vw, var(--container-width))) / 2 + var(--padding));
  will-change: transform;
}

.p-card {
  position: relative;
  flex: 0 0 auto;
  width: clamp(320px, min(34vw, 58vh), 520px);
  display: flex;
  flex-direction: column;
  background: var(--bg-card);
  border: 1px solid var(--border);
  border-radius: var(--radius-lg);
  box-shadow: var(--shadow-card);
  overflow: hidden;
  cursor: pointer;
  transition: box-shadow 0.5s var(--ease-out), transform 0.5s var(--ease-out);
}

.p-card:hover {
  box-shadow: var(--shadow-card-hover);
  transform: translateY(-8px);
}

.p-media {
  position: relative;
  aspect-ratio: 16 / 10;
  overflow: hidden;
  background: var(--bg-highlight);
}

.p-media img {
  width: 120%;
  max-width: none;
  height: 100%;
  margin-left: -10%;
  object-fit: cover;
  transition: transform 0.9s var(--ease-out), filter 0.9s var(--ease-out);
}

.p-card:hover .p-media img {
  transform: scale(1.06);
}

.p-num {
  position: absolute;
  top: 1rem;
  left: 1rem;
  padding: 0.35rem 0.75rem;
  border-radius: 999px;
  background: rgba(23, 23, 26, 0.75);
  color: #fff;
  font-size: 0.78rem;
  font-weight: 700;
  backdrop-filter: blur(6px);
}

.p-info {
  flex: 1;
  display: flex;
  flex-direction: column;
  padding: 1.6rem 1.7rem 1.7rem;
}

.p-cat {
  font-size: 0.72rem;
  font-weight: 700;
  letter-spacing: 0.14em;
  text-transform: uppercase;
  color: var(--primary);
  margin-bottom: 0.5rem;
}

.p-info h3 {
  font-size: 1.55rem;
  font-weight: 800;
  letter-spacing: -0.03em;
  line-height: 1.15;
  margin-bottom: 0.6rem;
}

.p-info p {
  color: var(--text-secondary);
  font-size: 0.95rem;
  margin-bottom: 1.4rem;
}

.p-foot {
  display: flex;
  align-items: flex-end;
  justify-content: space-between;
  gap: 1rem;
  margin-top: auto;
}

.pills {
  display: flex;
  flex-wrap: wrap;
  gap: 0.4rem;
}

.p-arrow {
  flex-shrink: 0;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 46px;
  height: 46px;
  border-radius: 50%;
  background: var(--ink);
  color: #fff;
  font-size: 1.1rem;
  transition: background 0.4s, transform 0.5s var(--ease-out);
}

.p-card:hover .p-arrow {
  background: var(--primary);
  transform: rotate(-45deg);
}

.p-end {
  flex: 0 0 auto;
  width: clamp(280px, 26vw, 380px);
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  padding: 2rem;
  border-radius: var(--radius-lg);
  background: var(--primary);
  color: #fff;
  text-decoration: none;
  transition: background 0.4s;
}

.p-end:hover {
  background: var(--ink);
}

.p-end-label {
  font-size: 0.85rem;
  font-weight: 600;
  opacity: 0.8;
}

.p-end-title {
  font-size: clamp(1.8rem, 2.6vw, 2.4rem);
  font-weight: 800;
  line-height: 1.1;
  letter-spacing: -0.03em;
}

.p-end-title .arrow {
  display: inline-block;
  transition: transform 0.4s var(--ease-out);
}

.p-end:hover .arrow {
  transform: translate(4px, -4px);
}

@media (min-width: 1000px) {
  .pin {
    height: 100vh;
    padding-top: 70px;
  }

  .projects {
    padding-top: 0;
  }
}

@media (max-width: 999px) {
  .meta {
    display: none;
  }

  .track {
    width: auto;
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    padding: 0 var(--padding) clamp(5rem, 12vw, 9rem);
    max-width: var(--container-width);
    margin: 0 auto;
  }

  .p-card,
  .p-end {
    width: auto;
  }

  .p-end {
    min-height: 220px;
  }
}

@media (max-width: 640px) {
  .track {
    grid-template-columns: 1fr;
  }
}
</style>
