from rest_framework import serializers

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


class CountrySerializer(serializers.ModelSerializer):
    universities_count = serializers.IntegerField(read_only=True)

    class Meta:
        model = Country
        fields = (
            "id",
            "name",
            "slug",
            "flag_emoji",
            "tagline",
            "description",
            "highlights",
            "intake",
            "tuition_range",
            "work_rights",
            "image",
            "universities_count",
            "order",
        )


class CountrySectionSerializer(serializers.ModelSerializer):
    class Meta:
        model = CountrySection
        fields = (
            "id",
            "heading",
            "style",
            "body",
            "items",
            "rows",
            "image",
            "order",
        )


class UniversitySerializer(serializers.ModelSerializer):
    country = serializers.SlugRelatedField(slug_field="slug", read_only=True)
    country_name = serializers.CharField(source="country.name", read_only=True)

    class Meta:
        model = University
        fields = (
            "id",
            "name",
            "slug",
            "country",
            "country_name",
            "city",
            "description",
            "courses",
            "intake",
            "website",
            "image",
            "order",
        )


class CountryDetailSerializer(CountrySerializer):
    universities = UniversitySerializer(many=True, read_only=True)
    sections = CountrySectionSerializer(many=True, read_only=True)

    class Meta(CountrySerializer.Meta):
        fields = CountrySerializer.Meta.fields + ("universities", "sections")


class ServiceSerializer(serializers.ModelSerializer):
    class Meta:
        model = Service
        fields = (
            "id",
            "title",
            "slug",
            "icon",
            "short_description",
            "description",
            "image",
            "order",
        )


class TestPreparationSerializer(serializers.ModelSerializer):
    class Meta:
        model = TestPreparation
        fields = (
            "id",
            "title",
            "slug",
            "icon",
            "short_description",
            "description",
            "image",
            "order",
        )


class BlogListSerializer(serializers.ModelSerializer):
    class Meta:
        model = Blog
        fields = (
            "id",
            "title",
            "slug",
            "excerpt",
            "author",
            "cover_image",
            "published_at",
            "tags",
        )


class BlogDetailSerializer(BlogListSerializer):
    class Meta(BlogListSerializer.Meta):
        fields = BlogListSerializer.Meta.fields + ("content",)


class EventSerializer(serializers.ModelSerializer):
    class Meta:
        model = Event
        fields = (
            "id",
            "title",
            "slug",
            "event_date",
            "location",
            "short_description",
            "description",
            "image",
        )


class TestimonialSerializer(serializers.ModelSerializer):
    class Meta:
        model = Testimonial
        fields = (
            "id",
            "name",
            "destination",
            "university",
            "course",
            "quote",
            "rating",
            "is_featured",
            "order",
        )


class HighlightSerializer(serializers.ModelSerializer):
    class Meta:
        model = Highlight
        fields = (
            "id",
            "text",
            "link",
            "order",
        )


class IntakeSerializer(serializers.ModelSerializer):
    country_name = serializers.CharField(source="country.name", read_only=True)
    country_slug = serializers.CharField(source="country.slug", read_only=True)
    country_flag = serializers.CharField(source="country.flag_emoji", read_only=True)

    class Meta:
        model = Intake
        fields = (
            "id",
            "country_name",
            "country_slug",
            "country_flag",
            "intake",
            "start_date",
            "deadline",
            "order",
        )


class GalleryImageSerializer(serializers.ModelSerializer):
    section = serializers.SlugRelatedField(slug_field="slug", read_only=True)
    section_name = serializers.CharField(source="section.name", read_only=True)

    class Meta:
        model = GalleryImage
        fields = (
            "id",
            "title",
            "image",
            "section",
            "section_name",
            "order",
        )


class GallerySectionSerializer(serializers.ModelSerializer):
    images = GalleryImageSerializer(many=True, read_only=True)
    image_count = serializers.IntegerField(read_only=True)

    class Meta:
        model = GallerySection
        fields = (
            "id",
            "name",
            "slug",
            "icon",
            "description",
            "image_count",
            "images",
            "order",
        )


class TeamMemberSerializer(serializers.ModelSerializer):
    class Meta:
        model = TeamMember
        fields = (
            "id",
            "name",
            "role",
            "group",
            "qualification",
            "bio",
            "photo",
            "order",
        )


class InquirySerializer(serializers.ModelSerializer):
    class Meta:
        model = Inquiry
        fields = (
            "id",
            "full_name",
            "phone",
            "email",
            "preferred_country",
            "current_qualification",
            "message",
            "created_at",
        )
        read_only_fields = ("created_at",)