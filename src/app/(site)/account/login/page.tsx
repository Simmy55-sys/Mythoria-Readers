import LoginAccount from "@/components/pages/accounts/login";
import { Spinner } from "@/components/ui/spinner";
import { Suspense } from "react";

export default function LoginUser() {
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
      <LoginAccount />;
    </Suspense>
  );
}
