"use client";

import { Controller, SubmitHandler, useForm, useWatch } from "react-hook-form";
import { Field, FieldError, FieldGroup, FieldLabel } from "../ui/field";
import { Input } from "../ui/input";
import z from "zod";
import { insertQuestionSchema } from "@/lib/validators";
import { zodResolver } from "@hookform/resolvers/zod";
import { Question } from "@/lib/generated/prisma/client";
import { questionDefaultValues } from "@/lib/constants";
import { RadioGroup, RadioGroupItem } from "../ui/radio-group";
import { Label } from "../ui/label";
import { useSearchParams } from "next/navigation";
import { createQuestion, updateQuestion } from "@/lib/actions/subject.action";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

const CreateQuestionForm = ({
  type,
  question,
  questionId,
}: {
  type: "Create" | "Update";
  question?: Question;
  questionId?: string;
}) => {

    const searchParams = useSearchParams();
    const taskId = searchParams.get("taskId");

    const router = useRouter();

  const form = useForm<z.infer<typeof insertQuestionSchema>>({
    resolver: zodResolver(insertQuestionSchema),
    defaultValues:
      question && type === "Update" ? question : {
        ...questionDefaultValues,
        taskId: taskId ?? '',
      },
  });

  const options = useWatch({
    control: form.control,
    name: "options",
  });

  const onSubmit:SubmitHandler<z.infer<typeof insertQuestionSchema>> = async (values) => {
        if(type === 'Create') {
            const res = await createQuestion(values);

            if (res.success) {
                toast.success(res.message);
                router.push('/admin/tasks')
            } else {
                toast.error(res.message);
            }

            
        }

        if(type === 'Update') {
            if(!questionId) {
                router.push('/admin/tasks');
                return;
            }

            const res = await updateQuestion({
                ...values,
                id: questionId,
            });

            if (res.success) {
                toast.success(res.message);
                router.push('/admin/tasks')
            } else {
                toast.error(res.message);
            }
        }
    }

  return (
    <form method="POST" onSubmit={form.handleSubmit(onSubmit)}>
      <FieldGroup className="space-y-5">
        <div className="flex flex-col md:flex-row gap-5">
          <Controller
            name="text"
            control={form.control}
            render={({ field, fieldState }) => (
              <Field data-invalid={fieldState.invalid} className="w-full">
                <FieldLabel className="hero-text">Text</FieldLabel>
                <Input
                  {...field}
                  placeholder="Enter text of question"
                  aria-invalid={fieldState.invalid}
                  className="border-rounded bg-blue-50"
                />
                {fieldState.invalid && (
                  <FieldError errors={[fieldState.error]} />
                )}
              </Field>
            )}
          ></Controller>
        </div>
        <div className="flex flex-col md:flex-row gap-5">
          {[0, 1, 2, 3].map((index) => (
            <Controller
              key={index}
              name={`options.${index}` as const}
              control={form.control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid} className="w-full">
                  <FieldLabel className="hero-text" htmlFor={`option-${index}`}>
                    Option {index + 1}
                  </FieldLabel>
                  <Input
                    {...field}
                    value={field.value ?? ""}
                    id={`option-${index}`}
                    placeholder={`Enter option ${index + 1}`}
                    aria-invalid={fieldState.invalid}
                    className="border-rounded bg-blue-50"
                  />
                  {fieldState.invalid && (
                    <FieldError errors={[fieldState.error]} />
                  )}
                </Field>
              )}
            ></Controller>
          ))}
        </div>
        <div className="flex flex-col md:flex-row gap-5">
          <Controller
            name="correctAnswer"
            control={form.control}
            render={({ field, fieldState }) => (
              <div className="space-y-3">
                <p className="hero-title text-2xl">
                    Correct Answer
                </p>
                <RadioGroup
                  name={field.name}
                  value={field.value}
                  onValueChange={field.onChange}
                  className="flex flex-wrap gap-5 w-full justify-between"
                >
                  {(options ?? []).map((option, index) => (
                    <div
                      key={index}
                      className="flex items-baseline gap-3 justify-between"
                    >
                      <RadioGroupItem
                        value={option}
                        checked={field.value === option}
                        className=""
                      />
                      <Label className="hero-text text-2xl">
                        Option {index + 1}: {option || "Not entered"}
                      </Label>
                    </div>
                  ))}
                </RadioGroup>
                {fieldState.invalid && (
                  <FieldError errors={[fieldState.error]} />
                )}
              </div>
            )}
          ></Controller>
        </div>
        <button type="submit" disabled={form.formState.isSubmitting} className="btn-primary col-span-2 w-full mb-7">
                    {form.formState.isSubmitting ? 'Submitting...' : `${type} Question`}
                </button>
      </FieldGroup>
    </form>
  );
};

export default CreateQuestionForm;
