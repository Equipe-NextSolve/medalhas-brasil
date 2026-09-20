'use client'
import Messenger from "@/layout/ChatBot/Messenger";
import LoadingScreen from "@/layout/Loanding/Loanding";

import Carousel from "./Sections/Carousel/Carousel";
import BenefitsBar from "./Sections/BenefitsBar/BenefitsBar";
import Hero from "./Sections/Hero/ContentInitial";
import CardsMedal from "./Sections/Cards/CardsMedal";
import ContentEvent from "./Sections/Event/ContentEvent";
import CardsTrophy from "./Sections/Cards/CardsTrophy";
import CTA from "./Sections/CTA/CTA";

export default function HomeMain() {
  return (
    <LoadingScreen>
      <main>
        <Carousel />
        <BenefitsBar />
        <Hero />
        <CardsMedal />
        <ContentEvent />
        <CardsTrophy  />
        <CTA  />
        <Messenger />
      </main>
    </LoadingScreen>
  );
}