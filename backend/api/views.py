from django.db.models import Count, Prefetch, Q
from rest_framework import filters, viewsets

from .models import (
    Blog,
    Country,
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
from .serializers import (
    BlogDetailSerializer,
    BlogListSerializer,
    CountryDetailSerializer,
    CountrySerializer,
    EventSerializer,
    GalleryImageSerializer,
    GallerySectionSerializer,
    HighlightSerializer,
    InquirySerializer,
    IntakeSerializer,
    ServiceSerializer,
    TeamMemberSerializer,
    TestPreparationSerializer,
    TestimonialSerializer,
    UniversitySerializer,
)


class CountryViewSet(viewsets.ModelViewSet):
    """Countries with an optional annotated universities_count."""
    queryset = (
        Country.objects.filter(is_active=True)
        .annotate(universities_count=Count("universities"))
        .order_by("order", "name")
    )
    serializer_class = CountrySerializer
    filterset_fields = ["is_active"]
    search_fields = ["name"]
    lookup_field = "slug"
    http_method_names = ["get"]

    def get_queryset(self):
        queryset = (
            Country.objects.filter(is_active=True)
            .annotate(universities_count=Count("universities"))
            .prefetch_related("universities", "sections")
            .order_by("order", "name")
        )
        action = getattr(self, "action", None)
        if action == "retrieve":
            pass
        return queryset

    def get_serializer_class(self):
        if self.action == "retrieve":
            return CountryDetailSerializer
        return CountrySerializer


class UniversityViewSet(viewsets.ModelViewSet):
    queryset = University.objects.filter(is_active=True)
    serializer_class = UniversitySerializer
    filterset_fields = ["country__slug"]
    search_fields = ["name", "city"]
    lookup_field = "slug"
    http_method_names = ["get"]


class ServiceViewSet(viewsets.ModelViewSet):
    queryset = Service.objects.filter(is_active=True)
    serializer_class = ServiceSerializer
    http_method_names = ["get"]


class TestPreparationViewSet(viewsets.ModelViewSet):
    queryset = TestPreparation.objects.filter(is_active=True)
    serializer_class = TestPreparationSerializer
    lookup_field = "slug"
    http_method_names = ["get"]


class BlogViewSet(viewsets.ModelViewSet):
    queryset = Blog.objects.all()
    filterset_fields = ["tags"]
    search_fields = ["title", "excerpt", "content"]
    lookup_field = "slug"
    http_method_names = ["get"]

    def get_serializer_class(self):
        if self.action == "retrieve":
            return BlogDetailSerializer
        return BlogListSerializer


class EventViewSet(viewsets.ModelViewSet):
    queryset = Event.objects.filter(is_active=True)
    serializer_class = EventSerializer
    lookup_field = "slug"
    http_method_names = ["get"]


class TestimonialViewSet(viewsets.ModelViewSet):
    queryset = Testimonial.objects.all()
    serializer_class = TestimonialSerializer
    filterset_fields = ["is_featured"]
    http_method_names = ["get"]


class HighlightViewSet(viewsets.ModelViewSet):
    queryset = Highlight.objects.filter(is_active=True)
    serializer_class = HighlightSerializer
    filterset_fields = ["is_active"]
    http_method_names = ["get"]


class IntakeViewSet(viewsets.ModelViewSet):
    queryset = Intake.objects.select_related("country").filter(is_active=True)
    serializer_class = IntakeSerializer
    filterset_fields = ["is_active", "country__slug"]
    http_method_names = ["get"]


class GallerySectionViewSet(viewsets.ModelViewSet):
    """Gallery sections with their photos nested, for the Gallery page."""

    queryset = GallerySection.objects.filter(is_active=True)
    serializer_class = GallerySectionSerializer
    filterset_fields = ["is_active"]
    search_fields = ["name", "description"]
    lookup_field = "slug"
    http_method_names = ["get"]

    def get_queryset(self):
        return (
            GallerySection.objects.filter(is_active=True)
            .annotate(image_count=Count("images", filter=Q(images__is_active=True)))
            .prefetch_related(
                Prefetch(
                    "images",
                    queryset=GalleryImage.objects.filter(is_active=True).order_by("order", "id"),
                )
            )
            .order_by("order", "name")
        )


class GalleryImageViewSet(viewsets.ModelViewSet):
    queryset = GalleryImage.objects.filter(is_active=True)
    serializer_class = GalleryImageSerializer
    filterset_fields = ["section__slug"]
    http_method_names = ["get"]


class TeamMemberViewSet(viewsets.ModelViewSet):
    queryset = TeamMember.objects.filter(is_active=True)
    serializer_class = TeamMemberSerializer
    filterset_fields = ["is_active", "group"]
    search_fields = ["name", "role", "group"]
    http_method_names = ["get"]


class InquiryViewSet(viewsets.ModelViewSet):
    queryset = Inquiry.objects.all()
    serializer_class = InquirySerializer
    http_method_names = ["post", "head", "options"]