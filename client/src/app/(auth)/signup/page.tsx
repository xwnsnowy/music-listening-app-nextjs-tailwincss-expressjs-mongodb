"use client";

import RegisterForm from "@/components/RegisterForm";
import SocialMedia from "@/components/SocialMedia";
import Link from "next/link";
import { useAppSelector, useAppDispatch } from "@/lib/hooks";
import {
  selectCurrentStep,
  setCurrentStep,
} from "@/lib/features/register/registerSlice";
import ProgressBar from "@ramonak/react-progress-bar";
import { useEffect, useState } from "react";

const Register = () => {
  const currentStep = useAppSelector(selectCurrentStep);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    if (currentStep === 2) {
      setProgress(50);
    }
    if (currentStep === 3) {
      setProgress(75);
    }
    if (currentStep === 4) {
      setProgress(100);
    }
  }, [currentStep]);

  return (
    <div
      className={`max-w-[400px] min-h-[826px] w-full rounded-lg bg-bgBase flex flex-col items-center ${
        currentStep === 1 ? "justify-center" : "justify-start"
      } py-8 gap-4  font-circular`}
    >
      {currentStep === 1 && (
        <h1 className="text-primaryColor text-5xl text-center font-black py-10 cursor-default select-none">
          Sign up to start listening
        </h1>
      )}
      {currentStep === 2 && (
        <>
          <ProgressBar
            completed={progress}
            className="w-full"
            height="2px"
            isLabelVisible={false}
            bgColor="#1ed760"
          />
          <div className="flex flex-col w-[288px] mb-3">
            <span className="text-secondaryColor">Step 2 of 4</span>
            <span className="text-primaryColor">Create a password</span>
          </div>
        </>
      )}
      <RegisterForm />

      {currentStep === 1 && (
        <>
          {/* Signup Social Media */}
          <SocialMedia text="Sign up" />

          <Link
            href="forgot-password"
            className="font-light text-primaryColor underline mt-8"
          >
            Forgot your password?
          </Link>

          <hr className="my-8 border border-tintedBase w-9/12" />

          <div className="text-primaryColor py-8 font-light gap-1 flex">
            <span className="text-secondaryColor">
              Already have an account?
            </span>
            <Link href="/login" className="underline">
              Log in here.
            </Link>
          </div>
        </>
      )}
    </div>
  );
};

export default Register;
