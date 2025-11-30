"use client";
import * as React from "react";
import Autoplay from "embla-carousel-autoplay";
import { Card } from "@/components/ui/card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
  type CarouselApi,
} from "@/components/ui/carousel";
import { cn } from "@/lib/utils";
import { Countdown } from "./RegistrationSection";

export function HeroCarousel() {
  const plugin = React.useRef(
    Autoplay({ delay: 3000, stopOnInteraction: true })
  );

  const images = [
    "/home/hero-image.webp",
  ];

  const [api, setApi] = React.useState<CarouselApi>();
  const [current, setCurrent] = React.useState(0);
  const [count, setCount] = React.useState(0);

  React.useEffect(() => {
    if (!api) {
      return;
    }

    setCount(api.scrollSnapList().length);
    setCurrent(api.selectedScrollSnap());

    const onSelect = () => {
      setCurrent(api.selectedScrollSnap());
    };

    api.on("select", onSelect);
    api.on("reInit", onSelect);

    return () => {
      api.off("select", onSelect);
      api.off("reInit", onSelect);
    };
  }, [api]);

  const scrollTo = React.useCallback(
    (index: number) => {
      api?.scrollTo(index);
    },
    [api]
  );

  return (
    <Carousel
      setApi={setApi}
      className="w-full"
      plugins={[plugin.current]}
      onMouseEnter={plugin.current.stop}
      onMouseLeave={plugin.current.reset}
    >
      <CarouselContent className="">
        {images.map((imageUrl, index) => (
          <CarouselItem key={index} className="p-0">
           
            <Card
              style={{ backgroundImage: `url(${imageUrl})` }}
              className="h-[60vh] p-0 rounded-none border-none bg-cover bg-center flex justify-center items-center"
            >
               {index == 0 &&
              <Countdown></Countdown>
               }
            </Card>
            
          </CarouselItem>
        ))}
      </CarouselContent>
      <CarouselPrevious />
      <CarouselNext />

      <div className="absolute bottom-6 left-0 right-0 z-10 flex items-center justify-center gap-2">
        {Array.from({ length: count }).map((_, index) => (
          <button
            key={index}
            aria-label={`Go to slide ${index + 1}`}
            onClick={() => scrollTo(index)}
            className={cn(
              "h-2 w-2 rounded-full transition-all duration-300",
              current === index
                ? "w-4 bg-white"
                : "bg-white/50 hover:bg-white/75"
            )}
          />
        ))}
      </div>
    </Carousel>
  );
}