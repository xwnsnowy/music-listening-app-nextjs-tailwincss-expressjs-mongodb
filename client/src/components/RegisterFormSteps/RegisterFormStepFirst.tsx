"use client";

import { useForm, SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import {
  setCurrentStep,
  setEmail,
} from "@/lib/features/register/registerSlice";
import { useAppDispatch } from "@/lib/hooks";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";

import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";

import { Input } from "@/components/ui/input";

import { emailSchema } from "@/validations/auth";
import { userExist } from "@/services/authServices";
import { useState } from "react";
import { RegisterStepFirst } from "@/types/types";

export default function RegisterFormStepFirst() {
  const router = useRouter();
  const dispatch = useAppDispatch();

  const form = useForm<z.infer<typeof emailSchema>>({
    resolver: zodResolver(emailSchema),
    defaultValues: {
      email: "",
    },
  });

  const [error, setError] = useState<string>("");

  const onSubmit: SubmitHandler<RegisterStepFirst> = async (data) => {
    try {
      const { exists, error } = await userExist(data);
      console.log(exists);
      console.log(error);
      if (exists) {
        setError(error);
        return;
      }
      console.log("Submitting form with data:", data);
      dispatch(setEmail(data.email));
      dispatch(setCurrentStep(2));
      const forwardUrl = encodeURIComponent("http://localhost:3000/");
      router.push(`/signup?forward_url=${forwardUrl}&step=2`);
    } catch (error) {
      console.error("Error submitting form:", error);
    }
  };

  return (
    <Form {...form}>
      <form
        // onSubmit={() => console.log("abc")}
        onSubmit={form.handleSubmit(onSubmit)}
        className="space-y-4 min-w-[312px] flex flex-col text-primaryColor "
      >
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-primaryColor">Email</FormLabel>
              <FormControl>
                <Input
                  placeholder="tienthanhcute2k2@gmail.com"
                  {...field}
                  className="bg-transparent text-primaryColor rounded-none min-h-12"
                />
              </FormControl>
              {error && (
                <div className="flex gap-1 items-center ">
                  <p className="text-sm font-medium text-red-500 dark:text-red-900">
                    {error}
                  </p>
                </div>
              )}
              <FormMessage />
            </FormItem>
          )}
        />
        <Button
          type="submit"
          className="text-bgBase text-base bg-[#1ed760] rounded-full hover:bg-[#1ed760] transform hover:scale-105 font-semibold min-h-12"
        >
          Next
        </Button>
      </form>
    </Form>
  );
}
