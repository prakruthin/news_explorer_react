import "./About.css";
import avatar from "../../assets/avatar.png";

function About() {
  return (
    <div className="about">
      <img className="about__author-image" src={avatar} alt="author-image" />
      <div className="about__author">
        <h3 className="about__author-heading">About the author</h3>
        <p className="about__author-description">
          Hi, I am Prakruthi Nagaraj, a software engineer skilled in Python,
          JavaScript, React, Node.js, machine learning, and building full stack
          applications. I work with APIs, databases, and modern development
          tools such as Git, Docker, and Express to create reliable and user
          focused projects.
        </p>
        <p className="about__author-description">
          During the TripleTen Software Engineering Bootcamp, I strengthened my
          understanding of frontend and backend architecture, responsive design,
          and deployment. NewsExplorer reflects the skills I developed,
          including clean code, thoughtful design, and real API integration.
        </p>
        <p className="about__author-description">
          I enjoy learning, solving problems, and helping clients bring their
          ideas to life through well built and meaningful applications.
        </p>
      </div>
    </div>
  );
}

export default About;
