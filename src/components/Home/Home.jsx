'use client'
import Messenger from "@/layout/ChatBot/Messenger";
import LoadingScreen from "@/layout/Loanding/Loanding";

import Carousel from "./Sections/Carousel/Carousel";
import BenefitsBar from "./Sections/BenefitsBar/BenefitsBar";
import Hero from "./Sections/Hero/ContentInitial";

import Title from '@/utils/Title';
import Questions from "../Budget/Questions";
import CardsMedal from "./Sections/Cards/CardsMedal";
import ContentEvent from "./Sections/ContentEvent";
import CardsTrophy from "./Sections/Cards/CardsTrophy";

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
     
        <Messenger />
      </main>
    </LoadingScreen>
  );
}