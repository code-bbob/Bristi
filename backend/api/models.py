from django.db import models
from django.utils.text import slugify


class BaseModel(models.Model):
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        abstract = True


class Country(BaseModel):
    name = models.CharField(max_length=120)
    slug = models.SlugField(max_length=140, unique=True, blank=True)
    flag_emoji = models.CharField(max_length=16, blank=True, default="")
    tagline = models.CharField(max_length=220, blank=True, default="")
    description = models.TextField(blank=True, default="")
    highlights = models.TextField(blank=True, default="")
    intake = models.CharField(max_length=120, blank=True, default="")
    tuition_range = models.CharField(max_length=120, blank=True, default="")
    work_rights = models.CharField(max_length=220, blank=True, default="")
    image = models.ImageField(upload_to="countries/", blank=True, null=True)
    is_active = models.BooleanField(default=True)
    order = models.PositiveIntegerField(default=0)

    class Meta:
        ordering = ["order", "name"]

    def __str__(self):
        return self.name

    def save(self, *args, **kwargs):
        if not self.slug:
            base = slugify(self.name) or "country"
            slug = base
            counter = 1
            while Country.objects.filter(slug=slug).exists():
                slug = f"{base}-{counter}"
                counter += 1
            self.slug = slug
        super().save(*args, **kwargs)


class CountrySection(BaseModel):
    """A dynamic, ordered content block for a country detail page.

    Each country gets its own set of sections (Education System, Study Costs,
    Quick Facts, Visa Procedure, ...) so topics differ per country while still
    being rendered from data. ``style`` drives how the frontend renders it.
    """

    STYLE_TEXT = "text"
    STYLE_FACTS = "facts"
    STYLE_LIST = "list"
    STYLE_STEPS = "steps"
    STYLE_TABLE = "table"
    STYLE_BANNER = "banner"

    STYLE_CHOICES = (
        (STYLE_TEXT, "Text (prose with optional image)"),
        (STYLE_FACTS, "Quick Facts (label/value cards)"),
        (STYLE_LIST, "List / checklist"),
        (STYLE_STEPS, "Numbered steps"),
        (STYLE_TABLE, "Table"),
        (STYLE_BANNER, "Photo banner"),
    )

    country = models.ForeignKey(
        Country, related_name="sections", on_delete=models.CASCADE
    )
    heading = models.CharField(max_length=200)
    style = models.CharField(max_length=20, choices=STYLE_CHOICES, default=STYLE_TEXT)
    body = models.TextField(blank=True, default="")
    items = models.JSONField(default=list, blank=True)
    rows = models.JSONField(default=list, blank=True)
    image = models.ImageField(upload_to="country-sections/", blank=True, null=True)
    order = models.PositiveIntegerField(default=0)

    class Meta:
        ordering = ["order", "id"]

    def __str__(self):
        return f"{self.heading} ({self.country.name})"


class University(BaseModel):
    name = models.CharField(max_length=200)
    slug = models.SlugField(max_length=220, unique=True, blank=True)
    country = models.ForeignKey(
        Country, related_name="universities", on_delete=models.CASCADE
    )
    city = models.CharField(max_length=120, blank=True, default="")
    description = models.TextField(blank=True, default="")
    courses = models.TextField(blank=True, default="")
    intake = models.CharField(max_length=120, blank=True, default="")
    website = models.URLField(blank=True, default="")
    image = models.ImageField(upload_to="universities/", blank=True, null=True)
    is_active = models.BooleanField(default=True)
    order = models.PositiveIntegerField(default=0)

    class Meta:
        ordering = ["order", "name"]

    def __str__(self):
        return f"{self.name} ({self.country.name})"

    def save(self, *args, **kwargs):
        if not self.slug:
            base = slugify(self.name) or "university"
            slug = base
            counter = 1
            while University.objects.filter(slug=slug).exists():
                slug = f"{base}-{counter}"
                counter += 1
            self.slug = slug
        super().save(*args, **kwargs)


class Service(BaseModel):
    title = models.CharField(max_length=160)
    slug = models.SlugField(max_length=180, unique=True, blank=True)
    icon = models.CharField(
        max_length=80, blank=True, default=""
    )  # material symbol name
    short_description = models.TextField(blank=True, default="")
    description = models.TextField(blank=True, default="")
    image = models.ImageField(upload_to="services/", blank=True, null=True)
    is_active = models.BooleanField(default=True)
    order = models.PositiveIntegerField(default=0)

    class Meta:
        ordering = ["order", "title"]

    def __str__(self):
        return self.title

    def save(self, *args, **kwargs):
        if not self.slug:
            base = slugify(self.title) or "service"
            slug = base
            counter = 1
            while Service.objects.filter(slug=slug).exists():
                slug = f"{base}-{counter}"
                counter += 1
            self.slug = slug
        super().save(*args, **kwargs)


class TestPreparation(BaseModel):
    title = models.CharField(max_length=120)
    slug = models.SlugField(max_length=140, unique=True, blank=True)
    icon = models.CharField(max_length=80, blank=True, default="")
    short_description = models.TextField(blank=True, default="")
    description = models.TextField(blank=True, default="")
    image = models.ImageField(upload_to="test-prep/", blank=True, null=True)
    is_active = models.BooleanField(default=True)
    order = models.PositiveIntegerField(default=0)

    class Meta:
        ordering = ["order", "title"]

    def __str__(self):
        return self.title

    def save(self, *args, **kwargs):
        if not self.slug:
            base = slugify(self.title) or "test"
            slug = base
            counter = 1
            while TestPreparation.objects.filter(slug=slug).exists():
                slug = f"{base}-{counter}"
                counter += 1
            self.slug = slug
        super().save(*args, **kwargs)


class Blog(BaseModel):
    title = models.CharField(max_length=240)
    slug = models.SlugField(max_length=260, unique=True, blank=True)
    excerpt = models.TextField(blank=True, default="")
    content = models.TextField(blank=True, default="")
    author = models.CharField(max_length=120, blank=True, default="")
    cover_image = models.ImageField(upload_to="blogs/", blank=True, null=True)
    published_at = models.DateTimeField(blank=True, null=True)
    tags = models.CharField(max_length=240, blank=True, default="")

    class Meta:
        ordering = ["-published_at", "-created_at"]

    def __str__(self):
        return self.title

    def save(self, *args, **kwargs):
        if not self.slug:
            self.slug = slugify(self.title) or f"blog-{self.pk}"
        super().save(*args, **kwargs)


class Event(BaseModel):
    title = models.CharField(max_length=200)
    slug = models.SlugField(max_length=220, unique=True, blank=True)
    event_date = models.DateTimeField(blank=True, null=True)
    location = models.CharField(max_length=160, blank=True, default="")
    short_description = models.TextField(blank=True, default="")
    description = models.TextField(blank=True, default="")
    image = models.ImageField(upload_to="events/", blank=True, null=True)
    is_active = models.BooleanField(default=True)

    class Meta:
        ordering = ["event_date"]

    def __str__(self):
        return self.title

    def save(self, *args, **kwargs):
        if not self.slug:
            self.slug = slugify(self.title) or f"event-{self.pk}"
        super().save(*args, **kwargs)


class Testimonial(BaseModel):
    name = models.CharField(max_length=160)
    destination = models.CharField(max_length=120, blank=True, default="")
    university = models.CharField(max_length=200, blank=True, default="")
    course = models.CharField(max_length=200, blank=True, default="")
    quote = models.TextField(blank=True, default="")
    rating = models.PositiveIntegerField(default=5)
    is_featured = models.BooleanField(default=True)
    order = models.PositiveIntegerField(default=0)

    class Meta:
        ordering = ["order", "-created_at"]

    def __str__(self):
        return self.name


class Highlight(BaseModel):
    """A short announcement shown in the sliding ticker bar under the navbar."""

    text = models.CharField(max_length=240)
    link = models.CharField(max_length=255, blank=True, default="")
    is_active = models.BooleanField(default=True)
    order = models.PositiveIntegerField(default=0)

    class Meta:
        ordering = ["order", "created_at"]

    def __str__(self):
        return self.text


class Intake(BaseModel):
    """The next intake window for a study destination, by country."""

    country = models.ForeignKey(
        Country, related_name="intakes", on_delete=models.CASCADE
    )
    intake = models.CharField(max_length=120)
    start_date = models.DateField(blank=True, null=True)
    deadline = models.CharField(max_length=120, blank=True, default="")
    is_active = models.BooleanField(default=True)
    order = models.PositiveIntegerField(default=0)

    class Meta:
        ordering = ["start_date", "created_at"]

    def __str__(self):
        return f"{self.country.name}: {self.intake}"


class GallerySection(BaseModel):
    """A named group of gallery photos, e.g. "Office", "Events", "Counselling"."""

    name = models.CharField(max_length=120)
    slug = models.SlugField(max_length=140, unique=True, blank=True)
    icon = models.CharField(
        max_length=80, blank=True, default=""
    )  # material symbol name
    description = models.TextField(blank=True, default="")
    is_active = models.BooleanField(default=True)
    order = models.PositiveIntegerField(default=0)

    class Meta:
        ordering = ["order", "name"]

    def __str__(self):
        return self.name

    def save(self, *args, **kwargs):
        if not self.slug:
            base = slugify(self.name) or "gallery-section"
            slug = base
            counter = 1
            while GallerySection.objects.filter(slug=slug).exists():
                slug = f"{base}-{counter}"
                counter += 1
            self.slug = slug
        super().save(*args, **kwargs)


class GalleryImage(BaseModel):
    """A single photo on the Gallery page, always filed under a section."""

    section = models.ForeignKey(
        GallerySection,
        related_name="images",
        on_delete=models.CASCADE,
        blank=True,
        null=True,
    )
    title = models.CharField(max_length=200, blank=True, default="")
    image = models.ImageField(upload_to="gallery/", blank=True, null=True)
    is_active = models.BooleanField(default=True)
    order = models.PositiveIntegerField(default=0)

    class Meta:
        ordering = ["order", "title"]

    def __str__(self):
        return self.title or "Gallery image"


class TeamMember(BaseModel):
    """A member of the consultancy staff shown on the Our Team page."""

    name = models.CharField(max_length=160)
    role = models.CharField(max_length=160, blank=True, default="")
    group = models.CharField(max_length=120, blank=True, default="")
    qualification = models.CharField(max_length=200, blank=True, default="")
    bio = models.TextField(blank=True, default="")
    photo = models.ImageField(upload_to="team/", blank=True, null=True)
    is_active = models.BooleanField(default=True)
    order = models.PositiveIntegerField(default=0)

    class Meta:
        ordering = ["order", "name"]

    def __str__(self):
        return self.name


class Inquiry(BaseModel):
    full_name = models.CharField(max_length=160)
    phone = models.CharField(max_length=40, blank=True, default="")
    email = models.EmailField(blank=True, default="")
    preferred_country = models.CharField(max_length=160, blank=True, default="")
    current_qualification = models.CharField(max_length=200, blank=True, default="")
    message = models.TextField(blank=True, default="")

    class Meta:
        ordering = ["-created_at"]

    def __str__(self):
        return self.full_name