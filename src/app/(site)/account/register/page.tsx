import RegisterAccount from "@/components/pages/accounts/register";
import { Suspense } from "react";
import { Spinner } from "@/components/ui/spinner";

export default function RegisterUser() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen bg-background flex items-center justify-center">
          <div className="text-center flex items-center gap-2">
            <Spinner />
            <p className="text-muted-foreground">Loading...</p>
          </div>
        </div>
      }
    >
      <RegisterAccount />
    </Suspense>
  );
}
