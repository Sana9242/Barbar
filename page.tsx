import React from "react";
import Image from "next/image";
import Link from "next/link";
import { Star, Award, Shield, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";
import { prisma } from "@/lib/prisma";

export const dynamic = "force-dynamic";

export const metadata = {
  title: "Master Barbers | Barba & Co. Atelier",
  description:
    "Meet our master craftsmen and beard specialists. Trained in Mayfair, Rome, and New York, each artisan brings dedicated expertise to your chair.",
};

export default async function BarbersPage() {
  let barbers: any[] = [];
  try {
    barbers = await prisma.barber.findMany({
      where: { active: true },
      orderBy: { experienceYears: "desc" },
    });
  } catch (err) {
    console.error("Could not fetch barbers from database:", err);
  }

  return (
    <div className="py-12 sm:py-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
      {/* Header */}
      <div className="text-center max-w-3xl mx-auto space-y-4">
        <Badge variant="gold">The Atelier Craftsmen</Badge>
        <h1 className="text-4xl sm:text-5xl font-heading font-bold text-neutral-900 dark:text-neutral-50 tracking-tight">
          Master Barbers of Barba &amp; Co.
        </h1>
        <p className="text-base text-neutral-600 dark:text-neutral-400 font-light leading-relaxed">
          Our team is comprised exclusively of senior barbers with verified mastery over shear geometry, traditional straight-edge razors, and facial anatomy.
        </p>
      </div>

      {/* Barbers Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {barbers.map((barber) => (
          <Card key={barber.id} hoverEffect className="p-8 flex flex-col justify-between">
            <div className="flex flex-col sm:flex-row gap-6 items-start">
              <div className="relative w-28 h-28 sm:w-36 sm:h-36 rounded-2xl overflow-hidden shrink-0 border-2 border-gold-500/40 shadow-lux">
                <Image
                  src={barber.avatarUrl}
                  alt={barber.name}
                  fill
                  className="object-cover"
                />
              </div>

              <div className="space-y-2 flex-1">
                <div className="flex items-start justify-between">
                  <div>
                    <h2 className="text-2xl font-heading font-bold text-neutral-900 dark:text-neutral-100">
                      {barber.name}
                    </h2>
                    <p className="text-sm font-semibold text-gold-600 dark:text-gold-400">
                      {barber.title}
                    </p>
                  </div>
                  <div className="flex items-center gap-1 text-sm font-bold text-amber-500">
                    <Star className="w-4 h-4 fill-current" />
                    <span>{barber.rating}</span>
                  </div>
                </div>

                <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-neutral-100 dark:bg-noir-850 text-neutral-700 dark:text-neutral-300 text-xs font-medium">
                  <Award className="w-3.5 h-3.5 text-gold-500" />
                  {barber.experienceYears} Years Dedicated Craft
                </div>

                <p className="text-xs sm:text-sm text-neutral-600 dark:text-neutral-400 leading-relaxed pt-1">
                  {barber.bio}
                </p>

                <div className="pt-2">
                  <span className="text-[11px] uppercase tracking-wider font-semibold text-neutral-400 block mb-1">
                    Signature Specialty:
                  </span>
                  <span className="text-xs font-medium text-neutral-800 dark:text-neutral-200">
                    {barber.specialty}
                  </span>
                </div>
              </div>
            </div>

            <div className="pt-6 mt-6 border-t border-neutral-100 dark:border-neutral-800 flex items-center justify-between">
              <span className="text-xs text-neutral-500">
                Available for online reservations
              </span>
              <Link href={`/book?barberId=${barber.id}`}>
                <Button size="md">
                  Book with {barber.name.split(" ")[0]} <ArrowRight className="w-4 h-4 ml-1.5" />
                </Button>
              </Link>
            </div>
          </Card>
        ))}
      </div>

      {/* The Quality Commitment Banner */}
      <div className="bg-neutral-100 dark:bg-noir-900 rounded-3xl p-8 sm:p-12 border border-neutral-200 dark:border-neutral-800 flex flex-col md:flex-row items-center justify-between gap-6">
        <div className="space-y-2 max-w-xl">
          <div className="flex items-center gap-2 text-gold-500 text-xs font-semibold uppercase tracking-wider">
            <Shield className="w-4 h-4" /> The Barba Guarantee
          </div>
          <h3 className="text-2xl font-heading font-bold text-neutral-900 dark:text-neutral-100">
            Uncompromising Standards with Every Cut
          </h3>
          <p className="text-xs sm:text-sm text-neutral-600 dark:text-neutral-400 leading-relaxed">
            If your haircut or shave is anything less than exceptional, let us know within 7 days and your master barber will refine it at zero additional charge.
          </p>
        </div>
        <Link href="/book" className="shrink-0">
          <Button size="lg" className="shadow-lux">
            Schedule Appointment
          </Button>
        </Link>
      </div>
    </div>
  );
}
