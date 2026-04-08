"use client";
import BannerSection from "@/components/pages/about/BannerSection";
import StorySection from "@/components/pages/about/StorySection";
import TeamSection from "@/components/pages/about/TeamSection";
import ValuesSection from "@/components/pages/about/ValuesSection";
import React from "react";

const AboutPage = () => {
    return (
        <>
            <BannerSection />
            <ValuesSection />
            <StorySection />
            <TeamSection />
        </>
    );
};

export default AboutPage;
