import { useNavigate, Link } from "react-router-dom";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { AxiosError } from "axios";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import {
  Field,
  FieldGroup,
  FieldLabel,
  FieldDescription,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Loader } from "lucide-react";
import { toast } from "sonner";

import { useAuthStore } from "@/store/useAuthStore";
import { loginValidator } from "@/lib/validators";

type LoginFormData = z.infer<typeof loginValidator>;

export function Login() {
  const navigate = useNavigate();
  const { isLoading, loginUser } = useAuthStore();

  const form = useForm<LoginFormData>({
    resolver: zodResolver(loginValidator),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = form;

  const onSubmit = async (data: LoginFormData) => {
    try {
      const res = await loginUser(data);
      if (res.success) {
        toast.success("Logged in successfully!");
        navigate("/");
        form.reset();
      }
    } catch (err: unknown) {
      const error = err as AxiosError<{ message: string }>;
      toast.error(error.response?.data?.message || error.message);
    }
  };

  return (
    <div className="flex min-h-screen w-full items-center justify-center p-6 md:p-10 bg-gray-100">
      <div className="w-full max-w-sm">
        <Card>
          <CardHeader>
            <CardTitle className="text-center font-bold">
              Login to your account
            </CardTitle>
            <CardDescription className="text-center">
              Enter your email and password to login
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
              <FieldGroup>
                <Field>
                  <FieldLabel htmlFor="email">Email</FieldLabel>
                  <Input
                    id="email"
                    type="email"
                    placeholder="you@example.com"
                    {...register("email")}
                  />
                  {errors.email && (
                    <FieldDescription className="text-red-500">
                      {errors.email.message}
                    </FieldDescription>
                  )}
                </Field>

                <Field>
                  <div className="flex items-center justify-between">
                    <FieldLabel htmlFor="password">Password</FieldLabel>
                    <Link
                      to="/forgot-password"
                      className="text-sm underline-offset-4 hover:underline"
                    >
                      Forgot password?
                    </Link>
                  </div>
                  <Input
                    id="password"
                    type="password"
                    placeholder="********"
                    {...register("password")}
                  />
                  {errors.password && (
                    <FieldDescription className="text-red-500">
                      {errors.password.message}
                    </FieldDescription>
                  )}
                </Field>

                <Field>
                  <Button
                    type="submit"
                    className="flex items-center justify-center gap-2"
                    disabled={isLoading}
                  >
                    {isLoading && <Loader className="h-4 w-4 animate-spin" />}
                    {isLoading ? "Signing in..." : "Sign In"}
                  </Button>
                  <FieldDescription className="text-center mt-2">
                    Don&apos;t have an account?{" "}
                    <Link to="/register" className="underline">
                      Sign up
                    </Link>
                  </FieldDescription>
                </Field>
              </FieldGroup>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
export default Login;
