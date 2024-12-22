'use client'

import React from "react";
import { Meteors } from "@/components/ui/meteros";
import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function NotFoundPage() {
  return (
    <div className="relative h-screen w-full flex items-center justify-center bg-gradient-to-r from-gray-50 to-gray-100 dark:from-black dark:to-gray-900 overflow-hidden select-none">
      {/* Meteor Animation - Only visible in dark mode */}
      <div className="hidden dark:block">
        <Meteors number={20} />
      </div>

      {/* Light mode decoration - Only visible in light mode */}
      <div className="absolute inset-0 dark:hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-blue-50 to-indigo-50 opacity-40"></div>
        <div className="absolute h-32 w-32 rounded-full bg-blue-100 blur-3xl top-1/4 left-1/4"></div>
        <div className="absolute h-32 w-32 rounded-full bg-indigo-100 blur-3xl bottom-1/4 right-1/4"></div>
      </div>

      {/* Content Area */}
      <div className="z-10 flex flex-col items-center justify-center text-center space-y-6 px-6 md:px-12">
        {/* Error Text */}
        <h1 className="text-6xl sm:text-7xl font-extrabold text-gray-800 dark:text-gray-100 animate-fade-in">
          404
        </h1>
        <p className="text-lg sm:text-xl font-medium text-gray-600 dark:text-gray-300 animate-fade-in delay-200">
          Oops! The page you&apos;re looking for cannot be found.
        </p>

        {/* Button */}
        <Button
          variant="secondary"
          className="bg-white dark:bg-gray-800 text-gray-800 dark:text-gray-100 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
        >
          <Link href="/">Go Home</Link>
        </Button>
      </div>
    </div>
  );
}