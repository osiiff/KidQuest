import Menu from "./menu";
import { Sheet, SheetContent, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { EllipsisVertical } from "lucide-react";
import UserButton from "./user-button";
import MenuSteps from "./menu-steps";



const MenuSheet = () => {
    return (
        <div className="flex shrink-0 flex-nowrap items-center gap-2 sm:gap-3">
            <div className="hidden xl:block">
                <Menu/>
            </div>
            <div className="flex shrink-0 items-center gap-2 sm:gap-3 xl:hidden">
                <UserButton variant="compact" />
                <Sheet>
                    <SheetTrigger aria-label="Open menu" className="flex size-11 shrink-0 items-center justify-center rounded-2xl border-0 bg-transparent text-primary shadow-none focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary">
                        <EllipsisVertical/>
                    </SheetTrigger>
                    <SheetContent aria-describedby={undefined} className="overflow-y-auto bg-white p-6 pt-14">
                        <SheetTitle className="text-2xl font-bold text-primary">Menu</SheetTitle>
                        <MenuSteps inSheet />
                        <UserButton variant="menu" />
                    </SheetContent>
                </Sheet>
            </div>
        </div>
    )
}

export default MenuSheet;
