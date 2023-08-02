import {SignupForm} from "@/frontend/components";
import AuthenticationLayout from "@/frontend/layouts/authentication";
import {Typography} from "antd";
import Image from "next/image";
import Link from "next/link";

export default function Signup() {
  return (
    <AuthenticationLayout>
      <div className="w-full md:max-w-md lg:max-w-lg md:p-6 md:bg-white flex flex-col items-center">
        <Image
          className="mb-6 hidden md:block"
          src="/user-avatar.svg"
          width={160}
          height={160}
          alt="user"
        />
        <Image
          className="mb-6 md:hidden"
          src="/user-avatar-white-bg.svg"
          width={100}
          height={100}
          alt="user"
        />
        <h2 className="text-center mb-6">Sign up</h2>
        <div className="flex items-center mb-6">
          <Typography.Text className="mr-2">
            Already have an account?
          </Typography.Text>
          <Link href="/login">Sign in</Link>
        </div>
        <div className="w-full">
          <SignupForm />
        </div>
      </div>
    </AuthenticationLayout>
  );
}
