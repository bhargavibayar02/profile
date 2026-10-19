import { useEffect, useState } from "react";
import {
  ArrowDown,
  ArrowRight,
  ArrowUpRight,
  Coins,
  Github,
  Menu,
  Moon,
  ScanSearch,
  ShieldCheck,
  Sun,
  X,
} from "lucide-react";

type Theme = "dark" | "light";

interface GitHubProfile {
  login: string;
  name: string | null;
  bio: string | null;
  avatar_url: string;
  public_repos: number;
  followers: number;
}

interface GitHubRepository {
  id: number;
  name: string;
  html_url: string;
  language: string | null;
}

interface Skill {
  name: string;
  icon?: string;
  initials?: string;
  color?: string;
}

const username = "arjundevadiga04";
const githubUrl = `https://github.com/${username}`;
const imageUrl = (name: string) =>
  `https://cdn.jsdelivr.net/gh/devicons/devicon/icons/${name}/${name}-original.svg`;

const journey = [
  {
    date: "MAY — JUN 2026",
    badge: "INTERNSHIP",
    title: "Cloud Computing Intern",
    org: "Abhimo Technologies Private Limited",
    location: "Mangaluru",
    description:
      "Explored cloud infrastructure, monitoring, logging, security services, and application deployment concepts through hands-on learning.",
    tags: ["Cloud infrastructure", "Monitoring & logging", "Cloud security"],
  },
  {
    date: "2023 — 2027",
    badge: "CURRENT",
    title: "B.Tech — Computer Science (Cyber Security)",
    org: "Srinivas University Institute of Engineering and Technology",
    location: "Mukka",
    description:
      "Building a strong foundation across computing, software development, and cybersecurity. Current CGPA: 8.0.",
    tags: ["Computer science", "Cybersecurity", "Software development"],
  },
  {
    date: "2023",
    title: "Pre-University Course",
    org: "Sri Venkataramana PU College",
    location: "Kundapura",
    description: "Completed pre-university studies with 82%.",
  },
  {
    date: "2021",
    title: "SSLC",
    org: "Sri Venkataramana High School",
    location: "Kundapura",
    description: "Completed secondary school with 60%.",
  },
];

const projects = [
  {
    type: "AI · COMPUTER VISION",
    number: "01",
    title: "QAFDET Pedestrian Detection",
    description:
      "Exploring RGB and thermal drone imagery to classify pedestrian counts across light and dark environments using deep learning techniques.",
    tags: ["Deep learning", "RGB + thermal", "Object detection"],
    art: "detection",
  },
  {
    type: "WEB3 · FULL STACK",
    number: "02",
    title: "DeFi — Decentralized Finance",
    description:
      "A decentralized finance application combining Solidity smart contracts with a React-based web interface.",
    tags: ["Solidity", "React", "HTML · CSS"],
    art: "defi",
  },
  {
    type: "CYBERSECURITY · LAB",
    number: "03",
    title: "Web Penetration Testing Lab",
    description:
      "A controlled attacker–victim lab using Kali and Ubuntu to demonstrate security attacks against vulnerable applications.",
    tags: ["Kali Linux", "Ubuntu", "Web security"],
    art: "security",
  },
];

const skillGroups: { title: string; icon: string; skills: Skill[] }[] = [
  {
    title: "Languages & development",
    icon: "</>",
    skills: [
      { name: "Python", icon: "python" },
      { name: "Java", icon: "java" },
      { name: "HTML5", icon: "html5" },
      { name: "CSS3", icon: "css3" },
      { name: "JavaScript", icon: "javascript" },
      { name: "React", icon: "react" },
      { name: "Node.js", icon: "nodejs" },
      { name: "PHP", icon: "php" },
    ],
  },
  {
    title: "Data & AI",
    icon: "◈",
    skills: [
      { name: "MongoDB", icon: "mongodb" },
      { name: "MySQL", icon: "mysql" },
      { name: "Pandas", icon: "pandas" },
      { name: "NumPy", icon: "numpy" },
      { name: "OpenCV", icon: "opencv" },
      { name: "DeepFace", initials: "DF" },
      { name: "scikit-learn", initials: "sk" },
    ],
  },
  {
    title: "Security & tools",
    icon: "⌘",
    skills: [
      { name: "AWS", initials: "AWS", color: "orange" },
      { name: "Git", icon: "git" },
      { name: "GitHub", icon: "github" },
      { name: "Wireshark", initials: "W", color: "blue" },
      { name: "Nmap", initials: "N", color: "red" },
      { name: "Burp Suite", initials: "B", color: "orange" },
      { name: "Jupyter", initials: "J", color: "green" },
      { name: "VS Code", initials: "VS", color: "purple" },
      { name: "SQLMap", initials: "SQL", color: "red" },
      { name: "Hashcat", initials: "H" },
      { name: "John the Ripper", initials: "JtR" },
    ],
  },
];

const community = [
  {
    icon: "✳",
    label: "COMMUNITY",
    title: "Cyber awareness",
    text: "Conducted a cyber awareness program at CSI Boarding School, Mulki.",
  },
  {
    icon: "↗",
    label: "LEADERSHIP",
    title: "Sports Coordinator · SATARC",
    text: "Coordinated technical and sports events at SUIET, Mukka.",
  },
  {
    icon: "✦",
    label: "HACKATHON",
    title: "Yugma TechFest AI Hackathon",
    text: "Participant at JNNCE, Shivamogga · 2026.",
  },
  {
    icon: "◎",
    label: "CERTIFICATIONS",
    title: "Always learning",
    text: "Cisco Cyber Security & Network Security · IBM SkillsBuild CSI · MongoDB.",
  },
];

function loadSavedTheme(): Theme {
  const saved = localStorage.getItem("portfolio-theme");
  if (saved === "dark" || saved === "light") return saved;
  return window.matchMedia("(prefers-color-scheme: light)").matches ? "light" : "dark";
}

function SectionLabel({ number, children }: { number: string; children: string }) {
  return (
    <p className="eyebrow">
      <span className="section-number">{number}</span> {children}
    </p>
  );
}

function Header({ theme, onToggleTheme }: { theme: Theme; onToggleTheme: () => void }) {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header className="site-header">
      <nav className="nav shell" aria-label="Main navigation">
        <a className="brand" href="#home" aria-label="Arjun Devadiga home">
          <span className="brand-mark">A<span>.</span></span>
          <span>ARJUN DEVADIGA</span>
        </a>
        <div className={`nav-links${menuOpen ? " is-open" : ""}`}>
          {[
            ["About", "#about"],
            ["Journey", "#journey"],
            ["Projects", "#work"],
            ["Skills", "#skills"],
            ["Contact", "#contact"],
          ].map(([label, href]) => (
            <a href={href} key={href} onClick={() => setMenuOpen(false)}>{label}</a>
          ))}
        </div>
        <div className="nav-actions">
          <button
            className="theme-toggle"
            type="button"
            onClick={onToggleTheme}
            aria-label={`Switch to ${theme === "dark" ? "light" : "dark"} mode`}
            title="Switch theme"
          >
            {theme === "dark" ? <Sun aria-hidden="true" /> : <Moon aria-hidden="true" />}
          </button>
          <a className="button button-small button-outline nav-cta" href="#contact">
            Let’s talk <ArrowUpRight aria-hidden="true" />
          </a>
          <button
            className="menu-toggle"
            type="button"
            aria-label={menuOpen ? "Close navigation menu" : "Open navigation menu"}
            aria-expanded={menuOpen}
            onClick={() => setMenuOpen((open) => !open)}
          >
            {menuOpen ? <X aria-hidden="true" /> : <Menu aria-hidden="true" />}
          </button>
        </div>
      </nav>
    </header>
  );
}

function Hero() {
  const [photoAvailable, setPhotoAvailable] = useState(true);
  return (
    <section className="hero shell" id="home">
      <div className="hero-copy">
        <p className="eyebrow"><span className="status-dot" /> OPEN TO OPPORTUNITIES <span className="eyebrow-line" /> KARNATAKA, INDIA</p>
        <h1>Building with<br />curiosity. <span>Securing</span><br />what’s next.</h1>
        <p className="hero-description">
          Hey, I’m <strong>Arjun</strong> — a Computer Science student focused on cybersecurity,
          software development, and AI. I turn ideas into thoughtful, useful experiences.
        </p>
        <div className="hero-actions">
          <a className="button button-primary" href="#work">Explore my work <ArrowUpRight aria-hidden="true" /></a>
          <a className="text-link" href="mailto:arjundevadiga82@gmail.com">Get in touch <ArrowRight aria-hidden="true" /></a>
        </div>
        <div className="hero-socials" aria-label="Social links">
          <a href={githubUrl} target="_blank" rel="noreferrer"><Github aria-hidden="true" /><span>GitHub</span></a>
          <a href="https://www.linkedin.com/" target="_blank" rel="noreferrer" aria-label="LinkedIn profile">
            <span className="linkedin-icon" aria-hidden="true">in</span><span>LinkedIn</span>
          </a>
        </div>
      </div>
      <div className="hero-visual">
        <div className="visual-grid" aria-hidden="true" />
        <div className="orbit orbit-one" aria-hidden="true" />
        <div className="orbit orbit-two" aria-hidden="true" />
        <div className={`profile-frame${photoAvailable ? "" : " no-photo"}`}>
          {photoAvailable && (
            <img
              className="profile-photo"
              src="/assets/profile.jpeg"
              alt="Portrait of Arjun Devadiga"
              onError={() => setPhotoAvailable(false)}
            />
          )}
          {!photoAvailable && <div className="photo-fallback" aria-hidden="true"><span className="profile-silhouette" /></div>}
        </div>
        <div className="float-card float-card-code"><span className="float-icon">&lt;/&gt;</span><span><strong>Code</strong><small>with purpose</small></span></div>
        <div className="float-card float-card-shield"><span className="shield-icon" aria-hidden="true">⌑</span><span><strong>Think</strong><small>secure by design</small></span></div>
        <div className="hero-caption"><span className="caption-rule" /><span>CREATIVE MINDSET<br />SECURITY FIRST</span></div>
        <span className="visual-index" aria-hidden="true">01 / 04</span>
      </div>
      <a className="scroll-cue" href="#about"><span className="scroll-line" /> SCROLL TO DISCOVER <ArrowDown aria-hidden="true" /></a>
    </section>
  );
}

function About() {
  return (
    <section className="section about-section" id="about">
      <div className="shell about-grid">
        <div className="section-heading">
          <SectionLabel number="01">A LITTLE ABOUT ME</SectionLabel>
          <h2>Curious by nature.<br /><span>Driven by impact.</span></h2>
        </div>
        <div className="about-content">
          <p className="about-lead">I’m a B.Tech Computer Science (Cyber Security) student at Srinivas University, driven by the space where technology meets trust.</p>
          <p className="body-copy">From building web applications and exploring AI to learning how systems can be made safer, I enjoy solving real problems and learning by doing. I bring a quick-learning mindset, a collaborative spirit, and a healthy curiosity to every project.</p>
          <div className="about-facts">
            <div><span className="fact-icon">⌘</span><span><strong>Software</strong><small>Build &amp; iterate</small></span></div>
            <div><span className="fact-icon">⛨</span><span><strong>Cybersecurity</strong><small>Learn &amp; protect</small></span></div>
            <div><span className="fact-icon">✳</span><span><strong>Artificial intelligence</strong><small>Explore &amp; apply</small></span></div>
          </div>
        </div>
      </div>
    </section>
  );
}

function Journey() {
  return (
    <section className="section journey-section" id="journey">
      <div className="shell">
        <div className="section-heading section-heading-row">
          <div><SectionLabel number="02">THE JOURNEY SO FAR</SectionLabel><h2>Learning that keeps<br /><span>moving forward.</span></h2></div>
          <p className="section-aside">Every experience adds a new perspective.<br />Here are a few of mine.</p>
        </div>
        <div className="timeline">
          {journey.map((entry) => (
            <article className="timeline-entry" key={entry.title}>
              <div className="timeline-marker"><span /></div>
              <div className="timeline-date">{entry.date}{entry.badge && <span className="date-tag">{entry.badge}</span>}</div>
              <div className="timeline-card">
                <div className="timeline-card-top">
                  <div><h3>{entry.title}</h3><p className="timeline-org">{entry.org} <span>· {entry.location}</span></p></div>
                  {entry.badge && <ArrowUpRight className="timeline-arrow" aria-hidden="true" />}
                </div>
                <p>{entry.description}</p>
                {entry.tags && <div className="tag-list">{entry.tags.map((tag) => <span key={tag}>{tag}</span>)}</div>}
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

function ProjectArt({ type }: { type: string }) {
  if (type === "detection") {
    return <div className="project-art art-detection" aria-hidden="true"><ScanSearch className="project-art-icon" /><span className="art-label">THERMAL / RGB ANALYSIS</span></div>;
  }
  if (type === "defi") {
    return <div className="project-art art-defi" aria-hidden="true"><Coins className="project-art-icon" /><span className="art-label">DECENTRALIZED FINANCE</span></div>;
  }
  return <div className="project-art art-security" aria-hidden="true"><ShieldCheck className="project-art-icon" /><span className="art-label">CONTROLLED ENVIRONMENT</span></div>;
}

function Projects() {
  return (
    <section className="section projects-section" id="work">
      <div className="shell">
        <div className="section-heading section-heading-row">
          <div><SectionLabel number="03">SELECTED WORK</SectionLabel><h2>Ideas, made <span>real.</span></h2></div>
          <a className="text-link project-github-link" href={githubUrl} target="_blank" rel="noreferrer">More on GitHub <ArrowUpRight aria-hidden="true" /></a>
        </div>
        <div className="project-grid">
          {projects.map((project, index) => (
            <article className={`project-card${index === 0 ? " project-featured" : ""}`} key={project.number}>
              <ProjectArt type={project.art} />
              <div className="project-info">
                <div className="project-meta"><span>{project.type}</span><span className="project-number">{project.number}</span></div>
                <h3>{project.title}</h3>
                <p>{project.description}</p>
                <div className="project-tags">{project.tags.map((tag) => <span key={tag}>{tag}</span>)}</div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

function Skills() {
  return (
    <section className="section skills-section" id="skills">
      <div className="shell skills-layout">
        <div className="section-heading">
          <SectionLabel number="04">MY TOOLKIT</SectionLabel>
          <h2>Tools for the<br /><span>next challenge.</span></h2>
          <p className="skills-intro">A growing toolkit for building, understanding, and securing technology.</p>
        </div>
        <div className="skill-groups">
          {skillGroups.map((group) => (
            <div className="skill-group" key={group.title}>
              <h3><span className="skill-group-icon">{group.icon}</span>{group.title}</h3>
              <div className="skill-items">
                {group.skills.map((skill) => (
                  <div className="skill-item" key={skill.name}>
                    {skill.icon ? <img src={imageUrl(skill.icon)} alt="" loading="lazy" /> : <span className={`skill-letter${skill.color ? ` skill-letter-${skill.color}` : ""}`}>{skill.initials}</span>}
                    <span>{skill.name}</span>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function Beyond() {
  return (
    <section className="section beyond-section">
      <div className="shell beyond-grid">
        <div><SectionLabel number="05">BEYOND THE SCREEN</SectionLabel><h2>Good work is<br /><span>about people, too.</span></h2></div>
        <div className="beyond-cards">
          {community.map((item) => (
            <article className="beyond-card" key={item.label}>
              <span className="beyond-icon">{item.icon}</span>
              <div><p className="beyond-label">{item.label}</p><h3>{item.title}</h3><p>{item.text}</p></div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

function GitHub() {
  const [profile, setProfile] = useState<GitHubProfile | null>(null);
  const [repositories, setRepositories] = useState<GitHubRepository[]>([]);

  useEffect(() => {
    const controller = new AbortController();
    const headers = { Accept: "application/vnd.github+json" };
    const fetchProfile = async () => {
      const response = await fetch(`https://api.github.com/users/${username}`, { headers, signal: controller.signal });
      if (!response.ok) throw new Error(`GitHub profile request failed (${response.status})`);
      setProfile((await response.json()) as GitHubProfile);
    };
    const fetchRepositories = async () => {
      const response = await fetch(`https://api.github.com/users/${username}/repos?sort=updated&per_page=3`, { headers, signal: controller.signal });
      if (!response.ok) throw new Error(`GitHub repositories request failed (${response.status})`);
      setRepositories((await response.json()) as GitHubRepository[]);
    };
    void fetchProfile().catch((error: unknown) => {
      if (!(error instanceof DOMException && error.name === "AbortError")) console.warn("Unable to load GitHub profile:", error);
    });
    void fetchRepositories().catch((error: unknown) => {
      if (!(error instanceof DOMException && error.name === "AbortError")) console.warn("Unable to load GitHub repositories:", error);
    });
    return () => controller.abort();
  }, []);

  const formatCount = (value: number) =>
    new Intl.NumberFormat("en", { notation: "compact", maximumFractionDigits: 1 }).format(value);

  return (
    <section className="github-section" aria-labelledby="github-title">
      <div className="shell github-panel">
        <div className="github-copy">
          <SectionLabel number="06">OPEN SOURCE &amp; CODE</SectionLabel>
          <h2 id="github-title">A little more of<br /><span>what I’m building.</span></h2>
          <p>Follow along as I learn, experiment, and ship new projects.</p>
          <a className="button button-primary" href={githubUrl} target="_blank" rel="noreferrer">Visit my GitHub <ArrowUpRight aria-hidden="true" /></a>
        </div>
        <div className="github-card">
          <div className="github-profile">
            <div className="github-avatar" aria-hidden="true">
              {profile?.avatar_url ? <img src={profile.avatar_url} alt="" /> : "AD"}
            </div>
            <div><strong>{profile?.name || "Arjun Devadiga"}</strong><span>@{profile?.login || username}</span></div>
            <a href={githubUrl} target="_blank" rel="noreferrer" aria-label="Open GitHub profile"><ArrowUpRight aria-hidden="true" /></a>
          </div>
          <p className="github-bio">{profile?.bio || "Computer Science student exploring cybersecurity, software, and AI."}</p>
          <div className="github-stats">
            <div><strong>{profile ? formatCount(profile.public_repos) : "—"}</strong><span>Public repos</span></div>
            <div><strong>{profile ? formatCount(profile.followers) : "—"}</strong><span>Followers</span></div>
            <div><strong>IN</strong><span>Location</span></div>
          </div>
          <div className="repo-list" aria-live="polite">
            {repositories.length > 0 ? repositories.map((repository) => (
              <a className="repo-row" href={repository.html_url} target="_blank" rel="noreferrer" key={repository.id}>
                <span className="repo-status" /><span>{repository.name}</span><span className="repo-language">{repository.language || "Project"}</span>
              </a>
            )) : <a className="repo-row" href={`${githubUrl}?tab=repositories`} target="_blank" rel="noreferrer"><span className="repo-status" /><span>Explore public repositories</span><ArrowUpRight aria-hidden="true" /></a>}
          </div>
          <a className="github-all-link" href={`${githubUrl}?tab=repositories`} target="_blank" rel="noreferrer">See all repositories <ArrowRight aria-hidden="true" /></a>
        </div>
      </div>
    </section>
  );
}

function Contact() {
  return (
    <section className="contact-section" id="contact">
      <div className="shell contact-inner">
        <SectionLabel number="07">HAVE A PROJECT IN MIND?</SectionLabel>
        <h2>Let’s make something<br /><span>meaningful.</span></h2>
        <p className="contact-lede">Open to internships, collaborations, and conversations about technology.</p>
        <a className="button button-primary contact-button" href="mailto:arjundevadiga82@gmail.com">Start a conversation <ArrowUpRight aria-hidden="true" /></a>
        <div className="contact-details">
          <a href="mailto:arjundevadiga82@gmail.com">arjundevadiga82@gmail.com</a>
          <a href="tel:+918861991382">+91 88619 91382</a>
          <span>Kundapura, Karnataka, India</span>
        </div>
      </div>
    </section>
  );
}

function Footer() {
  return (
    <footer className="site-footer">
      <div className="shell footer-inner">
        <a className="brand footer-brand" href="#home"><span className="brand-mark">A<span>.</span></span><span>ARJUN DEVADIGA</span></a>
        <p>Designed with curiosity. Built with intention.</p>
        <div className="footer-right"><span>© {new Date().getFullYear()} Arjun Devadiga</span><a href="#home">Back to top ↑</a></div>
      </div>
      <div className="shell footer-bottom"><span>ENGLISH · HINDI · KANNADA</span><span>MADE IN KARNATAKA, INDIA</span></div>
    </footer>
  );
}

export default function App() {
  const [theme, setTheme] = useState<Theme>(loadSavedTheme);

  useEffect(() => {
    document.documentElement.dataset.theme = theme;
    document.querySelector('meta[name="theme-color"]')?.setAttribute("content", theme === "dark" ? "#0b0d12" : "#f7f8f5");
    localStorage.setItem("portfolio-theme", theme);
  }, [theme]);

  return (
    <>
      <a className="skip-link" href="#main">Skip to content</a>
      <Header theme={theme} onToggleTheme={() => setTheme((current) => current === "dark" ? "light" : "dark")} />
      <main id="main">
        <Hero />
        <About />
        <Journey />
        <Projects />
        <Skills />
        <Beyond />
        <GitHub />
        <Contact />
      </main>
      <Footer />
    </>
  );
}
