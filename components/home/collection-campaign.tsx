"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";

const campaignImage =
  "/images/11.jpg";

export default function CollectionCampaign() {
  return (
    <section
      aria-labelledby="campaign-title"
      className="relative isolate h-[clamp(620px,72vh,820px)] min-h-[620px] overflow-hidden bg-neutral-900 max-md:h-[min(720px,88svh)] max-md:min-h-[620px]"
    >
      <Image
        src={campaignImage}
        alt="Children wearing colorful casual clothing and enjoying time outdoors"
        fill
        sizes="100vw"
        className="object-cover object-[center_45%] max-md:object-[58%_center]"
      />

      <div
        className="absolute inset-0 bg-gradient-to-r from-black/45 via-black/15 to-transparent max-md:bg-gradient-to-b max-md:from-transparent max-md:via-black/15 max-md:to-black/70"
        aria-hidden="true"
      />

      <div className="relative z-10 mx-auto flex h-full w-full max-w-7xl items-center px-6 md:px-10 lg:px-16">
        <motion.div
          initial={{ opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.25 }}
          transition={{ duration: 0.75, ease: [0.22, 1, 0.36, 1] }}
          className="max-w-[780px] pb-4 max-md:absolute max-md:inset-x-5 max-md:bottom-11 max-md:max-w-[340px] md:pb-6"
        >
          <p className="text-[11px] font-semibold uppercase tracking-[0.16em] !text-white/90 sm:text-xs">
            New Collection · Just Landed
          </p>
          <h2
            id="campaign-title"
            className="mt-5 max-w-[750px] font-display text-[clamp(3.5rem,5vw,5.8rem)] font-medium leading-[0.95] tracking-tight !text-white max-md:mt-4 max-md:text-[clamp(2.375rem,11vw,2.75rem)] max-md:leading-[1.01]"
          >
            A Little Style. A Lot of Adventure.
          </h2>
          <p className="mt-6 max-w-[560px] text-base leading-[1.6] !text-white/90 sm:text-lg max-md:mt-4 max-md:max-w-[330px] max-md:text-sm max-md:leading-[1.5]">
            Fresh looks made for play, celebrations, and everything in between.
          </p>
          <Link
            href="/shop/new-arrivals"
            className="group mt-8 inline-flex h-14 items-center gap-4 rounded-md bg-[#fdfcf9] px-8 text-[12px] font-semibold uppercase tracking-[0.08em] text-neutral-900 transition-[background-color,transform] duration-300 hover:bg-white hover:-translate-y-0.5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-neutral-900 max-md:mt-6 max-md:h-12 max-md:px-6 max-md:text-[11px]"
          >
            Explore New Arrivals
            <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1 motion-reduce:transition-none" aria-hidden="true" />
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
