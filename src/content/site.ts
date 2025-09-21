export const siteData = {
  personal: {
    name: "Shasika Madhushan",
    title: "Senior Software Engineer",
    subtitle: "Laravel & Vue specialist now building polished, performant web products",
    email: "shasikamadushan555@gmail.com",
    phone: "+94 76 476 2870",
    linkedin: "https://www.linkedin.com/in/shasika-m",
    location: "Sri Lanka"
  },

  about: {
    intro: "Experienced Senior Software Engineer (B.Sc. Hons in IT) with 4+ years building high-quality, maintainable web applications. Strong expertise in PHP/Laravel and Vue.js, with a focus on performance, clean architecture, and collaborative delivery.",
    secondParagraph: "Currently seeking opportunities to drive product impact with efficient, well-tested code. Passionate about creating solutions that balance technical excellence with user experience."
  },

  quickFacts: [
    { label: "Years Experience", value: "4+" },
    { label: "Core Stacks", value: "Laravel, Vue.js" },
    { label: "Notable Domains", value: "SaaS, E-commerce" }
  ],

  skills: {
    backend: [
      "PHP (Laravel, CodeIgniter)",
      "Node.js",
      "API Development",
      "Database Design"
    ],
    frontend: [
      "Vue.js",
      "JavaScript",
      "jQuery",
      "React",
      "Next.js",
      "Livewire",
      "Alpine.js"
    ],
    databases: [
      "MySQL",
      "MongoDB"
    ],
    tools: [
      "Git",
      "Testing",
      "Tailwind CSS",
      "Performance Optimization"
    ],
    soft: [
      "Problem-solving",
      "Communication",
      "Leadership",
      "Critical thinking"
    ]
  },

  experience: [
    {
      company: "Intervest Software Technologies",
      role: "Senior Software Engineer",
      period: "2025 – Present",
      highlights: [
        "Leading development of enterprise-grade software solutions",
        "Architecting scalable systems for high-traffic applications",
        "Mentoring junior developers and establishing best practices",
        "Driving technical decisions and code quality standards"
      ],
      tech: ["Laravel", "Vue.js", "MySQL", "AWS"]
    },
    {
      company: "OpusXenta Lanka (Pvt) Ltd",
      role: "Senior Software Engineer",
      period: "2022 – Present",
      highlights: [
        "Developed comprehensive SaaS modules for death-care industry",
        "Built Floral Program with automated email campaign system",
        "Created RecordKeepr for digital records management and mapping",
        "Designed Care Programs for value-added service management"
      ],
      tech: ["Laravel", "Vue.js", "MySQL", "Email Automation"]
    },
    {
      company: "eMarketingEye (Pvt) Ltd",
      role: "Software Engineer",
      period: "2021 – 2022",
      highlights: [
        "Developed full-stack web applications for diverse client needs",
        "Implemented responsive designs and optimized user experiences",
        "Collaborated with cross-functional teams on project delivery",
        "Maintained and enhanced existing application features"
      ],
      tech: ["PHP", "JavaScript", "MySQL", "CSS"]
    },
    {
      company: "OpusXenta Lanka",
      role: "Software Engineer (Intern)",
      period: "2020 – 2021",
      highlights: [
        "Gained hands-on experience in professional software development",
        "Contributed to codebase improvements and bug fixes",
        "Learned industry best practices and development workflows",
        "Supported senior developers in feature implementation"
      ],
      tech: ["PHP", "Laravel", "Vue.js", "Git"]
    }
  ],

  projects: [
    {
      title: "Online Store",
      description: "Complete e-commerce platform with comprehensive admin panel, dynamic banner management, and customer-focused shopping experience.",
      image: "/project-estore.jpg",
      liveUrl: "https://estore.shasikam.com/",
      adminUrl: "https://estore.shasikam.com/admin",
      credentials: { username: "admin", password: "123456789" },
      tech: ["CodeIgniter", "JavaScript", "jQuery", "MySQL"],
      features: ["Product Management", "Order Processing", "Admin Dashboard", "Banner System"]
    },
    {
      title: "Online POS",
      description: "Multi-cashier point-of-sale system with integrated receipt printing, comprehensive stock management, and shift tracking capabilities.",
      image: "/project-pos.jpg",
      liveUrl: "https://pos.shasikam.com/",
      adminUrl: "http://pos.shasikam.com/dashboard",
      credentials: { username: "admin", password: "123456789" },
      tech: ["CodeIgniter", "JavaScript", "jQuery", "MySQL"],
      features: ["Multi-cashier Support", "Receipt Printing", "Stock Management", "Shift Tracking"]
    },
    {
      title: "OpusXenta SaaS Modules",
      description: "Comprehensive death-care industry SaaS solution including floral programs, digital record keeping, and care service management.",
      image: "/project-opusxenta.jpg",
      tech: ["Laravel", "Vue.js", "MySQL", "Email Automation"],
      features: ["Floral Program (Email Campaigns)", "RecordKeepr (Digital Records + Mapping)", "Care Programs (Value-add Services)"],
      isInternal: true
    }
  ],

  education: {
    degree: "B.Sc. in Information Technology",
    period: "2016 – 2020",
    institution: "University"
  },

  achievements: [
    {
      title: "Startup Weekend Rajarata 2018",
      award: "First Runner Up",
      description: "Led technical development for innovative startup concept"
    },
    {
      title: "ICSUSL 2019",
      award: "Research Publication",
      description: "Published research paper in conference proceedings"
    }
  ],

  navigation: [
    { name: "Home", href: "#home" },
    { name: "About", href: "#about" },
    { name: "Skills", href: "#skills" },
    { name: "Experience", href: "#experience" },
    { name: "Projects", href: "#projects" },
    { name: "Contact", href: "#contact" }
  ]
};

export type SiteData = typeof siteData;