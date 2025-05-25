"use client"

import { RegisterForm } from "@/components/auth/register-form"
import { Button } from "@/components/ui/button"
import Link from "next/link"

export default function RegisterPage() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="w-full max-w-md space-y-8">
        <div className="text-center">
          <h1 className="text-3xl font-bold tracking-tight text-gray-900">
            TaxMate
          </h1>
          <p className="mt-2 text-sm text-gray-600">
            Create your account to get started
          </p>
        </div>

        <RegisterForm />

        <div className="text-center">
          <p className="text-sm text-gray-600">
            Already have an account?{" "}
            <Link href="/login" className="font-medium text-blue-600 hover:text-blue-500">
              Sign in
            </Link>
          </p>
        </div>
      </div>
    </div>
  )
} 