"use client";

import { Field, FieldError, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { updateUser } from "@/lib/actions/user.actions";
import { USER_ROLES } from "@/lib/constants";
import { updateUserSchema } from "@/lib/validators";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { Controller, useForm } from "react-hook-form";
import { toast } from "sonner";
import z from "zod";


const AdminUpdateUserForm = ({user}: {
    user: z.infer<typeof updateUserSchema>
}) => {
    const router = useRouter();

    const form = useForm<z.infer<typeof updateUserSchema>>({
        resolver: zodResolver(updateUserSchema),
        defaultValues: user
    })

    const onSubmit = async (values: z.infer<typeof updateUserSchema>) => {
        try {
            const res = await updateUser({
                ...values,
                id: user.id
            })

            if(!res.success) {
                return toast.error(res.message)
            }

            toast.success(res.message);

            form.reset();

            router.push('/admin/users')

        } catch (error) {
           toast.error(
            error instanceof Error ? error.message : 'User not updated'
           ) 
        }
    }

    return (
        <form
        className="space-y-8"
        method="POST"
        onSubmit={form.handleSubmit(onSubmit)}
        >
            <div>
            <Controller
            name="email"
            control={form.control}
            render={({ field, fieldState }) => (
              <Field className="w-full" data-invalid={fieldState.invalid} >
                <FieldLabel>Email</FieldLabel>
                <Input
                  {...field}
                  placeholder="Enter user email"
                  className="border-rounded bg-blue-50"
                  disabled={true}
                  aria-invalid={fieldState.invalid}
                />
                {fieldState.invalid && (
                  <FieldError errors={[fieldState.error]} />
                )}
              </Field>
            )}
          ></Controller>
          </div>
          <div>
            <Controller
            name="name"
            control={form.control}
            render={({ field, fieldState }) => (
              <Field className="w-full" data-invalid={fieldState.invalid}>
                <FieldLabel>Name</FieldLabel>
                <Input
                  {...field}
                  placeholder="Enter user name"
                  className="border-rounded bg-blue-50"
                  aria-invalid={fieldState.invalid}
                />
                {fieldState.invalid && (
                  <FieldError errors={[fieldState.error]} />
                )}
              </Field>
            )}
          ></Controller>
          </div>
          <div>
            <Controller
            name="role"
            control={form.control}
            render={({ field, fieldState }) => (
              <Field className="w-full" data-invalid={fieldState.invalid}>
                <FieldLabel>Role</FieldLabel>
                <Select onValueChange={field.onChange} value={field.value.toString()} >
                    <SelectTrigger className="border-rounded bg-blue-50">
                        <SelectValue placeholder='Select a role' />
                    </SelectTrigger>
                    <SelectContent className="border-rounded bg-blue-50">
                        {USER_ROLES.map((role) => (
                            <SelectItem key={role} value={role}>
                                {role.charAt(0).toUpperCase() + role.slice(1)}
                            </SelectItem>
                        ))}
                    </SelectContent>
                </Select>
                {fieldState.invalid && (
                  <FieldError errors={[fieldState.error]} />
                )}
              </Field>
            )}
          ></Controller>
          </div>
          <div className="flex-between">
            <button type="submit" className="w-full btn-primary mb-5" disabled={form.formState.isSubmitting}>
                {form.formState.isSubmitting ? 'Submitting...' : 'Update User'}
            </button>
          </div>
        </form>
    );
}
 
export default AdminUpdateUserForm;