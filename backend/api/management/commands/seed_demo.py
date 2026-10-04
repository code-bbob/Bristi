from datetime import timedelta

from django.core.management.base import BaseCommand
from django.utils import timezone

from api.models import (
    Blog,
    Country,
    CountrySection,
    Event,
    GalleryImage,
    GallerySection,
    Highlight,
    Intake,
    Service,
    TeamMember,
    TestPreparation,
    Testimonial,
    University,
)
from api.seeds import content
from api.seeds.countries_a import COUNTRIES
from api.seeds.countries_b import AFTER_COUNTRIES
from api.seeds.country_sections import COUNTRY_SECTIONS


class Command(BaseCommand):
    help = "Seed the database with realistic sample content for the Bristi consultancy site."

    def handle(self, *args, **options):
        now = timezone.now()

        for c in COUNTRIES + AFTER_COUNTRIES:
            country, _ = Country.objects.update_or_create(
                name=c["name"],
                defaults={
                    "flag_emoji": c["flag_emoji"],
                    "tagline": c["tagline"],
                    "description": c["description"],
                    "highlights": c["highlights"],
                    "intake": c["intake"],
                    "tuition_range": c["tuition_range"],
                    "work_rights": c["work_rights"],
                    "is_active": True,
                },
            )
            for u in c.get("universities", []):
                University.objects.update_or_create(
                    name=u["name"],
                    country=country,
                    defaults={
                        "city": u["city"],
                        "courses": u["courses"],
                        "intake": u["intake"],
                        "website": u["website"],
                        "description": u["description"],
                        "is_active": True,
                    },
                )
            for i, sec in enumerate(COUNTRY_SECTIONS.get(c["name"], [])):
                CountrySection.objects.update_or_create(
                    country=country,
                    heading=sec["heading"],
                    defaults={
                        "style": sec["style"],
                        "body": sec.get("body", ""),
                        "items": sec.get("items", []),
                        "rows": sec.get("rows", []),
                        "order": i,
                    },
                )
        self.stdout.write(self.style.SUCCESS("Seeded countries & universities"))
        self.stdout.write(self.style.SUCCESS("Seeded country sections"))

        for i, s in enumerate(content.SERVICES):
            Service.objects.update_or_create(
                title=s["title"],
                defaults={
                    "icon": s["icon"],
                    "short_description": s["short_description"],
                    "description": s["description"],
                    "is_active": True,
                    "order": i,
                },
            )
        self.stdout.write(self.style.SUCCESS("Seeded services"))

        for i, t in enumerate(content.TEST_PREPARATIONS):
            TestPreparation.objects.update_or_create(
                title=t["title"],
                defaults={
                    "icon": t["icon"],
                    "short_description": t["short_description"],
                    "description": t["description"],
                    "is_active": True,
                    "order": i,
                },
            )
        active_titles = [t["title"] for t in content.TEST_PREPARATIONS]
        TestPreparation.objects.exclude(title__in=active_titles).update(is_active=False)
        self.stdout.write(self.style.SUCCESS("Seeded test preparations"))

        for i, e in enumerate(content.EVENTS):
            Event.objects.update_or_create(
                title=e["title"],
                defaults={
                    "event_date": now + timedelta(days=15 + i * 21),
                    "location": e["location"],
                    "short_description": e["short_description"],
                    "description": e["description"],
                    "is_active": True,
                },
            )
        self.stdout.write(self.style.SUCCESS("Seeded events"))

        for i, t in enumerate(content.TESTIMONIALS):
            Testimonial.objects.update_or_create(
                name=t["name"],
                defaults={
                    "destination": t["destination"],
                    "university": t["university"],
                    "course": t["course"],
                    "quote": t["quote"],
                    "rating": t["rating"],
                    "is_featured": True,
                    "order": i,
                },
            )
        self.stdout.write(self.style.SUCCESS("Seeded testimonials"))

        active_highlight_ids = set()
        for i, h in enumerate(content.HIGHLIGHTS):
            highlight, _ = Highlight.objects.update_or_create(
                text=h["text"],
                defaults={
                    "link": h["link"],
                    "is_active": h.get("is_active", True),
                    "order": h.get("order", i),
                },
            )
            active_highlight_ids.add(highlight.pk)
        Highlight.objects.exclude(pk__in=active_highlight_ids).update(is_active=False)
        self.stdout.write(self.style.SUCCESS("Seeded highlights"))

        active_intake_ids = set()
        for i, k in enumerate(content.INTAKES):
            country = Country.objects.filter(name=k["country"]).first()
            if not country:
                continue
            intake, _ = Intake.objects.update_or_create(
                country=country,
                intake=k["intake"],
                defaults={
                    "start_date": k.get("start_date"),
                    "deadline": k.get("deadline", ""),
                    "is_active": True,
                    "order": k.get("order", i),
                },
            )
            active_intake_ids.add(intake.pk)
        Intake.objects.exclude(pk__in=active_intake_ids).update(is_active=False)
        self.stdout.write(self.style.SUCCESS("Seeded intakes"))

        for i, name in enumerate(content.COUNTRY_ORDER):
            Country.objects.filter(name=name).update(order=i)

        for i, b in enumerate(content.BLOGS):
            Blog.objects.update_or_create(
                title=b["title"],
                defaults={
                    "excerpt": b["excerpt"],
                    "content": b["content"],
                    "author": b["author"],
                    "tags": b["tags"],
                    "published_at": now - timedelta(days=b["days_ago"]),
                },
            )
        self.stdout.write(self.style.SUCCESS("Seeded blogs"))

        gallery_sections = {}
        for i, s in enumerate(content.GALLERY_SECTIONS):
            section, _ = GallerySection.objects.update_or_create(
                name=s["name"],
                defaults={
                    "icon": s.get("icon", ""),
                    "description": s.get("description", ""),
                    "is_active": True,
                    "order": i,
                },
            )
            gallery_sections[section.name] = section

        for i, g in enumerate(content.GALLERY):
            GalleryImage.objects.update_or_create(
                title=g["title"],
                defaults={
                    "section": gallery_sections.get(g.get("section", "")),
                    "is_active": True,
                    "order": i,
                },
            )
        self.stdout.write(self.style.SUCCESS("Seeded gallery"))

        active_team_ids = set()
        for i, m in enumerate(content.TEAM_MEMBERS):
            member, _ = TeamMember.objects.update_or_create(
                name=m["name"],
                defaults={
                    "role": m["role"],
                    "group": m["group"],
                    "qualification": m["qualification"],
                    "bio": m["bio"],
                    "is_active": True,
                    "order": m.get("order", i),
                },
            )
            active_team_ids.add(member.pk)
        TeamMember.objects.exclude(pk__in=active_team_ids).update(is_active=False)
        self.stdout.write(self.style.SUCCESS("Seeded team members"))

        self.stdout.write(self.style.SUCCESS("Database seeding complete."))