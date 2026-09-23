"use client";

import { useState, useEffect, useCallback, useMemo, useRef } from "react";
import { motion } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { featuredProducts } from "@/data/products";
import ProductCard from "@/components/product/product-card";
import { type Product } from "@/types";

const SLIDE_TRANSITION = 0.7;
const AUTOPLAY_INTERVAL = 7000;
const CARD_GAP = 24;

interface TrackItem extends Product {
  key: string;
  originalIndex: number;
}

type Breakpoint = "mobile" | "tablet" | "laptop" | "desktop";

function getBreakpoint(width: number): Breakpoint {
  if (width >= 1280) return "desktop";
  if (width >= 1024) return "laptop";
  if (width >= 768) return "tablet";
  return "mobile";
}

function getItemsPerView(breakpoint: Breakpoint): number {
  switch (breakpoint) {
    case "desktop":
      return 4;
    case "laptop":
      return 3;
    case "tablet":
      return 2;
    case "mobile":
      return 1;
  }
}

export default function FeaturedProducts() {
  const [breakpoint, setBreakpoint] = useState<Breakpoint>("desktop");
  const [realIndex, setRealIndex] = useState(0);
  const [trackIndex, setTrackIndex] = useState(() => getItemsPerView("desktop"));
  const [isReducedMotion, setIsReducedMotion] = useState(() => {
    if (typeof window === "undefined") return false;
    return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  });
  const [isSnapping, setIsSnapping] = useState(false);
  const [trackItemWidth, setTrackItemWidth] = useState(280);
  const trackRef = useRef<HTMLDivElement>(null);
  const scrollRef = useRef<HTMLDivElement>(null);
  const isTransitioningRef = useRef(false);
  const autoplayRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const goNextRef = useRef<() => void>(() => undefined);
  const mobileNextRef = useRef<() => void>(() => undefined);

  const products = featuredProducts;
  const itemsPerView = getItemsPerView(breakpoint);
  const isMobile = breakpoint === "mobile";

  const prevBreakpointRef = useRef(breakpoint);

  useEffect(() => {
    const prev = prevBreakpointRef.current;
    prevBreakpointRef.current = breakpoint;
    if (prev === breakpoint) return;

    const itemsPerView = getItemsPerView(breakpoint);
    const maxTrackIndex = products.length + itemsPerView - 1;
    setTrackIndex((prevTrack) => {
      const clamped = Math.max(itemsPerView, Math.min(prevTrack, maxTrackIndex));
      return clamped;
    });
  }, [breakpoint, products.length]);

  useEffect(() => {
    const motionQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    const handler = (e: MediaQueryListEvent) => setIsReducedMotion(e.matches);
    motionQuery.addEventListener("change", handler);
    return () => motionQuery.removeEventListener("change", handler);
  }, []);

  useEffect(() => {
    const handleResize = () => {
      const bp = getBreakpoint(window.innerWidth);
      setBreakpoint(bp);

      const containerWidth = window.innerWidth;
      let newItemWidth: number;
      if (bp === "mobile") {
        newItemWidth = Math.min(containerWidth * 0.72, 280);
      } else if (bp === "tablet") {
        newItemWidth = (containerWidth - 80) / 2;
      } else if (bp === "laptop") {
        newItemWidth = (containerWidth - 96) / 3;
      } else {
        newItemWidth = (containerWidth - 120) / 4;
      }
      setTrackItemWidth(Math.max(newItemWidth, 200));
    };
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const step = trackItemWidth + CARD_GAP;

  const trackItems = useMemo<TrackItem[]>(() => {
    const mappedProducts = products.map((p, i) => ({
      ...p,
      key: `product-${p.id}-${i}`,
      originalIndex: i,
    }));
    const clonesBefore = products
      .slice(-itemsPerView)
      .map((p, i) => ({
        ...p,
        key: `clone-before-${p.id}-${i}`,
        originalIndex: products.length - itemsPerView + i,
      }));
    const clonesAfter = products
      .slice(0, itemsPerView)
      .map((p, i) => ({
        ...p,
        key: `clone-after-${p.id}-${i}`,
        originalIndex: i,
      }));
    return [...clonesBefore, ...mappedProducts, ...clonesAfter] as TrackItem[];
  }, [itemsPerView, products]);

  const minTrackIndex = itemsPerView;
  const maxTrackIndex = products.length + itemsPerView - 1;

  const goTo = useCallback(
    (index: number, nextDirection: number) => {
      if (isTransitioningRef.current) return;
      isTransitioningRef.current = true;
      setRealIndex((index + products.length) % products.length);
      setTrackIndex((prev) => prev + nextDirection);
    },
    [products.length]
  );

  const goNext = useCallback(() => {
    goTo(realIndex + 1, 1);
  }, [realIndex, goTo]);

  const goPrev = useCallback(() => {
    goTo(realIndex - 1, -1);
  }, [realIndex, goTo]);

  useEffect(() => {
    goNextRef.current = goNext;
  }, [goNext]);

  useEffect(() => {
    if (autoplayRef.current) clearInterval(autoplayRef.current);
    autoplayRef.current = setInterval(
      () => (isMobile ? mobileNextRef.current() : goNextRef.current()),
      AUTOPLAY_INTERVAL
    );
    return () => {
      if (autoplayRef.current) clearInterval(autoplayRef.current);
    };
  }, [isMobile]);

  const handleScroll = useCallback(() => {
    if (!scrollRef.current) return;
    const scrollLeft = scrollRef.current.scrollLeft;
    const index = Math.round(scrollLeft / step);
    if (index !== realIndex && index >= 0 && index < products.length) {
      setRealIndex(index);
    }
  }, [realIndex, products.length, step]);

  const scrollToIndex = useCallback(
    (index: number) => {
      if (!scrollRef.current) return;
      scrollRef.current.scrollTo({
        left: index * step,
        behavior: isReducedMotion ? "auto" : "smooth",
      });
    },
    [isReducedMotion, step]
  );

  const mobileNext = useCallback(() => {
    const nextIndex = (realIndex + 1) % products.length;
    setRealIndex(nextIndex);
    scrollToIndex(nextIndex);
  }, [realIndex, products.length, scrollToIndex]);

  const mobilePrev = useCallback(() => {
    const previousIndex = (realIndex - 1 + products.length) % products.length;
    setRealIndex(previousIndex);
    scrollToIndex(previousIndex);
  }, [realIndex, products.length, scrollToIndex]);

  useEffect(() => {
    mobileNextRef.current = mobileNext;
  }, [mobileNext]);

  return (
    <section className="w-full bg-[#fdfcf9] py-16 md:py-24 lg:py-28">
      <div className="mx-auto max-w-7xl px-6 md:px-10 lg:px-16">
        <div className="mb-10 text-center md:mb-14">
          <h2 className="font-display text-3xl font-medium tracking-tight text-neutral-900 sm:text-4xl md:text-5xl lg:text-[48px]">
            Little Favorites
          </h2>
          <p className="mx-auto mt-3 max-w-md text-base text-neutral-500 md:text-lg">
            Everyday styles made for little adventures.
          </p>
        </div>

        {isMobile ? (
          <div className="relative">
            <div
              ref={scrollRef}
              onScroll={handleScroll}
              className="flex gap-4 overflow-x-auto scrollbar-hide"
              style={{ scrollSnapType: "x mandatory", scrollBehavior: isReducedMotion ? "auto" : "smooth" }}
            >
              {products.map((product) => (
                <div
                  key={product.id}
                  style={{
                    width: trackItemWidth,
                    flexShrink: 0,
                    scrollSnapAlign: "start",
                  }}
                >
                  <ProductCard product={product} />
                </div>
              ))}
            </div>
            <div className="mt-6 flex items-center justify-center gap-3">
              <button
                onClick={mobilePrev}
                className="flex h-10 w-10 items-center justify-center rounded-full border border-neutral-200 bg-white text-neutral-700 transition-colors hover:border-neutral-300 hover:text-neutral-900"
                aria-label="Previous products"
              >
                <ChevronLeft className="h-4 w-4" />
              </button>
              <span className="text-xs text-neutral-500">
                {realIndex + 1} / {products.length}
              </span>
              <button
                onClick={mobileNext}
                className="flex h-10 w-10 items-center justify-center rounded-full border border-neutral-200 bg-white text-neutral-700 transition-colors hover:border-neutral-300 hover:text-neutral-900"
                aria-label="Next products"
              >
                <ChevronRight className="h-4 w-4" />
              </button>
            </div>
          </div>
        ) : (
          <div className="relative">
            <div className="overflow-hidden">
              <motion.div
                ref={trackRef}
                className="flex"
                animate={{
                  x: -trackIndex * step,
                }}
                transition={
                  isSnapping
                    ? { duration: 0 }
                    : {
                        duration: isReducedMotion ? 0.01 : SLIDE_TRANSITION,
                        ease: [0.22, 1, 0.36, 1] as const,
                      }
                }
                  onAnimationComplete={() => {
                    if (!isTransitioningRef.current || isSnapping) return;

                    if (trackIndex < minTrackIndex || trackIndex > maxTrackIndex) {
                      setIsSnapping(true);
                      setTrackIndex((currentTrackIndex) => {
                        if (currentTrackIndex < minTrackIndex) return currentTrackIndex + products.length;
                        if (currentTrackIndex > maxTrackIndex) return currentTrackIndex - products.length;
                        return currentTrackIndex;
                      });
                      requestAnimationFrame(() => {
                        setIsSnapping(false);
                        isTransitioningRef.current = false;
                      });
                      return;
                    }

                    isTransitioningRef.current = false;
                  }}
              >
                {trackItems.map((product) => {
                  return (
                    <div
                      key={product.key}
                      style={{
                        width: trackItemWidth,
                        flexShrink: 0,
                        marginRight: CARD_GAP,
                      }}
                    >
                      <ProductCard product={product} />
                    </div>
                  );
                })}
              </motion.div>
            </div>

            <button
              onClick={goPrev}
              className="absolute left-0 top-1/2 z-10 flex h-12 w-12 -translate-y-1/2 items-center justify-center rounded-full border border-neutral-200 bg-white/90 text-neutral-700 backdrop-blur-sm transition-colors hover:border-neutral-300 hover:text-neutral-900"
              aria-label="Previous products"
              style={{ marginLeft: -24 }}
            >
              <ChevronLeft className="h-5 w-5" />
            </button>
            <button
              onClick={goNext}
              className="absolute right-0 top-1/2 z-10 flex h-12 w-12 -translate-y-1/2 items-center justify-center rounded-full border border-neutral-200 bg-white/90 text-neutral-700 backdrop-blur-sm transition-colors hover:border-neutral-300 hover:text-neutral-900"
              aria-label="Next products"
              style={{ marginRight: -24 }}
            >
              <ChevronRight className="h-5 w-5" />
            </button>
          </div>
        )}
      </div>
    </section>
  );
}
