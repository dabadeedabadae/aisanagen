<template>
  <section class="main-section">
    <section class="container main-content-container">
      <div class="center-box">
        <p class="center-box-subtitle">AI Sana Kozybayev University</p>
        <h1>Интеллектуальные AI-агенты для университета и города</h1>
        <p class="center-box-text">Новые возможности автоматизации — от диагностики пациентов до оптимизации городского транспорта и работы с документами</p>
      </div>
      <button class="more-btn">Подробнее</button>
    </section>
    <section class="agents-section" >
      <div class="container agents-container" id="ai-agents-section">
        <h2 class="section-title">Наши AI-агенты</h2>
        <div class="swiper-wrapper-container">
          <img src="/uploads/arrow-left.svg" class="custom-arrow prev" ref="prevEl" alt="prev" />
          <Swiper
              :slides-per-view="3"
              :space-between="30"
              :centered-slides="true"
              :loop="true"
              :navigation="{ prevEl: prevEl, nextEl: nextEl }"
              :modules="[Navigation]"
              :breakpoints="swiperBreakpoints"
              ref="swiperRef" class="agents-carousel"
          >
            <SwiperSlide v-for="(agent, index) in agents" :key="index">
              <div class="agent-card">
                <div class="agent-status" :class="agent.statusClass">{{ agent.status }}</div>
                <h3 class="agent-title">{{ agent.title }}</h3>
                <p class="agent-description">{{ agent.description }}</p>
                <ul class="agent-features">
                  <li v-for="(feature, idx) in agent.features" :key="idx">{{ feature }}</li>
                </ul>
                <button class="agent-btn">Перейти к проекту</button>
              </div>
            </SwiperSlide>
          </Swiper>
          <img src="/uploads/arrow-right.svg" class="custom-arrow next" ref="nextEl" alt="next" />
        </div>
      </div>
    </section>
    <section class="container about-section" id="about-program-section">
      <h2 class="section-title">О программе AI SANA</h2>
      <div class="about-content">
        <div class="about-text">
          <p>Программа AI SANA — инициатива Министерства науки и высшего образования для внедрения передовых технологий искусственного интеллекта в образование.</p>
          <p>Охватывает 100 000 студентов, стимулирует создание DeepTech-стартапов, развитие ИИ-компетенций и технологического предпринимательства.</p>
          <p>Проходит в 3 этапа: массовая подготовка (650 тыс студентов), изучение ML и AI бизнеса, акселерация 1.5 тыс стартапов с поддержкой экспертов Stanford, Imperial и King's College.</p>
        </div>
        <div class="about-image">
          <img src="/uploads/aisana.png" alt="AI SANA" />
        </div>
      </div>
    </section>
    <section class="container contacts-section" id="contacts-section">
      <h2 class="section-title">Контакты</h2>
      <p>По вопросам сотрудничества и участия в AI Sana пишите</p>
      <div class="social-links">
        <a href="https://facebook.com" target="_blank" class="social-link">
          <img src="/uploads/facebook.svg" alt="Facebook" />
        </a>
        <a href="https://instagram.com" target="_blank" class="social-link">
          <img src="/uploads/instagram.svg" alt="Instagram" />
        </a>
        <a href="https://youtube.com" target="_blank" class="social-link">
          <img src="/uploads/youtube.svg" alt="YouTube" />
        </a>
        <a href="https://github.com/vnikonv/aisana" target="_blank" class="social-link">
          <img src="/uploads/github.svg" alt="GitHub" />
        </a>
        <a href="mailto:mail@ku.edu.kz" class="social-link">
          <img src="/uploads/mail.svg" alt="Email" />
        </a>
      </div>
      <div class="team-grid">
        <div class="team-card" v-for="(member, index) in team" :key="index">
          <div class="team-content">
            <h3>{{ member.name }}</h3>
            <p>{{ member.phone }}</p>
          </div>
        </div>
      </div>
    </section>
    <footer class="main-footer">
      <div class="container footer-content">
        <p class="footer-text">© 2025 AISana, Kozybayev University. Разработка интеллектуальных решений для образования и города</p>
      </div>
    </footer>
  </section>
</template>

<style scoped>
.main-section {
  background: url('/uploads/background2.png') center top / cover no-repeat;
  background-attachment: scroll;
  min-height: 100vh;
  width: 100%;
  color: white;
  display: flex;
  flex-direction: column;
}
.container {
  max-width: 80%;
  margin: 0 auto;
  padding: 0 1rem;
  position: relative;
  z-index: 1;
  justify-content: center;
  align-items: center;
  text-align: center;
}
@media (max-width: 1200px) {
  .container {max-width: 90%;}
}
@media (max-width: 768px) {
  .container {max-width: 95%;}
}


.center-box {
  width: 100%;
  background: rgba(0, 0, 0, 0.6);
  border-radius: 20px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  text-align: center;
  color: white;
  margin: 0 auto;
  margin-top: 150px;
  padding: 40px;
  box-sizing: border-box;
  min-height: 300px;
}
.center-box h1 {
  font-size: 64px;
  margin: 20px 0;
}
.center-box p {
  font-size: 16px;
  line-height: 1.5;
  max-width: 800px;
}
@media (max-width: 992px) {
  .center-box h1 {font-size: 48px;}
}
@media (max-width: 768px) {
  .center-box {margin-top: 50px;padding: 30px 15px;min-height: 200px;}
  .center-box h1 {font-size: 32px;margin: 15px 0;}
  .center-box p {font-size: 14px;max-width: 95%;}
}
.more-btn {
  margin-top: 30px;
  background: linear-gradient(90deg,#02ffc0,#00bfff);
  border: none;
  padding: 12px 36px;
  font-size: 16px;
  font-weight: 700;
  border-radius: 30px;
  color: #000;
  cursor: pointer;
  transition: transform 0.3s ease;
}
.more-btn:hover {
  transform: translateY(-2px) scale(1.05);
}
.section-title{
  font-size: 48px;
}
.agents-section{
  max-width: 98%;
  margin: 130px auto 0;
  padding: 0 3rem;
  position: relative;
  z-index: 1;
  justify-content: center;
  align-items: center;
  text-align: center;
}
@media (max-width: 992px) {
  .section-title {font-size: 36px;}
  .agents-section {margin-top: 80px;}
}
@media (max-width: 768px) {
  .section-title {font-size: 28px;}
  .agents-section {max-width: 100%;margin-top: 60px;padding: 0;}
}
.swiper-wrapper-container {
  position: relative;
  padding-top: 120px;
  padding-bottom: 150px;
  padding-left: 100px;
  padding-right: 100px;
  overflow: visible;
}
.agents-section .container {
  overflow: visible;
}
.agents-carousel :deep(.swiper-wrapper) {
  overflow: visible !important;
  display: flex;
  align-items: center;
}
.agents-carousel :deep(.swiper-slide) {
  overflow: visible !important;
  padding: 60px 0;
  height: auto;
  display: flex;
  align-items: stretch;
  position: relative;
  z-index: 1;
}
.agents-carousel :deep(.swiper-slide-active) {
  z-index: 10 !important;
}
.agents-carousel :deep(.swiper-slide) > * {
  width: 100%;
}
.custom-arrow {
  width: 60px;
  height: 60px;
  cursor: pointer;
  position: absolute;
  top: 45%;
  transform: translateY(-50%);
  z-index: 10;
}
.custom-arrow.prev {
  left: -60px;
}
.custom-arrow.next {
  right: -60px;
}
@media (max-width: 768px) {
  .custom-arrow {display: none;}
  .swiper-wrapper-container {padding-bottom: 40px;padding-left: 0;padding-right: 0;}
  .agents-section {max-width: 100%;padding: 0 1rem;}
}
@media (max-width: 1200px) and (min-width: 769px) {
  .custom-arrow {width: 40px;height: 40px;}
  .custom-arrow.prev {left: -40px;}
  .custom-arrow.next {right: -40px;}
  .swiper-wrapper-container {padding-left: 80px;padding-right: 80px;}
  .agents-section {max-width: 97%;padding: 0 2rem;}
}
.agent-card {
  background: rgba(0,0,0,0.6);
  border-radius: 15px;
  padding: 30px 20px;
  text-align: left;
  width: 100%;
  max-width: 280px;
  min-height: 500px;
  display: flex;
  flex-direction: column;
  margin: 0 auto;
  transition: transform 0.4s ease, opacity 0.4s ease, filter 0.4s ease;
  box-shadow: 0 0 12px 2px #00bfff;
  box-sizing: border-box;
  position: relative;
  z-index: 1;
}
.agent-status {
  display: inline-block;
  padding: 6px 12px;
  border-radius: 20px;
  font-size: 12px;
  font-weight: 600;
  margin-bottom: 15px;
  text-align: center;
  width: fit-content;
}
.agent-status.status-testing {
  background: rgba(255, 193, 7, 0.3);
  color: #ffc107;
  border: 1px solid #ffc107;
}
.agent-status.status-deployed {
  background: rgba(40, 167, 69, 0.3);
  color: #28a745;
  border: 1px solid #28a745;
}
.agent-title {
  font-size: 24px;
  font-weight: 700;
  margin: 0 0 15px 0;
  color: #00bfff;
}
.agent-description {
  font-size: 14px;
  line-height: 1.5;
  margin: 0 0 20px 0;
  opacity: 0.9;
}
.agent-features {
  list-style: none;
  padding: 0;
  margin: 0 0 25px 0;
  flex-grow: 1;
}
.agent-features li {
  font-size: 13px;
  line-height: 1.8;
  padding-left: 20px;
  position: relative;
  margin-bottom: 8px;
  opacity: 0.85;
}
.agent-features li::before {
  content: '•';
  position: absolute;
  left: 0;
  color: #00bfff;
  font-weight: bold;
  font-size: 18px;
}
.agent-btn {
  background: linear-gradient(90deg, #02ffc0, #00bfff);
  border: none;
  padding: 12px 24px;
  font-size: 14px;
  font-weight: 600;
  border-radius: 25px;
  color: #000;
  cursor: pointer;
  transition: transform 0.3s ease, box-shadow 0.3s ease;
  width: 100%;
  margin-top: auto;
}
.agent-btn:hover {
  transform: translateY(-2px);
  box-shadow: 0 4px 15px rgba(0, 191, 255, 0.5);
}
@media (max-width: 768px) {
  .agent-card {width: 85%;min-height: 450px;padding: 25px 15px;max-width: none;}
  .agent-title {font-size: 20px;}
  .agent-features li {font-size: 12px;}
  .swiper-slide-active .agent-card {transform: scale(1.05);}
  .swiper-slide-prev .agent-card,
  .swiper-slide-next .agent-card {transform: scale(0.9);opacity: 0.7;filter: blur(0.5px);}
}
@media (max-width: 480px) {
  .agent-card {width: 90%;min-height: 400px;padding: 20px 12px;}
  .agent-title {font-size: 18px;}
  .agent-description {font-size: 13px;}
}
/* Базовые стили для всех карточек - маленькие и позади */
.agents-carousel :deep(.swiper-slide) {
  z-index: 1 !important;
}
.agents-carousel :deep(.swiper-slide .agent-card) {
  transform: scale(0.75) !important;
  opacity: 0.5 !important;
  z-index: 1 !important;
  filter: blur(2px) !important;
}

/* Центральная карточка - впереди и больше (переопределяет базовые стили) */
.agents-carousel :deep(.swiper-slide-active) {
  z-index: 10 !important;
}
.agents-carousel :deep(.swiper-slide-active .agent-card) {
  transform: scale(1.2) !important;
  z-index: 10 !important;
  box-shadow: 0 0 23px 5px #00bfff !important;
  opacity: 1 !important;
  filter: none !important;
}

/* Боковые карточки - позади и меньше */
.agents-carousel :deep(.swiper-slide-prev),
.agents-carousel :deep(.swiper-slide-next) {
  z-index: 1 !important;
}
.agents-carousel :deep(.swiper-slide-prev .agent-card),
.agents-carousel :deep(.swiper-slide-next .agent-card) {
  transform: scale(0.7) !important;
  opacity: 0.4 !important;
  z-index: 1 !important;
  filter: blur(2px) !important;
}
.about-section {
  max-width: 80%;
  margin: 60px auto 180px;
  padding: 0 1rem;
  position: relative;
  z-index: 1;
  color: white;
}
.contacts-section {
  max-width: 80%;
  margin: 60px auto 180px;
  padding: 0 1rem;
  position: relative;
  z-index: 1;
  color: white;
}
@media (max-width: 992px) {
  .about-section, .contacts-section {margin-bottom: 120px;}
}
@media (max-width: 768px) {
  .about-section, .contacts-section {margin-bottom: 80px;}
}
.about-content {
  background: rgba(0, 0, 0, 0.6);
  border-radius: 15px;
  display: flex;
  align-items: center;
  text-align: left;
  justify-content: space-between;
  gap: 50px;
  margin-top: 40px;
  flex-wrap: wrap;
  padding: 60px;
  max-width: 100%;
}
.about-text {
  flex: 0 0 40%;
  line-height: 1.6;
  text-indent: 2em;
}
.about-text p {
  margin-bottom: 1rem;
  font-size: 16px;
}
.about-image {
  flex: 0 0 55%;
}
.about-image img {
  width: 100%;
  height: auto;
  object-fit: cover;
}
@media (max-width: 900px) {
  .about-content {
    flex-direction: column;
    text-align: center;
    padding: 30px;
    gap: 30px;
  }
  .about-text, .about-image {
    flex: 0 0 100%;
    text-indent: 0;
  }
}
@media (max-width: 600px) {
  .about-content {padding: 20px;}
  .about-text p {font-size: 14px;}
}
.social-links {
  margin-top: 30px;
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 30px;
  flex-wrap: wrap;
}
.social-link img {
  width: 50px;
  height: 50px;
  transition: transform 0.3s ease, opacity 0.3s ease;
  cursor: pointer;
}
@media (max-width: 600px) {
  .social-link img {width: 40px;height: 40px;}
}
.social-link:hover img {
  transform: scale(1.15);
  opacity: 0.8;
}
.team-grid {
  margin-top: 40px;
  display: flex;
  justify-content: center;
  gap: 20px;
  flex-wrap: wrap;
  width: 100%;
}
.team-card {
  background: linear-gradient(90deg, #02ffc0, #00bfff);
  border-radius: 30px;
  padding: 5px;
  width: 200px;
  display: flex;
  justify-content: center;
  align-items: center;
  color: #000;
  font-weight: 700;
  text-align: center;
  cursor: pointer;
  transition: transform 0.3s ease, box-shadow 0.3s ease;
  box-shadow: 0 0 20px rgba(2, 141, 192, 0.5);
}
@media (max-width: 640px) {
  .team-card {width: 90%;max-width: 300px;}
}
@media (min-width: 641px) and (max-width: 900px) {
  .team-card {width: calc(50% - 15px);max-width: none;}
}
.team-card:hover {
  transform: translateY(-3px) scale(1.05);
  box-shadow: 0 0 35px rgba(2, 141, 192, 0.8);
}
.team-content h3 {
  margin-bottom: 8px;
  font-size: 18px;
}
.team-content p {
  font-size: 15px;
  opacity: 0.85;
}
.main-footer {
  background: rgba(0, 0, 0, 0.6);
  height: 59px;
  width: 100%;
  color: white;
  margin-top: auto;
  position: relative;
  z-index: 10;
}
.footer-content {
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: flex-start;
  text-align: left;
  max-width: 80%;
  padding-left: 1rem;
}
.footer-text {
  font-size: 16px;
  margin: 0;
  white-space: nowrap;
}
@media (max-width: 768px) {
  .main-footer {height: auto;padding: 15px 0;}
  .footer-content {justify-content: center;text-align: center;max-width: 95%;padding: 0 15px;}
  .footer-text {font-size: 14px;white-space: normal;}
}
</style>

<script setup lang="ts">
import { ref } from 'vue';
import { Swiper, SwiperSlide } from 'swiper/vue';
import { Navigation } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';

const agents = [
  {
    title: 'AI AntiFraud',
    status: 'На тестировании',
    statusClass: 'status-testing',
    description: 'Поведенческий скоринг для antifraud.',
    features: [
      'Точность ~99%',
      'SHAP, Gini, KS',
      'Ручная проверка ↓70%',
      'Обработка <30сек'
    ]
  },
  {
    title: 'CheckDoc',
    status: 'На тестировании',
    statusClass: 'status-testing',
    description: 'AI‑доктор для диагностики и рекомендаций.',
    features: [
      'Анализ симптомов за 5 минут',
      '1000+ пациентов в день',
      'Снижение затрат в 2 раза',
      'Точность до 90%'
    ]
  },
  {
    title: 'УниЭксперт',
    status: 'На тестировании',
    statusClass: 'status-testing',
    description: 'AI для поиска нормативных документов.',
    features: [
      'RAG‑архитектура',
      'Экономия времени на 70%',
      'Охват 80% сотрудников'
    ]
  },
  {
    title: 'AI для транспорта',
    status: 'На тестировании',
    statusClass: 'status-testing',
    description: 'Оптимизация городских маршрутов.',
    features: [
      'Анализ GPS‑данных и камер',
      'Топливо ↓на 10%',
      'Пассажиропоток ↑на 15%',
      'Маршруты в реальном времени'
    ]
  },
  {
    title: 'Антикоррупционный бот',
    status: 'Внедрен',
    statusClass: 'status-deployed',
    description: 'Чат‑бот по вопросам коррупции.',
    features: [
      'Уведомления и сценарии',
      'Обратная связь −50%',
      'Вовлечённость ×3',
      'Снижение рисков'
    ]
  }
];

const prevEl = ref<HTMLElement | null>(null);
const nextEl = ref<HTMLElement | null>(null);
const swiperRef = ref<any>(null);

const swiperBreakpoints = {
  0: {
    slidesPerView: 1,
    spaceBetween: 10,
  },
  768: {
    slidesPerView: 2,
    spaceBetween: 20,
  },
  1024: {
    slidesPerView: 3,
    spaceBetween: 30,
  },
};
const team = [
  { name: 'Леонтьева Оксана', phone: '+7 705 192 48 05' },
  { name: 'Елнұр Аяған', phone: '+7 701 765 4321' },
  { name: 'Камараев Тимур', phone: '+7 747 511 01 60' },
];

</script>