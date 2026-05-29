"use client";

import { useRef, useState } from 'react';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import ClickIndicator from './ClickIndicator';

gsap.registerPlugin(ScrollTrigger);

const FooterBanner = ({ isPreloaded = true }) => {
    const [active, setActive] = useState(false);
    const fbConRef = useRef(null);
    const fbImgRef = useRef(null);

    useGSAP(() => {
        if (!isPreloaded) return;
        if (!fbConRef.current || !fbImgRef.current) return;

        gsap.fromTo(fbImgRef.current,
            {
                scale: 1.2, // Initial scale
            },
            {
                scale: 1, // Final scale
                ease: "none",
                scrollTrigger: {
                    trigger: fbConRef.current,
                    start: "top bottom-=20%",
                    end: "bottom top+=20%",
                    scrub: true,
                }
            }
        );

        const bannerTexts = fbConRef.current.querySelectorAll("p, h2, a");
        if (bannerTexts.length > 0) {
            gsap.fromTo(bannerTexts,
                { y: 30, opacity: 0 },
                {
                    y: 0,
                    opacity: 1,
                    duration: 0.8,
                    stagger: 0.1,
                    ease: "power3.out",
                    scrollTrigger: {
                        trigger: fbConRef.current,
                        start: "top 85%",
                        end: "bottom 15%",
                        toggleActions: "play reverse play reverse",
                    }
                }
            );
        }

    }, { scope: fbConRef, dependencies: [isPreloaded] });

    return (
        <div ref={fbConRef} className="w-full h-dvh p-2">
            <div className="relative w-full h-full rounded-[2.5rem] bg-[#2D2D2D] overflow-hidden flex flex-col justify-center items-center p-8 md:p-16 lg:p-24 pb-20">
                <ClickIndicator active={active} />
                <img
                    onMouseEnter={() => setActive(true)}
                    onMouseLeave={() => setActive(false)}
                    ref={fbImgRef} 
                    src="/assets/projects/santhalia_site/image_1.jpg" 
                    alt="Decor Lab landmark residential project villa interior curation" 
                    className="w-full h-full object-cover absolute inset-0 z-0" 
                />

                {/* Dark Readability Overlay */}
                <div className="absolute inset-0 bg-black/60 z-[1]" />

                {/* Content Block */}
                <div className="relative z-10 max-w-4xl flex flex-col gap-5 items-center my-auto text-center">
                    <p className="text-[#b1a696] text-[0.7rem] font-bold uppercase tracking-widest">— Let's Create Your Sanctuary</p>
                    <h2 className="text-3xl sm:text-5xl lg:text-6xl font-black text-[#F7F4EF] leading-[1.1] uppercase tracking-tight text-center">
                        Ready to Design Your Next Masterpiece?
                    </h2>
                    
                    <p className="text-xs sm:text-base text-[#F7F4EF]/85 leading-relaxed max-w-2xl text-center font-light">
                        Get in touch with our Kolkata-based design studio. Let's collaborate to build your custom luxury residential villa, premium commercial workspace, or architectural design landmark.
                    </p>

                    {/* CTA Buttons */}
                    <div className="flex flex-wrap justify-center gap-4 mt-3 w-full">
                        <a 
                           href="/contact" 
                            className="px-6 py-3.5 bg-[#b1a696] hover:bg-[#968a78] text-[#1c1a19] rounded-full text-xs font-bold tracking-widest uppercase transition-all shadow-lg active:scale-95 text-center flex items-center gap-2"
                        >
                            ▸ Consult Our Studio →
                        </a>
                        <a 
                            href="/work" 
                            className="px-6 py-3.5 bg-transparent border border-[#F7F4EF] hover:bg-[#F7F4EF] hover:text-[#2D2D2D] text-[#F7F4EF] rounded-full text-xs font-bold tracking-widest uppercase transition-all active:scale-95 text-center flex items-center gap-2"
                        >
                            ▸ Explore Our Work ↓
                        </a>
                    </div>

                    {/* Supporting Line */}
                    <p className="text-[10px] text-[#F7F4EF]/70 font-semibold tracking-wide mt-2 text-center">
                        ✓ Bespoke custom planning. 30+ Years of design excellence. Trusted across Kolkata and major Indian hubs.
                    </p>
                </div>
            </div>
        </div>
    )
}

export default FooterBanner
