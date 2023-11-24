<template>
  <footer>
    <div class="footer-section logo-section">
      <div class="footer-logo">
        <img src="@/assets/Logo.png" alt="Vehicle Vibes logo" />
        <h1>VehicleVibes</h1>
      </div>
      <p class="slogan-text">The dating app based on your daily vehicle.</p>
      <p class="love-text">
        Made with ❤️ by
        <a href="https://www.youtube.com/watch?v=dQw4w9WgXcQ" target="_blank" rel="noopener noreferrer">Die Macher</a>
      </p>
    </div>

    <div class="footer-section navigation-section">
      <h2>Quick Links</h2>
      <ul>
        <li><RouterLink to="/about"> About Us </RouterLink></li>
        <li><RouterLink to="/faq"> FAQ </RouterLink></li>
        <li><RouterLink to="/what-is-vehiclevibes"> What is VehicleVibes? </RouterLink></li>
      </ul>
    </div>

    <div class="footer-section contact-section">
      <h2>Contact Us</h2>
      <p class="email-link">
        <a :href="'mailto:contact@vehiclevibes.de'">contact@vehiclevibes.de</a>
      </p>
    </div>

    <div class="footer-section social-media-section">
      <h2>Follow Us</h2>
      <div class="social-media-icons">
        <a href="https://www.youtube.com/watch?v=KbmwDZ0e5PE" target="_blank" rel="noopener noreferrer">
          <FontAwesomeIcon icon="fa-brands fa-instagram" />
        </a>
        <a href="https://www.youtube.com/watch?v=bZhUOCT-wR8" target="_blank" rel="noopener noreferrer">
          <FontAwesomeIcon icon="fa-brands fa-x-twitter" />
        </a>
        <a href="https://www.youtube.com/watch?v=6QbGerFPTRY" target="_blank" rel="noopener noreferrer">
          <FontAwesomeIcon icon="fa-brands fa-facebook" />
        </a>
      </div>
    </div>
  </footer>
</template>

<style lang="scss" scoped>
footer {
  background-color: #fff8d3;
  padding: 20px 10vw;
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  align-items: flex-start;

  .footer-section {
    h2 {
      font-size: 18px;
      margin-bottom: 10px;
    }

    ul {
      list-style: none;
      padding: 0;
      margin: 0;

      li {
        margin-bottom: 8px;
      }
    }

    a {
      color: #666;
      text-decoration: none;
      transition: color 0.1s ease;

      &:hover {
        color: #b3a24c;
      }
    }
  }

  .logo-section {
    .footer-logo {
      display: flex;
      align-items: center;
      gap: 16px;

      img {
        width: 52px;
      }

      h1 {
        font-family: 'Rubik', sans-serif;
        font-size: 22px;
      }
    }

    .slogan-text {
      color: #666;
      margin: 10px 10px 0 0;
    }

    .love-text {
      font-size: 14px;
      color: #666;
      margin: 20px 0 0;
    }
  }

  .contact-section {
    p.email-link {
      font-size: 16px;
      margin-top: 8px;
    }
  }

  .social-media-section {
    .social-media-icons {
      display: flex;
      align-items: center;
      gap: 8px;

      a {
        font-size: 26px;
      }
    }
  }

  @media screen and (max-width: 1000px) {
    padding: 20px 5vw; // Passe das Padding für kleinere Bildschirme an

    .footer-section {
      margin-bottom: 20px; // Füge einen unteren Rand zwischen Abschnitten auf kleinen Bildschirmen hinzu
      width: 50%; // Setze die Breite auf 100%, damit es in einer Zeile angezeigt wird
    }
  }

  @media screen and (max-width: 500px) {
    padding: 20px 5vw; // Passe das Padding für kleinere Bildschirme an

    .footer-section {
      margin-bottom: 10px; // Füge einen unteren Rand zwischen Abschnitten auf kleinen Bildschirmen hinzu
      width: 100%; // Setze die Breite auf 100%, damit es in einer Zeile angezeigt wird
    }
  }
}
</style>
