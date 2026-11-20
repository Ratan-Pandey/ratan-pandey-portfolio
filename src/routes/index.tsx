import { useState } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { motion, useReducedMotion } from "framer-motion";
import {
  ArrowDownRight,
  ArrowRight,
  ArrowUpRight,
  Github,
  GraduationCap,
  Linkedin,
  MapPin,
  Menu,
  Satellite,
  Sprout,
  X,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import { ContactForm } from "@/components/contact-form";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Ratan Pandey — Independent AI & ML Developer" },
      {
        name: "description",
        content:
          "Ratan Pandey is an independent AI and machine learning developer building practical technology for real-world impact, from geospatial intelligence to applied AI.",
      },
      { property: "og:title", content: "Ratan Pandey — Independent AI & ML Developer" },
      {
        property: "og:description",
        content: "Building useful AI for the real world. Independent developer and freelance builder from India.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Portfolio,
});

const projects = [
  {
    number: "02",
    name: "PharmaGuard",
    category: "PHARMACOGENOMICS · EXPLORATION",
    description:
      "A pharmacogenomics-focused application exploring AI-assisted drug-response and genetic risk analysis.",
    href: "https://pharma-guard-phi.vercel.app/",
    action: "Visit project",
    mark: "PG",
  },
  {
    number: "03",
    name: "SevaSetu",
    category: "CIVIC TECHNOLOGY · NLP",
    description:
      "An AI-powered civic complaint classification platform designed to organise citizen concerns into meaningful categories.",
    href: "https://sevasetu-orpin.vercel.app/",
    action: "Visit project",
    mark: "SS",
  },
  {
    number: "04",
    name: "Skill Swap",
    category: "COMMUNITY · PRODUCT CONCEPT",
    description:
      "A peer-to-peer skill exchange concept exploring how matching, communication and scheduling can help people learn together.",
    href: undefined,
    action: undefined,
    mark: "↗",
  },
];

const capabilityGroups = [
  { title: "AI & machine learning", items: ["Applied machine learning", "AI-assisted analysis", "Classification"] },
  { title: "Natural language", items: ["Natural language processing", "Civic complaint classification"] },
  { title: "Geospatial intelligence", items: ["Google Earth Engine", "Sentinel-2", "Folium"] },
  { title: "Backend & full-stack", items: ["Python", "Streamlit"] },
  { title: "Data analytics", items: ["Satellite imagery analysis", "Plotly"] },
  { title: "Cloud & deployment", items: ["Vercel project deployments"] },
];

const futureStages = [
  {
    number: "01",
    title: "Map what’s changing",
    text: "Build on geospatial vegetation monitoring and the Agra case study as a starting point.",
    status: "CURRENT FOUNDATION",
  },
  {
    number: "02",
    title: "Explore agricultural intelligence",
    text: "Investigate future applications in crop monitoring, vegetation health, irrigation insights and yield-related analytics.",
    status: "FUTURE EXPLORATION",
  },
  {
    number: "03",
    title: "Make insight more accessible",
    text: "Explore potential partnerships with government institutions and stakeholders to broaden access to AI-powered agricultural intelligence.",
    status: "LONG-TERM AMBITION",
  },
];

function Portfolio() {
  const [menuOpen, setMenuOpen] = useState(false);
  const reduceMotion = useReducedMotion();

  const closeMenu = () => setMenuOpen(false);

  return (
    <main>
      <header className="site-header">
        <a className="wordmark" href="#top" onClick={closeMenu} aria-label="Ratan Pandey, home">
          <span className="wordmark-mark">R<span>.</span></span>
          <span className="wordmark-name">Ratan Pandey</span>
        </a>
        <button
          className="menu-toggle"
          type="button"
          aria-label={menuOpen ? "Close navigation" : "Open navigation"}
          aria-expanded={menuOpen}
          onClick={() => setMenuOpen((open) => !open)}
        >
          {menuOpen ? <X aria-hidden="true" /> : <Menu aria-hidden="true" />}
        </button>
        <nav className={`primary-nav${menuOpen ? " is-open" : ""}`} aria-label="Main navigation">
          <a href="#work" onClick={closeMenu}>Selected work</a>
          <a href="#about" onClick={closeMenu}>About</a>
          <a href="#direction" onClick={closeMenu}>Long view</a>
          <Button asChild size="sm" className="nav-contact">
            <a href="#contact" onClick={closeMenu}>Let’s talk <ArrowUpRight aria-hidden="true" /></a>
          </Button>
        </nav>
      </header>

      <section className="hero" id="top" aria-labelledby="hero-title">
        <div className="hero-image" aria-hidden="true" />
        <div className="hero-grid" aria-hidden="true">
          <svg viewBox="0 0 900 580" preserveAspectRatio="none">
            <path d="M-30 390C142 350 155 200 314 226s170 206 323 144S795 88 933 122" />
            <path d="M-24 430C141 392 194 253 321 267s169 186 309 127S798 134 924 163" />
            <path d="M-17 472C140 435 221 305 331 308s164 165 295 111S800 183 916 205" />
            <circle cx="635" cy="353" r="5" />
            <circle cx="313" cy="226" r="4" />
          </svg>
        </div>
        <div className="hero-content">
          <motion.div
            className="hero-copy"
            initial={reduceMotion ? false : { opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: "easeOut" }}
          >
            <p className="eyebrow"><span className="status-dot" /> INDEPENDENT AI / ML DEVELOPER <span className="eyebrow-divider">·</span> INDIA</p>
            <h1 id="hero-title">Building useful AI <span>for the real world.</span></h1>
            <p className="hero-intro">I’m Ratan — an independent developer exploring how machine learning, data and thoughtful engineering can turn complex problems into practical tools.</p>
            <div className="hero-actions">
              <Button asChild size="lg" className="lime-button">
                <a href="#work">Explore my work <ArrowDownRight aria-hidden="true" /></a>
              </Button>
              <a className="text-link hero-contact-link" href="#contact">Let’s collaborate <ArrowUpRight aria-hidden="true" /></a>
            </div>
          </motion.div>
          <div className="hero-side-note">
            <span className="side-note-line" />
            <span>FIELD NOTES<br />ON A GREENER<br />FUTURE</span>
          </div>
        </div>
        <div className="hero-footer">
          <span><MapPin aria-hidden="true" /> Based in India</span>
          <span className="hero-focus"><span>Currently exploring</span> Geospatial AI <i /> Agriculture <i /> Applied ML</span>
          <a href="#about" aria-label="Scroll to about Ratan"><ArrowDownRight aria-hidden="true" /></a>
        </div>
        <div className="hero-coordinate" aria-hidden="true">27°10′N&nbsp; 78°00′E</div>
      </section>

      <section className="intro-strip" aria-label="Professional summary">
        <span className="section-kicker">01 / INDEPENDENT BY DESIGN</span>
        <p>Curiosity is the starting point.<br /><span>Useful technology is the destination.</span></p>
        <span className="intro-strip-mark"><Satellite aria-hidden="true" /></span>
      </section>

      <section className="section about-section" id="about" aria-labelledby="about-title">
        <div className="section-heading">
          <p className="section-kicker">02 / THE BUILDER</p>
          <h2 id="about-title">Technology should<br />meet the <em>ground.</em></h2>
        </div>
        <div className="about-copy">
          <p className="about-lead">I build practical AI-powered applications across machine learning, natural language processing, geospatial intelligence and software engineering.</p>
          <p>Working independently lets me follow a question from early experiment to something people can actually use. Right now, I’m developing Urban Green Cover Intelligence and exploring how geospatial thinking might support a larger AI-for-agriculture vision.</p>
          <div className="education-line">
            <span className="education-icon"><GraduationCap aria-hidden="true" /></span>
            <div><span className="micro-label">LEARNING ALONG THE WAY</span><p>B.Tech, Computer Science — Artificial Intelligence &amp; Data Analytics</p><span className="muted-copy">GLA University, Mathura <i /> 2024–2028</span></div>
          </div>
        </div>
      </section>

      <section className="section work-section" id="work" aria-labelledby="work-title">
        <div className="section-title-row">
          <div><p className="section-kicker">03 / SELECTED WORK</p><h2 id="work-title">Built from <em>questions.</em></h2></div>
          <p className="title-aside">Independent projects at the intersection of data, people and the places we live.</p>
        </div>

        <article className="featured-project">
          <div className="featured-image">
            <div className="project-image-overlay" />
            <span className="image-label"><span className="status-dot" /> ONGOING INDEPENDENT PROJECT</span>
            <div className="image-coordinate">AGRA, INDIA <span>·</span> 2019 — 2023</div>
            <div className="image-crosshair crosshair-one" aria-hidden="true">+</div>
            <div className="image-crosshair crosshair-two" aria-hidden="true">+</div>
            <div className="image-data-chip"><span>URBAN VEGETATION</span><strong>+17.7%</strong><small>REPORTED NET GAIN</small></div>
          </div>
          <div className="featured-details">
            <div className="featured-title-row"><div><span className="project-index">PROJECT 01 <i /> GEOSPATIAL INTELLIGENCE</span><h3>Urban Green<br className="desktop-break" /> Cover Intelligence</h3></div><span className="project-symbol"><Sprout aria-hidden="true" /></span></div>
            <div className="featured-bottom">
              <p>A satellite-based vegetation monitoring initiative analysing how urban green cover changes over time. A first case study brings the view down to Agra.</p>
              <a className="text-link" href="#case-study">Explore the case study <ArrowRight aria-hidden="true" /></a>
            </div>
            <div className="tech-list"><span>Python</span><span>Streamlit</span><span>Google Earth Engine</span><span>Sentinel-2</span><span>Folium</span><span>Plotly</span></div>
          </div>
        </article>

        <div className="project-grid">
          {projects.map((project, index) => (
            <motion.article
              className="project-card"
              key={project.number}
              initial={reduceMotion ? false : { opacity: 0, y: 14 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.22 }}
              transition={{ duration: 0.45, delay: index * 0.08 }}
            >
              <div className="card-topline"><span>PROJECT {project.number}</span><span className="card-mark">{project.mark}</span></div>
              <span className="project-category">{project.category}</span>
              <h3>{project.name}</h3>
              <p>{project.description}</p>
              {project.href ? (
                <a className="card-link" href={project.href} target="_blank" rel="noreferrer">
                  {project.action}<ArrowUpRight aria-hidden="true" />
                </a>
              ) : <span className="concept-label">CONCEPT IN EXPLORATION</span>}
            </motion.article>
          ))}
        </div>
      </section>

      <section className="case-study" id="case-study" aria-labelledby="case-title">
        <div className="case-topline"><p className="section-kicker">04 / FIELD STUDY — AGRA</p><span>DOCUMENTED FINDINGS · 2019—2023</span></div>
        <div className="case-intro"><h2 id="case-title">A closer look at<br />the <em>green beneath.</em></h2><p>Urban growth reshapes the landscape in ways that are difficult to see from the ground alone. This project uses satellite imagery and geospatial tools to study vegetation change across Agra.</p></div>
        <div className="case-findings">
          <div className="finding"><span className="finding-value">19,832<small> ha</small></span><span className="finding-label">APPROX. AREA ANALYSED</span></div>
          <div className="finding"><span className="finding-value">+17.7<small>%</small></span><span className="finding-label">REPORTED NET VEGETATION GAIN</span></div>
          <div className="finding"><span className="finding-value">2019<span className="year-arrow">→</span>2023</span><span className="finding-label">STUDY PERIOD</span></div>
        </div>
        <div className="case-method">
          <div><span className="micro-label">THE APPROACH</span><p>Use satellite observations and geospatial analysis to compare vegetation patterns over time, then make the findings easier to explore and understand.</p></div>
          <div><span className="micro-label">THE TOOLKIT</span><p>Python, Google Earth Engine, Sentinel-2, Folium, Plotly and Streamlit.</p></div>
          <span className="case-note">Reported figures from the documented Agra case study.</span>
        </div>
      </section>

      <section className="vision-section" id="direction" aria-labelledby="vision-title">
        <div className="vision-heading">
          <p className="section-kicker">05 / A LONGER HORIZON</p>
          <span className="vision-symbol"><Sprout aria-hidden="true" /></span>
          <h2 id="vision-title">From greener cities<br />to <em>smarter agriculture.</em></h2>
          <p>Urban Green Cover Intelligence is a beginning—not an agriculture product. The broader ambition is to explore where geospatial data and AI could create useful insight for agriculture and sustainability.</p>
          <span className="future-notice">A FUTURE DIRECTION · NOT CURRENT PRODUCT CAPABILITIES</span>
        </div>
        <div className="vision-stages">
          {futureStages.map((stage) => (
            <article className="vision-stage" key={stage.number}>
              <span className="stage-number">{stage.number}</span>
              <div><span className="stage-status">{stage.status}</span><h3>{stage.title}</h3><p>{stage.text}</p></div>
              <ArrowUpRight className="stage-arrow" aria-hidden="true" />
            </article>
          ))}
          <div className="vision-connector" aria-hidden="true"><span /><span /><span /></div>
        </div>
      </section>

      <section className="section capabilities-section" aria-labelledby="capabilities-title">
        <div className="capabilities-heading"><p className="section-kicker">06 / TOOLS IN THE WORKSHOP</p><h2 id="capabilities-title">A practical<br /><em>toolkit.</em></h2><p>Technologies grounded in the projects and profile shared here.</p></div>
        <div className="capabilities-grid">
          {capabilityGroups.map((group) => (
            <div className="capability-group" key={group.title}>
              <span className="capability-index">{String(capabilityGroups.indexOf(group) + 1).padStart(2, "0")}</span>
              <h3>{group.title}</h3>
              <div>{group.items.map((item) => <span className="capability-item" key={item}>{item}</span>)}</div>
            </div>
          ))}
        </div>
      </section>

      <section className="experience-section" aria-labelledby="experience-title">
        <div className="experience-label"><p className="section-kicker">07 / EXPERIENCE</p><h2 id="experience-title">Learning by<br /><em>doing.</em></h2></div>
        <article className="experience-entry">
          <div className="experience-entry-top"><span>1M1B</span><span className="experience-period">INTERNSHIP</span></div>
          <div><h3>Sustainability, green skills<br />&amp; applied AI</h3><p>Worked in the context of sustainability and green skills, with the Urban Green Cover project documented as an applied AI case study in the internship report.</p><p className="experience-distinction">This internship experience is distinct from Ratan’s ongoing independent development of Urban Green Cover Intelligence.</p></div>
        </article>
      </section>

      <section className="contact-section" id="contact" aria-labelledby="contact-title">
        <div className="contact-orbit" aria-hidden="true"><span /><span /><span /></div>
        <div className="contact-copy"><p className="section-kicker">08 / OPEN TO WHAT’S NEXT</p><h2 id="contact-title">Have a problem<br />worth <em>building for?</em></h2><p>I’m open to thoughtful collaborations, ambitious ideas and conversations about applied AI.</p>
          <div className="social-links">
            <a href="https://github.com/Ratan-Pandey" target="_blank" rel="noreferrer"><Github aria-hidden="true" /> GitHub <ArrowUpRight aria-hidden="true" /></a>
            <a href="https://www.linkedin.com/in/ratan-pandey-51430432a/" target="_blank" rel="noreferrer"><Linkedin aria-hidden="true" /> LinkedIn <ArrowUpRight aria-hidden="true" /></a>
          </div>
        </div>
        <ContactForm />
      </section>

      <footer className="site-footer">
        <a className="wordmark footer-wordmark" href="#top"><span className="wordmark-mark">R<span>.</span></span><span className="wordmark-name">Ratan Pandey</span></a>
        <span>Independent AI / ML Developer <i /> Freelance Builder</span>
        <a href="#top" className="back-to-top">Back to top <ArrowUpRight aria-hidden="true" /></a>
        <small>© {new Date().getFullYear()} Ratan Pandey</small>
      </footer>
    </main>
  );
}