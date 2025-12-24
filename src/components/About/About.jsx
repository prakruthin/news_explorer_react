import "./About.css";
import author from "../../assets/author.png";

function About() {
  return (
    <div className="about">
      <img className="about__author-image" src={author} alt="author-image" />
      <div className="about__author">
        <h3 className="about__author-heading">About the author</h3>
        <p className="about__author-description">
          Hi, I’m Prakruthi Nagaraj. I’m a software engineer who enjoys building
          intuitive, responsive and user friendly web applications. I’ve honed
          my skills through TripleTen’s software engineering bootcamp, working
          on projects with JavaScript, React, Node.js, HTML, CSS, Python, and
          databases. I’ve discovered how much I enjoy turning ideas into real
          functional products that people can actually use and enjoy.
        </p>
        <p className="about__author-description">
          Outside of coding, I’m curious about everything from IoT gadgets to
          the latest AI and ML trends, and I love exploring new ways to solve
          problems creatively. I believe in learning constantly, collaborating
          with others and making projects that are not just functional but
          meaningful, while having a little fun along the way.
        </p>
      </div>
    </div>
  );
}

export default About;
