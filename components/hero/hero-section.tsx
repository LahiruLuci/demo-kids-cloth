"use client";

import { useState, useEffect, useCallback, useRef } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { heroSlides } from "@/data/hero-slides";
import { cn } from "@/lib/utils";

const AUTOPLAY_INTERVAL = 7000;
const REDUCED_MOTION_MEDIA = "(prefers-reduced-motion: reduce)";
const SLIDE_TRANSITION = 0.85;
const cardWidth = 300;
const cardHeight = 380;
const cardGap = 24;
const viewportWidth = cardWidth + cardGap + cardWidth / 2;
const viewportHeight = 420;
const STEP = cardWidth + cardGap;

export default function HeroSection() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [direction, setDirection] = useState(1);
  const [isPaused, setIsPaused] = useState(false);
  const [isReducedMotion, setIsReducedMotion] = useState(() => {
    if (typeof window === "undefined") return false;
    return window.matchMedia(REDUCED_MOTION_MEDIA).matches;
  });
  const [isMobile, setIsMobile] = useState(false);
  const [isAnimating, setIsAnimating] = useState(false);
  const autoplayRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const goNextRef = useRef<() => void>(() => undefined);
  const containerRef = useRef<HTMLElement>(null);
  const isTransitioningRef = useRef(false);

  const activeSlide = heroSlides[activeIndex];
  const previousIndex = (activeIndex - 1 + heroSlides.length) % heroSlides.length;
  const nextIndex = (activeIndex + 1) % heroSlides.length;
  const previousProduct = heroSlides[previousIndex];
  const currentProduct = heroSlides[activeIndex];
  const nextProduct = heroSlides[nextIndex];

  useEffect(() => {
    const motionQuery = window.matchMedia(REDUCED_MOTION_MEDIA);
    const mobileQuery = window.matchMedia("(max-width: 767px)");

    const motionHandler = (event: MediaQueryListEvent) => {
      setIsReducedMotion(event.matches);
    };

    const mobileHandler = (event: MediaQueryListEvent) => {
      setIsMobile(event.matches);
    };

    motionQuery.addEventListener("change", motionHandler);
    mobileQuery.addEventListener("change", mobileHandler);

    return () => {
      motionQuery.removeEventListener("change", motionHandler);
      mobileQuery.removeEventListener("change", mobileHandler);
    };
  }, []);

  const goTo = useCallback((index: number, nextDirection: 1 | -1) => {
    if (isTransitioningRef.current) return;
    isTransitioningRef.current = true;
    setIsAnimating(true);
    setDirection(nextDirection);
    setActiveIndex((index + heroSlides.length) % heroSlides.length);
  }, []);

  const goNext = useCallback(() => {
    goTo(activeIndex + 1, 1);
  }, [activeIndex, goTo]);

  useEffect(() => {
    goNextRef.current = goNext;
  }, [goNext]);

  const goPrev = useCallback(() => {
    goTo(activeIndex - 1, -1);
  }, [activeIndex, goTo]);

  useEffect(() => {
    if (autoplayRef.current) clearInterval(autoplayRef.current);
    if (isPaused) return;

    autoplayRef.current = setInterval(() => goNextRef.current(), AUTOPLAY_INTERVAL);
    return () => {
      if (autoplayRef.current) clearInterval(autoplayRef.current);
    };
  }, [isPaused]);

  const handleProductClick = (index: number) => {
    if (isTransitioningRef.current) return;
    if (index === activeIndex) return;

    const stepsForward = (index - activeIndex + heroSlides.length) % heroSlides.length;
    const stepsBackward = (activeIndex - index + heroSlides.length) % heroSlides.length;
    const nextDirection = stepsForward <= stepsBackward ? 1 : -1;

    goTo(index, nextDirection);
  };

  const productSlots = [
    { slide: previousProduct, slot: "previous", x: -STEP },
    { slide: currentProduct, slot: "current", x: 0 },
    { slide: nextProduct, slot: "next", x: STEP },
  ];

  return (
    <section
      ref={containerRef}
      className="relative h-[100dvh] min-h-[600px] w-full overflow-hidden bg-neutral-950 max-md:h-[100svh] max-md:min-h-0"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
      aria-label="Hero carousel"
    >
      {/* Background Carousel */}
      <div className="absolute inset-0 max-md:bottom-auto max-md:h-[100svh]" aria-hidden="true">
        <AnimatePresence mode="wait" custom={direction}>
          <motion.div
            key={activeSlide.id}
            className="absolute inset-0"
            custom={direction}
            initial={{ opacity: 0, x: direction * 80 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: direction * -80 }}
            transition={
              isReducedMotion
                ? { duration: 0.01 }
                : { duration: SLIDE_TRANSITION, ease: [0.22, 1, 0.36, 1] as const }
            }
          >
            <motion.div
              className="absolute inset-0"
              initial={isReducedMotion ? false : { scale: 1 }}
              animate={
                isReducedMotion
                  ? {}
                  : { scale: 1.05 }
              }
              transition={
                isReducedMotion
                  ? {}
                  : { duration: 10, ease: "linear" }
              }
            >
              <Image
                src={
                  isMobile && activeSlide.mobileBackgroundImage
                    ? activeSlide.mobileBackgroundImage
                    : activeSlide.backgroundImage
                }
                alt=""
                fill
                priority={activeIndex === 0}
                sizes="100vw"
                className="object-cover object-center"
                style={{
                  objectPosition: isMobile && activeSlide.mobileObjectPosition
                    ? activeSlide.mobileObjectPosition
                    : (activeSlide.objectPosition || "center 30%"),
                }}
              />
            </motion.div>
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Gradient Overlay */}
      <div
        className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/40 to-black/10 max-lg:from-black/75 max-lg:via-black/50 max-lg:to-black/20 max-md:bottom-auto max-md:h-[100svh] max-md:bg-gradient-to-b max-md:from-black/65 max-md:via-black/35 max-md:to-black/10"
        aria-hidden="true"
      />

      {/* Content */}
      <div className="relative z-10 flex h-full flex-col justify-end max-md:h-auto max-md:justify-start">
        <div className="mx-auto flex w-full max-w-7xl max-md:min-h-[100svh] max-md:items-start max-md:justify-center max-md:px-5 max-md:pb-10 max-md:pt-[clamp(96px,18svh,140px)] px-6 pb-28 pt-32 md:px-10 md:pb-36 lg:px-16 lg:pb-40">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeSlide.id}
              initial="hidden"
              animate="visible"
              exit="hidden"
              transition={{ staggerChildren: 0.08, delayChildren: 0.05 }}
              className="max-w-2xl"
            >
              <motion.p
                variants={textVariants}
                  className="mb-3 text-[clamp(0.6875rem,2.8vw,0.8125rem)] font-semibold uppercase tracking-[0.15em] !text-white/75 md:mb-4 md:text-sm md:tracking-widest"
              >
                {activeSlide.eyebrow}
              </motion.p>

              <motion.h1
                variants={textVariants}
                  className="max-w-[19rem] font-display text-[clamp(2.5rem,11vw,3.5rem)] font-medium leading-[0.95] tracking-tight !text-white sm:text-5xl md:max-w-none md:text-6xl lg:text-7xl"
                style={{ lineHeight: 0.95 }}
              >
                {activeSlide.title.split("\n").map((line, i) => (
                  <span key={i} className="block">
                    {line}
                  </span>
                ))}
              </motion.h1>

              <motion.p
                variants={textVariants}
                  className="mt-4 max-w-[320px] text-[clamp(0.9375rem,4vw,1.0625rem)] leading-[1.55] !text-white/88 md:mt-5 md:max-w-md md:text-lg"
              >
                {activeSlide.description}
              </motion.p>

              <motion.div variants={textVariants} className="mt-6 md:mt-8">
                <a
                  href={activeSlide.ctaHref}
                  className="inline-flex h-[50px] items-center gap-2 rounded-full bg-white px-6 text-[13px] font-semibold text-neutral-900 transition-transform hover:scale-[1.03] active:scale-[0.98] md:h-auto md:px-7 md:py-3.5 md:text-sm"
                >
                  {activeSlide.ctaLabel}
                </a>
              </motion.div>
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Product Rail - Desktop */}
        <div
          className="absolute bottom-6 right-6 hidden origin-bottom-right overflow-hidden md:block max-xl:scale-[0.82]"
          style={{ width: viewportWidth, height: viewportHeight }}
          aria-label="Featured products"
        >
          <AnimatePresence initial={false} custom={direction}>
            {productSlots.map(({ slide, slot, x }) => {
              const isCurrent = slot === "current";
              const initialX = direction === 1 ? STEP * 2 : -STEP * 2;
              const exitX = direction === 1 ? -STEP * 2 : STEP * 2;

              return (
                <motion.button
                  key={slide.id}
                  initial={{ x: initialX }}
                  animate={{ x }}
                  exit={{ x: exitX }}
                  transition={{
                    duration: isReducedMotion ? 0.01 : SLIDE_TRANSITION,
                    ease: [0.22, 1, 0.36, 1] as const,
                  }}
                  onAnimationComplete={
                    isCurrent
                      ? () => {
                          isTransitioningRef.current = false;
                          setIsAnimating(false);
                        }
                      : undefined
                  }
                  onClick={() => handleProductClick(heroSlides.indexOf(slide))}
                  disabled={isAnimating && !isCurrent}
                  className={cn(
                    "group absolute bottom-0 left-0 flex flex-col items-center",
                    isCurrent ? "opacity-100" : "opacity-70 hover:opacity-90"
                  )}
                  aria-label={`View ${slide.product.name}`}
                  aria-pressed={isCurrent}
                  style={{ width: cardWidth, height: cardHeight }}
                >
                  <div
                    className={cn(
                      "relative h-full w-full overflow-hidden rounded-2xl",
                      isCurrent ? "border border-white/30 shadow-2xl" : "border border-white/10"
                    )}
                  >
                    <Image
                      src={slide.product.image}
                      alt={slide.product.name}
                      fill
                      sizes="300px"
                      className="object-cover transition-transform duration-700 group-hover:scale-105"
                    />
                    <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/70 via-black/40 to-transparent p-5">
                      <p className="text-base font-semibold !text-white">
                        {slide.product.name}
                      </p>
                      <p className="mt-1 text-sm !text-white/85">
                        LKR {slide.product.price.toLocaleString()}
                      </p>
                    </div>
                  </div>
                </motion.button>
              );
            })}
          </AnimatePresence>
        </div>

        {/* Product Rail - Mobile */}
        <div className="absolute bottom-0 left-0 z-10 block h-[clamp(320px,43svh,350px)] w-full overflow-hidden bg-transparent px-5 py-4 md:hidden">
          <div
            className="relative h-full w-full"
            style={{
              "--mobile-card-width": "min(64vw, 260px)",
              "--mobile-card-gap": "clamp(12px, 3.5vw, 16px)",
              "--mobile-step": "calc(var(--mobile-card-width) + var(--mobile-card-gap))",
            } as React.CSSProperties}
          >
            <AnimatePresence initial={false} custom={direction}>
              {[previousProduct, currentProduct, nextProduct].map((slide, slotIndex) => {
                const isCurrent = slotIndex === 1;
                const position = slotIndex === 0
                  ? "calc(var(--mobile-step) * -1)"
                  : slotIndex === 1
                    ? "0px"
                    : "var(--mobile-step)";
                const enteringPosition = direction === 1
                  ? "calc(var(--mobile-step) * 2)"
                  : "calc(var(--mobile-step) * -2)";
                const exitingPosition = direction === 1
                  ? "calc(var(--mobile-step) * -2)"
                  : "calc(var(--mobile-step) * 2)";

                return (
                  <motion.button
                    key={`mobile-${slide.id}`}
                    initial={{ left: enteringPosition }}
                    animate={{ left: position }}
                    exit={{ left: exitingPosition }}
                    transition={{
                      duration: isReducedMotion ? 0.01 : SLIDE_TRANSITION,
                      ease: [0.22, 1, 0.36, 1] as const,
                    }}
                    onAnimationComplete={
                      isCurrent
                        ? () => {
                            isTransitioningRef.current = false;
                            setIsAnimating(false);
                          }
                        : undefined
                    }
                    onClick={() => handleProductClick(heroSlides.indexOf(slide))}
                    disabled={isAnimating && !isCurrent}
                    className={cn(
                      "group absolute bottom-0 left-0 aspect-[4/5] w-[var(--mobile-card-width)] overflow-hidden rounded-[20px] text-left",
                      isCurrent ? "border border-white/35 shadow-2xl" : "border border-white/15 opacity-75"
                    )}
                    aria-label={`View ${slide.product.name}`}
                    aria-pressed={isCurrent}
                  >
                    <Image
                      src={slide.product.image}
                      alt={slide.product.name}
                      fill
                      sizes="260px"
                      className="object-cover transition-transform duration-700 group-hover:scale-105"
                    />
                    <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/80 via-black/45 to-transparent px-4 pb-4 pt-12">
                      <p className="text-[15px] font-semibold leading-tight !text-white">
                        {slide.product.name}
                      </p>
                      <p className="mt-1 text-[13px] leading-tight !text-white/85">
                        LKR {slide.product.price.toLocaleString()}
                      </p>
                    </div>
                  </motion.button>
                );
              })}
            </AnimatePresence>
          </div>
        </div>
      </div>

      {/* Navigation Controls */}
      <div className="absolute inset-y-0 left-0 z-20 flex items-center max-md:bottom-auto max-md:top-[48%] max-md:h-11 max-md:items-center max-md:pb-0">
        <button
          onClick={goPrev}
          className="ml-3 flex h-11 w-11 items-center justify-center rounded-full border border-white/20 bg-white/10 text-white backdrop-blur-sm transition-all hover:border-white/40 hover:bg-white/20 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white md:ml-8 md:h-12 md:w-12"
          aria-label="Previous slide"
        >
          <ChevronLeft className="h-5 w-5" />
        </button>
      </div>

      <div className="absolute inset-y-0 right-0 z-20 flex items-center max-md:bottom-auto max-md:top-[48%] max-md:h-11 max-md:items-center max-md:pb-0">
        <button
          onClick={goNext}
          className="mr-3 flex h-11 w-11 items-center justify-center rounded-full border border-white/20 bg-white/10 text-white backdrop-blur-sm transition-all hover:border-white/40 hover:bg-white/20 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white md:mr-8 md:h-12 md:w-12"
          aria-label="Next slide"
        >
          <ChevronRight className="h-5 w-5" />
        </button>
      </div>

      {/* Progress Indicator */}
      <div className="absolute bottom-6 left-6 z-20 hidden md:block">
        <p className="font-mono text-sm text-white/70">
          {String(activeIndex + 1).padStart(2, "0")} /{" "}
          {String(heroSlides.length).padStart(2, "0")}
        </p>
      </div>

      {/* Progress Bar */}
      <div className="absolute bottom-0 left-0 right-0 z-20 h-1 bg-white/10">
        <motion.div
          className="h-full bg-white/60"
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{
            duration: AUTOPLAY_INTERVAL / 1000,
            ease: "linear",
          }}
          key={activeIndex + (isPaused ? "-paused" : "")}
          style={{ transformOrigin: "left" }}
        />
      </div>
    </section>
  );
}

const textVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.8,
      ease: [0.22, 1, 0.36, 1] as const,
    },
  },
  exit: {
    opacity: 0,
    y: -15,
    transition: {
      duration: 0.4,
      ease: [0.4, 0, 1, 1] as const,
    },
  },
};
