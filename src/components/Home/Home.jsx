'use client'
import Messenger from "@/layout/ChatBot/Messenger";
import LoadingScreen from "@/layout/Loanding/Loanding";
import Title from '@/utils/Title';
import Questions from "../Budget/Questions";
import CardsProduts from "./CardsProduts";
import Carousel from "./Carousel";
import ContentEvent from "./ContentEvent";
import ContentInitial from "./ContentInitial";

export default function HomeMain() {
  return (
    <LoadingScreen>
      <main>
        <Carousel />
        <ContentInitial />
        <ContentEvent />
        <CardsProduts />
        <div className="py-30 flex items-center justify-center">
          <Title label="Perguntas Frequentes" />
        </div>
        <Questions />
        <Messenger />
      </main>
    </LoadingScreen>
  );
}