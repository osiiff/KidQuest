import { Card, CardContent } from "@/components/ui/card";
import Image from "next/image";

const HomePageInfoCards = () => {
    return (
        <div className="info-section min-[721px]:max-[1025px]:px-6 min-[721px]:max-[1025px]:pb-8">
            <div className="info-panel grid grid-cols-3 min-[721px]:max-[1025px]:grid-cols-3 min-[721px]:max-[1025px]:gap-4 min-[721px]:max-[1025px]:p-4">
                <Card className="info-card min-w-0 min-[721px]:max-[1025px]:grid-cols-1 min-[721px]:max-[1025px]:content-start min-[721px]:max-[1025px]:gap-3 min-[721px]:max-[1025px]:p-4">
                    <Image className="info-icon min-[721px]:max-[1025px]:size-14" src='/game_icon_white.png' alt='Game' width={70} height={70}/>
                    <CardContent className="min-[721px]:max-[1025px]:min-w-0 min-[721px]:max-[1025px]:px-0">
                        <p className="info-title min-[721px]:max-[1025px]:text-lg min-[721px]:max-[1025px]:leading-snug">Fun Tasks</p>
                        <p className="info-text">Interactive lessons and games that make learning exciting.</p>
                    </CardContent>
                </Card>
                <Card className="info-card min-w-0 min-[721px]:max-[1025px]:grid-cols-1 min-[721px]:max-[1025px]:content-start min-[721px]:max-[1025px]:gap-3 min-[721px]:max-[1025px]:p-4">
                    <Image className="info-icon min-[721px]:max-[1025px]:size-14" src='/trophy_icon_white.png' alt='Trophy' width={70} height={70}/>
                    <CardContent className="min-[721px]:max-[1025px]:min-w-0 min-[721px]:max-[1025px]:px-0">
                        <p className="info-title min-[721px]:max-[1025px]:text-lg min-[721px]:max-[1025px]:leading-snug">Rewards</p>
                        <p className="info-text">Earn stars, badges, and prizes as you achieve your goals.</p>
                    </CardContent>
                </Card>
                <Card className="info-card min-w-0 min-[721px]:max-[1025px]:grid-cols-1 min-[721px]:max-[1025px]:content-start min-[721px]:max-[1025px]:gap-3 min-[721px]:max-[1025px]:p-4">
                    <Image className="info-icon min-[721px]:max-[1025px]:size-14" src='/cat_icon_white.png' alt='Cat' width={70} height={70}/>
                    <CardContent className="min-[721px]:max-[1025px]:min-w-0 min-[721px]:max-[1025px]:px-0">
                        <p className="info-title min-[721px]:max-[1025px]:text-lg min-[721px]:max-[1025px]:leading-snug">Friendly characters</p>
                        <p className="info-text">Learn with a cute cat and friends who cheers you on!</p>
                    </CardContent>
                </Card>
            </div>
        </div>
    )
}

export default HomePageInfoCards;