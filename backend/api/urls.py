from rest_framework import routers

from . import views

router = routers.DefaultRouter()
router.register(r"countries", views.CountryViewSet, basename="country")
router.register(r"universities", views.UniversityViewSet, basename="university")
router.register(r"services", views.ServiceViewSet, basename="service")
router.register(r"test-preparations", views.TestPreparationViewSet, basename="test-preparation")
router.register(r"blogs", views.BlogViewSet, basename="blog")
router.register(r"events", views.EventViewSet, basename="event")
router.register(r"testimonials", views.TestimonialViewSet, basename="testimonial")
router.register(r"highlights", views.HighlightViewSet, basename="highlight")
router.register(r"intakes", views.IntakeViewSet, basename="intake")
router.register(r"gallery", views.GalleryImageViewSet, basename="gallery")
router.register(r"gallery-sections", views.GallerySectionViewSet, basename="gallery-section")
router.register(r"team", views.TeamMemberViewSet, basename="team-member")
router.register(r"inquiries", views.InquiryViewSet, basename="inquiry")

urlpatterns = router.urls