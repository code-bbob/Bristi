"""Services, test preparation, events, testimonials, gallery seed data."""

SERVICES = [
    {
        "title": "Career & Academic Counselling",
        "icon": "school",
        "short_description": "Understand your options and choose a study pathway aligned with your academic background and career goals.",
        "description": (
            "Our senior counsellors conduct one-on-one sessions to evaluate your academic record, personal "
            "ambitions, and family financial framework. We help you map a realistic pathway to your dream "
            "university without false hype or pressure.\n\n"
            "From choosing the right country to identifying courses that fit your long-term career, our "
            "counselling is transparent and fully student-focused."
        ),
    },
    {
        "title": "University & Course Selection",
        "icon": "apartment",
        "short_description": "Find suitable universities, courses, intakes and admission pathways that optimize your budget and aspirations.",
        "description": (
            "We profile universities against your grades, test scores and budget, shortlisting options with "
            "high visa success probability and genuine employment outcomes.\n\n"
            "Our providers are vetted and accredited, and our recommendations always prioritise your academic "
            "fit over commission targets."
        ),
    },
    {
        "title": "Application Assistance",
        "icon": "edit_document",
        "short_description": "Get support preparing and submitting accurate university applications, SOPs and document portfolios.",
        "description": (
            "We handle the complete application lifecycle: transcript evaluation, statement of purpose drafting, "
            "document verification and online submission with institutional follow-up.\n\n"
            "Every file is double-checked for completeness and accuracy before lodgement."
        ),
    },
    {
        "title": "Scholarship Guidance",
        "icon": "workspace_premium",
        "short_description": "Explore scholarship and funding opportunities relevant to your academic profile to reduce study costs.",
        "description": (
            "From government scholarships to university-specific awards and partner discounts, we help you identify "
            "funding that matches your profile.\n\n"
            "We prepare compelling scholarship statements and coach you through any interviews or assessment rounds."
        ),
    },
    {
        "title": "Student Visa Guidance",
        "icon": "badge",
        "short_description": "Prepare your financial documentation, interview protocols and official lodgement with structured guidance.",
        "description": (
            "Our visa counsellors run the full lodgement process: financial dossier preparation, medical and "
            "character references, GTE/SOP assistance and mock interviews.\n\n"
            "We track application timelines and keep you updated at every step until visa decision."
        ),
    },
    {
        "title": "IELTS & PTE Test Preparation",
        "icon": "edit_note",
        "short_description": "Intensive coaching for IELTS and PTE with live practice, mock tests and personalised feedback.",
        "description": (
            "Ace your English language exams with our structured classes covering listening, reading, writing and "
            "speaking modules, plus regular mock tests that mirror the real exam.\n\n"
            "Small batch sizes and experienced trainers ensure measurable band-score improvement."
        ),
    },
    {
        "title": "Pre-Departure Guidance",
        "icon": "connecting_airports",
        "short_description": "Prepare for accommodation, airport transfers, currency exchange and smooth integration into life abroad.",
        "description": (
            "Before you fly, we brief you on accommodation options, airport transfers, banking, taxes, insurance "
            "and cultural adaptation.\n\n"
            "Our student community keeps you connected with others travelling to the same city."
        ),
    },
    {
        "title": "Library & Resource Services",
        "icon": "local_library",
        "short_description": "Free access to university prospectuses, test-prep books and up-to-date country guides at our office.",
        "description": (
            "Visit our Kathmandu office to browse university prospectuses, use our test-preparation library, and "
            "attend free information sessions on scholarships, intakes and country updates."
        ),
    },
]

TEST_PREPARATIONS = [
    {
        "title": "IELTS",
        "icon": "edit_note",
        "short_description": "Comprehensive IELTS academic & general training classes with regular mock tests.",
        "description": (
            "The International English Language Testing System is accepted by universities in Australia, UK, "
            "Canada, New Zealand and the USA.\n\n"
            "Our IELTS program covers all four modules with proven strategies, daily practice, and free " 
            "computer-based mock tests to help you reach your target band score."
        ),
    },
    {
        "title": "PTE",
        "icon": "mic",
        "short_description": "Fast, AI-scored PTE academic preparation with complete computer-based practice.",
        "description": (
            "The Pearson Test of English offers faster results and is accepted across major study destinations.\n\n"
            "Our trainers teach you the scoring pattern behind every question type and run full-length scored "
            "mock tests so you enter the exam hall fully prepared."
        ),
    },
    {
        "title": "Korean Language",
        "icon": "translate",
        "short_description": "TOPIK-focused Korean language classes for study and work in South Korea.",
        "description": (
            "The Test of Proficiency in Korean (TOPIK) is the key requirement for universities, colleges "
            "and employers across South Korea.\n\n"
            "Our Korean Language program takes you from Hangul basics to TOPIK Level 3-4, with dedicated "
            "listening, reading, writing and speaking practice led by experienced instructors in small batches."
        ),
    },
]

EVENTS = [
    {
        "title": "Australia & New Zealand Education Fair 2026",
        "location": "Bristi HQ, Putalisadak, Kathmandu",
        "short_description": "Meet representatives from leading universities in Australia and New Zealand and get on-the-spot offer letters.",
        "description": (
            "Join our largest event of the year! Meet university delegates, learn about intakes, scholarships "
            "and post-study work rights, and complete free profile evaluations with our senior counsellors.\n\n"
            "Pre-registration recommended. Bring your academic transcripts and English test scores."
        ),
    },
    {
        "title": "USA & Canada Education Fair",
        "location": "Hotel Hyatt Place, Kathmandu",
        "short_description": "One-on-one sessions with admission officers from US and Canadian universities.",
        "description": (
            "Discover scholarship opportunities, OPT/STEM pathways and co-op programs directly from university "
            "admission officers from the USA and Canada.\n\n"
            "Limited seats. Walk-ins welcome on the day."
        ),
    },
    {
        "title": "IELTS Mock Test Day",
        "location": "Bristi Office, Putalisadak",
        "short_description": "Free full-length IELTS mock test with detailed band-score feedback from our trainers.",
        "description": (
            "Sit a complete IELTS academic mock test, then receive a personalised feedback report covering all "
            "four modules with improvement strategies.\n\n"
            "Places are limited — reserve your seat through the enquiry form."
        ),
    },
    {
        "title": "Study in Europe: Germany & Ireland Info Session",
        "location": "Online + Bristi HQ",
        "short_description": "Learn about tuition-free education in Germany and English-taught programs in Ireland.",
        "description": (
            "Explore affordable European options including Germany's public universities, scholarship programs, "
            "and post-study residency pathways.\n\n"
            "Sessions run both online and at our Kathmandu office — choose the mode that suits you."
        ),
    },
]

TESTIMONIALS = [
    {
        "name": "Aarav Shrestha",
        "destination": "Australia",
        "university": "University of Sydney",
        "course": "Master of Information Technology",
        "rating": 5,
        "quote": "Bristi simplified every stage of my Australian university application. They guided my SOP drafting meticulously and ensured my GTE documentation was airtight.",
    },
    {
        "name": "Sneha Adhikari",
        "destination": "United Kingdom",
        "university": "University of Manchester",
        "course": "BSc Biotechnology",
        "rating": 5,
        "quote": "The counsellors at Putalisadak treated my parents with so much respect. They explained the UK visa process and CAS letter procedures with complete transparency.",
    },
    {
        "name": "Rohan Thapa",
        "destination": "Canada",
        "university": "University of Toronto",
        "course": "Post-Graduate Diploma Data Analytics",
        "rating": 5,
        "quote": "From selecting Canadian colleges with co-op modules to filing the SDS visa stream, Bristi gave me clear checklists without any false promises. Highly recommended.",
    },
    {
        "name": "Prativa Singh",
        "destination": "USA",
        "university": "Arizona State University",
        "course": "BS Computer Science",
        "rating": 5,
        "quote": "My SEVIS registration and scholarship applications were handled perfectly. I felt supported at every single step of the process.",
    },
    {
        "name": "Kiran Gurung",
        "destination": "New Zealand",
        "university": "University of Auckland",
        "course": "Master of Engineering",
        "rating": 5,
        "quote": "They recommended a university that actually fit my budget and career plans instead of chasing commissions. Genuinely honest consultancy.",
    },
    {
        "name": "Asha Gurung",
        "destination": "Japan",
        "university": "Waseda University",
        "course": "International Communication",
        "rating": 5,
        "quote": "The pre-departure session was a lifesaver. From accommodation booking to banking setup in Tokyo, everything was arranged smoothly.",
    },
    {
        "name": "Bikash Lamichhane",
        "destination": "Germany",
        "university": "TU Munich",
        "course": "Master of Mechanical Engineering",
        "rating": 5,
        "quote": "Bristi walked me through the German APS verification, blocked account setup, and embassy appointment without a single missed deadline.",
    },
    {
        "name": "Nisha Karki",
        "destination": "Ireland",
        "university": "Trinity College Dublin",
        "course": "MSc Computer Science",
        "rating": 5,
        "quote": "The team helped me shortlist universities based on job prospects after graduation. My visa interview prep was spot on.",
    },
    {
        "name": "Sagar Bhattarai",
        "destination": "South Korea",
        "university": "Seoul National University",
        "course": "Bachelor of Business Administration",
        "rating": 5,
        "quote": "From TOPIK certification guidance to dormitory applications, Bristi handled everything patiently and professionally.",
    },
    {
        "name": "Priya Maharjan",
        "destination": "Australia",
        "university": "RMIT University",
        "course": "Master of Business Analytics",
        "rating": 5,
        "quote": "I never felt like just another client. They remembered my career goals and tailored every recommendation accordingly.",
    },
]

HIGHLIGHTS = [
    {"text": "IELTS classes at 50% off this month", "link": "/test-preparation", "is_active": True, "order": 0},
    {"text": "TOEFL / PTE batch 20% off", "link": "/test-preparation", "is_active": True, "order": 1},
    {"text": "Australia & NZ Education Fair next Saturday", "link": "/events", "is_active": True, "order": 2},
    {"text": "Free career counselling at Putalisadak", "link": "/contact", "is_active": True, "order": 3},
    {"text": "Spring 2027 intakes now open — apply early", "link": "/destinations", "is_active": True, "order": 4},
    {"text": "Scholarship guidance available for all destinations", "link": "/services", "is_active": True, "order": 5},
]

TEAM_MEMBERS = [
    {
        "name": "Bikash Bhandari",
        "role": "Founder & Managing Director",
        "group": "Leadership",
        "qualification": "MBA, Strategic Education Consulting",
        "bio": "18+ years in international education. Bikash built Bristi around a single promise — honest, evidence-based guidance for every student who walks in.",
    },
    {
        "name": "Sneha Adhikari",
        "role": "Operations Director",
        "group": "Leadership",
        "qualification": "MSc International Business",
        "bio": "Sneha keeps the entire student journey running on time and answers every enquiry personally.",
    },
    {
        "name": "Rohan Shrestha",
        "role": "Senior Counsellor – Australia & NZ",
        "group": "Counselling",
        "qualification": "QAEC-trained counsellor",
        "bio": "Rohan has advised 2,000+ students on courses, scholarships and visa requirements.",
    },
    {
        "name": "Prativa Karki",
        "role": "Senior Counsellor – UK & Europe",
        "group": "Counselling",
        "qualification": "MSc International Development",
        "bio": "Prativa specialises in honest, value-focused guidance for UK, Ireland and mainland Europe.",
    },
    {
        "name": "Nisha Maharjan",
        "role": "Counsellor – Medical Destinations",
        "group": "Counselling",
        "qualification": "Medical admissions specialist",
        "bio": "Nisha handles MBBS and medical routes across Europe and other health-science destinations.",
    },
    {
        "name": "Kiran Gurung",
        "role": "Visa & Documentation Lead",
        "group": "Visa & Operations",
        "qualification": "Certified document reviewer",
        "bio": "Kiran owns every visa file and Embassy submission with a stellar first-time approval record.",
    },
    {
        "name": "Sagar Bhattarai",
        "role": "IELTS / PTE Head Trainer",
        "group": "Test Preparation",
        "qualification": "IELTS 8.5 band scorer",
        "bio": "Sagar has coached 1,500+ students to their target bands.",
    },
    {
        "name": "Shreya Pradhan",
        "role": "Front Desk & Client Relations",
        "group": "Student Support",
        "qualification": "BA Business Studies",
        "bio": "Shreya makes every enquiry and appointment feel personal from the very first call.",
    },
]

INTAKES = [
    {"country": "Australia", "intake": "Feb 2027", "start_date": "2027-02-01", "deadline": "Apply by Nov 2026", "order": 0},
    {"country": "United Kingdom", "intake": "Sep 2027", "start_date": "2027-09-01", "deadline": "Rolling admission", "order": 1},
    {"country": "Canada", "intake": "Sep 2027", "start_date": "2027-09-01", "deadline": "Apply by Dec 2026", "order": 2},
    {"country": "New Zealand", "intake": "Jul 2027", "start_date": "2027-07-01", "deadline": "Apply by Mar 2027", "order": 3},
    {"country": "South Korea", "intake": "Mar 2027", "start_date": "2027-03-01", "deadline": "Rolling admission", "order": 4},
    {"country": "USA", "intake": "Aug 2027", "start_date": "2027-08-01", "deadline": "Apply by Feb 2027", "order": 5},
    {"country": "Europe", "intake": "Oct 2027", "start_date": "2027-10-01", "deadline": "Apply by May 2027", "order": 6},
    {"country": "Japan", "intake": "Apr 2027", "start_date": "2027-04-01", "deadline": "Apply by Dec 2026", "order": 7},
]

# Preferred display order for countries across the site.
COUNTRY_ORDER = [
    "Australia",
    "United Kingdom",
    "Canada",
    "New Zealand",
    "South Korea",
    "USA",
    "Europe",
    "Japan",
]

BLOGS = [
    {
        "title": "NEB Class 12 Grade Increment Exam 2083: Best Official Guide",
        "author": "Bristi Team",
        "tags": "Nepal, NEB, Exams, Study Abroad",
        "days_ago": 2,
        "excerpt": "Everything you need to know about the Class 12 grade increment exam 2083 — dates, eligibility, steps, and how it impacts studying abroad.",
        "content": (
            "The NEB Class 12 grade increment exam is your opportunity to improve your GPA by re-taking subjects "
            "you wish to upgrade. A stronger GPA directly improves your chances for competitive university "
            "admissions and scholarships abroad.\n\n"
            "How to apply\n"
            "You register through your college within the announced window. Keep your admit card, gradesheet and "
            "photocopies ready, and confirm the exact exam format with your institution coordinator.\n\n"
            "Impact on study abroad applications\n"
            "Australian, UK, EU and Canadian universities evaluate your overall academic record. Upgrading weak "
            "grades before you apply can move you from an average to a highly competitive profile — and our "
            "counsellors can advise exactly which subjects to re-take based on your target universities.\n\n"
            "At Bristi, we help you plan around the increment exam timeline so your university applications are "
            "never delayed. Book a free counselling session to evaluate your GPA upgrade strategy."
        ),
    },
    {
        "title": "IELTS Test Preparation Guide for Nepali Students",
        "author": "Bristi Team",
        "tags": "IELTS, Test Preparation",
        "days_ago": 9,
        "excerpt": "A complete roadmap to scoring 7.0+ in IELTS — practice plans, common mistakes, and exam-day tips from our trainers.",
        "content": (
            "Scoring well in IELTS requires more than practice — it requires a strategy. Here is our trusted "
            "roadmap for Nepali students targeting 6.5 to 7.5 band scores.\n\n"
            "Listening\n"
            "Listen to British, American and Australian accents daily. Practice note-taking under time pressure "
            "and always read the questions before the audio starts.\n\n"
            "Reading\n"
            "Learn skimming and scanning. Time is your biggest enemy, so build speed with daily timed passages "
            "instead of studying vocabulary lists alone.\n\n"
            "Writing and Speaking\n"
            "Memorise logical task structures (Task 1 data description and Task 2 essay frameworks). For speaking, "
            "record yourself, review fluency, and practise with a partner who corrects you.\n\n"
            "Join our free IELTS mock test day to measure your current level and get a personalised band-score "
            "improvement plan."
        ),
    },
    {
        "title": "Student Visa Interview Tips for Nepal: What Visa Officers Check",
        "author": "Bristi Team",
        "tags": "Visa, Interviews, Tips",
        "days_ago": 16,
        "excerpt": "Learn exactly what embassies evaluate in a student visa interview and how to answer like a prepared, genuine applicant.",
        "content": (
            "A student visa interview is not about memory — it is about consistency. Visa officers evaluate "
            "whether your plan to study abroad is genuine.\n\n"
            "What they check\n"
            "1. Your reason for choosing the country, university and course.\n"
            "2. Your financial capability and the source of funds.\n"
            "3. Your realistic ties to Nepal and study-exit plans.\n\n"
            "How to prepare\n"
            "· Be honest about your academic profile and grades.\n"
            "· Explain your career goal and how the course connects to it.\n"
            "· Carry complete, organised financial documents.\n\n"
            "Our visa counsellors conduct realistic mock interviews — book a free session and arrive at your "
            "interview genuinely confident."
        ),
    },
    {
        "title": "PTE Test in Nepal: Everything You Need to Know",
        "author": "Bristi Team",
        "tags": "PTE, Test Preparation",
        "days_ago": 24,
        "excerpt": "Why more students are choosing PTE — faster results, AI scoring, and how to prepare effectively in Kathmandu.",
        "content": (
            "The PTE Academic is becoming the test of choice for students targeting Australia, New Zealand, the UK "
            "and Canada — mainly because it delivers results within 48 hours.\n\n"
            "How it differs from IELTS\n"
            "PTE is fully computer-based and AI-scored, which removes human-subjectivity from speaking and writing "
            "sections. Many students find machine scoring more predictable once they understand the rubrics.\n\n"
            "Preparation tips\n"
            "· Master the integrated item types such as Read Aloud, Repeat Sentence and Summarise Spoken Text.\n"
            "· Use the official scored mock test to pinpoint weak skills.\n"
            "· Practise in real computer-lab conditions to build speed.\n\n"
            "Our PTE class runs computer-based mocks every week — join us to start your journey with a free "
            "placement test."
        ),
    },
    {
        "title": "Study in Australia Guide: Intakes, Costs and Post-Study Work",
        "author": "Bristi Team",
        "tags": "Australia, Study Guide",
        "days_ago": 31,
        "excerpt": "Everything Nepali students must know before applying to Australia — intakes, tuition, scholarships and PR pathways.",
        "content": (
            "Australia remains a top destination for Nepali students thanks to its high-quality universities, "
            "safe society and strong work rights.\n\n"
            "Key facts\n"
            "· Intakes are usually February and July.\n"
            "· Post-study work rights range from two to four years depending on your qualification level.\n"
            "· Tuition typically ranges from AUD 20,000 to 45,000 per year depending on the course.\n\n"
            "Scholarship opportunities\n"
            "Many universities award automatic scholarships of 10–25 percent for strong academic records. "
            "Our counsellors help you target institutions that maximise both scholarship and visa success.\n\n"
            "Book your free counselling session to start planning the right intake and course for your profile."
        ),
    },
    {
        "title": "Study in Canada Guide: SDS, Co-ops and PR Pathways",
        "author": "Bristi Team",
        "tags": "Canada, Study Guide",
        "days_ago": 38,
        "excerpt": "A practical guide to studying in Canada — SDS visa stream, co-op programs, PGWP and the road to permanent residency.",
        "content": (
            "Canada offers one of the clearest roads from student to permanent resident, which is why it remains "
            "one of Nepal's top destinations.\n\n"
            "The SDS visa stream\n"
            "The Student Direct Stream speeds up processing for applicants with IELTS and up-front tuition payment. "
            "Our counsellors verify your eligibility and help you assemble the complete dossier correctly.\n\n"
            "Co-op and work opportunities\n"
            "Many colleges integrate paid co-op terms into their programs, letting you graduate with Canadian work "
            "experience already on your CV.\n\n"
            "After graduation, a Post-Graduation Work Permit of up to three years gives you time to qualify for "
            "permanent residency programs.\n\n"
            "Speak with a Canadian specialist today to map your pathway."
        ),
    },
]

GALLERY_SECTIONS = [
    {
        "name": "Office",
        "icon": "apartment",
        "description": (
            "Inside our Samakhusi Chowk office \u2014 counselling rooms, document reviews and the "
            "walk-ins we always welcome."
        ),
    },
    {
        "name": "Counselling",
        "icon": "forum",
        "description": (
            "One-on-one sessions where a student maps their pathway with a senior counsellor, "
            "question by question."
        ),
    },
    {
        "name": "Events",
        "icon": "celebration",
        "description": (
            "Education fairs, university delegation visits and info sessions we host through the year."
        ),
    },
    {
        "name": "Test Preparation",
        "icon": "school",
        "description": (
            "Mock tests, workshops and classroom moments from our IELTS, PTE, GMAT, TOEFL and SAT "
            "batches."
        ),
    },
]

GALLERY = [
    {
        "title": "Counselling Sessions at Putalisadak",
        "section": "Office",
    },
    {
        "title": "Australia Education Fair 2026",
        "section": "Events",
    },
    {
        "title": "IELTS Mock Test Day",
        "section": "Test Preparation",
    },
    {
        "title": "Study in Europe Info Session",
        "section": "Events",
    },
    {
        "title": "Canadian Co-op Programs Seminar",
        "section": "Events",
    },
    {
        "title": "Scholarship Workshop",
        "section": "Counselling",
    },
    {
        "title": "Students Preparing for Departure",
        "section": "Counselling",
    },
    {
        "title": "New Zealand University Delegation Visit",
        "section": "Events",
    },
]
