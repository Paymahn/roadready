"use client";

import { useEnquiry } from "@/context/EnquiryContext";
import HeroSection from "@/components/sections/HeroSection";
import InlineEnquiryForm from "@/components/InlineEnquiryForm";

import CareerSupport from "@/components/sections/CareerSupport";

import DriverShortage from "@/components/sections/DriverShortage";
import RecruitmentSupport from "@/components/sections/RecruitmentSupport";
import CoursePreview from "@/components/sections/CoursePreview";

// import SuccessStories from "@/components/sections/SuccessStories"; // Re-enable when real references / reviews are ready
import FAQ from "@/components/sections/FAQ";
import FinalCTA from "@/components/sections/FinalCTA";

export default function HomePage() {
  const { openEnquiry } = useEnquiry();
  return (
    <>
      <HeroSection onEnquire={openEnquiry} />
      <InlineEnquiryForm />
      {/* <SuccessStories /> — hidden until real graduate references are available */}
      <CareerSupport />
      <DriverShortage onEnquire={openEnquiry} />
      <RecruitmentSupport />

      <CoursePreview onEnquire={openEnquiry} />

      <FAQ />
      <FinalCTA onEnquire={openEnquiry} />
    </>
  );
}
