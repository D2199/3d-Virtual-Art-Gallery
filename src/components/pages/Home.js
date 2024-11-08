import React from "react";
import "./homeStyle.css";

export default function Home() {
  return (
    <div className="home-page">
      <header>
        <h1>Welcome to the Virtual Art Gallery</h1>
      </header>

      <main>
        <section className="intro">
          <h2>Step into a New Dimension of Art</h2>
          <p>
            Immerse yourself in a captivating 3D virtual art gallery experience.
            Our gallery offers a unique and interactive way to explore a diverse
            collection of artworks.
          </p>
          <p>
            Discover renowned artists and their masterpieces as if you were
            walking through a real-life gallery.
          </p>
        </section>

        <section className="features">
          <h2>Features of Our Virtual Gallery</h2>
          <ul>
            <li>
              3D Navigation: Explore the gallery in a fully immersive 3D
              environment.
            </li>
            <li>
              Interactive Artworks: Engage with artworks through detailed
              descriptions and additional media.
            </li>
            <li>
              Curated Collections: Discover carefully curated exhibitions and
              explore different artistic movements.
            </li>
          </ul>
        </section>

        <section className="testimonials">
          <h2>What Our Visitors Say</h2>
          <blockquote>
            "The Virtual Art Gallery is an incredible experience. I felt like I
            was walking through a real gallery, but with the added benefit of
            interactive features. Highly recommended!" - Jane Doe
          </blockquote>
          <blockquote>
            "I've never seen art presented in such a captivating way. The 3D
            gallery brings a whole new level of appreciation to the artworks.
            Bravo!" - John Smith
          </blockquote>
        </section>

        {/* <Gallery3D /> */}
      </main>

      <footer>
        <p>
          &copy; {new Date().getFullYear()} Virtual Art Gallery. All rights
          reserved.
        </p>
      </footer>
    </div>
  );
}
