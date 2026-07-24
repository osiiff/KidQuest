import { cn } from "@/lib/utils";
import React from "react";

const CheckoutSteps = ({current = 0}) => {
    return (
        <div className="flex-between flex-col md:flex-row space-x-2 space-y-2 my-10 ">
            {['Select Your Plan', 'Payment Method', 'Review'].map((step, index) => (
                <React.Fragment key={step}>
                    <div className={cn('nav-link hover:bg-transparent! hover:text-[#35336f]!', index === current ? 'nav-link-active hover:nav-link-active!' : '')}>
                        {step}
                    </div>
                    {step !== 'Review' && (
                        <hr className="w-16 border-t border-primary mx-2"/>
                    )}
                </React.Fragment>
            ))}
        </div>
    )
}

export default CheckoutSteps;