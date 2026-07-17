import { Card, CardContent } from "@/components/ui/card";
import { Star } from "lucide-react";
import Image from "next/image";


const AboutPage = () => {
    return (
        <>
        <div className="hero" >
            <div className="hero-content">
                <div className="badge">
                    <Star/>
                    <p>About KidQuest</p>
                </div>
                <p className="hero-title">We make learning
                    <br/>
                    <span className="gradient-text">an exciting adventure!</span>
                </p>
                <p className="hero-text">KidQuest is fun and interactive learning platform designed for kids. We believe
                    that every child learns best when they are curious, engaged and having fun.
                </p>
            </div>
            <div>
                <Image className="hero-cat-image" src='/about-cat.png' alt="Cat" width={500} height={500}/>
            </div>
    </div>
    <div className="w-full p-2 gap-4">
        <p className="text-primary font-bold flex justify-center text-5xl">Our mission</p>
        <p className="mx-auto text-center hero-text">To inspire children to explore, learn and grow every day through playful lessons and loyable characters that encourage 
            progress and confidence.
        </p>
    </div>
    <div className="info-section">
            <div className="info-panel grid grid-cols-4">
                <Card className="info-card flex flex-col">
                    <Image className="w-30" src='/about-1.png' alt='Game' width={70} height={70}/>
                    <CardContent>
                        <p className="info-title">Learn throw play</p>
                        <p className="info-text">We turn lessons into fun activities and games that kids love.</p>
                    </CardContent>
                </Card>
                <Card className="info-card flex flex-col">
                    <Image className="w-30" src='/about-2.png' alt='Trophy' width={70} height={70}/>
                    <CardContent>
                        <p className="info-title">Build confidence</p>
                        <p className="info-text">Kids feel proud of their achievements.</p>
                    </CardContent>
                </Card>
                <Card className="info-card flex flex-col">
                    <Image className="w-30" src='/about-3.png' alt='Cat' width={70} height={70}/>
                    <CardContent>
                        <p className="info-title">Safe & friendly</p>
                        <p className="info-text">A secure, ad-free enviroment made just for kids.</p>
                    </CardContent>
                </Card>
                <Card className="info-card flex flex-col">
                    <Image className="w-30" src='/about-4.png' alt='Cat' width={70} height={70}/>
                    <CardContent>
                        <p className="info-title">Grow every day</p>
                        <p className="info-text">From math to reading and English, we help kids build skills fir life.</p>
                    </CardContent>
                </Card>
            </div>
    </div>
    </>
    )
}

export default AboutPage;