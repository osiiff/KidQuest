import { Sheet, SheetTrigger, SheetContent, SheetTitle, SheetDescription } from "@/components/ui/sheet";
import { PanelRightOpen } from "lucide-react";
import ChoosingAge from "./choosing-age";
import ChoosingSubjects from "./choosing-subjects";



const SubjectsSlidebar = () => {
    
    return (
        <div className="">
            <Sheet>
                <SheetTrigger className="flex justify-end w-full " >
                    <p className="btn-primary">
                        <PanelRightOpen/>
                    </p>
                </SheetTrigger>
                <SheetContent className="" >
                    <SheetTitle className="flex text-4xl align-middle p-2 justify-center">Menu</SheetTitle>
                    <ChoosingAge/>
                    <ChoosingSubjects />
                    <SheetDescription></SheetDescription>
                </SheetContent>
        </Sheet>
        </div>
       
    )
}

export default SubjectsSlidebar;