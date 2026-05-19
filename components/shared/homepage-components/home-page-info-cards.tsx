import { Card, CardContent } from "@/components/ui/card";
import Image from "next/image";

const HomePageInfoCards = () => {
    return (
        <div className="info-section">
            <div className="info-panel">
                <Card className="info-card">
                    <Image className="info-icon" src='/game_icon_white.png' alt='Game' width={70} height={70}/>
                    <CardContent>
                        <p className="info-title">Fun Tasks</p>
                        <p className="info-text">Interactive lessons and games that make learning exciting.</p>
                    </CardContent>
                </Card>
                <Card className="info-card">
                    <Image className="info-icon" src='/trophy_icon_white.png' alt='Trophy' width={70} height={70}/>
                    <CardContent>
                        <p className="info-title">Rewards</p>
                        <p className="info-text">Earn stars, badges, and prizes as you achieve your goals.</p>
                    </CardContent>
                </Card>
                <Card className="info-card">
                    <Image className="info-icon" src='/cat_icon_white.png' alt='Cat' width={70} height={70}/>
                    <CardContent>
                        <p className="info-title">Friendly characters</p>
                        <p className="info-text">Learn with a cute cat and friends who cheers you on!</p>
                    </CardContent>
                </Card>
            </div>
        </div>
    )
}

export default HomePageInfoCards;