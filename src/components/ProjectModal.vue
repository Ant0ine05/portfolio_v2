<template>
  <div>
    <!-- MODAL -->
    <transition name="modal">
      <div v-if="isOpen" class="modal-overlay" @click="closeModal">
        <div class="modal-content" @click.stop>
          <!-- Close Button -->
          <button class="close-btn" @click="closeModal">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <line x1="18" y1="6" x2="6" y2="18"></line>
              <line x1="6" y1="6" x2="18" y2="18"></line>
            </svg>
          </button>

          <!-- Main Grid -->
          <div class="modal-grid">
            <!-- Left Side - Carrousel -->
            <div class="modal-carousel-section">
              <div class="carousel-container">
                <div class="carousel-wrapper">
                  <transition name="slide" mode="out-in">
                    <img 
                      :key="currentImageIndex"
                      :src="currentImage"
                      :alt="`${project.title} - Image ${currentImageIndex + 1}`"
                      class="carousel-image"
                    />
                  </transition>
                </div>

                <!-- Carrousel Controls -->
                <div class="carousel-controls">
                  <button 
                    @click="prevImage"
                    class="carousel-btn prev"
                    :disabled="images.length <= 1"
                  >
                    ←
                  </button>
                  <span class="image-counter">
                    {{ currentImageIndex + 1 }} / {{ images.length }}
                  </span>
                  <button 
                    @click="nextImage"
                    class="carousel-btn next"
                    :disabled="images.length <= 1"
                  >
                    →
                  </button>
                </div>

                <!-- Thumbnails -->
                <div class="thumbnails" v-if="images.length > 1">
                  <div 
                    v-for="(img, index) in images"
                    :key="index"
                    class="thumbnail"
                    :class="{ active: index === currentImageIndex }"
                    @click="currentImageIndex = index"
                  >
                    <img :src="img" :alt="`Thumbnail ${index + 1}`" />
                  </div>
                </div>
              </div>
            </div>

            <!-- Right Side - Content -->
            <div class="modal-content-section">
              <!-- Header -->
              <div class="modal-header">
                <h1 class="modal-title">{{ project.title }}</h1>
                <p class="modal-subtitle">{{ project.category }}</p>
              </div>

              <!-- Description -->
              <div class="modal-description">
                <p>{{ project.fullDescription }}</p>
              </div>

              <!-- Technologies -->
              <div class="modal-technologies">
                <h3>Technologies utilisées</h3>
                <div class="tech-grid">
                  <span v-for="tech in project.technologies" :key="tech" class="tech-tag">
                    {{ tech }}
                  </span>
                </div>
              </div>

              <!-- Project Details -->
              <div class="modal-details">
                <div class="detail-item">
                  <span class="detail-label">📅 Durée</span>
                  <span class="detail-value">{{ project.duration }}</span>
                </div>
                <div class="detail-item">
                  <span class="detail-label">👥 Rôle</span>
                  <span class="detail-value">{{ project.role }}</span>
                </div>
                <div class="detail-item">
                  <span class="detail-label">🎯 Objectif</span>
                  <span class="detail-value">{{ project.objective }}</span>
                </div>
              </div>

              <!-- CTA Buttons -->
              <div class="modal-actions">
                <a v-if="project.link" :href="project.link" target="_blank" class="btn btn-primary">
                  Voir le site →
                </a>
                <a v-if="project.github" :href="project.github" target="_blank" class="btn btn-secondary">
                  Code GitHub
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </transition>
  </div>
</template>

<script>
export default {
  name: 'ProjectModal',
  props: {
    project: {
      type: Object,
      required: true
    }
  },
  data() {
    return {
      isOpen: false,
      currentImageIndex: 0
    };
  },
  mounted() {
    this.isOpen = true;
    console.log(this.project);
  },
  computed: {
    images() {
      return this.project?.images || [];
    },
    currentImage() {
      return this.images[this.currentImageIndex] || '';
    }
  },
  methods: {
    closeModal() {
      this.isOpen = false;
      document.body.style.overflow = 'auto';
      setTimeout(() => {
        this.$emit('close');
      }, 300);
    },
    nextImage() {
      if (this.currentImageIndex < this.images.length - 1) {
        this.currentImageIndex++;
      } else {
        this.currentImageIndex = 0;
      }
    },
    prevImage() {
      if (this.currentImageIndex > 0) {
        this.currentImageIndex--;
      } else {
        this.currentImageIndex = this.images.length - 1;
      }
    }
  },
  watch: {
    isOpen(newVal) {
      if (newVal) {
        document.body.style.overflow = 'hidden';
      }
    }
  }
};
</script>

<style scoped>
/* Modal Overlay */
.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.85);
  backdrop-filter: blur(8px);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 9999;
  padding: 20px;
}

.modal-content {
  background: linear-gradient(135deg, #111827 0%, #0f172a 100%);
  border: 1px solid rgba(220, 38, 38, 0.2);
  border-radius: 16px;
  max-width: 1200px;
  width: 100%;
  max-height: 90vh;
  overflow-y: auto;
  box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.5);
  position: relative;
}

/* Close Button */
.close-btn {
  position: absolute;
  top: 20px;
  right: 20px;
  background: rgba(220, 38, 38, 0.1);
  border: 1px solid rgba(220, 38, 38, 0.3);
  color: #dc2626;
  width: 40px;
  height: 40px;
  border-radius: 8px;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.3s;
  z-index: 10;
}

.close-btn:hover {
  background: rgba(220, 38, 38, 0.2);
  transform: rotate(90deg);
}

/* Modal Grid */
.modal-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 40px;
  padding: 40px;
}

/* Left Side - Carousel */
.modal-carousel-section {
  display: flex;
  flex-direction: column;
  gap: 20px;
}

.carousel-container {
  display: flex;
  flex-direction: column;
  gap: 15px;
}

.carousel-wrapper {
  width: 100%;
  aspect-ratio: 4/3;
  background: linear-gradient(135deg, rgba(220, 38, 38, 0.1), rgba(245, 158, 11, 0.1));
  border-radius: 12px;
  overflow: hidden;
  border: 1px solid rgba(220, 38, 38, 0.2);
  position: relative;
}

.carousel-image {
  width: 100%;
  height: 100%;
  object-fit: cover;
  display: block;
}

/* Carousel Controls */
.carousel-controls {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 20px;
  padding: 0 10px;
}

.carousel-btn {
  background: rgba(220, 38, 38, 0.1);
  border: 1px solid rgba(220, 38, 38, 0.3);
  color: #dc2626;
  width: 40px;
  height: 40px;
  border-radius: 8px;
  cursor: pointer;
  font-size: 20px;
  font-weight: bold;
  transition: all 0.3s;
}

.carousel-btn:hover:not(:disabled) {
  background: rgba(220, 38, 38, 0.2);
  transform: scale(1.1);
}

.carousel-btn:disabled {
  opacity: 0.3;
  cursor: not-allowed;
}

.image-counter {
  color: #9ca3af;
  font-size: 14px;
  font-weight: 600;
  min-width: 60px;
  text-align: center;
}

/* Thumbnails */
.thumbnails {
  display: flex;
  gap: 10px;
  overflow-x: auto;
  padding: 10px 0;
  -webkit-overflow-scrolling: touch;
}

.thumbnail {
  width: 80px;
  height: 80px;
  border-radius: 8px;
  overflow: hidden;
  cursor: pointer;
  border: 2px solid transparent;
  transition: all 0.3s;
  flex-shrink: 0;
  opacity: 0.6;
}

.thumbnail:hover {
  opacity: 1;
  transform: scale(1.05);
}

.thumbnail.active {
  border-color: #dc2626;
  opacity: 1;
}

.thumbnail img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

/* Right Side - Content */
.modal-content-section {
  display: flex;
  flex-direction: column;
  gap: 30px;
}

.modal-header {
  border-bottom: 2px solid rgba(220, 38, 38, 0.2);
  padding-bottom: 20px;
}

.modal-title {
  font-size: 2.2rem;
  font-weight: 700;
  color: #f9fafb;
  margin-bottom: 8px;
}

.modal-subtitle {
  color: #9ca3af;
  font-size: 1rem;
  font-weight: 500;
}

.modal-description {
  color: #d1d5db;
  line-height: 1.8;
  font-size: 1rem;
}

/* Technologies */
.modal-technologies {
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.modal-technologies h3 {
  color: #f9fafb;
  font-size: 1.1rem;
  font-weight: 600;
}

.tech-grid {
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
}

.tech-tag {
  background: rgba(220, 38, 38, 0.15);
  border: 1px solid rgba(220, 38, 38, 0.3);
  color: #ef4444;
  padding: 6px 14px;
  border-radius: 6px;
  font-size: 0.9rem;
  font-weight: 500;
  transition: all 0.3s;
}

.tech-tag:hover {
  background: rgba(220, 38, 38, 0.25);
  transform: translateY(-2px);
}

/* Details */
.modal-details {
  background: rgba(220, 38, 38, 0.05);
  border-left: 3px solid #dc2626;
  padding: 20px;
  border-radius: 8px;
  display: flex;
  flex-direction: column;
  gap: 15px;
}

.detail-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.detail-label {
  color: #9ca3af;
  font-weight: 600;
  font-size: 0.95rem;
}

.detail-value {
  color: #f9fafb;
  font-weight: 500;
}

/* Actions */
.modal-actions {
  display: flex;
  gap: 12px;
}

.btn {
  padding: 12px 24px;
  border-radius: 8px;
  text-decoration: none;
  font-weight: 600;
  font-size: 0.95rem;
  transition: all 0.3s;
  cursor: pointer;
  border: none;
  text-align: center;
  flex: 1;
}

.btn-primary {
  background: linear-gradient(135deg, #dc2626, #b91c1c);
  color: white;
  box-shadow: 0 4px 15px rgba(220, 38, 38, 0.3);
}

.btn-primary:hover {
  transform: translateY(-2px);
  box-shadow: 0 6px 20px rgba(220, 38, 38, 0.4);
}

.btn-secondary {
  background: transparent;
  color: #dc2626;
  border: 2px solid rgba(220, 38, 38, 0.3);
}

.btn-secondary:hover {
  border-color: #dc2626;
  background: rgba(220, 38, 38, 0.1);
}

.see-more-btn {
  background: transparent;
  color: #dc2626;
  border: none;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s;
  font-size: 1rem;
}

.see-more-btn:hover {
  color: #ef4444;
  gap: 8px;
}

/* Animations */
.modal-enter-active, .modal-leave-active {
  transition: all 0.3s ease;
}

.modal-enter-from, .modal-leave-to {
  opacity: 0;
}

.slide-enter-active, .slide-leave-active {
  transition: all 0.5s ease;
}

.slide-enter-from {
  transform: translateX(30px);
  opacity: 0;
}

.slide-leave-to {
  transform: translateX(-30px);
  opacity: 0;
}

/* Responsive */
@media (max-width: 900px) {
  .modal-grid {
    grid-template-columns: 1fr;
    gap: 30px;
    padding: 30px;
  }

  .modal-title {
    font-size: 1.8rem;
  }

  .modal-actions {
    flex-direction: column;
  }

  .close-btn {
    top: 15px;
    right: 15px;
  }
}

@media (max-width: 600px) {
  .modal-content {
    border-radius: 8px;
    max-height: 95vh;
  }

  .modal-grid {
    padding: 20px;
    gap: 20px;
  }

  .carousel-wrapper {
    aspect-ratio: 1;
  }

  .modal-title {
    font-size: 1.5rem;
  }

  .modal-description {
    font-size: 0.9rem;
  }
}
</style>