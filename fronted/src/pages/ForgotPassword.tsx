import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Field,
  FieldGroup,
  FieldLabel,
  FieldDescription,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { Loader } from "lucide-react";
import { forgotPasswordService } from "@/api/authService";

export function ForgotPassword({
  ...props
}: React.ComponentProps<typeof Card>) {
  const [email, setEmail] = useState<string>("");
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      const res = await forgotPasswordService({ email });
      if (res.success) {
        toast.success(res.message || "Password reset email sent!");
        setEmail("");
      }
    } catch (err: unknown) {
      const error = err as {
        response?: { data?: { message: string } };
        message: string;
      };
      toast.error(error.response?.data?.message || error.message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex min-h-svh w-full items-center justify-center ">
      <div className="w-full max-w-sm">
        <Card {...props}>
          <CardHeader>
            <CardTitle className="text-center font-bold">
              Forgot Password
            </CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-6">
              <FieldGroup>
                <Field>
                  <FieldLabel htmlFor="email">Email</FieldLabel>
                  <Input
                    id="email"
                    type="email"
                    placeholder="your@email.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                  />
                  <FieldDescription>
                    We'll send a password reset link to your email.
                  </FieldDescription>
                </Field>

                <Field>
                  <Button
                    type="submit"
                    disabled={isLoading}
                    className="flex items-center cursor-pointer justify-center gap-2"
                  >
                    {isLoading && <Loader className="w-4 h-4 animate-spin" />}
                    {isLoading ? "Sending..." : "Send Reset Link"}
                  </Button>
                </Field>
              </FieldGroup>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
