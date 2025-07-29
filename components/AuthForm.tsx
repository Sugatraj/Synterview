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
import Link from "next/link";
import { toast } from "sonner";

import FormFiled from "@/components/FormField";
import { useRouter } from "next/navigation";

// const formSchema = z.object({
//   username: z.string().min(2).max(50),
// });

const authFormSchema = (type: FormType) => {
  return z.object({
    name: type === "sign-up" ? z.string().min(3) : z.string().optional(),
    email: z.string().email(),
    password: z.string().min(3),
  });
};

const AuthForm = ({ type }: { type: FormType }) => {
  const router = useRouter;
  const formSchema = authFormSchema(type);
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      email: "",
      password: "",
    },
  });

  const isSignIn = type === "sign-in";

  const onSubmit = (values: z.infer<typeof formSchema>) => {
    try {
      if (type === "sign-up") {
        console.log("SIGN UP", values);
        toast.success("Account created successfully. Please sign in.")
        router.push("/sign-in")
      } else {
        console.log("SIGN IN", values);
        toast.success("Sign in successfully.")
        router.push('/')
      }
    } catch (e) {
      console.error(e);
      toast.error(`there was an error ${e}`);
    }
  };

  return (
    <div className="card-border lg:min-w-[556px]">
      <div className="flex flex-col gap-6 card py-14 px-10">
        <div className="flex flex-row gap-2 justify-center">
          <Image src="/logo.svg" alt="Logo" height={30} width={30} />
          <h2 className="text-primary-100">Syntherview</h2>
        </div>
        <h3>Practice job interviews with AI</h3>

        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="space-y-8 w-full space-y-6 mt-4 form"
          >
            {!isSignIn && (
              <FormFiled
                control={form.control}
                name="name"
                label="Name"
                placeholder="Your Name"
              />
            )}

            <FormFiled
                control={form.control}
                name="email"
                label="Email"
                placeholder="Your Email address"
                type="email"
              />
            
            <FormFiled
                control={form.control}
                name="passworf"
                label="Password"
                placeholder="Enter your password"
                type="password"
              />
            <Button className="btn " type="submit">
              {isSignIn ? "Sign in" : "Create an Account"}
            </Button>
          </form>
        </Form>

        <p className="text-center">
          {isSignIn ? "No account yet?" : "have an account already !"}
          <Link
            href={!isSignIn ? "/sign-in" : "/sign-up"}
            className="font-bold text-user-primary ml-1"
          >
            {!isSignIn ? "Sign in" : "Sign up"}
          </Link>
        </p>
      </div>
    </div>
  );
};

export default AuthForm;
