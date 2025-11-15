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
import { useNavigate } from "react-router-dom";
import { verifyEmailService } from "@/api/authService";

export function VerifyEmail({ ...props }: React.ComponentProps<typeof Card>) {
  const [code, setCode] = useState<string>("");
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (code.length !== 6) {
      toast.error("Please enter a valid 6-digit code");
      return;
    }

    setIsLoading(true);
    try {
      const res = await verifyEmailService(code);
      toast.success(res.message || "Email verified successfully!");
      setCode("");
      navigate("/login");
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
              Verify Your Email
            </CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-6">
              <FieldGroup>
                <Field>
                  <FieldLabel htmlFor="code">
                    6-Digit Verification Code
                  </FieldLabel>
                  <Input
                    id="code"
                    type="text"
                    placeholder="Enter 6-digit code"
                    value={code}
                    onChange={(e) => setCode(e.target.value)}
                    maxLength={6}
                  />
                  <FieldDescription>
                    Check your email for the verification code.
                  </FieldDescription>
                </Field>

                <Field>
                  <Button
                    type="submit"
                    disabled={isLoading}
                    className="flex items-center justify-center gap-2"
                  >
                    {isLoading && <Loader className="w-4 h-4 animate-spin" />}
                    {isLoading ? "Verifying..." : "Verify Email"}
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
