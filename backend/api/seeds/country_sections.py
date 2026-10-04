"""Per-country structured content sections for destination detail pages.

Each country carries its own ordered set of blocks (Education System, Study
Costs, Quick Facts, Admission/Visa procedures, ...) so topics differ per
country while remaining fully data-driven. ``style`` selects the frontend
rendering: text / facts / list / steps / table / banner.
"""

COUNTRY_SECTIONS = {
    "Australia": [
        {
            "heading": "Education System",
            "style": "text",
            "body": (
                "The Australian education system is built around the Australian Qualifications "
                "Framework (AQF), which connects the country's school, vocational and university "
                "sectors so students can move between levels without losing credit.\n\n"
                "After primary and secondary schooling, students can choose between universities, "
                "Vocational Education and Training (VET) providers, and private colleges — each "
                "with clear pathways into work or further study. Australian qualifications are "
                "recognised worldwide and widely respected by employers.\n\n"
                "International students are welcomed at every level, from English language programs "
                "through undergraduate degrees to doctoral research, with strong support services "
                "on campus and a genuinely multicultural student community."
            ),
        },
        {
            "heading": "ELICOS & English Language Courses",
            "style": "text",
            "body": (
                "ELICOS (English Language Intensive Courses for Overseas Students) programs help "
                "international students build the English skills they need before entering a VET "
                "or university course. Providers range from dedicated language colleges to English "
                "centres attached to major universities.\n\n"
                "Courses cover General English, Academic English, and IELTS/PTE preparation, with "
                "continuous assessment and a direct pathway into your chosen program. Most students "
                "study for 8–20 weeks depending on their current level and target entry requirements."
            ),
        },
        {
            "heading": "Vocational Education & Training",
            "style": "text",
            "body": (
                "VET courses are delivered by TAFE and private colleges and are intensely practical, "
                "covering fields such as commercial cookery, hospitality, IT, aged care, automotive "
                "and project management.\n\n"
                "Certificates, diplomas and advanced diplomas can be completed in 1–2 years and "
                "typically include hands-on placements. Many VET graduates move directly into "
                "Australian employment, and diplomas often provide credit towards a university degree."
            ),
        },
        {
            "heading": "University Education",
            "style": "text",
            "body": (
                "Australian bachelor's degrees take 3–4 years, master's programs 1–2 years, and "
                "doctoral studies 3–4 years. Group of Eight universities lead global rankings, while "
                "a broader network of modern institutions offers excellent teaching and industry links.\n\n"
                "Degrees are taught in English, combine theory with practical placement, and carry "
                "strong global recognition — consistently placing Australian graduates among the "
                "most employable in the world."
            ),
        },
        {
            "heading": "Quick Facts",
            "style": "facts",
            "rows": [
                {"label": "Capital", "value": "Canberra"},
                {"label": "Currency", "value": "Australian Dollar (AUD)"},
                {"label": "Intakes", "value": "February & July"},
                {"label": "Avg tuition", "value": "AUD 20,000 – 45,000 / year"},
                {"label": "Work rights", "value": "Up to 48 hours / fortnight"},
                {"label": "Post-study work", "value": "2 – 4 years (Subclass 485)"},
            ],
        },
        {
            "heading": "Study Costs (Per Year)",
            "style": "table",
            "rows": [
                {"label": "Bachelor's tuition", "value": "AUD 20,000 – 45,000"},
                {"label": "Postgraduate tuition", "value": "AUD 22,000 – 50,000"},
                {"label": "Living & accommodation", "value": "AUD 25,000 – 35,000"},
                {"label": "OSHC (health cover)", "value": "AUD 600 – 800"},
                {"label": "Visa application", "value": "AUD 630+"},
            ],
        },
        {
            "heading": "Why Students Choose Australia",
            "style": "list",
            "items": [
                "Globally ranked universities with strong research output",
                "Generous post-study work visa of 2–4 years",
                "Safe, multicultural cities ranked among the most liveable in the world",
                "High graduate employability and an English-speaking workplace",
                "Work rights for international students during study",
            ],
        },
        {
            "heading": "Admission Procedure",
            "style": "steps",
            "items": [
                "Choose your course and institution based on goals and budget",
                "Prepare academic transcripts, awards and English test results",
                "Submit your application to the institution with fees",
                "Receive your offer letter and accept it (pay deposit if required)",
                "Apply for a Subclass 500 student visa online",
                "Fly to Australia and enrol on campus",
            ],
        },
        {
            "heading": "Application Checklist",
            "style": "list",
            "items": [
                "Valid passport with at least 6 months validity",
                "Academic transcripts and certificates with transcripts",
                "English test score (IELTS / PTE)",
                "Statement of Purpose and references (if requested)",
                "Evidence of funds for tuition, living costs and travel",
                "Overseas Student Health Cover (OSHC)",
            ],
        },
        {
            "heading": "Student Visa (Subclass 500)",
            "style": "steps",
            "items": [
                "Collect your Confirmation of Enrolment (CoE) from the university",
                "Create an ImmiAccount and lodge your visa application online",
                "Pay the visa application charge",
                "Attend biometrics and a health examination if required",
                "Wait for a decision — typically 4–8 weeks",
                "Travelling and living rights apply for the full duration of study",
            ],
        },
        {
            "heading": "Ready to Study in Australia?",
            "style": "banner",
            "body": "Talk to our Australia country specialist for a free profile evaluation, course list and step-by-step visa guidance.",
        },
    ],
    "United Kingdom": [
        {
            "heading": "Education System",
            "style": "text",
            "body": (
                "The UK education system is one of the oldest and most respected in the world. "
                "Compulsory schooling runs in Key Stages from age 5 to 16, after which students "
                "sit GCSEs and typically continue to A-levels or vocational qualifications.\n\n"
                "Higher education is delivered by more than 150 universities, from historic "
                "Russell Group institutions to modern universities, plus further education "
                "colleges that offer foundations and pathway programs.\n\n"
                "Degrees are internationally recognised and famous for their focus, depth and "
                "rigour — including the distinctive one-year taught master's degree."
            ),
        },
        {
            "heading": "Primary & Secondary Education",
            "style": "text",
            "body": (
                "International students can join British independent schools from primary level "
                "onwards. Many families enrol students for GCSEs (ages 14–16) and A-levels "
                "(ages 16–18), which are the standard route into UK universities.\n\n"
                "Boardings and day schools provide strong pastoral care, small classes and a "
                "broad curriculum that develops academic success alongside confidence and leadership."
            ),
        },
        {
            "heading": "Further Education",
            "style": "text",
            "body": (
                "Further education (FE) colleges offer A-levels, BTECs, foundation courses and "
                "HND/HNC qualifications. They are ideal for students who want a pathway into "
                "university or a vocational start to their career.\n\n"
                "International students often begin with an International Foundation Year or "
                "Pre-Master's at an FE college or pathway provider before progressing to a "
                "degree at a partner university."
            ),
        },
        {
            "heading": "Higher Education",
            "style": "text",
            "body": (
                "UK bachelor's degrees typically take 3 years (4 in Scotland and many "
                "sandwich/integrated courses), while taught master's degrees are completed in "
                "just 1 year — a fast track to world-class qualifications and lower total cost.\n\n"
                "The Graduate Route allows graduates to live and work in the UK for 2 years "
                "(3 for PhD) after completing a degree, gaining valuable international experience."
            ),
        },
        {
            "heading": "Entry Requirements",
            "style": "table",
            "rows": [
                {"label": "Undergraduate", "value": "12 years of schooling + UK NARIC equivalent"},
                {"label": "Programs (Foundation)", "value": "A levels / Foundation Year on a case-by-case basis"},
                {"label": "Postgraduate", "value": "Recognised bachelor's degree (2:2 or above)"},
                {"label": "English language", "value": "IELTS 6.0 – 7.0 overall depending on course"},
                {"label": "Some courses", "value": "Interview, portfolio or entrance test"},
            ],
        },
        {
            "heading": "Quick Facts",
            "style": "facts",
            "rows": [
                {"label": "Capital", "value": "London"},
                {"label": "Currency", "value": "Pound Sterling (GBP)"},
                {"label": "Intakes", "value": "September & January"},
                {"label": "Avg tuition", "value": "GBP 15,000 – 30,000 / year"},
                {"label": "Part-time work", "value": "20 hours / week during term"},
                {"label": "Post-study (Graduate Route)", "value": "2 years (3 for PhD)"},
            ],
        },
        {
            "heading": "Study & Living Costs",
            "style": "table",
            "rows": [
                {"label": "Undergraduate tuition", "value": "GBP 15,000 – 30,000"},
                {"label": "Postgraduate tuition", "value": "GBP 16,000 – 35,000"},
                {"label": "Accommodation", "value": "GBP 6,000 – 12,000"},
                {"label": "Living costs", "value": "GBP 8,000 – 12,000 (London higher)"},
            ],
        },
        {
            "heading": "Benefits of Studying in the UK",
            "style": "list",
            "items": [
                "One-year master's degrees — faster return on investment",
                "Graduate Route post-study work of 2 years",
                "Some of the world's most prestigious universities",
                "Scholarships and financial support at every level",
                "A central base for exploring Europe",
            ],
        },
        {
            "heading": "Admission Procedure",
            "style": "steps",
            "items": [
                "Shortlist courses and universities that match your profile",
                "Check UCAS (undergraduate) or direct application (postgraduate)",
                "Prepare transcripts, personal statement and references",
                "Submit applications and pay the UCAS or university fee",
                "Track offers and accept your firm place",
                "Receive your CAS and apply for a Student visa",
            ],
        },
        {
            "heading": "Application Checklist",
            "style": "list",
            "items": [
                "Valid passport",
                "Academic transcripts and certificates",
                "IELTS for UKVI (Secure English language test) score",
                "Personal statement and reference letters",
                "Financial evidence for the visa application",
                "Confirmation of Acceptance for Studies (CAS)",
            ],
        },
        {
            "heading": "Student Visa (Student Route)",
            "style": "steps",
            "items": [
                "Receive your CAS number from the university",
                "Apply online at visa and immigration website",
                "Pay the Immigration Health Surcharge (IHS) and visa fee",
                "Book and attend a biometric appointment",
                "Receive a decision in around 3 weeks",
                "Take the Graduate Route after completing your degree",
            ],
        },
        {
            "heading": "Begin Your UK Journey",
            "style": "banner",
            "body": "Our UK specialists will help you choose the right university, prepare your application and secure your Student visa.",
        },
    ],
    "Canada": [
        {
            "heading": "Education System",
            "style": "text",
            "body": (
                "Canada's education system is decentralised, with each province managing its own "
                "schools, colleges and universities to a consistently high standard. Degrees and "
                "diplomas from Canadian institutions are valued worldwide.\n\n"
                "Students can choose between universities (theory and research focused), colleges "
                "and polytechnics (practical and career focused), and pathway programs that blend "
                "both. The system is strongly work-integrated, with co-op terms built into many "
                "curricula."
            ),
        },
        {
            "heading": "Co-op Programs & Work-Integrated Learning",
            "style": "text",
            "body": (
                "Co-op (cooperative education) is one of Canada's biggest advantages. Students "
                "alternate academic terms with paid placements at partner employers, graduating "
                "with up to a year or more of real Canadian work experience.\n\n"
                "Many diploma and degree programs at institutions such as Seneca, UBC and the "
                "University of Toronto include paid co-op terms, making graduates highly sought "
                "after and improving their post-graduation work permit outcomes."
            ),
        },
        {
            "heading": "Colleges, Polytechnics & Universities",
            "style": "text",
            "body": (
                "Canadian colleges and polytechnics offer 1–3 year diplomas and graduate "
                "certificates in areas like data analytics, business, IT and health sciences, "
                "often with built-in co-op placements.\n\n"
                "Universities offer bachelor's, master's and doctoral degrees with strong research "
                "excellence. Both routes are equally respected and feed into the same "
                "post-graduation work permit and permanent residency pathways."
            ),
        },
        {
            "heading": "Quick Facts",
            "style": "facts",
            "rows": [
                {"label": "Capital", "value": "Ottawa"},
                {"label": "Currency", "value": "Canadian Dollar (CAD)"},
                {"label": "Intakes", "value": "September, January & May"},
                {"label": "Avg tuition", "value": "CAD 18,000 – 35,000 / year"},
                {"label": "Part-time work", "value": "20 hours / week during term"},
                {"label": "Post-graduation work permit", "value": "Up to 3 years"},
            ],
        },
        {
            "heading": "Study Costs",
            "style": "table",
            "rows": [
                {"label": "College / diploma tuition", "value": "CAD 15,000 – 25,000"},
                {"label": "University tuition", "value": "CAD 18,000 – 35,000"},
                {"label": "Accommodation", "value": "CAD 8,000 – 15,000"},
                {"label": "Living costs", "value": "CAD 10,000 – 15,000"},
            ],
        },
        {
            "heading": "Admission Procedure",
            "style": "steps",
            "items": [
                "Research colleges and universities offering your field",
                "Review program entry requirements and intakes",
                "Prepare documents — transcripts, SOP, English test",
                "Apply online and pay the application fee",
                "Receive an offer of admission and confirm acceptance",
                "Pay tuition (as required) to obtain a Letter of Acceptance",
            ],
        },
        {
            "heading": "Application Checklist",
            "style": "list",
            "items": [
                "Valid passport",
                "Academic transcripts and certificates",
                "English test score (IELTS / PTE)",
                "Statement of purpose and references",
                "Proof of funds (GIC or bank statement)",
                "Valid Letter of Acceptance from a DLI",
            ],
        },
        {
            "heading": "Study Permit (Visa)",
            "style": "steps",
            "items": [
                "Get your Letter of Acceptance from a designated institution",
                "Apply online to Immigration, Refugees and Citizenship Canada (IRCC)",
                "Provide biometrics and financial proof",
                "Complete a medical exam if required",
                "Receive a decision — typically 4–8 weeks",
                "Present your port-of-entry letter at arrival",
            ],
        },
        {
            "heading": "Pathways to Permanent Residency",
            "style": "list",
            "items": [
                "Complete your studies, then work under a PGWP (up to 3 years)",
                "Gain Canadian work experience to boost CRS points for Express Entry",
                "Apply through Provincial Nominee Programs (e.g. OINP, BCPNP)",
                "Qualify under Canadian Experience Class after full-time work",
                "Post-graduation work experience counts strongly for PR",
            ],
        },
        {
            "heading": "Plan Your Canada Application",
            "style": "banner",
            "body": "Get a free profile review and a personalised co-op program shortlist from our Canada country specialists.",
        },
    ],
    "USA": [
        {
            "heading": "Education System",
            "style": "text",
            "body": (
                "The US hosts more of the world's top-ranked universities than any other country, "
                "with unmatched research funding and a flexible education system. Students can "
                "shape their own degree through majors, minors and electives.\n\n"
                "Undergraduate study is typically 4 years and postgraduate study 1–2 years, with "
                "huge choice between public state universities, prestigious private research "
                "universities and small liberal arts colleges."
            ),
        },
        {
            "heading": "Community Colleges & Pathway Programs",
            "style": "text",
            "body": (
                "Community colleges offer affordable 2-year associate degrees and transfer pathways "
                "into four-year universities — a popular, cost-effective route for international "
                "students that can save thousands on tuition.\n\n"
                "They also provide intensive English programs and smaller class sizes, making them "
                "an excellent first step into the US education system before transferring credits "
                "to a university degree."
            ),
        },
        {
            "heading": "Universities, Colleges & Liberal Arts",
            "style": "text",
            "body": (
                "Private and public universities range from Ivy League institutions to state "
                "flagships renowned for specific disciplines such as engineering, business and "
                "computer science.\n\n"
                "Liberal arts colleges emphasise broad critical thinking and strong faculty "
                "relationships, while research universities offer cutting-edge labs and hundreds "
                "of specialisations at every level."
            ),
        },
        {
            "heading": "Quick Facts",
            "style": "facts",
            "rows": [
                {"label": "Capital", "value": "Washington, D.C."},
                {"label": "Currency", "value": "US Dollar (USD)"},
                {"label": "Intakes", "value": "Fall & Spring"},
                {"label": "Avg tuition", "value": "USD 20,000 – 55,000 / year"},
                {"label": "OPT work authorisation", "value": "1 – 3 years post-study"},
                {"label": "Scholarships", "value": "Widely available at all levels"},
            ],
        },
        {
            "heading": "Study Costs",
            "style": "table",
            "rows": [
                {"label": "Public university", "value": "USD 20,000 – 35,000"},
                {"label": "Private university", "value": "USD 35,000 – 55,000"},
                {"label": "Accommodation", "value": "USD 10,000 – 18,000"},
                {"label": "Living costs", "value": "USD 8,000 – 15,000"},
                {"label": "Health insurance", "value": "USD 1,500 – 3,000"},
            ],
        },
        {
            "heading": "Admission Procedure",
            "style": "steps",
            "items": [
                "Shortlist universities based on program, ranking and budget",
                "Prepare your English test score (IELTS / PTE) as required",
                "Write essays and secure recommendation letters",
                "Apply via the Common Application or direct university portals",
                "Receive your I-20 once admitted",
                "Pay the SEVIS fee and attend your visa interview",
            ],
        },
        {
            "heading": "Scholarships & Financial Aid",
            "style": "list",
            "items": [
                "Merit-based scholarships at public and private universities",
                "Athletic and arts talent awards",
                "International student tuition discounts",
                "Research and teaching assistantships for graduate students",
                "Institutional and external funds such as Fulbright",
            ],
        },
        {
            "heading": "Application Checklist",
            "style": "list",
            "items": [
                "Valid passport with 6+ months validity",
                "Academic transcripts with certified translations",
                "English test score (IELTS / PTE)",
                "Essays, CV and recommendation letters",
                "Financial certification for I-20",
                "SEVP-approved school documents",
            ],
        },
        {
            "heading": "Student Visa (F-1)",
            "style": "steps",
            "items": [
                "Receive the I-20 form from your SEVP-designated school",
                "Pay the SEVIS I-901 fee",
                "Complete Form DS-160 and schedule your interview",
                "Prepare proof of funds and intent documents",
                "Attend the visa interview at the US embassy",
                "Enter the US up to 30 days before your program start",
            ],
        },
        {
            "heading": "OPT & Career Pathways",
            "style": "list",
            "items": [
                "12-month Optional Practical Training after graduation",
                "24-month STEM extension for eligible fields",
                "Curricular Practical Training during studies",
                "H-1B work-sponsorship pathway for employers",
            ],
        },
        {
            "heading": "Apply to Study in the USA",
            "style": "banner",
            "body": "Our US counsellors will match your profile with scholarship-backed programs and guide your F-1 visa application.",
        },
    ],
    "New Zealand": [
        {
            "heading": "Education System",
            "style": "text",
            "body": (
                "New Zealand's education system is globally respected, blending high academic "
                "standards with a focus on practical, research-based learning. NCEA in high "
                "school leads into universities, institutes of technology or private training "
                "establishments.\n\n"
                "The country's eight universities all rank internationally, and its polytechnics "
                "offer highly practical diplomas that connect directly with employers."
            ),
        },
        {
            "heading": "Pathways & Vocational Training",
            "style": "text",
            "body": (
                "Pathway and vocational programs, such as graduate diplomas in IT and business, "
                "offer multiple monthly intakes and strong academic support — ideal for students "
                "seeking faster, more affordable outcomes.\n\n"
                "These pathways often progress into postgraduate study or directly into New "
                "Zealand employment, and count toward post-study work visa eligibility."
            ),
        },
        {
            "heading": "Quick Facts",
            "style": "facts",
            "rows": [
                {"label": "Capital", "value": "Wellington"},
                {"label": "Currency", "value": "New Zealand Dollar (NZD)"},
                {"label": "Intakes", "value": "February & July (pathways: monthly)"},
                {"label": "Avg tuition", "value": "NZD 22,000 – 40,000 / year"},
                {"label": "Part-time work", "value": "20 hours / week during term"},
                {"label": "Post-study work visa", "value": "1 – 3 years"},
            ],
        },
        {
            "heading": "Study Costs",
            "style": "table",
            "rows": [
                {"label": "University tuition", "value": "NZD 22,000 – 40,000"},
                {"label": "Polytechnic / diploma tuition", "value": "NZD 18,000 – 28,000"},
                {"label": "Accommodation", "value": "NZD 10,000 – 15,000"},
                {"label": "Living costs", "value": "NZD 8,000 – 12,000"},
            ],
        },
        {
            "heading": "Safety & Lifestyle",
            "style": "list",
            "items": [
                "Consistently ranked among the safest countries in the world",
                "Outdoor adventure capital — beaches, mountains and national parks",
                "Friendly, welcoming and inclusive culture",
                "Clean and well-managed student cities",
                "Strong support for international students",
            ],
        },
        {
            "heading": "Admission Procedure",
            "style": "steps",
            "items": [
                "Research universities, polytechnics and pathway providers",
                "Check entry requirements and English criteria",
                "Prepare academic documents and references",
                "Submit your application online",
                "Receive an offer letter and pay tuition as required",
                "Apply for a student visa with your offer",
            ],
        },
        {
            "heading": "Application Checklist",
            "style": "list",
            "items": [
                "Valid passport",
                "Academic transcripts and certificates",
                "English test score (IELTS / PTE)",
                "Statement of purpose",
                "Proof of funds and travel history",
                "Genuine intent to study evidence",
            ],
        },
        {
            "heading": "Student Visa",
            "style": "steps",
            "items": [
                "Secure a confirmed offer from a registered institution",
                "Pay tuition (or a deposit) as required",
                "Apply online to Immigration New Zealand",
                "Complete medical and police checks",
                "Receive a decision and your visa label",
                "Enter New Zealand and enrol at your institution",
            ],
        },
        {
            "heading": "Post-Study Work & Residency",
            "style": "list",
            "items": [
                "Post-study work visa of 1–3 years depending on qualification",
                "Points-based Skilled Migrant Category residency",
                "Green List occupations with priority residence pathways",
                "Partner and dependent work rights while you study",
            ],
        },
        {
            "heading": "Your New Zealand Journey Starts Here",
            "style": "banner",
            "body": "Speak to our New Zealand experts about pathways, weekly-intake programs and post-study residency options.",
        },
    ],
    "Japan": [
        {
            "heading": "Education System",
            "style": "text",
            "body": (
                "Japan is a world leader in technology, engineering, robotics and business, and its "
                "universities blend cutting-edge research with a deep culture of academic "
                "excellence.\n\n"
                "The system spans Japanese-language courses in language schools, focused vocational "
                "and technical colleges, undergraduate and graduate degrees — many now taught "
                "entirely in English at leading universities."
            ),
        },
        {
            "heading": "English-Taught Programs (G30 & Beyond)",
            "style": "text",
            "body": (
                "A growing number of Japanese universities offer full English-taught degrees "
                "through the Global 30 (G30) project and similar initiatives, covering engineering, "
                "business, economics and international relations.\n\n"
                "These programs welcome international students without requiring Japanese, while "
                "students can still learn Japanese as part of the experience — a powerful "
                "combination for careers in Asia."
            ),
        },
        {
            "heading": "Japanese Language Schools",
            "style": "text",
            "body": (
                "Language schools across Tokyo, Osaka and Kyoto offer intensive Japanese courses "
                "that serve as a bridge into university study, employment or long-term residency.\n\n"
                "Classes typically run for 1–2 years with student-visa support, multiple intake "
                "points (April and October), and direct progression to higher education."
            ),
        },
        {
            "heading": "Quick Facts",
            "style": "facts",
            "rows": [
                {"label": "Capital", "value": "Tokyo"},
                {"label": "Currency", "value": "Japanese Yen (JPY)"},
                {"label": "Intakes", "value": "April & October (language schools)"},
                {"label": "Avg tuition", "value": "JPY 700,000 – 1,200,000 / year"},
                {"label": "Part-time work", "value": "Up to 28 hours / week"},
                {"label": "Scholarships", "value": "MEXT and JASSO widely available"},
            ],
        },
        {
            "heading": "Study Costs",
            "style": "table",
            "rows": [
                {"label": "University tuition", "value": "JPY 700,000 – 1,200,000"},
                {"label": "Language school tuition", "value": "JPY 500,000 – 800,000"},
                {"label": "Accommodation (monthly)", "value": "JPY 40,000 – 80,000"},
                {"label": "Living costs (monthly)", "value": "JPY 80,000 – 120,000"},
            ],
        },
        {
            "heading": "Scholarships (MEXT & Others)",
            "style": "list",
            "items": [
                "MEXT government scholarship for degree students",
                "JASSO student support and interest-free loans",
                "University tuition waivers for international students",
                "Private foundations and corporate fellowships",
                "Part-time work to cover living costs",
            ],
        },
        {
            "heading": "Admission Procedure",
            "style": "steps",
            "items": [
                "Choose an English-taught degree or language program",
                "Complete the entrance screening and entrance exam",
                "Receive your admission result",
                "Pay admission and tuition fees at the school or university",
                "The institution applies for your Certificate of Eligibility",
            ],
        },
        {
            "heading": "Student Visa & COE",
            "style": "steps",
            "items": [
                "The school applies for a Certificate of Eligibility at immigration",
                "Receive your COE — usually within 1–3 months",
                "Apply for your student visa at the Japanese embassy",
                "Arrive and receive a residence card at the airport",
                "Renew your visa before expiry during your studies",
            ],
        },
        {
            "heading": "Part-Time Work & Career",
            "style": "list",
            "items": [
                "Work part-time up to 28 hours per week with a permit",
                "Combine Japanese language skills with industry knowledge",
                "Growing number of English-based jobs in tech and business",
                "Pathway to a work visa after graduation",
            ],
        },
        {
            "heading": "Explore Japan",
            "style": "banner",
            "body": "From MEXT scholarships to visa paperwork, our Japan specialists guide you through every step of your application.",
        },
    ],
    "South Korea": [
        {
            "heading": "Education System",
            "style": "text",
            "body": (
                "South Korea is a technology and innovation powerhouse whose universities mix "
                "futuristic campuses with a deep culture of academic excellence.\n\n"
                "International students are welcomed into Korean-taught and English-taught programs "
                "across undergraduate and graduate levels, with globally renowned institutions in "
                "the capital Seoul and beyond."
            ),
        },
        {
            "heading": "English-Taught Programs",
            "style": "text",
            "body": (
                "Major universities including Seoul National, Korea and Yonsei offer a wide range "
                "of English-taught degrees and exchange programs, enabling international students "
                "to study without prior Korean language skills.\n\n"
                "These programs combine a globally respected education with Korean cultural "
                "immersion — and students are encouraged to add Korean language study through "
                "university language institutes."
            ),
        },
        {
            "heading": "Quick Facts",
            "style": "facts",
            "rows": [
                {"label": "Capital", "value": "Seoul"},
                {"label": "Currency", "value": "South Korean Won (KRW)"},
                {"label": "Intakes", "value": "March & September"},
                {"label": "Avg tuition", "value": "KRW 8,000,000 – 14,000,000 / year"},
                {"label": "Part-time work (D-2)", "value": "20 hours / week"},
                {"label": "Scholarships", "value": "GKS and university grants"},
            ],
        },
        {
            "heading": "Study Costs",
            "style": "table",
            "rows": [
                {"label": "Undergraduate tuition", "value": "KRW 6,000,000 – 10,000,000"},
                {"label": "Postgraduate tuition", "value": "KRW 8,000,000 – 14,000,000"},
                {"label": "Accommodation (monthly)", "value": "KRW 300,000 – 600,000"},
                {"label": "Living costs (monthly)", "value": "KRW 600,000 – 1,000,000"},
            ],
        },
        {
            "heading": "Scholarships (GKS & University Grants)",
            "style": "list",
            "items": [
                "Global Korea Scholarship (GKS) for full degree study",
                "Korean government support for international students",
                "University merit scholarships and tuition waivers",
                "TOPIK-based tuition benefits at many schools",
            ],
        },
        {
            "heading": "Admission Procedure",
            "style": "steps",
            "items": [
                "Select universities offering your preferred program",
                "Prepare for Korean-language or English assessment",
                "Submit an online application with documents",
                "Attend an interview if required",
                "Receive your admission and standard admission notice",
                "Apply for your D-2 student visa",
            ],
        },
        {
            "heading": "Student Visa (D-2)",
            "style": "steps",
            "items": [
                "Receive your admission notice and invitation documents",
                "Apply for your visa at the Korean embassy",
                "Receive the D-2 student visa",
                "Register at the immigration office within 90 days",
                "Obtain your Alien Registration Card for ID and banking",
            ],
        },
        {
            "heading": "Language & TOPIK",
            "style": "list",
            "items": [
                "TOPIK levels unlock scholarships and tuition discounts",
                "University language institutes teach Korean to proficiency",
                "English-taught tracks require no TOPIK to start",
                "Cultural immersion programs across Seoul campuses",
            ],
        },
        {
            "heading": "Future-Proof Your Career in Korea",
            "style": "banner",
            "body": "Talk to our Korea experts about GKS scholarships, English-taught degrees and your D-2 visa pathway.",
        },
    ],
    "Europe": [
        {
            "heading": "A Continent of Education Systems",
            "style": "text",
            "body": (
                "Europe offers an extraordinary mix of world-renowned universities, affordable "
                "public education and rich cultural heritage — with English-taught programs "
                "available across Germany, Ireland, France, the Netherlands and more.\n\n"
                "The European Higher Education Area standardises bachelor's (3–4 years), master's "
                "(1–2 years) and doctoral cycles, and the Schengen area lets students travel freely "
                "across 27 countries while they study."
            ),
        },
        {
            "heading": "Germany — Tuition-Free Public Universities",
            "style": "text",
            "body": (
                "Most German public universities charge no tuition — only a small semester fee of "
                "around EUR 250–500 that covers transport and student services.\n\n"
                "Institutions such as the Technical University of Munich rank at the very top of "
                "European engineering and management studies, and scholarships like DAAD support "
                "international students throughout their degree."
            ),
        },
        {
            "heading": "Ireland — An English-Speaking Hub",
            "style": "text",
            "body": (
                "Ireland combines first-class, fully English-taught universities with strong "
                "post-study work rights and a booming tech and pharmaceutical economy.\n\n"
                "Institutions like University College Dublin offer rich campus life, and Irish "
                "graduates benefit from an extended stay scheme that supports employment after "
                "study."
            ),
        },
        {
            "heading": "Quick Facts",
            "style": "facts",
            "rows": [
                {"label": "Countries", "value": "Germany, Ireland, France + many more"},
                {"label": "Currency", "value": "Euro (EUR)"},
                {"label": "Intakes", "value": "Winter & Summer"},
                {"label": "Avg tuition", "value": "EUR 10,000 – 25,000 (Germany: ~0)"},
                {"label": "Post-study work", "value": "Varies by country"},
                {"label": "Travel", "value": "Free movement across 27 Schengen states"},
            ],
        },
        {
            "heading": "Study Costs",
            "style": "table",
            "rows": [
                {"label": "Germany (public)", "value": "~EUR 250 – 500 semester fee"},
                {"label": "Ireland tuition", "value": "EUR 10,000 – 25,000"},
                {"label": "France public tuition", "value": "EUR 3,000 – 6,000"},
                {"label": "Accommodation (per year)", "value": "EUR 5,000 – 10,000"},
                {"label": "Living costs (per year)", "value": "EUR 8,000 – 12,000"},
            ],
        },
        {
            "heading": "Scholarships & Funding",
            "style": "list",
            "items": [
                "DAAD scholarships for study in Germany",
                "French government and embassy awards",
                "Irish and EU mobility scholarships",
                "Tuition-free seats at German public universities",
            ],
        },
        {
            "heading": "Admission Procedure",
            "style": "steps",
            "items": [
                "Choose your country, university and program",
                "Check academic equivalence and eligibility",
                "Prepare documents with certified translations",
                "Apply via uni-assist, embassy or the university portal",
                "Receive your admission offer",
                "Arrange visa, accommodation and enrolment",
            ],
        },
        {
            "heading": "Application Checklist",
            "style": "list",
            "items": [
                "Valid passport",
                "Notarised academic transcripts",
                "German or French language certificates (where needed)",
                "Proof of funds or a blocked account",
                "CV, motivation letter and references",
                "Visa application with embassies",
            ],
        },
        {
            "heading": "Student Visa & Schengen Travel",
            "style": "steps",
            "items": [
                "Secure a university offer of admission",
                "Open a blocked account or show proof of funds (Germany)",
                "Apply for a national student visa at the embassy",
                "Arrive and apply for a local residence permit",
                "Travel freely across 27 Schengen countries during study",
            ],
        },
        {
            "heading": "Study Across Europe",
            "style": "banner",
            "body": "From tuition-free Germany to English-speaking Ireland, our Europe team will find the right fit and guide your visa.",
        },
    ],
}
