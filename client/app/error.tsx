"use client";
import Link from "next/link";
import React, { FC } from "react";

interface ErrorProps {
  error: Error;
}

const Error: FC<ErrorProps> = () => {
  return (
    <div>
      <h1>Something went wrong</h1>
      <Link
        href={`/`}
        className="inline-flex min-w-80 justify-center items-center text-18 font-500 gap-6 border border-solid px-16 py-10 rounded-16"
      >
        Back
      </Link>
    </div>
  );
};

export default Error;
