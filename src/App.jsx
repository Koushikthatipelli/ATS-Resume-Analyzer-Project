import { useState } from "react";
import {
  FaGithub,
  FaCheckCircle,
  FaTimesCircle,
  FaChartPie,
} from "react-icons/fa";
import "./App.css";

const skillDatabase = [
  "html",
  "css",
  "javascript",
  "react",
  "node.js",
  "node",
  "express",
  "mongodb",
  "mysql",
  "python",
  "java",
  "docker",
  "aws",
  "git",
  "github",
  "typescript",
  "next.js",
  "tailwind",
  "redux",
  "firebase",
];

function App() {
  const [resumeText, setResumeText] = useState("");
  const [jobText, setJobText] = useState("");
  const [result, setResult] = useState(null);

  const analyzeResume = () => {
    const resumeLower = resumeText.toLowerCase();
    const jobLower = jobText.toLowerCase();

    const resumeSkills = skillDatabase.filter((skill) =>
      resumeLower.includes(skill)
    );

    const jobSkills = skillDatabase.filter((skill) =>
      jobLower.includes(skill)
    );

    const matchedSkills = jobSkills.filter((skill) =>
      resumeSkills.includes(skill)
    );

    const missingSkills = jobSkills.filter(
      (skill) => !resumeSkills.includes(skill)
    );

    const score =
      jobSkills.length === 0
        ? 0
        : Math.round((matchedSkills.length / jobSkills.length) * 100);

    let strength = "Poor";
    if (score >= 70) strength = "Strong";
    else if (score >= 40) strength = "Average";

    const suggestions = missingSkills.map(
      (skill) => `Learn ${skill.toUpperCase()}`
    );

    setResult({
      score,
      matchedSkills,
      missingSkills,
      suggestions,
      strength,
    });
  };

  return (
    <div className="app">
      <nav className="navbar">
        <div className="logo">
          <FaGithub />
          <span>ATS Resume Analyzer</span>
        </div>
      </nav>

      <section className="hero">
        <h1>ATS Resume Analyzer</h1>

        <p>
          Compare your resume skills against a job description and discover
          missing skills instantly.
        </p>
      </section>

      <section className="input-section">
        <div className="card">
          <h3>Resume Skills</h3>

          <textarea
            rows="8"
            placeholder="Example: HTML CSS JavaScript React Node.js"
            value={resumeText}
            onChange={(e) => setResumeText(e.target.value)}
          />
        </div>

        <div className="card">
          <h3>Job Description</h3>

          <textarea
            rows="8"
            placeholder="Example: React Node.js MongoDB Docker AWS"
            value={jobText}
            onChange={(e) => setJobText(e.target.value)}
          />
        </div>
      </section>

      <div className="btn-container">
        <button onClick={analyzeResume}>
          Analyze Resume
        </button>
      </div>

      {result && (
        <>
          <section className="results">
            <div className="score-card">
              <div className="circle">
                <span>{result.score}%</span>
              </div>

              <h3>ATS Score</h3>
              <p>{result.strength} Match</p>
            </div>

            <div className="stats-card">
              <FaCheckCircle className="success-icon" />
              <h3>{result.matchedSkills.length}</h3>
              <p>Matched Skills</p>
            </div>

            <div className="stats-card">
              <FaTimesCircle className="danger-icon" />
              <h3>{result.missingSkills.length}</h3>
              <p>Missing Skills</p>
            </div>

            <div className="stats-card">
              <FaChartPie />
              <h3>{result.strength}</h3>
              <p>Resume Strength</p>
            </div>
          </section>

          <section className="analysis-grid">
            <div className="card">
              <h2>Matched Skills</h2>

              <ul>
                {result.matchedSkills.map((skill, index) => (
                  <li key={index}>✅ {skill}</li>
                ))}
              </ul>
            </div>

            <div className="card">
              <h2>Missing Skills</h2>

              <ul>
                {result.missingSkills.map((skill, index) => (
                  <li key={index}>❌ {skill}</li>
                ))}
              </ul>
            </div>
          </section>

          <section className="card suggestions">
            <h2>Recommendations</h2>

            <ul>
              {result.suggestions.map((item, index) => (
                <li key={index}>🚀 {item}</li>
              ))}
            </ul>
          </section>
        </>
      )}

      <footer>
        Built by Koushik • ATS Resume Analyzer
      </footer>
    </div>
  );
}

export default App;