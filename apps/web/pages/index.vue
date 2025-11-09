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
              :centered-slides="true"
              :space-between="30"
              :loop="true"
              :navigation="{ prevEl: prevEl, nextEl: nextEl }"
              :modules="[Navigation]"
              :breakpoints="swiperBreakpoints"
              ref="swiperRef" class="agents-carousel"
          >
            <SwiperSlide v-for="(agent, index) in agents" :key="index">
              <div class="agent-card">{{ agent }}</div>
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
  max-width: 80%;
  margin: 130px auto 0;
  padding: 0 1rem;
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
  padding-top: 10px;
  padding-bottom: 80px;
  overflow: visible;
}
.agents-section .container {
  overflow: visible;
}
.agents-carousel :deep(.swiper-wrapper) {
  overflow: visible !important;
}
.agents-carousel :deep(.swiper-slide) {
  overflow: visible !important;
  padding: 30px 0;
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
  .swiper-wrapper-container {padding-bottom: 40px;}
}
@media (max-width: 1200px) and (min-width: 769px) {
  .custom-arrow {width: 40px;height: 40px;}
  .custom-arrow.prev {left: -40px;}
  .custom-arrow.next {right: -40px;}
}
.agent-card {
  background: rgba(0,0,0,0.6);
  border-radius: 5%;
  padding: 60px 20px;
  font-weight: 500;
  text-align: center;
  width: 250px;
  height: 300px;
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 0 auto;
  transition: transform 0.3s ease;
  box-shadow: 0 0 23px 4px #00bfff;
}
@media (max-width: 768px) {
  .agent-card {width: 80%;height: 250px;padding: 40px 15px;}
}
@media (max-width: 480px) {
  .agent-card {width: 90%;}
}
.swiper-slide-active .agent-card {
  z-index: 2;
}
.swiper-slide-prev .agent-card,
.swiper-slide-next .agent-card {
  transform: scale(0.9);
  opacity: 0.7;
  z-index: 1;
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

const agents = ['AI Агент 1', 'AI Агент 2', 'AI Агент 3', 'AI Агент 4', 'AI Агент 5'];

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
  1200: {
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