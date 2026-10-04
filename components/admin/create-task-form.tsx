'use client';

import { taskDefaultValues } from "@/lib/constants";
import { insertTasksSchema } from "@/lib/validators";
import { Task } from "@/types";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter, useSearchParams } from "next/navigation";
import { Controller, useForm } from "react-hook-form";
import z from "zod";
import { Field, FieldError, FieldGroup, FieldLabel } from "../ui/field";
import { Input } from "../ui/input";
import slugify from 'slugify';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../ui/select";

const CreateTaskForm = ({type, task, taskId}:{
    type: 'Create' | 'Update',
    task?: Task,
    taskId?: string
}) => {

    const router = useRouter();

    const form = useForm<z.input<typeof insertTasksSchema>,
        unknown,
        z.output<typeof insertTasksSchema>>({
        resolver: zodResolver(insertTasksSchema),
        defaultValues: task && type === 'Update' ? task : taskDefaultValues
    })

    const searchParams = useSearchParams();
    const subjectId = searchParams.get("subjectId");


    return (
        <form>
            <FieldGroup className="space-y-5">
                <div className="flex flex-col md:flex-row gap-5">
                    <Controller 
                    name="title"
                    control={form.control}
                    render={({field, fieldState}) => (
                        <Field data-invalid={fieldState.invalid} className="w-full">
                            <FieldLabel className="hero-text">Title</FieldLabel>
                            <Input
                            {...field}
                            placeholder="Enter subject name"
                            aria-invalid={fieldState.invalid}
                            className="border-rounded bg-blue-50"
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
                            className="border-rounded bg-blue-50"
                            />
                            <button
                            type="button"
                            className="btn-secondary"
                            onClick={() => {
                                form.setValue(
                                "slug",
                                slugify(form.getValues("title"), { lower: true }),
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
                            className="border-rounded bg-blue-50"
                            />
                            {fieldState.invalid && (
                                <FieldError errors={[fieldState.error]} />
                            )}
                        </Field>
                    )}>
                    </Controller>
                    <Controller 
                    name="difficulty"
                    control={form.control}
                    render={({field, fieldState}) => (
                        <Field data-invalid={fieldState.invalid} className="w-full">
                            <FieldLabel className="hero-text">Difficulty</FieldLabel>
                             <Select value={field.value} onValueChange={field.onChange}>
                                <SelectTrigger onBlur={field.onBlur} aria-invalid={fieldState.invalid} className="border-rounded border-2 bg-blue-50">
                                    <SelectValue placeholder="Select Difficulty"></SelectValue>
                                </SelectTrigger>
                                <SelectContent position="popper" defaultValue='All' className="bg-white">
                                    <SelectItem value="All" >All</SelectItem>
                                    <SelectItem value="beginner">Beginner</SelectItem>
                                    <SelectItem value="medium">Medium</SelectItem>
                                    <SelectItem value="advanced">Advanced</SelectItem>
                                </SelectContent>
                            </Select>
                            {fieldState.invalid && (
                                <FieldError errors={[fieldState.error]} />
                            )}
                        </Field>
                    )}>
                    </Controller>
                </div>
                <div className="flex flex-col md:flex-row gap-5">
                    <Controller 
                    name="ageGroup"
                    control={form.control}
                    render={({field, fieldState}) => (
                        <Field data-invalid={fieldState.invalid} className="w-full">
                            <FieldLabel className="hero-text">Age Group</FieldLabel>
                            <Select value={field.value} onValueChange={field.onChange}>
                                <SelectTrigger onBlur={field.onBlur} aria-invalid={fieldState.invalid} className="border-rounded border-2 bg-blue-50">
                                    <SelectValue placeholder="Select Age Group"></SelectValue>
                                </SelectTrigger>
                                <SelectContent position="popper" defaultValue='All Ages' className="bg-white">
                                    <SelectItem value="All Ages" >All Ages</SelectItem>
                                    <SelectItem value="Kindergarten">Kindergarten</SelectItem>
                                    <SelectItem value="Early Primary">Early Primary</SelectItem>
                                    <SelectItem value="Primary School">Primary School</SelectItem>
                                </SelectContent>
                            </Select>
                            {fieldState.invalid && (
                                <FieldError errors={[fieldState.error]} />
                            )}
                        </Field>
                    )}>
                    </Controller>
                    <Controller 
                    name="image"
                    control={form.control}
                    render={({field, fieldState}) => (
                        <Field data-invalid={fieldState.invalid} className="w-full">
                            <FieldLabel className="hero-text">Image</FieldLabel>
                            <Input
                            {...field}
                            placeholder="Choose Image"
                            type="file"
                            aria-invalid={fieldState.invalid}
                            className="border-rounded bg-blue-50"
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
                    {form.formState.isSubmitting ? 'Submitting...' : `${type} Product`}
                </button>
        </div>
            </FieldGroup>
        </form>
    );
}
 
export default CreateTaskForm;