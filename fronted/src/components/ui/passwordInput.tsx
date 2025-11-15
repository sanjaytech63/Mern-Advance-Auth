import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Eye, EyeOff } from "lucide-react";

export function PasswordInput({
  value,
  onChange,
  placeholder,
  id,
}: {
  value?: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  placeholder?: string;
  id?: string;
}) {
  const [show, setShow] = useState(false);

  return (
    <div className="relative">
      <Input
        id={id}
        type={show ? "text" : "password"}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
      />
      <div
        className="absolute right-2 top-1/2 -translate-y-1/2 p-1"
        onClick={() => setShow(!show)}
      >
        {show ? (
          <EyeOff className="w-4 h-4 cursor-pointer hover:text-gray-600" />
        ) : (
          <Eye className="w-4 h-4 cursor-pointer hover:text-gray-600" />
        )}
      </div>
    </div>
  );
}
