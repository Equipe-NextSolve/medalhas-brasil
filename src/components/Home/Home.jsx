'use client'
import React from "react";
import Carousel from "./Carousel";
import ContentInitial from "./ContentInitial";
import ContentEvent from "./ContentEvent";
import CardsProduts from "./CardsProduts";

export default function HomeMain() {
  return (
    <main className="">
      <Carousel />
      <ContentInitial />
      <ContentEvent />
      <CardsProduts  />
    </main>
  );
}
