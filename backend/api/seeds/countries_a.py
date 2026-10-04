"""Countries + universities seed data."""

COUNTRIES = [
    {
        "name": "Australia",
        "flag_emoji": "🇦🇺",
        "tagline": "Top-tier research universities & vibrant post-study work rights",
        "intake": "Feb / Jul Intakes",
        "tuition_range": "AUD 20,000 – 45,000 / year",
        "work_rights": "Post-study work visa of 2–4 years",
        "highlights": "World-class universities; Strong post-study work rights; Multicultural student cities; High employability",
        "description": (
            "Australia is one of the world's most popular study destinations for Nepali students. "
            "It offers globally ranked universities, a welcoming environment, and generous post-study work rights "
            "that let you gain valuable international experience after graduation.\n\n"
            "From the sandstone campuses of Sydney and Melbourne to the modern libraries of Perth and Brisbane, "
            "Australian institutions combine research excellence with strong industry links, making degrees highly "
            "recognised by employers worldwide."
        ),
        "universities": [
            {
                "name": "University of Sydney",
                "city": "Sydney",
                "courses": "Commerce, Engineering, IT, Health Sciences, Law",
                "intake": "Feb / Jul",
                "website": "https://www.sydney.edu.au",
                "description": "Australia's oldest university, ranked among the top universities globally with a stunning sandstone campus in central Sydney.",
            },
            {
                "name": "Monash University",
                "city": "Melbourne",
                "courses": "IT, Engineering, Business, Pharmacy, Design",
                "intake": "Feb / Jul",
                "website": "https://www.monash.edu",
                "description": "One of Australia's largest universities, known for its focus on innovation, employability and a global network of campuses.",
            },
            {
                "name": "RMIT University",
                "city": "Melbourne",
                "courses": "Design, Business, Engineering, Media, Computing",
                "intake": "Feb / Jul",
                "website": "https://www.rmit.edu.au",
                "description": "Ranked among the world's top universities for art and design, RMIT offers strongly industry-connected programs.",
            },
        ],
    },
    {
        "name": "United Kingdom",
        "flag_emoji": "🇬🇧",
        "tagline": "Prestigious historic institutions & focused 1-year master's degrees",
        "intake": "Sep / Jan Intakes",
        "tuition_range": "GBP 15,000 – 30,000 / year",
        "work_rights": "Graduate route of 2 years post-study",
        "highlights": "World-renowned academic heritage; 1-year master's programs; Graduate Route visa; Strong alumni networks",
        "description": (
            "The United Kingdom is home to some of the world's oldest and most prestigious universities. "
            "A UK degree is globally recognised and highly valued by employers across every industry.\n\n"
            "With focused one-year taught master's programmes, a Graduate Route visa for post-study work, "
            "and scholarships at every level, the UK offers exceptional value for ambitious students."
        ),
        "universities": [
            {
                "name": "University of Manchester",
                "city": "Manchester",
                "courses": "Biotechnology, Business, Engineering, Social Sciences",
                "intake": "Sep",
                "website": "https://www.manchester.ac.uk",
                "description": "A leading Russell Group research university with a vibrant city campus and outstanding graduate employment.",
            },
            {
                "name": "University of Birmingham",
                "city": "Birmingham",
                "courses": "Business, Law, Computer Science, Medicine",
                "intake": "Sep",
                "website": "https://www.birmingham.ac.uk",
                "description": "A global top-100 member of the Russell Group offering a classic red-brick campus experience in the heart of England.",
            },
            {
                "name": "University of Hertfordshire",
                "city": "Hatfield",
                "courses": "Business, Engineering, Computer Science, Psychology",
                "intake": "Sep / Jan",
                "website": "https://www.herts.ac.uk",
                "description": "A modern, employability-focused university just outside London with strong industry partnerships.",
            },
        ],
    },
    {
        "name": "Canada",
        "flag_emoji": "🇨🇦",
        "tagline": "Co-op work programs, welcoming communities & direct post-study pathways",
        "intake": "Sep / Jan / May",
        "tuition_range": "CAD 18,000 – 35,000 / year",
        "work_rights": "Post-graduation work permit up to 3 years",
        "highlights": "Co-op & paid internships; Welcoming, safe communities; PGWP of up to 3 years; PR pathways for graduates",
        "description": (
            "Canada combines world-class education with one of the most welcoming and diverse societies in the world. "
            "Students benefit from work-integrated co-op programmes that build real experience while you study.\n\n"
            "A post-graduation work permit of up to three years and clear pathways to permanent residency make "
            "Canada a strategic destination for long-term career growth."
        ),
        "universities": [
            {
                "name": "University of Toronto",
                "city": "Toronto",
                "courses": "Data Analytics, Computer Science, Engineering, Business",
                "intake": "Sep",
                "website": "https://www.utoronto.ca",
                "description": "Canada's top-ranked university offering cutting-edge programs in the heart of North America's most multicultural city.",
            },
            {
                "name": "University of British Columbia",
                "city": "Vancouver",
                "courses": "Science, Engineering, Business, Forestry, Arts",
                "intake": "Sep",
                "website": "https://www.ubc.ca",
                "description": "A globally ranked university on the Pacific coast known for research excellence and stunning campus life.",
            },
            {
                "name": "Seneca Polytechnic",
                "city": "Toronto",
                "courses": "Data Analytics, Business, Computer Programming, Aviation",
                "intake": "Sep / Jan / May",
                "website": "https://www.senecacollege.ca",
                "description": "A leading polytechnic with strong co-op placement programs and highly practical, employer-focused diplomas.",
            },
        ],
    },
    {
        "name": "USA",
        "flag_emoji": "🇺🇸",
        "tagline": "World-renowned Ivy League & state universities with diverse scholarships",
        "intake": "Fall / Spring Intakes",
        "tuition_range": "USD 20,000 – 55,000 / year",
        "work_rights": "OPT of 1–3 years post-study",
        "highlights": "Ivy League & top research universities; Huge scholarship pool; OPT work authorisation; Diverse career scopes",
        "description": (
            "The United States hosts more top-ranked universities than any other country, with unmatched "
            "research funding, cutting-edge technology, and a flexible education system.\n\n"
            "Students can benefit from OPT work authorisation after graduation and a vast alumni network that "
            "opens doors to global careers in technology, business, medicine and academia."
        ),
        "universities": [
            {
                "name": "Arizona State University",
                "city": "Tempe, Arizona",
                "courses": "Business, Engineering, Computer Science, Journalism",
                "intake": "Fall / Spring",
                "website": "https://www.asu.edu",
                "description": "One of America's most innovative public universities with strong research and scholarship opportunities.",
            },
            {
                "name": "Northeastern University",
                "city": "Boston, Massachusetts",
                "courses": "Computer Science, Business, Health Sciences, Engineering",
                "intake": "Fall",
                "website": "https://www.northeastern.edu",
                "description": "Famous for its cooperative education program that blends classroom learning with paid professional placements.",
            },
            {
                "name": "Texas A&M University",
                "city": "College Station, Texas",
                "courses": "Engineering, Agriculture, Business, Science",
                "intake": "Fall / Spring",
                "website": "https://www.tamu.edu",
                "description": "A top-tier public research institution in the US with rigorous academics and a proud campus tradition.",
            },
        ],
    },
]
