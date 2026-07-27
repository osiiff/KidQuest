"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { FieldError, FieldGroup } from "@/components/ui/field";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { updateUserPaymentMethod } from "@/lib/actions/user.actions";
import { DEFAULT_PAYMENT_METHOD, PAYMENT_METHODS } from "@/lib/constants";
import { paymentMethodSchema } from "@/lib/validators";
import { zodResolver } from "@hookform/resolvers/zod";
import { ArrowRight, Loader } from "lucide-react";
import { useRouter } from "next/navigation";
import { useTransition } from "react";
import { Controller, useForm } from "react-hook-form";
import { toast } from "sonner";
import z from "zod";

const PaymentMethodForm = ({preferredPaymentMethod}: {preferredPaymentMethod: string | null}) => {
    const router = useRouter();
    const form = useForm<z.infer<typeof paymentMethodSchema>>({
        resolver: zodResolver(paymentMethodSchema),
        defaultValues: {
            type: preferredPaymentMethod || DEFAULT_PAYMENT_METHOD,
        }
    });

    const [isPending, startTransition] = useTransition();

    const onSubmit = async (values: z.infer<typeof paymentMethodSchema>) => {
        startTransition(async () => {
            const res = await updateUserPaymentMethod(values);

            if(!res.success) {
             toast.error(res.message);
             return;   
            };
            router.push('/review-subscription');
        })
    }

    return (
        <>
            <div className="max-w-md mx-auto space-y-4">
                <h1 className="hero-title text-5xl pt-5">Payment Method</h1>
                <p className="hero-text">
                    Please select a payment method
                </p>
                <Card className="info-card">
                    <CardHeader>
                        <CardTitle></CardTitle>
                        <CardDescription></CardDescription>
                    </CardHeader>
                    <CardContent>
                        <form method="post" className="space-y-4" onSubmit={form.handleSubmit(onSubmit)}>
                            <div className="flex flex-col md:flex-row gap-5">
                                <FieldGroup>
                                        <Controller
                                        name="type"
                                        control={form.control}
                                        render={({field, fieldState}) => (
                                           <div className="space-y-3">
                                            <RadioGroup
                                            name={field.name}
                                            value={field.value}
                                            onValueChange={field.onChange}
                                            className=""
                                            >
                                                {PAYMENT_METHODS.map((paymentMethod) => (
                                                        <div 
                                                        key={paymentMethod}
                                                        className="flex items-baseline gap-3">
                                                            <RadioGroupItem
                                                            value={paymentMethod}
                                                            checked={field.value === paymentMethod}
                                                            className=""/>
                                                            <Label className="hero-title text-2xl">
                                                                {paymentMethod}
                                                            </Label>
                                                        </div>
                                                    )
                                                )}
                                            </RadioGroup>
                                            {fieldState.invalid && (
                                                <FieldError errors={[fieldState.error]} />
                                                )}
                                        </div>
                                        )}
                                        />
                                </FieldGroup>
                            </div>
                            
                            <div className="flex gap-2 py-3">
                                <button type="submit" disabled={isPending} className="btn-primary">
                                    {isPending ? (
                                        <Loader className="h-4 w-4 animate-spin"/>
                                    ) : (
                                        <ArrowRight className="h-4 w-4"/>
                                    )} {' '}
                                    Continue
                                </button>
                            </div>
                        </form>
                    </CardContent>
                </Card>
            </div>
        </>
    )
}

export default PaymentMethodForm;