import * as React from "react"
import { ArrowLeft, ArrowRight } from "lucide-react"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"

// Simplified Carousel API
export type CarouselApi = {
  scrollPrev: () => void;
  scrollNext: () => void;
  scrollTo: (index: number) => void;
  canScrollPrev: () => boolean;
  canScrollNext: () => boolean;
  selectedScrollSnap: () => number;
  scrollSnapList: () => number[];
  on: (event: string, callback: () => void) => void;
  off: (event: string, callback: () => void) => void;
};

type CarouselProps = {
  opts?: {
    align?: string;
    loop?: boolean;
    axis?: string;
  };
  orientation?: "horizontal" | "vertical";
  setApi?: (api: CarouselApi) => void;
};

type CarouselContextProps = {
  carouselRef: React.RefObject<HTMLDivElement>;
  currentIndex: number;
  setCurrentIndex: React.Dispatch<React.SetStateAction<number>>;
  scrollPrev: () => void;
  scrollNext: () => void;
  scrollTo: (index: number) => void;
  canScrollPrev: boolean;
  canScrollNext: boolean;
  totalSlides: number;
} & CarouselProps;

const CarouselContext = React.createContext<CarouselContextProps | null>(null);

function useCarousel() {
  const context = React.useContext(CarouselContext);

  if (!context) {
    throw new Error("useCarousel must be used within a <Carousel />");
  }

  return context;
}

const Carousel = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement> & CarouselProps
>(
  (
    {
      orientation = "horizontal",
      opts = { align: "center", loop: false },
      setApi,
      className,
      children,
      ...props
    },
    ref
  ) => {
    const carouselRef = React.useRef<HTMLDivElement>(null);
    const [currentIndex, setCurrentIndex] = React.useState(0);
    const [totalSlides, setTotalSlides] = React.useState(0);
    const [canScrollPrev, setCanScrollPrev] = React.useState(false);
    const [canScrollNext, setCanScrollNext] = React.useState(true);

    React.useEffect(() => {
      if (carouselRef.current) {
        const slides = carouselRef.current.querySelectorAll('[role="group"]');
        setTotalSlides(slides.length);
      }
    }, [children]);

    React.useEffect(() => {
      setCanScrollPrev(currentIndex > 0);
      setCanScrollNext(currentIndex < totalSlides - 1);
    }, [currentIndex, totalSlides]);

    // Simple API implementation
    React.useEffect(() => {
      if (!setApi) return;
      
      const api: CarouselApi = {
        scrollPrev: () => {
          if (currentIndex > 0) {
            setCurrentIndex(prev => prev - 1);
          } else if (opts.loop) {
            setCurrentIndex(totalSlides - 1);
          }
        },
        scrollNext: () => {
          if (currentIndex < totalSlides - 1) {
            setCurrentIndex(prev => prev + 1);
          } else if (opts.loop) {
            setCurrentIndex(0);
          }
        },
        scrollTo: (index: number) => {
          if (index >= 0 && index < totalSlides) {
            setCurrentIndex(index);
          }
        },
        canScrollPrev: () => currentIndex > 0 || opts.loop,
        canScrollNext: () => currentIndex < totalSlides - 1 || opts.loop,
        selectedScrollSnap: () => currentIndex,
        scrollSnapList: () => Array.from({ length: totalSlides }, (_, i) => i),
        on: (_event: string, _callback: () => void) => {},
        off: (_event: string, _callback: () => void) => {}
      };
      
      setApi(api);
    }, [currentIndex, totalSlides, setApi, opts.loop]);

    const scrollPrev = React.useCallback(() => {
      if (currentIndex > 0) {
        setCurrentIndex(prev => prev - 1);
      } else if (opts.loop) {
        setCurrentIndex(totalSlides - 1);
      }
    }, [currentIndex, totalSlides, opts.loop]);

    const scrollNext = React.useCallback(() => {
      if (currentIndex < totalSlides - 1) {
        setCurrentIndex(prev => prev + 1);
      } else if (opts.loop) {
        setCurrentIndex(0);
      }
    }, [currentIndex, totalSlides, opts.loop]);

    const scrollTo = React.useCallback((index: number) => {
      if (index >= 0 && index < totalSlides) {
        setCurrentIndex(index);
      }
    }, [totalSlides]);

    const handleKeyDown = React.useCallback(
      (event: React.KeyboardEvent<HTMLDivElement>) => {
        if (event.key === "ArrowLeft") {
          event.preventDefault();
          scrollPrev();
        } else if (event.key === "ArrowRight") {
          event.preventDefault();
          scrollNext();
        }
      },
      [scrollPrev, scrollNext]
    );

    return (
      <CarouselContext.Provider
        value={{
          carouselRef,
          currentIndex,
          setCurrentIndex,
          opts,
          orientation,
          scrollPrev,
          scrollNext,
          scrollTo,
          canScrollPrev,
          canScrollNext,
          totalSlides
        }}
      >
        <div
          ref={ref}
          onKeyDownCapture={handleKeyDown}
          className={cn("relative", className)}
          role="region"
          aria-roledescription="carousel"
          {...props}
        >
          {children}
        </div>
      </CarouselContext.Provider>
    );
  }
);
Carousel.displayName = "Carousel";

const CarouselContent = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => {
  const { carouselRef, currentIndex, orientation } = useCarousel();

  return (
    <div ref={carouselRef} className="overflow-hidden">
      <div
        ref={ref}
        className={cn(
          "flex transition-transform duration-300 ease-in-out",
          orientation === "horizontal" ? "-ml-4" : "-mt-4 flex-col",
          className
        )}
        style={{
          transform: orientation === "horizontal" 
            ? `translateX(-${currentIndex * 100}%)` 
            : `translateY(-${currentIndex * 100}%)`
        }}
        {...props}
      />
    </div>
  );
});
CarouselContent.displayName = "CarouselContent";

const CarouselItem = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => {
  const { orientation } = useCarousel();

  return (
    <div
      ref={ref}
      role="group"
      aria-roledescription="slide"
      className={cn(
        "min-w-0 shrink-0 grow-0 basis-full",
        orientation === "horizontal" ? "pl-4" : "pt-4",
        className
      )}
      {...props}
    />
  );
});
CarouselItem.displayName = "CarouselItem";

const CarouselPrevious = React.forwardRef<
  HTMLButtonElement,
  React.ComponentProps<typeof Button>
>(({ className, variant = "outline", size = "icon", ...props }, ref) => {
  const { orientation, scrollPrev, canScrollPrev } = useCarousel();

  return (
    <Button
      ref={ref}
      variant={variant}
      size={size}
      className={cn(
        "absolute h-8 w-8 rounded-full",
        orientation === "horizontal"
          ? "-left-12 top-1/2 -translate-y-1/2"
          : "-top-12 left-1/2 -translate-x-1/2 rotate-90",
        className
      )}
      disabled={!canScrollPrev}
      onClick={scrollPrev}
      {...props}
    >
      <ArrowLeft className="h-4 w-4" />
      <span className="sr-only">Previous slide</span>
    </Button>
  );
});
CarouselPrevious.displayName = "CarouselPrevious";

const CarouselNext = React.forwardRef<
  HTMLButtonElement,
  React.ComponentProps<typeof Button>
>(({ className, variant = "outline", size = "icon", ...props }, ref) => {
  const { orientation, scrollNext, canScrollNext } = useCarousel();

  return (
    <Button
      ref={ref}
      variant={variant}
      size={size}
      className={cn(
        "absolute h-8 w-8 rounded-full",
        orientation === "horizontal"
          ? "-right-12 top-1/2 -translate-y-1/2"
          : "-bottom-12 left-1/2 -translate-x-1/2 rotate-90",
        className
      )}
      disabled={!canScrollNext}
      onClick={scrollNext}
      {...props}
    >
      <ArrowRight className="h-4 w-4" />
      <span className="sr-only">Next slide</span>
    </Button>
  );
});
CarouselNext.displayName = "CarouselNext";

export {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselPrevious,
  CarouselNext,
};
