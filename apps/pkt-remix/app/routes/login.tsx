import { AuthLayout } from "@/components/AuthLayout";
import { Button } from "@/components/Button";
import { TextField } from "@/components/Fields";
import type { MetaFunction } from "@remix-run/node";
import { Link } from "@remix-run/react";

export const meta: MetaFunction = () => ({
  title: "Sign In - Pocket",
});

export default function Login() {
  return (
    <>
      <AuthLayout
        title="Sign in to account"
        subtitle={
          <>
            Don’t have an account?{" "}
            <Link to="/register" className="text-cyan-600">
              Sign up
            </Link>{" "}
            for a free trial.
          </>
        }
      >
        <form>
          <div className="space-y-6">
            <TextField
              label="Email address"
              id="email"
              name="email"
              type="email"
              autoComplete="email"
              required
            />
            <TextField
              label="Password"
              id="password"
              name="password"
              type="password"
              autoComplete="current-password"
              required
            />
          </div>
          <Button type="submit" color="cyan" className="mt-8 w-full">
            Sign in to account
          </Button>
        </form>
      </AuthLayout>
    </>
  );
}
