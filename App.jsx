import { useState, useEffect } from "react";
import "./App.css";

function App() {
  const words = [
    "Web Developer",
    "Freelancer",
    "UI Designer",
    "React Developer",
  ];

  const [wordIndex, setWordIndex] = useState(0);
  const [text, setText] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);

  // Typing Effect
  useEffect(() => {
    const currentWord = words[wordIndex];

    const timer = setTimeout(() => {
      if (!isDeleting) {
        setText(currentWord.substring(0, text.length + 1));

        if (text === currentWord) {
          setTimeout(() => setIsDeleting(true), 1000);
        }
      } else {
        setText(currentWord.substring(0, text.length - 1));

        if (text === "") {
          setIsDeleting(false);
          setWordIndex((prev) => (prev + 1) % words.length);
        }
      }
    }, isDeleting ? 80 : 120);

    return () => clearTimeout(timer);
  }, [text, isDeleting, wordIndex]);

  const [filter, setFilter] = useState("all");

  const projects = [
    {
      title: "Portfolio Website",
      category: "frontend",
      image: "project1.jpg",
      description:
        "Responsive personal portfolio using HTML, CSS and JavaScript.",
        link: "App.jsx"
    },
    {
      title: "Student Management",
      category: "backend",
      image: "project2.jpg",
      description:
        "PHP & MySQL application for managing student records.",
    },
    {
      title: "E-Commerce Website",
      category: "fullstack",
      image: "project3.jpg",
      description:
        "Shopping website with login, cart and payment system.",
        link: "ecommerce.html"
    },
  ];

  return (
    <>
      {/* HEADER */}

      <header>
        <div className="logo">Professional Portfolio and Personal Branding Website</div>

        <nav>
          <ul>
            <li>
              <a href="#home">Home</a>
            </li>

            <li>
              <a href="#about">About</a>
            </li>

            <li>
              <a href="#skills">Skills</a>
            </li>

            <li>
              <a href="#projects">Projects</a>
            </li>

            <li>
              <a href="#contact">Contact</a>
            </li>
          </ul>
        </nav>
      </header>

      {/* HERO */}

      <section className="hero" id="home">
        <div className="hero-text">
          <h1>Hello, I'm Saloni Bhakte (CS24171)</h1>

          <h2>{text}</h2>

          <p>
            I'm a Freelance Web Developer creating responsive,
            interactive and modern websites using HTML, CSS,
            JavaScript and React.
          </p>

          <a href="#projects" className="btn">
            View Projects
          </a>

          <a href="/resume.pdf" download className="btn">
            Download Resume
          </a>
        </div>

        <img src="/profile.jpg" alt="Profile" />
      </section>

      {/* ABOUT */}

      <section id="about">

        <h2 className="title">About Me</h2>

        <div className="about">

          <img src="/profile.jpg" alt="About" />

          <div className="about-text">

            <h3>Professional Web Developer</h3>

            <p>
              I specialize in building responsive websites,
              dynamic web applications and user-friendly
              interfaces.
            </p>

            <p>
              My expertise includes HTML, CSS,
              JavaScript, Bootstrap, React,
              PHP and MySQL.
            </p>

          </div>

        </div>

      </section>

      {/* SKILLS */}

      <section id="skills">

        <h2 className="title">My Skills</h2>

        <div className="skills-container">

          <div className="skill">
            <h3>HTML</h3>
            <div className="progress">
              <div className="progress-bar html"></div>
            </div>
          </div>

          <div className="skill">
            <h3>CSS</h3>
            <div className="progress">
              <div className="progress-bar css"></div>
            </div>
          </div>

          <div className="skill">
            <h3>JavaScript</h3>
            <div className="progress">
              <div className="progress-bar js"></div>
            </div>
          </div>

          <div className="skill">
            <h3>React</h3>
            <div className="progress">
              <div className="progress-bar react"></div>
            </div>
          </div>

        </div>

      </section>

      {/* PROJECTS */}

      <section id="projects">

        <h2 className="title">Projects</h2>

        <div className="filter-buttons">

          <button onClick={() => setFilter("all")}>All</button>

          <button onClick={() => setFilter("frontend")}>
            Frontend
          </button>

          <button onClick={() => setFilter("backend")}>
            Backend
          </button>

          <button onClick={() => setFilter("fullstack")}>
            Full Stack
          </button>

        </div>

        <div className="project-container">

          {projects
            .filter(
              (project) =>
                filter === "all" ||
                project.category === filter
            )
            .map((project, index) => (
              <div className="project-card" key={index}>

                <img
                  src={`/${project.image}`}
                  alt={project.title}
                />

                <h3>{project.title}</h3>

                <p>{project.description}</p>

                <button
  className="btn"
  onClick={() => window.open(project.link, "_blank")}
>
  Live Demo
</button>

              </div>
            ))}

        </div>

      </section>

      {/* CONTACT */}

      <section id="contact">

        <h2 className="title">Contact Me</h2>

        <form className="contact-form">

          <input
            type="text"
            placeholder="Your Name"
          />

          <input
            type="email"
            placeholder="Your Email"
          />

          <input
            type="text"
            placeholder="Subject"
          />

          <textarea
            rows="6"
            placeholder="Message"
          ></textarea>

          <button className="btn">
            Send Message
          </button>

        </form>

      </section>

      {/* FOOTER */}

      <footer>

        <p>
          © 2026 My Portfolio | All Rights Reserved
        </p>

      </footer>
    </>
  );
}

export default App;
