'use client'
import React from "react";
import Carousel from "./Carousel";
import ContentInitial from "./ContentInitial";
import ContentEvent from "./ContentEvent";
import CardsProduts from "./CardsProduts";
import Title from '@/utils/Title'
import Questions from "../Budget/Questions";
import Messenger from "@/utils/Messenger";
import LoadingScreen from "@/utils/Loanding";

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