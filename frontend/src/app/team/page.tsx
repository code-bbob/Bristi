import Image from "next/image";
import Link from "next/link";

import { Reveal } from "@/components/motion";
import { CONTACT_INFO } from "@/components/ui";
import { getTeamMembers } from "@/lib/api";
import type { TeamMember } from "@/lib/types";
import { initials, resolveImage } from "@/lib/utils";

export const metadata = {
  title: "Our Team",
};

function Member({ member, index }: { member: TeamMember; index: number }) {
  const photo = resolveImage(member.photo);

  return (
    <Reveal delay={(index % 4) * 80}>
      <div className="flex flex-col items-center text-center">
        <div className="relative w-36 h-36 md:w-40 md:h-40 rounded-full overflow-hidden border-4 border-surface-container-high bg-surface-container shadow-lg">
          {photo ? (
            <Image
              src={photo}
              alt={member.name}
              fill
              sizes="160px"
              className="object-cover"
            />
          ) : (
            <div className="w-full h-full bg-gradient-to-br from-primary via-primary-container to-secondary/70 flex items-center justify-center">
              <span className="font-display text-[3rem] font-extrabold text-surface/90">
                {initials(member.name)}
              </span>
            </div>
          )}
        </div>
        <h3 className="mt-4 font-display text-lg font-bold text-on-surface">{member.name}</h3>
        <p className="mt-0.5 text-sm text-primary-container font-medium">{member.role}</p>
        {member.bio ? <p className="mt-2 text-sm text-on-surface-variant max-w-[16rem] leading-relaxed">{member.bio}</p> : null}
      </div>
    </Reveal>
  );
}

export default async function TeamPage() {
  const members = await getTeamMembers();

  return (
    <>
      {/* HERO */}
      <section className="relative overflow-hidden bg-primary text-on-primary">
        <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.05)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.05)_1px,transparent_1px)] bg-[size:44px_44px]" />
        <div className="absolute -top-24 -right-24 w-[460px] h-[460px] rounded-full bg-secondary/25 blur-3xl pointer-events-none" />
        <div className="absolute -bottom-32 -left-24 w-[400px] h-[400px] rounded-full bg-primary-container/60 blur-3xl pointer-events-none" />

        <div className="relative max-w-[1600px] mx-auto px-6 md:px-8 pt-14 md:pt-24 pb-20 md:pb-28">
          <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-surface/10 border border-surface/20 text-[0.75rem] font-bold uppercase tracking-wider">
            <span className="material-symbols-outlined text-[16px]">groups</span>
            Our Team
          </span>
          <h1 className="font-display text-[2.75rem] md:text-[4.25rem] leading-[1.05] font-bold tracking-[-0.03em] text-surface mt-5 max-w-4xl">
            Meet the people behind
            <br />
            your big move.
          </h1>
          <p className="font-body-lg text-[1.125rem] leading-[1.9rem] text-on-primary-container max-w-xl mt-7">
            Counsellors, visa specialists and trainers in Kathmandu. Get a free first
            consultation, and talk to the person who will actually handle your file.
          </p>
          <div className="mt-9 flex flex-col sm:flex-row gap-4">
            <Link
              href="/contact"
              className="inline-flex items-center justify-center gap-2 bg-secondary text-on-secondary hover:bg-on-secondary-container font-semibold px-7 py-4 rounded-xl shadow-lg hover:shadow-xl transition-colors"
            >
              <span>Book a Free Consultation</span>
              <span className="material-symbols-outlined text-[20px]">calendar_today</span>
            </Link>
            <a
              href={CONTACT_INFO.phoneHref}
              className="inline-flex items-center justify-center gap-2 border border-surface/25 text-surface hover:bg-surface/10 font-semibold px-7 py-4 rounded-xl transition-colors"
            >
              <span className="material-symbols-outlined text-[20px] text-secondary-fixed">call</span>
              {CONTACT_INFO.phone}
            </a>
          </div>
        </div>
      </section>

      {/* TEAM MEMBERS */}
      <section className="py-16 md:py-24 bg-surface">
        <div className="max-w-[1600px] mx-auto px-6 md:px-8">
          <Reveal className="max-w-2xl mb-14">
            <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 text-primary font-bold text-[0.75rem] uppercase tracking-wider mb-3">
              <span className="material-symbols-outlined text-[16px]">badge</span>
              Meet the Team
            </span>
            <h2 className="font-display text-[2rem] md:text-[2.5rem] leading-[2.5rem] md:leading-[3rem] font-bold tracking-[-0.02em] text-on-surface">
              The people behind every acceptance letter.
            </h2>
          </Reveal>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-x-8 gap-y-12 justify-items-center">
            {members.map((member, i) => (
              <Member key={member.id} member={member} index={i} />
            ))}
          </div>
        </div>
      </section>
    </>
  );
}