import "./Footer.css";
import githubIcon from "../../assets/github.svg";
import linkedinIcon from "../../assets/linkedin.svg";

function Footer() {
  return (
    <footer className="footer">
      <p className="footer__copyright">© 2025 Supersite, Powered by News API</p>
      <nav className="footer__nav">
        <ul className="footer__menu">
          <li className="footer__menu-item">
            <a href="/" className="footer__link">
              Home
            </a>
          </li>
          <li className="footer__menu-item">
            <a
              href="https://tripleten.com"
              target="_blank"
              rel="noreferrer"
              className="footer__link"
            >
              TripleTen
            </a>
          </li>
        </ul>

        <ul className="footer__social">
          <li className="footer__social-item">
            <a
              className="footer__social-link"
              href="https://github.com/prakruthin"
              target="_blank"
              rel="noreferrer"
            >
              <img
                src={githubIcon}
                alt="GitHub"
                className="footer__social-icon"
              />
            </a>
          </li>

          <li className="footer__social-item">
            <a
              className="footer__social-link"
              href="https://www.linkedin.com/in/prakruthi-nagaraj/"
              target="_blank"
              rel="noreferrer"
            >
              <img
                src={linkedinIcon}
                alt="LinkedIn"
                className="footer__social-icon"
              />
            </a>
          </li>
        </ul>
      </nav>
    </footer>
  );
}
export default Footer;
