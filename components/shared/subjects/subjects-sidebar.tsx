import { Sheet, SheetTrigger, SheetContent, SheetTitle, SheetDescription } from "@/components/ui/sheet";
import { Settings2} from "lucide-react";
import ChoosingAge from "./choosing-age";
import ChoosingSubjects from "./choosing-subjects";
import ChoosingDifficulty from "./choosing-difficulty";



const SubjectsSlidebar = () => {
    
    return (
        <div>
            <Sheet>
                <SheetTrigger className="flex justify-end w-full " >
                    <p>
                        <Settings2/>
                    </p>
                </SheetTrigger>
                <SheetContent className="h-dvh overflow-y-auto" side="left">
                    <SheetTitle className="flex text-4xl align-middle p-2 justify-center">Menu</SheetTitle>
                    <ChoosingAge/>
                    <ChoosingSubjects />
                    <ChoosingDifficulty/>
                    <SheetDescription></SheetDescription>
                </SheetContent>
        </Sheet>
        </div>
       
    )
}

export default SubjectsSlidebar;