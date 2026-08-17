'use client';
import Image from "next/image";
import posthog from "posthog-js";

export const ExploreBtn = () => {
    return (
        <button
            type="button"
            id="explore-btn"
            className="mt-7 mx-auto flex items-center gap-3 rounded-full px-6 py-3 transition-all duration-300 ease-out hover:-translate-x-1 hover:shadow-lg hover:shadow-white/10 active:scale-95"
            onClick={() => {
                console.log("Button Clicked!");
                posthog.capture('explore_clicked');
            }}
        >
            <a href="#events" className="transition-colors duration-300">
                Explore Events
            </a>

            <Image
                src="/icons/arrow-down.svg"
                alt="arrow"
                width={24}
                height={24}
                className="transition-transform duration-300 group-hover:translate-y-1"
            />
        </button>
    )
}

export default ExploreBtn;