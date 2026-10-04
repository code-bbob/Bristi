from django.contrib import admin

from .models import (
    Blog,
    Country,
    CountrySection,
    Event,
    GalleryImage,
    GallerySection,
    Highlight,
    Inquiry,
    Intake,
    Service,
    TeamMember,
    TestPreparation,
    Testimonial,
    University,
)


class CountrySectionInline(admin.StackedInline):
    model = CountrySection
    extra = 0
    fields = (
        "heading",
        "style",
        "body",
        "items",
        "rows",
        "image",
        "order",
    )
    readonly_fields = ("image_preview",)

    def image_preview(self, obj):
        url = obj.image and obj.image.url
        if url:
            return f'<img src="{url}" style="max-height:90px;border-radius:8px;">'
        return "-"

    image_preview.short_description = "Preview"
    image_preview.allow_tags = True


@admin.register(Country)
class CountryAdmin(admin.ModelAdmin):
    list_display = ("name", "slug", "intake", "is_active", "order")
    prepopulated_fields = {"slug": ("name",)}
    search_fields = ("name",)
    inlines = (CountrySectionInline,)


@admin.register(University)
class UniversityAdmin(admin.ModelAdmin):
    list_display = ("name", "country", "city", "is_active", "order")
    prepopulated_fields = {"slug": ("name",)}
    search_fields = ("name", "city")
    list_filter = ("country",)


@admin.register(Service)
class ServiceAdmin(admin.ModelAdmin):
    list_display = ("title", "icon", "is_active", "order")
    prepopulated_fields = {"slug": ("title",)}


@admin.register(TestPreparation)
class TestPreparationAdmin(admin.ModelAdmin):
    list_display = ("title", "icon", "is_active", "order")
    prepopulated_fields = {"slug": ("title",)}


@admin.register(Blog)
class BlogAdmin(admin.ModelAdmin):
    list_display = ("title", "author", "published_at")
    prepopulated_fields = {"slug": ("title",)}
    search_fields = ("title", "tags")


@admin.register(Event)
class EventAdmin(admin.ModelAdmin):
    list_display = ("title", "event_date", "location", "is_active")
    prepopulated_fields = {"slug": ("title",)}


@admin.register(Testimonial)
class TestimonialAdmin(admin.ModelAdmin):
    list_display = ("name", "destination", "university", "rating", "order")


@admin.register(Highlight)
class HighlightAdmin(admin.ModelAdmin):
    list_display = ("text", "link", "is_active", "order")
    list_filter = ("is_active",)
    search_fields = ("text", "link")


@admin.register(Intake)
class IntakeAdmin(admin.ModelAdmin):
    list_display = ("country", "intake", "deadline", "is_active", "order")
    list_filter = ("country", "is_active")
    search_fields = ("country__name", "intake")


class GalleryImageInline(admin.TabularInline):
    model = GalleryImage
    extra = 1
    fields = ("title", "image", "image_preview", "is_active", "order")
    readonly_fields = ("image_preview",)

    def image_preview(self, obj):
        url = obj.image and obj.image.url
        if url:
            return f'<img src="{url}" style="max-height:70px;border-radius:8px;">'
        return "-"

    image_preview.short_description = "Preview"
    image_preview.allow_tags = True


@admin.register(GallerySection)
class GallerySectionAdmin(admin.ModelAdmin):
    list_display = ("name", "slug", "image_count", "is_active", "order")
    prepopulated_fields = {"slug": ("name",)}
    search_fields = ("name", "description")
    list_filter = ("is_active",)
    inlines = (GalleryImageInline,)

    @admin.display(description="Photos")
    def image_count(self, obj):
        return obj.images.count()


@admin.register(GalleryImage)
class GalleryImageAdmin(admin.ModelAdmin):
    list_display = ("title", "section", "is_active", "order")
    list_filter = ("section", "is_active")
    search_fields = ("title", "section__name")
    autocomplete_fields = ("section",)


@admin.register(TeamMember)
class TeamMemberAdmin(admin.ModelAdmin):
    list_display = ("name", "role", "group", "is_active", "order")
    list_filter = ("group", "is_active")
    search_fields = ("name", "role", "group")


@admin.register(Inquiry)
class InquiryAdmin(admin.ModelAdmin):
    list_display = ("full_name", "phone", "email", "preferred_country", "created_at")
    search_fields = ("full_name", "email", "phone")
    list_filter = ("preferred_country",)