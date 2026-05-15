import { Star, ArrowBigRight } from "lucide-react";
import Link from "next/link";
import Image from "next/image";

const HomePage = () => {
  return (
    <div className="hero" >
      <div className="hero-content">
        <div className="badge">
          <Star/>
          <p>Learning is an adventure!</p>
        </div>
        <p className="hero-title">Learn through play,
          <br/>
          <span className="gradient-text">grow every day</span>
        </p>
        <p className="hero-text">KidQuest makes learning fun and meaningful for kids with playful lessons, cute characters, and exciting rewards.</p>
        <div className="hero-actions">
          <Link className="btn-primary" href="/login">
            <Star/>
            Start learning
          </Link>
          <Link className="btn-secondary" href="/login">
          <ArrowBigRight/>
            Explore subjects
          </Link>
        </div>
      </div>
      <div>
        <Image className="hero-cat-image" src='/hero-cat3.png' alt="Cat" width={900} height={800}/>
      </div>
    </div>
  )
}

export default HomePage;