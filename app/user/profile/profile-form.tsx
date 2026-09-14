'use client';

import { Button } from "@/components/ui/button";
import { Field, FieldError, FieldGroup, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { updateProfileSchema } from "@/lib/validators";
import { zodResolver } from "@hookform/resolvers/zod";
import { useSession } from "next-auth/react";
import { Controller, useForm } from "react-hook-form";
import z from "zod";

const ProfileForm = () => {
    const {data: session, update} = useSession();
    const form = useForm<z.infer<typeof updateProfileSchema>>({
        resolver: zodResolver(updateProfileSchema),
        defaultValues: {
            name: session?.user?.name ?? '',
            email: session?.user?.email ?? ''
        }
    })

    const onSubmit = () => {
        return;
    }

    return ( 
            <form className="flex flex-col gap-5" onSubmit={form.handleSubmit(onSubmit)}>
                <FieldGroup>
                <Controller
                    control={form.control}
                    name="email"
                    render={({ field, fieldState }) => (
                    <Field data-invalid={fieldState.invalid}>
                        <FieldLabel htmlFor={field.name}>Email</FieldLabel>

                        <Input
                        {...field}
                        id={field.name}
                        type="email"
                        placeholder="Email"
                        disabled
                        aria-invalid={fieldState.invalid}
                        className="border-rounded"
                        />

                        {fieldState.invalid && (
                        <FieldError errors={[fieldState.error]} />
                        )}
                    </Field>
                    
                    )}
                />
                <Controller
                    control={form.control}
                    name="name"
                    render={({ field, fieldState }) => (
                    <Field data-invalid={fieldState.invalid}>
                        <FieldLabel htmlFor={field.name}>Name</FieldLabel>

                        <Input
                        {...field}
                        id={field.name}
                        type="name"
                        placeholder="Name"
                        aria-invalid={fieldState.invalid}
                        className="border-rounded"
                        />

                        {fieldState.invalid && (
                        <FieldError errors={[fieldState.error]} />
                        )}
                    </Field>
                    
                    )}
                />
                </FieldGroup>
                <button type="submit" className="btn-primary w-full" disabled={form.formState.isSubmitting} >
                    {form.formState.isSubmitting ? 'Submitting...' : 'Update Profile'}
                </button>
            </form>
     );
}
 
export default ProfileForm;