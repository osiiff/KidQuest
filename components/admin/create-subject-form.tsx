'use client';

import { subjectDefaultValues } from "@/lib/constants";
import { insertSubjectsSchema } from "@/lib/validators";
import { Subject } from "@/types";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { Controller, SubmitHandler, useForm, useWatch } from "react-hook-form";
import z from "zod";
import { Field, FieldError, FieldGroup, FieldLabel } from "../ui/field";
import { Input } from "../ui/input";
import slugify from 'slugify';
import { createSubject, updateSubject } from "@/lib/actions/subject.action";
import { toast } from "sonner";
import { Card, CardContent } from "../ui/card";
import Image from "next/image";
import { UploadButton } from "@/lib/uploadthing";

const CreateSubjectForm = ({type, subject, subjectId}: {
    type: 'Create' | 'Update',
    subject?: Subject,
    subjectId?: string
}) => {

    const router = useRouter();

    const form = useForm<z.infer<typeof insertSubjectsSchema>>({
        resolver: zodResolver(insertSubjectsSchema),
        defaultValues: subject && type === 'Update' ? subject : subjectDefaultValues
    })

    const onSubmit:SubmitHandler<z.infer<typeof insertSubjectsSchema>> = async (values) => {
        if(type === 'Create') {
            const res = await createSubject(values);

            if (res.success) {
                toast.success(res.message);
                router.push('/admin/tasks')
            } else {
                toast.error(res.message);
            }

            
        }

        if(type === 'Update') {
            if(!subjectId) {
                router.push('/admin/tasks');
                return;
            }

            const res = await updateSubject({
                ...values,
                id: subjectId,
            });

            if (res.success) {
                toast.success(res.message);
                router.push('/admin/tasks')
            } else {
                toast.error(res.message);
            }
        }
    }

    const image = useWatch({
        control: form.control,
        name: "image",
        });


    return (
        <form method="POST" onSubmit={form.handleSubmit(onSubmit)}>
            <FieldGroup className="space-y-5">
                <div className="flex flex-col md:flex-row gap-5">
                    <Controller 
                    name="name"
                    control={form.control}
                    render={({field, fieldState}) => (
                        <Field data-invalid={fieldState.invalid} className="w-full">
                            <FieldLabel className="hero-text">Name</FieldLabel>
                            <Input
                            {...field}
                            placeholder="Enter subject name"
                            aria-invalid={fieldState.invalid}
                            className="border-rounded h-14 bg-blue-50"
                            />
                            {fieldState.invalid && (
                                <FieldError errors={[fieldState.error]} />
                            )}
                        </Field>
                    )}>
                    </Controller>
                    <Controller 
                    name="slug"
                    control={form.control}
                    render={({field, fieldState}) => (
                        <Field data-invalid={fieldState.invalid} className="w-full">
                            <FieldLabel className="hero-text">Slug</FieldLabel>
                            <Input
                            {...field}
                            placeholder="Enter subject slug"
                            aria-invalid={fieldState.invalid}
                            className="border-rounded h-14 bg-blue-50"
                            />
                            <button
                            type="button"
                            className="btn-secondary"
                            onClick={() => {
                                form.setValue(
                                "slug",
                                slugify(form.getValues("name"), { lower: true }),
                                );
                            }}
                            >
                            Generate
                            </button>
                            {fieldState.invalid && (
                                <FieldError errors={[fieldState.error]} />
                            )}
                        </Field>
                    )}>
                    </Controller>
                </div>
                <div className="upload-field flex flex-col md:flex-row gap-5">
                    <Controller
                        name="image"
                        control={form.control}
                        render={() => (
                        <Field className="w-full">
                            <FieldLabel>Images</FieldLabel>
                            <Card>
                            <CardContent className="space-y-2 mt-2 min-h-48">
                                <div className="flex-start space-x-2">
                                    {image && (
                                    <Image src={image} alt="product image" className="w-20 h-20 object-cover object-center rounded-sm" width={100} height={100}/>
                                    )}
                                </div>
                                <UploadButton endpoint='imageUploader' onClientUploadComplete={(res: {url: string}[]) => {
                            form.setValue('image', res[0].url, {
                                shouldValidate: true,
                                shouldDirty: true
                            });
                            }}
                            onUploadError={(error: Error) => {
                            toast.error(error.message)
                            }}/>
                            </CardContent>
                            </Card>
                        </Field>
                        )}
                    ></Controller>
                </div>
                <div className="flex flex-col md:flex-row gap-5">
                    <Controller 
                    name="description"
                    control={form.control}
                    render={({field, fieldState}) => (
                        <Field data-invalid={fieldState.invalid} className="w-full">
                            <FieldLabel className="hero-text">Description</FieldLabel>
                            <Input
                            {...field}
                            placeholder="Enter subject description"
                            aria-invalid={fieldState.invalid}
                            className="border-rounded h-14 bg-blue-50"
                            />
                            {fieldState.invalid && (
                                <FieldError errors={[fieldState.error]} />
                            )}
                        </Field>
                    )}>
                    </Controller>
                </div>
                <div>
                <button type="submit" disabled={form.formState.isSubmitting} className="btn-primary col-span-2 w-full mb-4">
                    {form.formState.isSubmitting ? 'Submitting...' : `${type} Subject`}
                </button>
        </div>
            </FieldGroup>
        </form>
    );
}
 
export default CreateSubjectForm;