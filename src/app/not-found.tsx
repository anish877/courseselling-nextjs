'use client'

import React from "react";
import { Meteors } from "@/components/ui/meteros"; // Assuming this is a custom component you have
import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function NotFoundPage() {
  return (
    <div className="relative h-screen w-full flex items-center justify-center bg-gradient-to-r from-black to-gray-900 overflow-hidden select-none">
      {/* Meteor Animation */}
      <Meteors number={20} />

      {/* Content Area */}
      <div className="z-10 flex flex-col items-center justify-center text-center text-white space-y-6 px-6 md:px-12">
        {/* Error Text */}
        <h1 className="text-6xl sm:text-7xl font-extrabold text-gray-100 animate-fade-in">
          404
        </h1>
        <p className="text-lg sm:text-xl font-medium text-gray-300 animate-fade-in delay-200">
          Oops! The page you&apos;re looking for cannot be found.
        </p>

        {/* Button */}
        <Button
        variant={"secondary"}
        >
          <Link href={"/"}>Go Home</Link>
        </Button>
      </div>

      {/* Optional floating stars or extra background effects */}
      <div className="absolute top-0 left-0 w-full h-full bg-transparent"></div>
    </div>
  );
}
