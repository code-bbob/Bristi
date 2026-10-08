from pathlib import Path

from django.conf import settings
from django.core.files.storage import default_storage
from django.core.management.base import BaseCommand, CommandError


class Command(BaseCommand):
    help = (
        "Upload every file under MEDIA_ROOT to the configured remote storage "
        "(Cloudflare R2). Existing remote keys are kept unless --overwrite."
    )

    def add_arguments(self, parser):
        parser.add_argument(
            "--overwrite",
            action="store_true",
            help="Re-upload files even if the key already exists in R2.",
        )
        parser.add_argument(
            "--dry-run",
            action="store_true",
            help="List what would be uploaded without touching R2.",
        )

    def handle(self, *args, **options):
        if not settings.USE_R2:
            raise CommandError(
                "R2 storage is not active. Set the R2_* variables in "
                "backend/.env (R2_ACCOUNT_ID, R2_BUCKET_NAME, R2_ACCESS_KEY_ID, "
                "R2_SECRET_ACCESS_KEY, R2_PUBLIC_URL) first."
            )

        root = Path(settings.MEDIA_ROOT)
        if not root.exists():
            raise CommandError(f"MEDIA_ROOT does not exist: {root}")

        files = sorted(p for p in root.rglob("*") if p.is_file())
        if not files:
            self.stdout.write("No local media files found.")
            return

        overwrite = options["overwrite"]
        dry_run = options["dry_run"]

        uploaded = skipped = 0
        total_bytes = 0

        for path in files:
            key = path.relative_to(root).as_posix()
            size = path.stat().st_size
            total_bytes += size

            if dry_run:
                uploaded += 1
                self.stdout.write(f"  upload {key} ({size} bytes)")
                continue

            if not overwrite and default_storage.exists(key):
                skipped += 1
                self.stdout.write(f"  skip   {key}")
                continue

            with path.open("rb") as fh:
                saved = default_storage.save(key, fh)
            if saved != key:
                self.stderr.write(
                    f"  warn   {key} stored as {saved} (name collision)"
                )
            uploaded += 1
            self.stdout.write(f"  upload {key} ({size} bytes)")

        verb = "would be uploaded" if dry_run else "uploaded"
        self.stdout.write(
            self.style.SUCCESS(
                f"{uploaded} file(s) {verb}, {skipped} skipped, "
                f"{total_bytes} bytes total scanned."
            )
        )
