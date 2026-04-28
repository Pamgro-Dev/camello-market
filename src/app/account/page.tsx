"use client";

import { getUserById, updateUserById } from "@/lib/api";
import { UserProfile } from "@/lib/types";
import { useAuthStore } from "@/store/auth-store";
import Link from "next/link";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";

export default function AccountPage() {
  const user = useAuthStore((state) => state.user);
  const setUser = useAuthStore((state) => state.setUser);
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    if (!user) {
      return;
    }

    const run = async () => {
      try {
        const data = await getUserById(user.id);
        setProfile(data);
        setFirstName(data.firstName ?? "");
        setLastName(data.lastName ?? "");
        setEmail(data.email ?? "");
        setPhone(data.phone ?? "");
        setAddress(data.address?.address ?? "");
      } catch {
        setError("Unable to load user profile.");
      } finally {
        setIsLoading(false);
      }
    };

    run();
  }, [user]);

  if (!user) {
    return (
      <section className="mx-auto max-w-xl rounded-2xl border border-zinc-200 bg-white p-6 text-center">
        <h1 className="text-2xl font-semibold text-zinc-900">User Management</h1>
        <p className="mt-2 text-zinc-600">Please login to manage your profile.</p>
        <Link
          href="/login"
          className="mt-4 inline-block rounded-full bg-zinc-900 px-5 py-2 text-sm font-semibold text-white"
        >
          Go to Login
        </Link>
      </section>
    );
  }

  if (isLoading) {
    return (
      <section className="mx-auto max-w-2xl rounded-2xl border border-zinc-200 bg-white p-6">
        <p className="text-zinc-600">Loading profile...</p>
      </section>
    );
  }

  return (
    <section className="mx-auto max-w-2xl space-y-6">
      <div>
        <h1 className="text-3xl font-semibold tracking-tight text-zinc-900">
          User Management
        </h1>
        <p className="mt-1 text-zinc-600">Edit your profile and save to API.</p>
      </div>

      <div className="rounded-2xl border border-zinc-200 bg-white p-6 shadow-sm">
        <div className="grid gap-4 sm:grid-cols-2">
          <div>
            <p className="text-xs uppercase tracking-wide text-zinc-500">Username</p>
            <p className="mt-1 font-medium text-zinc-900">{profile?.username ?? user.username}</p>
          </div>
          <div>
            <p className="text-xs uppercase tracking-wide text-zinc-500">Email</p>
            <p className="mt-1 font-medium text-zinc-900">{profile?.email ?? user.email}</p>
          </div>
        </div>
        {error ? <p className="mt-4 text-sm text-red-600">{error}</p> : null}

        <form
          className="mt-6 space-y-4"
          onSubmit={async (event) => {
            event.preventDefault();
            if (!profile) {
              return;
            }

            setIsSaving(true);
            try {
              const updated = await updateUserById(profile.id, {
                firstName,
                lastName,
                email,
                phone,
                address,
              });
              setProfile(updated);
              setFirstName(updated.firstName ?? "");
              setLastName(updated.lastName ?? "");
              setEmail(updated.email ?? "");
              setPhone(updated.phone ?? "");
              setAddress(updated.address?.address ?? "");
              setUser({
                id: updated.id,
                username: updated.username,
                email: updated.email,
                firstName: updated.firstName,
                lastName: updated.lastName,
                image: updated.image,
              });
              toast.success("Profile updated");
            } catch {
              toast.error("Failed to update profile");
            } finally {
              setIsSaving(false);
            }
          }}
        >
          <div className="grid gap-4 sm:grid-cols-2">
            <label className="block space-y-2">
              <span className="text-sm font-medium text-zinc-700">First name</span>
              <input
                value={firstName}
                onChange={(event) => setFirstName(event.target.value)}
                placeholder="Enter first name"
                className="w-full rounded-xl border border-zinc-300 px-4 py-2.5 text-sm outline-none focus:border-zinc-400"
              />
            </label>
            <label className="block space-y-2">
              <span className="text-sm font-medium text-zinc-700">Last name</span>
              <input
                value={lastName}
                onChange={(event) => setLastName(event.target.value)}
                placeholder="Enter last name"
                className="w-full rounded-xl border border-zinc-300 px-4 py-2.5 text-sm outline-none focus:border-zinc-400"
              />
            </label>
          </div>

          <label className="block space-y-2">
            <span className="text-sm font-medium text-zinc-700">Email</span>
            <input
              value={email}
              onChange={(event) => setEmail(event.target.value)}
              type="email"
              placeholder="Enter email"
              className="w-full rounded-xl border border-zinc-300 px-4 py-2.5 text-sm outline-none focus:border-zinc-400"
            />
          </label>

          <label className="block space-y-2">
            <span className="text-sm font-medium text-zinc-700">Phone</span>
            <input
              value={phone}
              onChange={(event) => setPhone(event.target.value)}
              placeholder="Enter phone number"
              className="w-full rounded-xl border border-zinc-300 px-4 py-2.5 text-sm outline-none focus:border-zinc-400"
            />
          </label>

          <label className="block space-y-2">
            <span className="text-sm font-medium text-zinc-700">Address</span>
            <textarea
              value={address}
              onChange={(event) => setAddress(event.target.value)}
              placeholder="Enter address"
              rows={4}
              className="w-full rounded-xl border border-zinc-300 px-4 py-2.5 text-sm outline-none focus:border-zinc-400"
            />
          </label>

          <button
            type="submit"
            disabled={isSaving}
            className="rounded-full bg-zinc-900 px-5 py-2 text-sm font-semibold text-white hover:bg-zinc-700 disabled:cursor-not-allowed disabled:opacity-60"
          >
            {isSaving ? "Saving..." : "Save profile"}
          </button>
        </form>
      </div>
    </section>
  );
}
