"use client";
import Image from "next/image";
import { getSession, signIn } from "next-auth/react";
export default function ButtonLogin() {
  const handleSignIn = async (provider: "google" | "facebook") => {
    try {
      const response = await signIn(provider, { redirect: false });
      if (response?.error) {
        console.error("Lỗi đăng nhập:", response.error);
      }
      // Lấy thông tin user sau khi đăng nhập thành công
      const session = await getSession();
      if (session?.user) {
        localStorage.setItem(
          "ui",
          JSON.stringify({
            ...session.user,
            phone: "",
            address: "",
            zipcode: 0,
          })
        );
        console.log("User Info:", session.user);
      } else {
        console.error("Không lấy được thông tin user.");
      }
    } catch (error) {
      console.error("Lỗi đăng nhập:", error);
    }
  };

  return (
    <div className="w-full flex justify-between">
      <button
        onClick={() => handleSignIn("facebook")}
        className="w-[48%] h-10 border-[2px] rounded flex justify-center items-center gap-2"
      >
        <Image
          src="/assets/images/facebook-icon.webp"
          alt="facebook"
          width={22}
          height={22}
        />
        <p className="text-sm">Facebook</p>
      </button>
      <button
        onClick={() => handleSignIn("google")}
        className="w-[48%] h-10 border-[2px] rounded flex justify-center items-center gap-2"
      >
        <Image
          src="/assets/images/google-icon.webp"
          alt="google"
          width={22}
          height={22}
        />
        <p className="text-sm">Google</p>
      </button>
    </div>
  );
}
