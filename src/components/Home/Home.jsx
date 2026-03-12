'use client'
import React from "react";
import Carousel from "./Carousel";
import ContentInitial from "./ContentInitial";
import ContentEvent from "./ContentEvent";

export default function HomeMain() {
  return (
    <main className="min-h-screen flex-1">
      <Carousel />
      <ContentInitial />
      <ContentEvent />
    </main>
  );
}
