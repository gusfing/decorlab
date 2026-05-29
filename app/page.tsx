"use client";

import React, { useState, useEffect, useRef } from "react";
import gsap from "gsap";
import { CustomEase } from "gsap/CustomEase";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { MagicText } from "@/components/ui/magic-text";
import Gallery from "../components/capsule/Gallery/Gallery";
import Feedback from "../components/urbanland/Feedback";
import FooterBanner from "../components/urbanland/FooterBanner";

// Register GSAP plugins
gsap.registerPlugin(CustomEase, ScrollTrigger);

// Custom type definitions
interface NubeSpec {
  model: string;
  name: string;
  structure: string;
  exterior: string;
  interior: string;
  height: string;
  capacity: string;
  access: string;
  img: string;
}

interface InstaPost {
  img: string;
  caption: string;
  likes: string;
  comments: string;
}

export default function Home() {
  // Preloader / Entrance state
  const [showPreloader, setShowPreloader] = useState(true);
  const [isPreloaded, setIsPreloaded] = useState(false);

  // Hero state
  const [activeSlide, setActiveSlide] = useState(1); // Set to default Nube interior tunnel slide
  const [dofBlur, setDofBlur] = useState(false);

  // Navigation & Scroll states
  const [isScrolled, setIsScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState("hero");
  const [currentTheme, setCurrentTheme] = useState("dark");

  // Modals state
  const [selectedNube, setSelectedNube] = useState<number | null>(null);
  const [selectedInsta, setSelectedInsta] = useState<number | null>(null);

  // Newsletter state
  const [newsletterSubscribed, setNewsletterSubscribed] = useState(false);

  // Projects gallery states
  const [activeProjectTab, setActiveProjectTab] = useState("santhalia");
  const [lightboxProject, setLightboxProject] = useState<{
    siteName: string;
    images: string[];
    activeIndex: number;
  } | null>(null);

  const projectsData = [
    {
      id: "santhalia",
      title: "Santhalia Residence",
      location: "Kolkata, India",
      description: "An experimental 2,350 sq ft Kolkata residence showcasing a thoughtful application of unique materials, bespoke art installations, and signature ombre curtains. Highlighting clean, warm minimalism with organic plaster walls, textured linen panels, and soft, natural lighting to create a meditative atmosphere.",
      images: [
        "/assets/projects/santhalia_site/image_1.jpg",
        "/assets/projects/santhalia_site/image_2.jpg",
        "/assets/projects/santhalia_site/image_3.jpg",
        "/assets/projects/santhalia_site/image_4.jpg",
        "/assets/projects/santhalia_site/image_5.jpg",
        "/assets/projects/santhalia_site/image_6.jpg",
      ]
    },
    {
      id: "site01",
      title: "Corporate Workspace HQ",
      location: "Kolkata, India",
      description: "An award-winning commercial headquarters that balances biophilic design principles with fluid spatial transitions. Incorporates custom-engineered partition systems, timber screening, and organic light wells to maximize natural daylighting and occupant productivity.",
      images: [
        "/assets/projects/site_01/image_1.jpg",
        "/assets/projects/site_01/image_2.jpg",
        "/assets/projects/site_01/image_3.jpg",
        "/assets/projects/site_01/image_4.jpg",
        "/assets/projects/site_01/image_5.jpg",
        "/assets/projects/site_01/image_6.jpg",
      ]
    },
    {
      id: "site02",
      title: "Fluid Design Pavilion",
      location: "ICA Creative Minds Finalist",
      description: "A conceptual design project experimenting with double-curvature structures and organic spatial design. Seamlessly integrates interior architecture with warm lighting grids and natural texture layers to create a premium, immersive spatial flow.",
      images: [
        "/assets/projects/site_02/image_1.jpg",
        "/assets/projects/site_02/image_2.jpg",
        "/assets/projects/site_02/image_3.jpg",
        "/assets/projects/site_02/image_4.jpg",
        "/assets/projects/site_02/image_5.jpg",
        "/assets/projects/site_02/image_6.jpg",
      ]
    }
  ];


  // Ref hooks for GSAP animations
  const preloaderRef = useRef<HTMLDivElement>(null);
  const preloaderHeaderRef = useRef<HTMLDivElement>(null);
  const navIndicatorRef = useRef<HTMLDivElement>(null);
  const scrollTrackRef = useRef<HTMLDivElement>(null);
  const scrollWrapperRef = useRef<HTMLDivElement>(null);
  const runningTextRef = useRef<HTMLDivElement>(null);

  // Hero slideshow content list
  const heroSlides = [
    {
      model: "Santhalia Residence",
      title: "Close to Nature — Close to Yourself",
      desc: "Warm minimalist residences crafted with bespoke art and unique materials.",
      bg: "/assets/projects/santhalia_site/image_1.jpg",
    },
    {
      model: "Corporate Workspace HQ",
      title: "Atmospheric Design Sanctuaries",
      desc: "Step into an organic workspace of fluid lines and custom lighting.",
      bg: "/assets/projects/site_01/image_1.jpg",
    },
    {
      model: "Fluid Architecture",
      title: "Fluidity is in the air",
      desc: "Unconventional structures and curved forms creating serene environments.",
      bg: "/assets/projects/site_02/image_1.jpg",
    },
    {
      model: "Aesthetic Lounges",
      title: "Tailored Interior Curation",
      desc: "Linen, raw concrete, and plaster studies creating signature spaces.",
      bg: "/assets/projects/photos_set1/image_1.jpg",
    },
  ];

  // Specifications specifications data
  const nubeSpecs: NubeSpec[] = [
    {
      model: "Santhalia Residence",
      name: "Residential Masterpiece",
      structure: "Luxury Warm Minimalism",
      exterior: "Kolkata, India",
      interior: "2,350 sq ft",
      height: "2024",
      capacity: "Functionality & Aesthetics",
      access: "Ombre Curtains & Custom Art",
      img: "/assets/projects/santhalia_site/image_1.jpg",
    },
    {
      model: "Corporate HQ",
      name: "Commercial Office",
      structure: "Parametric Biophilic Design",
      exterior: "Kolkata, India",
      interior: "15,000 sq ft",
      height: "2024",
      capacity: "Collaborative Wellness",
      access: "Parametric Timber Screening",
      img: "/assets/projects/site_01/image_1.jpg",
    },
    {
      model: "Fluid Architecture",
      name: "Futuristic Pavilion",
      structure: "Fluid Parametric Forms",
      exterior: "Mumbai, India (Concept)",
      interior: "5,000 sq ft",
      height: "2025",
      capacity: "Freeform Curved Concrete",
      access: "Oculus Dome & Spatial Flow",
      img: "/assets/projects/site_02/image_1.jpg",
    },
    {
      model: "Residential Lounge",
      name: "Aesthetic Study",
      structure: "Mediterranean Plaster & Linen",
      exterior: "Bengaluru, India",
      interior: "1,200 sq ft",
      height: "2023",
      capacity: "Tactile Textures",
      access: "Linen Cushions & Concrete Studies",
      img: "/assets/projects/photos_set1/image_1.jpg",
    },
  ];

  // Instagram feed data
  const instaPosts: InstaPost[] = [
    {
      img: "/assets/projects/photos_set1/image_2.jpg",
      caption: "A sleek beige organic sofa matches standard-setting minimal plaster walls. Elevating curated interior installations with custom textiles and low-pressure inflatable elements. Madrid — Mumbai.",
      likes: "1,824",
      comments: "84",
    },
    {
      img: "/assets/projects/photos_set1/image_3.jpg",
      caption: "Tactile studies in linen. Blending organic soft pillows and pillow-shaped cushion installations into peaceful structural concepts. Habitats made to dream. #DecorLab",
      likes: "2,412",
      comments: "126",
    },
    {
      img: "/assets/projects/photos_set1/image_4.jpg",
      caption: "Sculptured circular lines and stark concrete detail studies. Curated pampas accents contrast beautifully with organic white dining modules. Clean living aesthetics.",
      likes: "1,538",
      comments: "42",
    },
    {
      img: "/assets/projects/photos_set2/image_2.jpg",
      caption: "Plaster ceilings, low oak platform beds, and pristine linen sheets catch the morning sunbeams. A cozy, high-end design study celebrating Mediterranean roots.",
      likes: "3,104",
      comments: "194",
    },
    {
      img: "/assets/projects/photos_set2/image_3.jpg",
      caption: "Modern art installation featuring white geometric spheres and abstract minimalist shapes under clean gallery spotlighting. Sensory scale transitions.",
      likes: "1,209",
      comments: "38",
    },
    {
      img: "/assets/projects/photos_set2/image_4.jpg",
      caption: "Concrete study and dry decorative accents in our design lab. Moods of shadow and light reflecting the future of premium interior architectures.",
      likes: "2,945",
      comments: "107",
    },
  ];

  // Scroll triggers and general side effects
  useEffect(() => {
    // Standard scroll listener for header styling and active themes
    const handleScroll = () => {
      const scrollPos = window.scrollY;
      setIsScrolled(scrollPos > window.innerHeight * 0.1);

      // Section tracking for nav links & dark/light theme switching
      const sections = ["hero", "info", "work", "instagram", "contact"];
      let active = "hero";

      sections.forEach((id) => {
        const el = document.getElementById(id);
        if (el) {
          const rect = el.getBoundingClientRect();
          const offset = 150;
          if (rect.top <= offset && rect.bottom > offset) {
            active = id;
          }
        }
      });

      setActiveSection(active);

      // Map light background sections to light theme
      if (active === "work" || active === "contact") {
        setCurrentTheme("light");
      } else {
        setCurrentTheme("dark");
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Modal key hook (ESC key exits modals)
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setSelectedNube(null);
        setSelectedInsta(null);
        setLightboxProject(null);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  // Manage body scroll freezing when modals open
  useEffect(() => {
    if (selectedNube !== null || selectedInsta !== null || showPreloader || lightboxProject !== null) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
  }, [selectedNube, selectedInsta, showPreloader, lightboxProject]);


  // Entrance timelines with GSAP
  useGSAP(() => {
    // Custom ease curve mapping vanilla bezier
    CustomEase.create("hop", "0.9, 0, 0.1, 1");

    const preloader = preloaderRef.current;
    const headerContainer = preloaderHeaderRef.current;

    if (!preloader || !headerContainer) return;

    // Split text selector helpers
    const chars = gsap.utils.toArray<HTMLElement>("#preloader-title-link .char");
    const lines = gsap.utils.toArray<HTMLElement>(".preloader-copy p .line");
    const heroLines = gsap.utils.toArray<HTMLElement>(".hero-brand-title");
    const preloaderImages = gsap.utils.toArray<HTMLElement>(".preloader-images .img");
    const preloaderImagesInner = gsap.utils.toArray<HTMLElement>(".preloader-images .img img");

    // Initialize offsets
    if (chars.length > 0) {
      chars.forEach((char, i) => {
        gsap.set(char, { yPercent: i % 2 === 0 ? -100 : 100 });
      });
    }
    if (lines.length > 0) {
      gsap.set(lines, { yPercent: 100 });
    }
    if (heroLines.length > 0) {
      gsap.set(heroLines, { yPercent: 100 });
    }

    const tl = gsap.timeline({ delay: 0.25 });

    // Progress Bar loading phase
    if (document.querySelector(".progress-bar")) {
      tl.to(".progress-bar", {
        scaleX: 1,
        duration: 3,
        ease: "power3.inOut",
      })
        .set(".progress-bar", { transformOrigin: "right" })
        .to(".progress-bar", {
          scaleX: 0,
          duration: 0.8,
          ease: "power3.in",
        });
    }

    // Image polygon reveals
    if (preloaderImages.length > 0) {
      preloaderImages.forEach((img, i) => {
        tl.to(
          img,
          {
            clipPath: "polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)",
            duration: 0.8,
            ease: "hop",
            delay: i * 0.55,
          },
          "-=3.8"
        );
      });
    }

    if (preloaderImagesInner.length > 0) {
      preloaderImagesInner.forEach((img, i) => {
        tl.to(
          img,
          {
            scale: 1,
            duration: 1.2,
            ease: "hop",
            delay: i * 0.55,
          },
          "-=4.0"
        );
      });
    }

    // Preloader copy reveals
    if (lines.length > 0) {
      tl.to(
        lines,
        {
          yPercent: 0,
          duration: 1.5,
          ease: "hop",
          stagger: 0.08,
        },
        "-=4.2"
      );
    }
    
    if (chars.length > 0) {
      tl.to(
        chars,
        {
          yPercent: 0,
          duration: 0.8,
          ease: "hop",
          stagger: 0.02,
        },
        "-=3.8"
      );
    }
    
    if (document.querySelector(".preloader-images")) {
      tl.to(
        ".preloader-images",
        {
          clipPath: "polygon(0% 0%, 100% 0%, 100% 0%, 0% 0%)",
          duration: 0.8,
          ease: "hop",
        },
        "-=1.2"
      );
    }
    
    if (lines.length > 0) {
      tl.to(
        lines,
        {
          y: "-125%",
          duration: 1.5,
          ease: "hop",
          stagger: 0.08,
        },
        "-=1.5"
      );
    }

    // Characters meeting stagger logo merger
    if (chars.length > 0) {
      tl.to(
        chars,
        {
          yPercent: (index) => {
            if (index === 0 || index === chars.length - 1) return 0;
            return index % 2 === 0 ? 100 : -100;
          },
          duration: 0.8,
          ease: "hop",
          stagger: 0.02,
          delay: 0.3,
          onStart: () => {
            const initialChar = chars[0];
            const lastChar = chars[chars.length - 1];

            if (initialChar && lastChar) {
              const initialCharMask = initialChar.parentElement;
              const lastCharMask = lastChar.parentElement;

              if (initialCharMask) initialCharMask.style.overflow = "visible";
              if (lastCharMask) lastCharMask.style.overflow = "visible";

              const viewportWidth = window.innerWidth;
              const centerX = viewportWidth / 2;
              const initialCharRect = initialChar.getBoundingClientRect();
              const lastCharRect = lastChar.getBoundingClientRect();

              // Animate initial 'E' and last 'e' to merge in the center and fade to white
              gsap.to([initialChar, lastChar], {
                duration: 0.8,
                ease: "hop",
                delay: 0.3,
                color: "#ffffff",
                x: (i) => {
                  if (i === 0) {
                    return centerX - initialCharRect.left - initialCharRect.width;
                  } else {
                    return centerX - lastCharRect.left;
                  }
                },
                onComplete: () => {
                  // Apply difference blend overlay
                  gsap.set(headerContainer, { mixBlendMode: "difference" });

                  // Travel and scale merged letters up to Nav Logo position
                  gsap.to(headerContainer, {
                    y: "2.5rem",
                    scale: 0.28,
                    duration: 1.2,
                    ease: "hop",
                    onComplete: () => {
                      // Preloader ends! Reveal main page structure
                      setIsPreloaded(true);
                      setShowPreloader(false);
                    },
                  });
                },
              });
            }
          },
        },
        "-=2.0"
      );
    }

    tl.to(
      preloader,
      {
        clipPath: "polygon(0% 0%, 100% 0%, 100% 0%, 0% 0%)",
        duration: 1.5,
        ease: "hop",
      },
      "-=0.4"
    );

    if (heroLines.length > 0) {
      tl.to(
        heroLines,
        {
          yPercent: 0,
          duration: 0.8,
          ease: "power4.out",
          stagger: 0.08,
        },
        "-=0.6"
      );
    }
  }, []);

  // Horizontal scroll catalogues timeline pinning using ScrollTrigger
  useGSAP(() => {
    if (!isPreloaded) return;

    const scrollWrapper = scrollWrapperRef.current;
    const scrollTrack = scrollTrackRef.current;
    const runningText = runningTextRef.current;

    if (!scrollWrapper || !scrollTrack) return;

    // Use matchMedia to support desktop dynamic pinning and mobile native gestures
    const mm = gsap.matchMedia();

    mm.add("(min-width: 901px)", () => {
      const getScrollAmount = () => {
        return -(scrollTrack.scrollWidth - window.innerWidth);
      };

      const pinTimeline = gsap.timeline({
        scrollTrigger: {
          trigger: scrollWrapper,
          start: "top top",
          end: () => `+=${scrollTrack.scrollWidth - window.innerWidth}`,
          pin: true,
          scrub: 1,
          invalidateOnRefresh: true,
        },
      });

      pinTimeline.to(scrollTrack, {
        x: getScrollAmount,
        ease: "none",
      });

      if (runningText) {
        pinTimeline.to(
          runningText,
          {
            x: () => (scrollTrack.scrollWidth - window.innerWidth) * 0.15,
            ease: "none",
          },
          0
        );
      }

      // 1. Hero scroll animations (parallax & fade out)
      if (document.querySelector(".hero-brand-title")) {
        gsap.to(".hero-brand-title", {
          yPercent: -60,
          opacity: 0,
          ease: "none",
          scrollTrigger: {
            trigger: ".hero-section",
            start: "top top",
            end: "bottom top",
            scrub: true,
          }
        });
      }

      if (document.querySelector(".scroll-indicator")) {
        gsap.to(".scroll-indicator", {
          opacity: 0,
          y: 20,
          scrollTrigger: {
            trigger: ".hero-section",
            start: "10% top",
            end: "40% top",
            scrub: true,
          }
        });
      }

      if (document.querySelector(".hero-cards-container")) {
        gsap.to(".hero-cards-container", {
          y: 120,
          opacity: 0,
          ease: "none",
          scrollTrigger: {
            trigger: ".hero-section",
            start: "top top",
            end: "80% top",
            scrub: true,
          }
        });
      }

      if (document.querySelector(".slideshow-container")) {
        gsap.to(".slideshow-container", {
          yPercent: 15,
          scale: 1.05,
          ease: "none",
          scrollTrigger: {
            trigger: ".hero-section",
            start: "top top",
            end: "bottom top",
            scrub: true,
          }
        });
      }

      // 2. About Us Section (#info)
      if (document.querySelector(".about-left-image img")) {
        gsap.fromTo(".about-left-image img",
          { scale: 1.15, opacity: 0.8 },
          {
            scale: 1.0,
            opacity: 1,
            ease: "power2.out",
            scrollTrigger: {
              trigger: "#info",
              start: "top 80%",
              end: "bottom 20%",
              toggleActions: "play reverse play reverse",
            }
          }
        );
      }

      if (document.querySelector(".about-right-image img")) {
        gsap.fromTo(".about-right-image img",
          { scale: 1.12, opacity: 0.8 },
          {
            scale: 1.0,
            opacity: 1,
            ease: "power2.out",
            scrollTrigger: {
              trigger: ".about-right-image",
              start: "top 90%",
              end: "bottom 10%",
              toggleActions: "play reverse play reverse",
            }
          }
        );
      }

      const aboutTexts = document.querySelectorAll(".about-title-wrapper, .about-right-headline, .about-right-body");
      if (aboutTexts.length > 0) {
        gsap.fromTo(aboutTexts,
          { y: 30, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.9,
            stagger: 0.1,
            ease: "power3.out",
            scrollTrigger: {
              trigger: "#info",
              start: "top 80%",
              end: "bottom 20%",
              toggleActions: "play reverse play reverse",
            }
          }
        );
      }

      const aboutStats = document.querySelectorAll(".about-stat-item");
      if (aboutStats.length > 0) {
        gsap.fromTo(aboutStats,
          { y: 25, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.8,
            stagger: 0.08,
            ease: "power3.out",
            scrollTrigger: {
              trigger: "#info",
              start: "top 80%",
              end: "bottom 20%",
              toggleActions: "play reverse play reverse",
            }
          }
        );
      }

      // Stat Numbers Count-Up Animation
      const stats = gsap.utils.toArray<HTMLElement>(".about-stat-num");
      if (stats.length > 0) {
        stats.forEach((stat) => {
          const targetVal = parseFloat(stat.getAttribute("data-target") || "0");
          const suffix = stat.getAttribute("data-suffix") || "";
          const decimals = parseInt(stat.getAttribute("data-decimals") || "0", 10);
          const obj = { val: 0 };
          gsap.to(obj, {
            val: targetVal,
            duration: 1.8,
            ease: "power2.out",
            scrollTrigger: {
              trigger: stat,
              start: "top 90%",
              toggleActions: "play none none none"
            },
            onUpdate: () => {
              stat.innerText = obj.val.toFixed(decimals) + suffix;
            }
          });
        });
      }

      // 3. Process Section (#process)
      if (document.querySelector("#process .serif-headline")) {
        gsap.fromTo("#process .serif-headline",
          { y: 30, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 1.0,
            ease: "power3.out",
            scrollTrigger: {
              trigger: "#process",
              start: "top 85%",
              end: "bottom 15%",
              toggleActions: "play reverse play reverse",
            }
          }
        );
      }

      if (document.querySelector("#process .step-card-new")) {
        gsap.fromTo("#process .step-card-new",
          { y: 55, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.8,
            stagger: 0.12,
            ease: "power3.out",
            scrollTrigger: {
              trigger: "#process .editorial-steps-grid",
              start: "top 85%",
              end: "bottom 15%",
              toggleActions: "play reverse play reverse",
            }
          }
        );
      }

      // 4. Curated Spaces Section (#collection)
      if (document.querySelector("#collection .gallery-text-col > *")) {
        gsap.fromTo("#collection .gallery-text-col > *",
          { y: 30, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.8,
            stagger: 0.1,
            ease: "power3.out",
            scrollTrigger: {
              trigger: "#collection",
              start: "top 85%",
              end: "bottom 15%",
              toggleActions: "play reverse play reverse",
            }
          }
        );
      }

      const collectionImgs = gsap.utils.toArray<HTMLElement>("#collection .reveal-gallery-img");
      if (collectionImgs.length > 0) {
        collectionImgs.forEach((img) => {
          gsap.fromTo(img,
            { y: 40, opacity: 0, scale: 0.97 },
            {
              y: 0,
              opacity: 1,
              scale: 1,
              duration: 1.0,
              ease: "power3.out",
              scrollTrigger: {
                trigger: img,
                start: "top 90%",
                end: "bottom 10%",
                toggleActions: "play reverse play reverse",
              }
            }
          );
        });

        // Parallax scroll on images
        collectionImgs.forEach((img) => {
          const innerImg = img.querySelector("img");
          if (innerImg) {
            gsap.fromTo(innerImg,
              { yPercent: -8 },
              {
                yPercent: 8,
                ease: "none",
                scrollTrigger: {
                  trigger: img,
                  start: "top bottom",
                  end: "bottom top",
                  scrub: true,
                }
              }
            );
          }
        });
      }

      // 5. Recent Collabs Section (.cashmere-bg)
      const collabLeftTexts = document.querySelectorAll(".cashmere-bg .collab-left > *");
      if (collabLeftTexts.length > 0) {
        gsap.fromTo(collabLeftTexts,
          { y: 30, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.8,
            stagger: 0.12,
            ease: "power3.out",
            scrollTrigger: {
              trigger: ".cashmere-bg",
              start: "top 85%",
              end: "bottom 15%",
              toggleActions: "play reverse play reverse",
            }
          }
        );
      }

      const collabRightImgs = document.querySelectorAll(".cashmere-bg .collab-right .gallery-image-wrapper, .cashmere-bg .collab-right .collab-images-row > *");
      if (collabRightImgs.length > 0) {
        gsap.fromTo(collabRightImgs,
          { y: 40, opacity: 0, scale: 0.98 },
          {
            y: 0,
            opacity: 1,
            scale: 1,
            duration: 0.9,
            stagger: 0.12,
            ease: "power3.out",
            scrollTrigger: {
              trigger: ".cashmere-bg .collab-right",
              start: "top 85%",
              end: "bottom 15%",
              toggleActions: "play reverse play reverse",
            }
          }
        );
      }

      // 6. Press & Publication Section
      const pressLeftImg = document.querySelector(".press-grid .press-left");
      if (pressLeftImg) {
        gsap.fromTo(pressLeftImg,
          { y: 40, opacity: 0, scale: 0.97 },
          {
            y: 0,
            opacity: 1,
            scale: 1,
            duration: 1.0,
            ease: "power3.out",
            scrollTrigger: {
              trigger: ".press-grid",
              start: "top 85%",
              end: "bottom 15%",
              toggleActions: "play reverse play reverse",
            }
          }
        );
      }

      const pressRightTexts = document.querySelectorAll(".press-grid .press-right > *");
      if (pressRightTexts.length > 0) {
        gsap.fromTo(pressRightTexts,
          { y: 30, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.8,
            stagger: 0.12,
            ease: "power3.out",
            scrollTrigger: {
              trigger: ".press-grid",
              start: "top 85%",
              end: "bottom 15%",
              toggleActions: "play reverse play reverse",
            }
          }
        );
      }

      // 7. Projects Showcase Section (#showcase)
      const showcaseHeaders = document.querySelectorAll("#showcase .showcase-header > *, #showcase .showcase-tabs");
      if (showcaseHeaders.length > 0) {
        gsap.fromTo(showcaseHeaders,
          { y: 25, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.8,
            stagger: 0.1,
            ease: "power3.out",
            scrollTrigger: {
              trigger: "#showcase",
              start: "top 85%",
              end: "bottom 15%",
              toggleActions: "play reverse play reverse",
            }
          }
        );
      }

      if (document.querySelector("#showcase .showcase-content-grid")) {
        gsap.fromTo("#showcase .showcase-content-grid",
          { y: 30, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.8,
            ease: "power3.out",
            scrollTrigger: {
              trigger: "#showcase .showcase-tabs",
              start: "bottom 90%",
              end: "bottom 10%",
              toggleActions: "play reverse play reverse",
            }
          }
        );
      }

      // 8. Capabilities Section (.section-capabilities)
      const capHeaders = document.querySelectorAll(".section-capabilities .capabilities-header > *");
      if (capHeaders.length > 0) {
        gsap.fromTo(capHeaders,
          { y: 25, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.8,
            stagger: 0.1,
            ease: "power3.out",
            scrollTrigger: {
              trigger: ".section-capabilities",
              start: "top 85%",
              end: "bottom 15%",
              toggleActions: "play reverse play reverse",
            }
          }
        );
      }

      const capCards = document.querySelectorAll(".section-capabilities .cap-card");
      if (capCards.length > 0) {
        gsap.fromTo(capCards,
          { y: 40, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.8,
            stagger: 0.12,
            ease: "power3.out",
            scrollTrigger: {
              trigger: ".section-capabilities .capabilities-grid",
              start: "top 85%",
              end: "bottom 15%",
              toggleActions: "play reverse play reverse",
            }
          }
        );
      }

      // 9. Instagram Section (#instagram)
      const instaHeaders = document.querySelectorAll("#instagram .instagram-header > *");
      if (instaHeaders.length > 0) {
        gsap.fromTo(instaHeaders,
          { y: 25, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.8,
            stagger: 0.1,
            ease: "power3.out",
            scrollTrigger: {
              trigger: "#instagram",
              start: "top 85%",
              end: "bottom 15%",
              toggleActions: "play reverse play reverse",
            }
          }
        );
      }

      const instaCards = document.querySelectorAll("#instagram .instagram-card");
      if (instaCards.length > 0) {
        gsap.fromTo(instaCards,
          { y: 30, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.7,
            stagger: 0.06,
            ease: "power3.out",
            scrollTrigger: {
              trigger: "#instagram .instagram-grid",
              start: "top 85%",
              end: "bottom 15%",
              toggleActions: "play reverse play reverse",
            }
          }
        );
      }

      // Testimonials (#feedback)
      const feedbackElms = document.querySelectorAll("#feedback p, #feedback h1, #feedback img, #feedback button, #feedback .progress-line");
      if (feedbackElms.length > 0) {
        gsap.fromTo(feedbackElms,
          { y: 30, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.8,
            stagger: 0.08,
            ease: "power3.out",
            scrollTrigger: {
              trigger: "#feedback",
              start: "top 85%",
              end: "bottom 15%",
              toggleActions: "play reverse play reverse",
            }
          }
        );
      }

      // Detailed Footer (#contact-footer)
      const footerElms = document.querySelectorAll("#contact-footer .footer-brand, #contact-footer h4, #contact-footer li, #contact-footer .footer-bottom > *");
      if (footerElms.length > 0) {
        gsap.fromTo(footerElms,
          { y: 20, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.8,
            stagger: 0.05,
            ease: "power3.out",
            scrollTrigger: {
              trigger: "#contact-footer",
              start: "top 95%",
              end: "bottom bottom",
              toggleActions: "play reverse play reverse",
            }
          }
        );
      }
    });

    mm.add("(max-width: 900px)", () => {
      if (runningText) {
        gsap.to(runningText, {
          xPercent: -30,
          scrollTrigger: {
            trigger: scrollWrapper,
            start: "top bottom",
            end: "bottom top",
            scrub: true,
          },
        });
      }
      gsap.set(scrollTrack, { x: 0 });

      // Mobile-optimized animations (no reverse to prevent layout jumps/lag)
      const mobileTriggers = [
        { trigger: "#info", targets: ".about-title-wrapper, .about-right-headline, .about-right-body, .about-left-image img, .about-right-image img, .about-stat-item" },
        { trigger: "#process", targets: "#process .serif-headline, #process .step-card-new" },
        { trigger: "#collection", targets: "#collection .gallery-text-col > *, #collection .reveal-gallery-img" },
        { trigger: ".cashmere-bg", targets: ".cashmere-bg .collab-left > *, .cashmere-bg .collab-right .gallery-image-wrapper" },
        { trigger: ".press-grid", targets: ".press-grid .press-left, .press-grid .press-right > *" },
        { trigger: "#showcase", targets: "#showcase .showcase-header > *, #showcase .showcase-tabs, #showcase .showcase-content-grid" },
        { trigger: ".section-capabilities", targets: ".section-capabilities .capabilities-header > *, .section-capabilities .cap-card" },
        { trigger: "#instagram", targets: "#instagram .instagram-header > *, #instagram .instagram-card" },
        { trigger: "#feedback", targets: "#feedback p, #feedback h1, #feedback img, #feedback button, #feedback .progress-line" },
        { trigger: "#contact-footer", targets: "#contact-footer .footer-brand, #contact-footer h4, #contact-footer li, #contact-footer .footer-bottom > *" }
      ];

      mobileTriggers.forEach((item) => {
        const elms = document.querySelectorAll(item.targets);
        if (elms.length > 0) {
          gsap.fromTo(elms,
            { y: 25, opacity: 0 },
            {
              y: 0,
              opacity: 1,
              duration: 0.8,
              stagger: 0.08,
              ease: "power3.out",
              scrollTrigger: {
                trigger: item.trigger,
                start: "top 90%",
                once: true
              }
            }
          );
        }
      });

      // Stats Count-Up for mobile
      const statsMob = gsap.utils.toArray<HTMLElement>(".about-stat-num");
      if (statsMob.length > 0) {
        statsMob.forEach((stat) => {
          const targetVal = parseFloat(stat.getAttribute("data-target") || "0");
          const suffix = stat.getAttribute("data-suffix") || "";
          const decimals = parseInt(stat.getAttribute("data-decimals") || "0", 10);
          const obj = { val: 0 };
          gsap.to(obj, {
            val: targetVal,
            duration: 1.5,
            ease: "power2.out",
            scrollTrigger: {
              trigger: stat,
              start: "top 95%",
              once: true
            },
            onUpdate: () => {
              stat.innerText = obj.val.toFixed(decimals) + suffix;
            }
          });
        });
      }
    });

    return () => mm.revert();
  }, [isPreloaded]);

  // Pinned ScrollTrigger layout settlement refresh
  useEffect(() => {
    if (!isPreloaded) return;
    const timer = setTimeout(() => {
      ScrollTrigger.refresh();
    }, 450);
    return () => clearTimeout(timer);
  }, [isPreloaded]);

  // Handle logo top scroll reset
  const handleLogoClick = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
    setActiveSlide(1); // Set to default Nube interior tunnel slide
  };

  // Submitting Newsletter handler
  const handleNewsletterSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setNewsletterSubscribed(true);
  };

  // Category filter tag highlights jump bounce stagger
  const handleFilterPillClick = (categoryName: string) => {
    // Add dynamic feedback bounce stagger to the horizontal cards
    const cards = gsap.utils.toArray(".horizontal-nube-card");
    gsap.fromTo(
      cards,
      { y: 0 },
      { y: -10, duration: 0.2, ease: "power2.out", stagger: 0.04, yoyo: true, repeat: 1 }
    );
  };

  // Nav indicator dynamic tracing hooks
  const handleNavMouseEnter = (e: React.MouseEvent<HTMLAnchorElement> | React.FocusEvent<HTMLAnchorElement>) => {
    const link = e.currentTarget;
    const indicator = navIndicatorRef.current;
    if (!link || !indicator) return;

    const linkRect = link.getBoundingClientRect();
    const menuRect = link.parentElement?.getBoundingClientRect();

    if (menuRect) {
      const offsetLeft = linkRect.left - menuRect.left;
      const width = linkRect.width;

      indicator.style.width = `${width}px`;
      indicator.style.transform = `translateX(${offsetLeft}px)`;
      indicator.style.opacity = "1";
    }
  };

  const handleNavMouseLeave = () => {
    const indicator = navIndicatorRef.current;
    if (indicator) {
      indicator.style.opacity = "0";
    }
  };



  // Preloader template markup
  return (
    <>
      {showPreloader && (
        <>
          <div ref={preloaderRef} className="preloader">
            <div className="progress-bar"></div>

            <div className="preloader-images">
              <div className="img">
                <img src="/assets/projects/santhalia_site/image_1.jpg" alt="Opening structure 1" style={{ scale: 1.5 }} />
              </div>
              <div className="img">
                <img src="/assets/projects/site_01/image_1.jpg" alt="Opening structure 2" style={{ scale: 1.5 }} />
              </div>
              <div className="img">
                <img src="/assets/projects/site_02/image_1.jpg" alt="Opening structure 3" style={{ scale: 1.5 }} />
              </div>
              <div className="img">
                <img src="/assets/projects/photos_set1/image_1.jpg" alt="Opening structure 4" style={{ scale: 1.5 }} />
              </div>
            </div>

            <div className="preloader-copy">
              <p>
                {"A studio of fluid architecture and interior curation shaping spaces through heritage, materials, and refined design innovation."
                  .split(" ")
                  .map((word, index) => (
                    <span key={index} className="line-mask" style={{ marginRight: "0.3em" }}>
                      <span className="line">{word}</span>
                    </span>
                  ))}
              </p>
            </div>
          </div>

          <div ref={preloaderHeaderRef} className="preloader-header" id="preloader-header-container">
            <a href="#" id="preloader-title-link">
              {"DecorLab".split("").map((char, index) => (
                <span key={index} className="char-mask">
                  <span className="char">{char === " " ? "\u00A0" : char}</span>
                </span>
              ))}
            </a>
          </div>
        </>
      )}

      {/* Floating navigation header */}
      <header
        className={`nav-header ${isScrolled ? "scrolled" : ""} ${currentTheme === "light" ? "light-theme" : ""}`}
        id="main-header"
        style={{ opacity: isPreloaded ? 1 : 0, pointerEvents: isPreloaded ? "auto" : "none" }}
      >
        <div
          className="nav-logo glass glass-interactive"
          id="nav-logo"
          role="button"
          aria-label="Decor Lab Home"
          tabIndex={0}
          onClick={handleLogoClick}
          style={{ width: "auto", padding: "0 16px", borderRadius: "9999px" }}
        >
          <img src="/assets/Decorlab final-01-trans.png" alt="Decor Lab Logo" className="nav-logo-img" />
        </div>

        <nav
          className="nav-menu glass"
          role="navigation"
          aria-label="Main Navigation"
          onMouseLeave={handleNavMouseLeave}
        >
          <div ref={navIndicatorRef} className="nav-indicator" id="nav-indicator"></div>
          <a
            href="/work"
            className="nav-link"
            id="link-work"
            onMouseEnter={handleNavMouseEnter}
            onFocus={handleNavMouseEnter}
          >
            Work
          </a>
          <a
            href="/about"
            className="nav-link"
            id="link-about"
            onMouseEnter={handleNavMouseEnter}
            onFocus={handleNavMouseEnter}
          >
            About
          </a>
          <a
            href="/awards"
            className="nav-link"
            id="link-awards"
            onMouseEnter={handleNavMouseEnter}
            onFocus={handleNavMouseEnter}
          >
            Awards
          </a>
          <a
            href="/contact"
            className="nav-link"
            id="link-contact"
            onMouseEnter={handleNavMouseEnter}
            onFocus={handleNavMouseEnter}
          >
            Contact
          </a>
        </nav>
      </header>

      {/* Core layouts display after preload merges */}
      <main style={{ opacity: isPreloaded ? 1 : 0, transition: "opacity 0.4s ease" }}>
        {/* ====================================================
         * SECTION 1: HERO VIEW (Slideshow, vignettes & title)
         * ==================================================== */}
        <section className="hero-section" id="hero">
          {/* Viewport Slideshow */}
          <div className={`slideshow-container ${dofBlur ? "dof-blur" : ""}`} id="bg-slideshow">
            <div
              className={`bg-slide ${activeSlide === 0 ? "active" : ""}`}
              style={{ backgroundImage: "url('/assets/projects/santhalia_site/image_1.jpg')" }}
            ></div>
            <div
              className={`bg-slide ${activeSlide === 1 ? "active" : ""}`}
              style={{ backgroundImage: "url('/assets/projects/site_01/image_1.jpg')" }}
            ></div>
            <div
              className={`bg-slide ${activeSlide === 2 ? "active" : ""}`}
              style={{ backgroundImage: "url('/assets/projects/site_02/image_1.jpg')" }}
            ></div>
            <div
              className={`bg-slide ${activeSlide === 3 ? "active" : ""}`}
              style={{ backgroundImage: "url('/assets/projects/photos_set1/image_1.jpg')" }}
            ></div>
          </div>

          {/* Vignette Overlay */}
          <div className="overlay-vignette"></div>

          {/* Depth Blur Switcher */}
          <div
            className="dof-toggle glass glass-interactive"
            id="dof-toggle"
            role="button"
            aria-label="Toggle Background Softness"
            tabIndex={0}
            title="Toggle background softness"
            onClick={() => setDofBlur(!dofBlur)}
          >
            <svg
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
              style={{ opacity: dofBlur ? "1" : "0.7" }}
            >
              <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.42 0-8-3.58-8-8s3.58-8 8-8 8 3.58 8 8-3.58 8-8 8zm-1-13h2v4h-2zm0 6h2v4h-2z" />
            </svg>
          </div>

          {/* Centered Brand Title in Reinette Style */}
          <div className="hero-brand-container">
            <h1 className="hero-brand-title">DECOR LAB</h1>
          </div>

          {/* Pulsing Scroll Pointer */}
          <div className={`scroll-indicator ${isScrolled ? "hide" : ""}`} id="scroll-ind">
            <span>Scroll</span>
            <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path d="M7.41 8.59L12 13.17l4.59-4.58L18 10l-6 6-6-6 1.41-1.41z" />
            </svg>
          </div>

          {/* Fanned-out overlapping project cards matching the video */}
          <div className="hero-cards-outer">
            <div className="hero-cards-container">
              <div
                className={`hero-fanned-card ${activeSlide === 0 ? "active" : ""}`}
                role="button"
                aria-label="View Project 1"
                tabIndex={0}
                onClick={() => setActiveSlide(0)}
              >
                <img src="/assets/projects/santhalia_site/image_1.jpg" alt="Santhalia Residence Preview" />
              </div>
              <div
                className={`hero-fanned-card ${activeSlide === 1 ? "active" : ""}`}
                role="button"
                aria-label="View Project 2"
                tabIndex={0}
                onClick={() => setActiveSlide(1)}
              >
                <img src="/assets/projects/site_01/image_1.jpg" alt="Corporate HQ Preview" />
              </div>
              <div
                className={`hero-fanned-card ${activeSlide === 2 ? "active" : ""}`}
                role="button"
                aria-label="View Project 3"
                tabIndex={0}
                onClick={() => setActiveSlide(2)}
              >
                <img src="/assets/projects/site_02/image_1.jpg" alt="Fluid Pavilion Preview" />
              </div>
              <div
                className={`hero-fanned-card ${activeSlide === 3 ? "active" : ""}`}
                role="button"
                aria-label="View Project 4"
                tabIndex={0}
                onClick={() => setActiveSlide(3)}
              >
                <img src="/assets/projects/photos_set1/image_1.jpg" alt="Aesthetic Lounge Preview" />
              </div>
              <div
                className={`hero-fanned-card ${activeSlide === 0 ? "active" : ""}`}
                role="button"
                aria-label="View Project 5"
                tabIndex={0}
                onClick={() => setActiveSlide(0)}
              >
                <img src="/assets/projects/santhalia_site/image_2.jpg" alt="Residential Detail Preview" />
              </div>
            </div>
          </div>
        </section>

        {/* ====================================================
         * SECTION 2: REDESIGNED ABOUT US SECTION (Reinette Style)
         * ==================================================== */}
        <section id="info" className="section-about-dark">
          <div className="about-grid-container">
            
            {/* Left Column: Title, Image, Stats */}
            <div className="about-left-col">
              <div className="about-title-wrapper">
                <span className="about-title-dot"></span>
                <span className="founder-title" style={{ fontSize: "0.85rem", letterSpacing: "2.5px", margin: 0, color: "var(--text-light)" }}>
                  ABOUT US
                </span>
              </div>

              <div className="about-left-image">
                <img src="/assets/projects/site_01/image_2.jpg" alt="Decor Lab Office Consultation" />
              </div>

              {/* Statistics Grid */}
              <div className="about-stats-grid">
                <div className="about-stat-item">
                  <span className="about-stat-num" data-target="32" data-suffix="+">0+</span>
                  <span className="about-stat-label">Years Legacy</span>
                </div>
                <div className="about-stat-item">
                  <span className="about-stat-num" data-target="1.3" data-suffix="k+" data-decimals="1">0.0k+</span>
                  <span className="about-stat-label">Sites Completed</span>
                </div>
                <div className="about-stat-item">
                  <span className="about-stat-num" data-target="15" data-suffix="+">0+</span>
                  <span className="about-stat-label">Awards Won</span>
                </div>
                <div className="about-stat-item">
                  <span className="about-stat-num" data-target="275" data-suffix="+">0+</span>
                  <span className="about-stat-label">Professionals</span>
                </div>
              </div>
            </div>

            {/* Right Column: Narrative & Showcase Image */}
            <div className="about-right-col">
              <div style={{ display: "flex", flexDirection: "column", gap: "2rem" }}>
                <h2 className="about-right-headline">
                  Thoughtful spaces, we craft environments that bring comfort to your life.
                </h2>
                <p className="about-right-body">
                  Decor Lab is a premier architecture and interior design powerhouse established in 1993. Guided by Mr. Raja Sinha and chief architect Ar. Rajdip Sinha, the firm has delivered exceptional residential, commercial, and conceptual design sanctuaries across India. We believe in functionality first—blending material innovation and parametric design to craft fluid, timeless environments.
                </p>
              </div>

              <div className="about-right-image">
                <img src="/assets/projects/site_02/image_2.jpg" alt="Bespoke Spatial Design Showcase" />
              </div>
            </div>

          </div>
        </section>

        {/* ====================================================
         * SECTION 2B: PROCESS (Creating with us is easy)
         * ==================================================== */}
        <section id="process" className="editorial-section">
          <div className="editorial-container">
            <h2 className="serif-headline">Creating with us is easy.</h2>
            
            <div className="editorial-steps-grid">
              <div className="step-card-new">
                <div className="step-card-num">01</div>
                <div className="step-card-content">
                  <h4 className="step-card-title">CONTACT US</h4>
                  <p className="step-card-desc">
                    We work hand in hand with clients and collaborators. Commercial or residential, simply reach out to get a conversation going. No project is too complex or too simple.
                  </p>
                </div>
                <div className="step-card-preview-frame">
                  <img src="/assets/projects/santhalia_site/image_5.jpg" alt="Contact Us Preview" />
                </div>
              </div>

              <div className="step-card-new">
                <div className="step-card-num">02</div>
                <div className="step-card-content">
                  <h4 className="step-card-title">CONSULTATION</h4>
                  <p className="step-card-desc">
                    We evaluate your spatial needs, translating your vision into functional plans. We inspect the site to align layout, lighting, materials, and execution logistics from the very start.
                  </p>
                </div>
                <div className="step-card-preview-frame">
                  <img src="/assets/projects/site_01/image_2.jpg" alt="Consultation Preview" />
                </div>
              </div>

              <div className="step-card-new">
                <div className="step-card-num">03</div>
                <div className="step-card-content">
                  <h4 className="step-card-title">DESIGN & VISUALIZATION</h4>
                  <p className="step-card-desc">
                    We finalize material specs, lighting designs, and custom joinery. Photorealistic 3D renders help visualize the space, ensuring complete confidence before execution starts.
                  </p>
                </div>
                <div className="step-card-preview-frame">
                  <img src="/assets/projects/site_02/image_2.jpg" alt="Design Render Preview" />
                </div>
              </div>

              <div className="step-card-new">
                <div className="step-card-num">04</div>
                <div className="step-card-content">
                  <h4 className="step-card-title">ON-SITE EXECUTION</h4>
                  <p className="step-card-desc">
                    Our team of 275+ professionals manages complete end-to-end site execution. From structural modifications to custom curation, we deliver a seamless, hassle-free transition.
                  </p>
                </div>
                <div className="step-card-preview-frame">
                  <img src="/assets/projects/site_01/image_1.jpg" alt="Execution Preview" />
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ====================================================
         * SECTION 2C: CURATED PROJECTS (Editorial Gallery Grid)
         * ==================================================== */}
        <section id="collection" className="editorial-section" style={{ borderTop: "none" }}>
          <div className="editorial-container">
            <div className="editorial-gallery-grid">
              <div className="gallery-text-col">
                <h4 className="studio-subtitle" style={{ textAlign: "left" }}>COLLECTION</h4>
                <h2 className="serif-headline" style={{ marginBottom: "1rem" }}>Curated Spaces</h2>
                <p className="step-desc" style={{ fontSize: "1.05rem" }}>
                  Step inside our curated spaces where art, material honesty, and light merge to redefine modern luxury living and working environments.
                </p>
                <a href="#showcase" className="pill-btn-editorial">View Showcase</a>
                
                {/* Secondary offset image in text column */}
                <div className="gallery-image-wrapper gallery-image-small reveal-gallery-img" style={{ marginTop: "4rem" }}>
                  <img src="/assets/projects/photos_set1/image_3.jpg" alt="Tactile studies in linen pillows" />
                  <div className="gallery-caption">
                    <span>Linen & Cushion Textures</span>
                    <div className="arrow-circle" />
                  </div>
                </div>
              </div>

              <div className="gallery-image-wrapper gallery-image-large reveal-gallery-img">
                <img src="/assets/projects/photos_set1/image_2.jpg" alt="Curved lounge interior concepts" />
                <div className="gallery-caption">
                  <span>Signature Residential Lounge / Kolkata</span>
                  <div className="arrow-circle" />
                </div>
              </div>
            </div>

            {/* Bottom Offset Row */}
            <div className="gallery-offset-row">
              <div className="gallery-image-wrapper gallery-image-medium reveal-gallery-img">
                <img src="/assets/projects/photos_set1/image_4.jpg" alt="Stark concrete and curved lines" />
                <div className="gallery-caption">
                  <span>Abstract Dining Modules</span>
                  <div className="arrow-circle" />
                </div>
              </div>

              <div className="gallery-image-wrapper gallery-image-medium reveal-gallery-img" style={{ alignSelf: "flex-start" }}>
                <img src="/assets/projects/photos_set2/image_2.jpg" alt="Oak platform bed sunlit" />
                <div className="gallery-caption">
                  <span>Shadows & Light</span>
                  <div className="arrow-circle" />
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ====================================================
         * SECTION 2D: RECENT COLLABS (Human NYC showcase)
         * ==================================================== */}
        <section className="editorial-section cashmere-bg">
          <div className="editorial-container">
            <div className="collabs-grid">
              <div className="collab-left">
                <h4 className="studio-subtitle" style={{ textAlign: "left" }}>DESIGN PARTNERSHIPS</h4>
                <h2 className="serif-headline" style={{ lineHeight: "1" }}>
                  RECENT COLLABS<br />
                  <span className="serif-subtitle" style={{ fontSize: "3rem", display: "block", marginTop: "1rem" }}>Häfele Curation</span>
                </h2>
                <p className="step-desc drop-cap" style={{ fontSize: "1.05rem" }}>
                  Collaborating with international pioneers to bring smart hardware, premium fittings, and material innovations into our interior architectures. Seamlessly matching top-tier technology with handcrafted wooden elements.
                </p>
                <a href="#showcase" className="pill-btn-editorial">Explore Curation</a>
              </div>

              <div className="collab-right">
                <div className="gallery-image-wrapper gallery-image-large" style={{ height: "450px" }}>
                  <img src="/assets/projects/photos_set2/image_3.jpg" alt="White geometric spheres art gallery install" />
                  <div className="gallery-caption">
                    <span>Decor Lab x Häfele Star Awards Curation</span>
                    <div className="arrow-circle" />
                  </div>
                </div>

                <div className="collab-images-row">
                  <div className="gallery-image-wrapper gallery-image-medium" style={{ height: "280px" }}>
                    <img src="/assets/projects/photos_set2/image_4.jpg" alt="Concrete study and shadow" />
                    <div className="gallery-caption">
                      <span>Detail & Texture Studies</span>
                      <div className="arrow-circle" />
                    </div>
                  </div>
                  <div className="gallery-image-wrapper gallery-image-medium" style={{ height: "280px" }}>
                    <img src="/assets/projects/site_02/image_1.jpg" alt="Inflatable dome yellow view" />
                    <div className="gallery-caption">
                      <span>Fluid Forms / Ongoing Curation</span>
                      <div className="arrow-circle" />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ====================================================
         * SECTION 2E: PRESS & PUBLICATION (Elle Decor highlight)
         * ==================================================== */}
        <section className="editorial-section">
          <div className="editorial-container">
            <div className="press-grid">
              <div className="gallery-image-wrapper press-left">
                <img src="/assets/projects/site_01/image_1.jpg" alt="Ribbed walking canopy interior" />
                <div className="gallery-caption">
                  <span>Decor Lab Featured Cover / Elle Decor</span>
                  <div className="arrow-circle" />
                </div>
              </div>

              <div className="press-right">
                <h4 className="studio-subtitle" style={{ textAlign: "left" }}>PUBLICATIONS</h4>
                <h2 className="serif-headline" style={{ lineHeight: "1" }}>
                  AS SEEN IN...<br />
                  <span className="serif-subtitle" style={{ fontSize: "3rem", display: "block", marginTop: "1rem" }}>Elle Decor</span>
                </h2>
                
                <blockquote className="press-quote">
                  "Decor Lab blends heritage, organic curves, and 'functionality first' planning to create habitable sculptures that redefine contemporary Indian spaces."
                </blockquote>

                <p className="step-desc drop-cap" style={{ fontSize: "1rem" }}>
                  A detailed feature highlighting our Kolkata-based design studio, celebrating three decades of design excellence, luxury residential portfolios, and our cutting-edge outlook on fluid architecture.
                </p>
                
                <a href="#info" className="pill-btn-editorial">Read Full Feature</a>
              </div>
            </div>
          </div>
        </section>

        <Gallery isPreloaded={isPreloaded} />

        {/* ====================================================
         * SECTION 2F: PROJECTS SHOWCASE (Tabs & Gallery)
         * ==================================================== */}
        <section id="showcase" className="section-showcase">
          <div className="showcase-container">
            <div className="showcase-header">
              <h4 className="studio-subtitle">PROJECTS</h4>
              <h2 className="serif-headline" style={{ fontSize: "3rem" }}>Site Portfolio</h2>
            </div>

            {/* Tab Selection */}
            <div className="showcase-tabs">
              {projectsData.map((project) => (
                <button
                  key={project.id}
                  className={`showcase-tab ${activeProjectTab === project.id ? "active" : ""}`}
                  onClick={() => setActiveProjectTab(project.id)}
                >
                  {project.title}
                </button>
              ))}
            </div>

            {/* Tab Content Display */}
            {projectsData.map((project) => {
              if (project.id !== activeProjectTab) return null;
              return (
                <div key={project.id} className="showcase-content-grid">
                  <div className="showcase-info-panel">
                    <span className="showcase-project-location">{project.location}</span>
                    <h3 className="showcase-project-title">{project.title}</h3>
                    <p className="showcase-project-desc">{project.description}</p>
                  </div>

                  <div className="showcase-gallery-grid">
                    {project.images.map((img, index) => (
                      <div
                        key={index}
                        className="showcase-gallery-item"
                        onClick={() => setLightboxProject({
                          siteName: project.title,
                          images: project.images,
                          activeIndex: index
                        })}
                      >
                        <img src={img} alt={`${project.title} gallery shot ${index + 1}`} />
                      </div>
                    ))}
                  </div>
                </div>
              );
            })}
          </div>
        </section>

        {/* ====================================================
         * SECTION 3: WORK PORTFOLIO (Horizontal Scroll Catalogue)
         * ==================================================== */}
        {/*
        <section ref={scrollWrapperRef} id="work" className="portfolio-horizontal-wrapper">
          <div ref={runningTextRef} className="portfolio-running-text">
            DESIGN . ARCHITECTURE . CURATION . DECORLAB
          </div>

          <div className="portfolio-intro-panel">
            <h4 className="studio-subtitle" style={{ textAlign: "left" }}>
              PORTFOLIO
            </h4>
            <h2 className="studio-headline" style={{ textAlign: "left", fontSize: "2.25rem" }}>
              Flagship Curation
            </h2>
            <p className="portfolio-intro-desc">
              Explore our landmark residential, commercial, and conceptual design projects delivered across Kolkata and other metropolitan hubs in India.
            </p>

            <div className="portfolio-filter-pills">
              {["All Projects", "Residential", "Corporate", "Conceptual"].map((cat) => (
                <span
                  key={cat}
                  className={`filter-pill ${cat === "All Projects" ? "active" : ""}`}
                  onClick={() => handleFilterPillClick(cat)}
                >
                  {cat}
                </span>
              ))}
            </div>
          </div>

          <div ref={scrollTrackRef} className="portfolio-scroll-track" id="portfolio-track">
            <div className="horizontal-nube-card">
              <div className="nube-capsule-image-frame">
                <img src="/assets/projects/santhalia_site/image_1.jpg" alt="Santhalia Residence Kolkata" />
              </div>
              <div className="nube-capsule-info">
                <div className="nube-capsule-meta">
                  <span>Residential</span>
                  <span>Kolkata</span>
                </div>
                <h3 className="nube-capsule-name">Santhalia Home</h3>
                <p className="nube-capsule-desc">
                  Award-winning warm minimalist villa integrating natural linen, plaster, and signature ombre curtains.
                </p>
                <button className="nube-btn" onClick={() => setSelectedNube(0)}>
                  Design Specs
                </button>
              </div>
            </div>

            <div className="horizontal-nube-card">
              <div className="nube-capsule-image-frame">
                <img src="/assets/projects/site_01/image_1.jpg" alt="Corporate Headquarters Workspace" />
              </div>
              <div className="nube-capsule-info">
                <div className="nube-capsule-meta">
                  <span>Corporate</span>
                  <span>Kolkata</span>
                </div>
                <h3 className="nube-capsule-name">Corporate HQ</h3>
                <p className="nube-capsule-desc">
                  Premium commercial space incorporating parametric timber paneling and biophilic lighting design.
                </p>
                <button className="nube-btn" onClick={() => setSelectedNube(1)}>
                  Design Specs
                </button>
              </div>
            </div>

            <div className="horizontal-nube-card">
              <div className="nube-capsule-image-frame">
                <img src="/assets/projects/site_02/image_1.jpg" alt="Fluid Architecture Concept" />
              </div>
              <div className="nube-capsule-info">
                <div className="nube-capsule-meta">
                  <span>Conceptual</span>
                  <span>Mumbai</span>
                </div>
                <h3 className="nube-capsule-name">Fluid Pavilion</h3>
                <p className="nube-capsule-desc">
                  Futuristic double-curvature structure showcasing Parametric Design and fluid architecture ideas.
                </p>
                <button className="nube-btn" onClick={() => setSelectedNube(2)}>
                  Design Specs
                </button>
              </div>
            </div>

            <div className="horizontal-nube-card">
              <div className="nube-capsule-image-frame">
                <img src="/assets/projects/photos_set1/image_1.jpg" alt="Aesthetic Lounge Design" />
              </div>
              <div className="nube-capsule-info">
                <div className="nube-capsule-meta">
                  <span>Residential</span>
                  <span>Bengaluru</span>
                </div>
                <h3 className="nube-capsule-name">Aesthetic Lounge</h3>
                <p className="nube-capsule-desc">
                  Mediterranean plaster study exploring scale, soft ambient light, and organic seating curation.
                </p>
                <button className="nube-btn" onClick={() => setSelectedNube(3)}>
                  Design Specs
                </button>
              </div>
            </div>
          </div>
        </section>
        */}

        {/* ====================================================
         * SECTION 4: CAPABILITIES & ENGINEERING
         * ==================================================== */}
        <section className="section-capabilities">
          <div className="capabilities-container">
            <div className="capabilities-header">
              <h4 className="studio-subtitle" style={{ color: "var(--text-muted)" }}>
                PHILOSOPHY
              </h4>
              <h2 className="capabilities-title">Our Design Approach</h2>
            </div>

            <div className="capabilities-grid">
              {/* Functionality First */}
              <div className="cap-card cap-card-functionality">
                <span className="cap-num">01</span>
                <div className="cap-divider" />
                <div className="cap-icon cap-icon-compass">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="w-6 h-6">
                    <circle cx="12" cy="5" r="2" />
                    <path d="M12 7L6 21M12 7l6 14M9 14h6" />
                  </svg>
                </div>
                <h3 className="cap-name">Functionality First</h3>
                <p className="cap-desc">
                  We verify that every layout is highly usable and ergonomically optimized before introducing decorative styling.
                </p>
              </div>

              {/* Material Innovation */}
              <div className="cap-card cap-card-materials">
                <span className="cap-num">02</span>
                <div className="cap-divider" />
                <div className="cap-icon cap-icon-materials">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="w-6 h-6">
                    {/* Layered Slabs */}
                    <path d="M3 16l9 4.5 9-4.5-9-4.5z" />
                    <g>
                      <path d="M3 11l9 4.5 9-4.5-9-4.5z" opacity="0.75" />
                    </g>
                    <path d="M3 6l9 4.5 9-4.5-9-4.5z" opacity="0.4" strokeDasharray="2 2" />
                  </svg>
                </div>
                <h3 className="cap-name">Material Innovation</h3>
                <p className="cap-desc">
                  Emphasizing raw textures, natural finishes, and innovative pairings that age gracefully and stand the test of time.
                </p>
              </div>

              {/* Fluid Architecture */}
              <div className="cap-card cap-card-fluid">
                <span className="cap-num">03</span>
                <div className="cap-divider" />
                <div className="cap-icon cap-icon-fluid">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="w-6 h-6">
                    {/* Parametric Wave Curves */}
                    <path d="M2 17c5-5 10 5 15-5 5-5 5 5 5 5" />
                    <path d="M2 12c5-5 10 5 15-5 5-5 5 5 5 5" opacity="0.7" />
                    <path d="M2 7c5-5 10 5 15-5 5-5 5 5 5 5" opacity="0.4" />
                  </svg>
                </div>
                <h3 className="cap-name">Fluid Architecture</h3>
                <p className="cap-desc">
                  Challenging box-like conventions with organic curves, parametric surfaces, and continuous spatial geometries.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* ====================================================
         * SECTION 5: INSTAGRAM FEED SHOWCASE (@decorlab.in)
         * ==================================================== */}
        <section id="instagram" className="section-instagram">
          <div className="instagram-header">
            <div className="instagram-avatar-wrapper">
              <div className="instagram-avatar">
                <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <circle cx="8" cy="14" r="4.5" />
                  <circle cx="16" cy="14" r="4.5" />
                  <circle cx="12" cy="8" r="4.5" />
                </svg>
              </div>
            </div>

            <div className="instagram-profile-info">
              <div className="insta-username-row">
                <h2 className="insta-username">decorlab.in</h2>
                <span className="insta-verified" title="Verified Account">
                  <svg viewBox="0 0 24 24">
                    <path d="M12 2C6.5 2 2 6.5 2 12s4.5 10 10 10 10-4.5 10-10S17.5 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z" />
                  </svg>
                </span>
                <a
                  href="https://www.instagram.com/decorlab.in?igsh=MWluaGo2OXZtbzBsOQ=="
                  target="_blank"
                  rel="noopener noreferrer"
                  className="insta-follow-btn"
                >
                  Follow
                </a>
              </div>

              <div className="insta-stats-row">
                <div className="insta-stat">
                  <span>142</span> posts
                </div>
                <div className="insta-stat">
                  <span>42.8k</span> followers
                </div>
                <div className="insta-stat">
                  <span>249</span> following
                </div>
              </div>

              <div className="insta-bio">
                <span className="insta-bio-name">Decor Lab</span>
                <br />
                Curated Architecture & Minimalist Interior Curation. Delivering timeless spaces across India since 1993.
                <br />
                <a
                  href="https://www.instagram.com/decorlab.in?igsh=MWluaGo2OXZtbzBsOQ=="
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{ color: "var(--accent-color)", fontWeight: 600, textDecoration: "underline" }}
                >
                  decorlab.in
                </a>
              </div>
            </div>
          </div>

          {/* Post Grid */}
          <div className="instagram-grid">
            {instaPosts.map((post, idx) => (
              <div
                key={idx}
                className="instagram-card"
                role="button"
                aria-label={`View Instagram post ${idx + 1}`}
                tabIndex={0}
                onClick={() => setSelectedInsta(idx)}
                onKeyDown={(e) => {
                  if (e.key === "Enter" || e.key === " ") {
                    e.preventDefault();
                    setSelectedInsta(idx);
                  }
                }}
              >
                <img src={post.img} alt={`Mock Decor Instagram Post ${idx + 1}`} />
                <div className="instagram-overlay">
                  <div className="insta-overlay-stat">
                    <svg viewBox="0 0 24 24">
                      <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
                    </svg>
                    <span>{post.likes}</span>
                  </div>
                  <div className="insta-overlay-stat">
                    <svg viewBox="0 0 24 24">
                      <path d="M20 2H4c-1.1 0-1.99.9-1.99 2L2 22l4-4h14c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2zM6 9h12v2H6V9zm8 5H6v-2h8v2zm4-6H6V6h12v2z" />
                    </svg>
                    <span>{post.comments}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* ====================================================
         * SECTION 6: NEWSLETTER SUBSCRIPTION
         * ==================================================== */}
        {/*
        <section className="section-newsletter">
          <div className="news-box">
            <h3 className="news-title">Stay Inspired</h3>
            <p className="news-desc">
              Subscribe to receive our latest design catalogs, project walk-throughs, and structural design updates.
            </p>
            {!newsletterSubscribed ? (
              <form className="news-form" id="newsletter-form" onSubmit={handleNewsletterSubmit}>
                <input
                  type="email"
                  className="news-input"
                  placeholder="Your Email Address"
                  aria-label="Email Input"
                  required
                />
                <button type="submit" className="news-submit">
                  Subscribe
                </button>
              </form>
            ) : (
              <div className="news-success" style={{ display: "block" }}>
                Thank you! We will keep you updated with our latest design insights.
              </div>
            )}
          </div>
        </section>
        */}

        <Feedback />
        <FooterBanner isPreloaded={isPreloaded} />

        {/* ====================================================
         * SECTION 7: STUDIO DETAILED FOOTER
         * ==================================================== */}
        <footer id="contact-footer" className="section-footer">
          <div className="footer-container">
            <div className="footer-top">
              <div className="footer-brand">
                <div className="footer-logo">
                  <img src="/assets/Decorlab final-01-trans.png" alt="Decor Lab Logo" className="footer-logo-img" style={{ maxHeight: "36px", marginRight: "12px" }} />
                  <span className="footer-logo-text" style={{ display: "none" }}>Decor Lab</span>
                </div>
                <p className="footer-desc">
                  Kolkata-based architecture and interior design powerhouse artfully blending legacy with design innovation since 1993.
                </p>
              </div>

              <div>
                <h4 className="footer-col-title">Inquiries</h4>
                <ul className="footer-links-list">
                  <li>
                    <a href="mailto:info@decorlab.co.in">info@decorlab.co.in</a>
                  </li>
                  <li>
                    <a href="tel:+913324648000">+91 33 2464 8000</a>
                  </li>
                </ul>
              </div>

              <div>
                <h4 className="footer-col-title">Studio</h4>
                <ul className="footer-links-list">
                  <li style={{ fontSize: "0.95rem", lineHeight: 1.5, color: "var(--text-dark)" }}>
                    Kolkata, West Bengal,
                    <br />
                    India
                  </li>
                </ul>
              </div>

              <div>
                <h4 className="footer-col-title">Socials</h4>
                <ul className="footer-links-list">
                  <li>
                    <a href="https://instagram.com/decorlab.in?igsh=MWluaGo2OXZtbzBsOQ==" target="_blank" rel="noopener noreferrer">
                      Instagram
                    </a>
                  </li>
                  <li>
                    <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer">
                      LinkedIn
                    </a>
                  </li>
                </ul>
              </div>
            </div>

            <div className="footer-bottom">
              <p>&copy; 2026 Decor Lab. All rights reserved.</p>
              <div className="footer-bottom-links">
                <a href="#privacy">Privacy Policy</a>
                <a href="#legal">Legal Notice</a>
                <a href="#cookies">Cookies Policy</a>
              </div>
            </div>
          </div>
        </footer>
      </main>

      {/* ====================================================
       * TECHNICAL SPECIFICATIONS MODAL / DRAWER
       * ==================================================== */}
      {selectedNube !== null && (
        <>
          <div
            className="specs-overlay active"
            id="specs-overlay"
            role="presentation"
            onClick={() => setSelectedNube(null)}
          ></div>
          <div
            className="specs-drawer active"
            id="specs-drawer"
            role="dialog"
            aria-labelledby="drawer-title"
            aria-modal="true"
          >
            <button
              className="drawer-close"
              id="drawer-close-btn"
              aria-label="Close specifications dialog"
              onClick={() => setSelectedNube(null)}
              autoFocus
            >
              <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z" />
              </svg>
            </button>

            <div className="drawer-header">
              <span className="drawer-subtitle" id="drawer-nube-model">
                {nubeSpecs[selectedNube].model}
              </span>
              <h2 className="drawer-title" id="drawer-nube-name">
                {nubeSpecs[selectedNube].name}
              </h2>
            </div>

            {/* Stats Table Grid */}
            <div className="drawer-specs-list">
              <div className="drawer-spec-item">
                <span className="drawer-spec-key">Design Concept</span>
                <span className="drawer-spec-val" id="spec-structure">
                  {nubeSpecs[selectedNube].structure}
                </span>
              </div>
              <div className="drawer-spec-item">
                <span className="drawer-spec-key">Project Location</span>
                <span className="drawer-spec-val" id="spec-exterior">
                  {nubeSpecs[selectedNube].exterior}
                </span>
              </div>
              <div className="drawer-spec-item">
                <span className="drawer-spec-key">Total Built Area</span>
                <span className="drawer-spec-val" id="spec-interior">
                  {nubeSpecs[selectedNube].interior}
                </span>
              </div>
              <div className="drawer-spec-item">
                <span className="drawer-spec-key">Completion Year</span>
                <span className="drawer-spec-val" id="spec-height">
                  {nubeSpecs[selectedNube].height}
                </span>
              </div>
              <div className="drawer-spec-item">
                <span className="drawer-spec-key">Key Design Focus</span>
                <span className="drawer-spec-val" id="spec-capacity">
                  {nubeSpecs[selectedNube].capacity}
                </span>
              </div>
              <div className="drawer-spec-item">
                <span className="drawer-spec-key">Bespoke Elements</span>
                <span className="drawer-spec-val" id="spec-access">
                  {nubeSpecs[selectedNube].access}
                </span>
              </div>
            </div>

            {/* Blueprint image panel */}
            <div className="drawer-blueprint">
              <div className="blueprint-img-wrapper">
                <img
                  id="drawer-blueprint-img"
                  src={nubeSpecs[selectedNube].img}
                  alt="Visual schematic blueprint"
                />
              </div>
              <p className="blueprint-desc">
                Pneumatic double-membrane projection-mapping optimized shell. Structure requires continuous
                low-pressure airflow.
              </p>
            </div>
          </div>
        </>
      )}

      {/* ====================================================
       * @decorlab.in INSTAGRAM LIGHTBOX MODAL
       * ==================================================== */}
      {selectedInsta !== null && (
        <>
          <div
            className="insta-lightbox-overlay active"
            id="insta-lightbox-overlay"
            role="presentation"
            onClick={() => setSelectedInsta(null)}
          ></div>
          <div
            className="insta-lightbox active"
            id="insta-lightbox"
            role="dialog"
            aria-labelledby="lightbox-username"
            aria-modal="true"
          >
            <button
              className="lightbox-close"
              id="lightbox-close-btn"
              aria-label="Close post lightbox"
              onClick={() => setSelectedInsta(null)}
              autoFocus
            >
              <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z" />
              </svg>
            </button>

            {/* Image container */}
            <div className="lightbox-image-panel">
              <img id="lightbox-img" src={instaPosts[selectedInsta].img} alt="Instagram Post Full Size" />
            </div>

            {/* Detailed Info Column */}
            <div className="lightbox-details-panel">
              {/* Profile Header */}
              <div className="lightbox-profile-header">
                <div className="lightbox-profile-left">
                  <div className="lightbox-avatar">
                    <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <circle cx="8" cy="14" r="4.5" />
                      <circle cx="16" cy="14" r="4.5" />
                      <circle cx="12" cy="8" r="4.5" />
                    </svg>
                  </div>
                  <div className="lightbox-profile-text">
                    <span className="lightbox-username">decorlab.in</span>
                    <span className="lightbox-location">Kolkata, India</span>
                  </div>
                  <span className="insta-verified" style={{ marginLeft: "6px" }}>
                    <svg viewBox="0 0 24 24" style={{ width: "14px", height: "14px" }}>
                      <path
                        d="M12 2C6.5 2 2 6.5 2 12s4.5 10 10 10 10-4.5 10-10S17.5 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"
                        fill="#0095f6"
                      />
                    </svg>
                  </span>
                </div>
              </div>

              {/* Comments scroll box */}
              <div className="lightbox-comments-scroll" id="lightbox-comments-scroll">
                {/* Main post caption */}
                <div className="lightbox-comment-row">
                  <div className="comment-avatar">DL</div>
                  <div className="comment-text-box">
                    <p>
                      <span className="comment-user">decorlab.in</span>{" "}
                      <span className="comment-txt" id="lightbox-caption">
                        {instaPosts[selectedInsta].caption}
                      </span>
                    </p>
                    <span className="comment-time">2 hours ago</span>
                  </div>
                </div>

                {/* Simulated Comment 1 */}
                <div className="lightbox-comment-row">
                  <div className="comment-avatar">AM</div>
                  <div className="comment-text-box">
                    <p>
                      <span className="comment-user">architect_kolkata</span>{" "}
                      <span className="comment-txt">
                        This organic curves layout is absolutely breathtaking! Elegant design.
                      </span>
                    </p>
                    <span className="comment-time">1 hour ago</span>
                  </div>
                </div>

                {/* Simulated Comment 2 */}
                <div className="lightbox-comment-row">
                  <div className="comment-avatar">SD</div>
                  <div className="comment-text-box">
                    <p>
                      <span className="comment-user">studio_decor</span>{" "}
                      <span className="comment-txt">
                        The warm sunlight reflections are gorgeous. What a curation!
                      </span>
                    </p>
                    <span className="comment-time">45 mins ago</span>
                  </div>
                </div>
              </div>

              {/* Actions Footer */}
              <div className="lightbox-action-footer">
                <div className="lightbox-actions-row">
                  <span className="lightbox-likes-count" id="lightbox-likes">
                    {instaPosts[selectedInsta].likes} likes
                  </span>
                  <span style={{ color: "rgba(255, 255, 255, 0.45)", fontSize: "0.8rem" }}>
                    {instaPosts[selectedInsta].comments} comments
                  </span>
                </div>

                <a
                  href="https://www.instagram.com/decorlab.in?igsh=MWluaGo2OXZtbzBsOQ=="
                  target="_blank"
                  rel="noopener noreferrer"
                  className="lightbox-btn-insta"
                >
                  View on Instagram
                </a>
            </div>
          </div>
        </div>
      </>
    )}

      {/* ====================================================
       * PORTFOLIO PROJECT GALLERY LIGHTBOX MODAL
       * ==================================================== */}
      {lightboxProject !== null && (
        <>
          <div
            className="project-lightbox-overlay"
            role="presentation"
            onClick={() => setLightboxProject(null)}
          ></div>
          <div
            className="project-lightbox"
            role="dialog"
            aria-label="Project image viewer"
            aria-modal="true"
          >
            <button
              className="project-lightbox-close"
              aria-label="Close image viewer"
              onClick={() => setLightboxProject(null)}
              autoFocus
            >
              <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z" />
              </svg>
            </button>

            <button
              className="project-lightbox-prev"
              aria-label="Previous image"
              onClick={(e) => {
                e.stopPropagation();
                setLightboxProject(prev => {
                  if (!prev) return null;
                  const newIndex = (prev.activeIndex - 1 + prev.images.length) % prev.images.length;
                  return { ...prev, activeIndex: newIndex };
                });
              }}
            >
              <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path d="M15.41 7.41L14 6l-6 6 6 6 1.41-1.41L10.83 12z" />
              </svg>
            </button>

            <img
              src={lightboxProject.images[lightboxProject.activeIndex]}
              alt={`${lightboxProject.siteName} photo`}
              onClick={(e) => e.stopPropagation()}
            />

            <button
              className="project-lightbox-next"
              aria-label="Next image"
              onClick={(e) => {
                e.stopPropagation();
                setLightboxProject(prev => {
                  if (!prev) return null;
                  const newIndex = (prev.activeIndex + 1) % prev.images.length;
                  return { ...prev, activeIndex: newIndex };
                });
              }}
            >
              <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path d="M10 6L8.59 7.41 13.17 12l-4.58 4.59L10 18l6-6z" />
              </svg>
            </button>

            <div className="project-lightbox-caption">
              <span>{lightboxProject.siteName} — Image {lightboxProject.activeIndex + 1} of {lightboxProject.images.length}</span>
            </div>
          </div>
        </>
      )}
    </>
  );
}
