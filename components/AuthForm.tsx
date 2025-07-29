"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { Button } from "@/components/ui/button";
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
import Image from "next/image";

const formSchema = z.object({
  username: z.string().min(2).max(50),
});

const AuthForm = ({type}: {type: FormType}) => {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      username: "",
    },
  });

  const isSign = type === 'sign-in';

  const onSubmit = () => {};

  return (
    <div className="card-border lg:min-w-[556px]">
      <div className="flex flex-col gap-6 card py-14 px-10">
        <div className="flex flex-row gap-2 justify-center">
          <Image src="/logo.svg" alt="Logo" height={30} width={30} />
          <h2 className="text-primary-100">Syntherview</h2>
        </div>
        <h3>Practice job interviews with AI</h3>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8 w-full space-y-6 mt-4 form">
            {!isSign && <p>Name</p>}
            <p>Email</p>
            <p>Password</p>
            <Button className="btn " type="submit">{isSign ?"Sign in" : "Create an Account"}</Button>
          </form>
        </Form>

        <p className="text-center">{isSign ? "No account yet?" : "have an account already !"}</p>
      </div>
    </div>
  );
};

export default AuthForm;
