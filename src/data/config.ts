const config = {
  title: "Akshaya Kumar | Full-Stack Developer",
  description: {
    long: "Explore the portfolio of Akshaya Kumar, a Computer Science undergrad specializing in AI & ML, building full-stack applications, intelligent API routing, and LLM-powered services. President of Qwiklabs Developer Club at SRMIST, driving campus tech culture through hackathons and workshops.",
    short:
      "Portfolio of Akshaya Kumar — Full-Stack Developer specializing in AI/ML, building scalable web applications and LLM-powered services.",
  },
  keywords: [
    "Akshaya Kumar",
    "portfolio",
    "full-stack developer",
    "AI ML",
    "machine learning",
    "web development",
    "FastAPI",
    "Python",
    "Go",
    "Java",
    "PostgreSQL",
    "React",
    "Next.js",
    "LLM",
    "Srijan",
    "NeevCloud",
  ],
  author: "Akshaya Kumar",
  email: "kumaarakshaya@gmail.com",
  site: "https://akshayakumar.vercel.app",

  githubUsername: "akshxx",
  githubRepo: "AkshayaPortfolio",

  get ogImg() {
    return this.site + "/assets/seo/og-image.png";
  },
  social: {
    twitter: "https://x.com/_Akshxx_",
    linkedin: "https://linkedin.com/in/akshaya-kumar",
    github: "https://github.com/akshxx",
  },
};
export { config };
