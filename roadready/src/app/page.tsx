"use client";

import { useEnquiry } from "@/context/EnquiryContext";
import HeroSection from "@/components/sections/HeroSection";
import InlineEnquiryForm from "@/components/InlineEnquiryForm";

import CareerSupport from "@/components/sections/CareerSupport";

import DriverShortage from "@/components/sections/DriverShortage";
import CoursePreview from "@/components/sections/CoursePreview";

import SuccessStories from "@/components/sections/SuccessStories";
import FAQ from "@/components/sections/FAQ";
import FinalCTA from "@/components/sections/FinalCTA";

export default function HomePage() {
  const { openEnquiry } = useEnquiry();
  return (
    <>
      <HeroSection onEnquire={openEnquiry} />
      <InlineEnquiryForm />
      <SuccessStories />
      <CareerSupport />
      <DriverShortage onEnquire={openEnquiry} />

      <CoursePreview onEnquire={openEnquiry} />

      <FAQ />
      <FinalCTA onEnquire={openEnquiry} />
    </>
  );
}
