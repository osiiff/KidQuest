import { Star, ArrowBigRight } from "lucide-react";
import Link from "next/link";
import Image from "next/image";


const HomePageHero = () => {
    return (
        <div className="hero min-[721px]:max-[1025px]:min-h-0 min-[721px]:max-[1025px]:grid-cols-2 min-[721px]:max-[1025px]:gap-6 min-[721px]:max-[1025px]:px-6 min-[721px]:max-[1025px]:py-10" >
            <div className="hero-content min-w-0">
                <div className="badge min-[721px]:max-[1025px]:gap-2 min-[721px]:max-[1025px]:px-3 min-[721px]:max-[1025px]:text-sm [&>svg]:shrink-0">
                    <Star/>
                    <p>Learning is an adventure!</p>
                </div>
                <p className="hero-title min-[721px]:max-[1025px]:text-[clamp(2rem,4.5vw,2.875rem)] min-[721px]:max-[1025px]:leading-[1.08]">Learn through play,
                    <br/>
                    <span className="gradient-text">grow every day</span>
                </p>
                <p className="hero-text min-[721px]:max-[1025px]:mt-5 min-[721px]:max-[1025px]:text-base min-[721px]:max-[1025px]:leading-relaxed">KidQuest makes learning fun and meaningful for kids with playful lessons, cute characters, and exciting rewards.</p>
                <div className="hero-actions min-[721px]:max-[1025px]:mt-6 min-[721px]:max-[1025px]:gap-3">
                    <Link className="btn-primary min-[721px]:max-[1025px]:min-h-12 min-[721px]:max-[1025px]:w-full min-[721px]:max-[1025px]:gap-2 min-[721px]:max-[1025px]:px-4 min-[721px]:max-[1025px]:text-base" href="/sign-up">
                    <Star/>
                        Start learning
                    </Link>
                    <Link className="btn-secondary min-[721px]:max-[1025px]:min-h-12 min-[721px]:max-[1025px]:w-full min-[721px]:max-[1025px]:gap-2 min-[721px]:max-[1025px]:px-4 min-[721px]:max-[1025px]:text-base" href="/sign-in">
                    <ArrowBigRight/>
                        Explore subjects
                    </Link>
                </div>
            </div>
            <div className="min-w-0">
                <Image className="hero-cat-image min-[721px]:max-[1025px]:mx-auto min-[721px]:max-[1025px]:h-auto min-[721px]:max-[1025px]:w-full min-[721px]:max-[1025px]:max-w-96 min-[721px]:max-[1025px]:object-contain" src='/hero-cat3.png' alt="Cat" width={900} height={800}/>
            </div>
    </div>
    )
}

export default HomePageHero;
