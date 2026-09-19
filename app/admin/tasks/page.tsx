import DeleteDialog from "@/components/shared/delete-dialog";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import {
  deleteQuestion,
  deleteSubject,
  deleteTask,
  getAllSubjects,
  getSubjectsSummary,
} from "@/lib/actions/subject.action";
import {
  Book,
  ChevronDown,
  CircleQuestionMark,
  EllipsisVertical,
  Pencil,
  Plus,
} from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { cn } from "@/lib/utils";

const AdminTasksPage = async (props: {
  searchParams: Promise<{
    query: string;
    subject: string;
    task: string;
    question: string;
  }>;
}) => {
  const searchParams = await props.searchParams;

  const searchText = searchParams.query || "";
  const subject = searchParams.subject || "";
  const task = searchParams.task || "";
  const question = searchParams.question || "";

  const subjects = await getAllSubjects({
    query: searchText,
    subject,
    task,
    question,
  });

  const summary = await getSubjectsSummary();

  return (
    <div className="space-y-2 py-4">
      <div className="flex-between">
        <p className="hero-title text-4xl">Tasks</p>
        <button className="btn-primary">
          <Link href="/admin/tasks/create">Create New Task</Link>
        </button>
      </div>
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3 pt-4">
        <Card className="border-2 border-rounded p-5">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Subjects</CardTitle>
            <Book />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{summary.subjectsCount}</div>
          </CardContent>
        </Card>
        <Card className="border-2 border-rounded p-5">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Tasks</CardTitle>
            <Pencil />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{summary.tasksCount}</div>
          </CardContent>
        </Card>
        <Card className="border-2 border-rounded p-5">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Questions</CardTitle>
            <CircleQuestionMark />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{summary.questionsCount}</div>
          </CardContent>
        </Card>
      </div>
      <div>
        {subjects.map((subject) => (
          <Collapsible
            key={subject.id}
            className="border-rounded border-2 py-2 my-4 bg-purple-50"
          >
            <CollapsibleTrigger className="flex justify-between w-full ">
              <div className="flex flex-row items-center space-x-2 px-5">
                <ChevronDown />
                <Image
                  src={subject.image}
                  alt={subject.name}
                  width={50}
                  height={50}
                />
                <div className="flex flex-col">
                  <h2 className="hero-title text-2xl m-0 flex justify-start">
                    {subject.name}
                  </h2>
                  <p className="hero-text text-sm m-0">{subject.description}</p>
                </div>
              </div>
              <div className="px-5">
                <Link href={`/admin/tasks/${subject.id}`}>
                  <p className="btn-secondary p-3">
                    <Pencil />
                  </p>
                </Link>
                <DeleteDialog id={subject.id} action={deleteSubject} />
                <button className="btn-primary mx-2 p-3">
                  <Plus />
                </button>
              </div>
            </CollapsibleTrigger>
            <CollapsibleContent>
              {subject.tasks.map((task) => (
                <Collapsible
                  key={task.id}
                  className="border-rounded border-2 py-2 my-2 bg-white mx-5"
                >
                  <CollapsibleTrigger className="flex justify-between w-full ">
                    <div className="flex flex-row items-center space-x-2 px-5">
                      <ChevronDown />
                      <Image
                        src={task.image}
                        alt={task.title}
                        width={50}
                        height={50}
                        className="border-rounded"
                      />
                      <div className="flex flex-col">
                        <h2 className="hero-title text-2xl m-0 flex justify-start">
                          {task.title}
                        </h2>
                        <p className="hero-text text-sm m-0">
                          {task.description}
                        </p>
                      </div>
                      <div className="flex px-4">
                        <p className="badge mr-3">{task.difficulty}</p>
                        <p className="badge">{task.ageGroup}</p>
                      </div>
                    </div>
                    <Collapsible className="m-4">
                      <CollapsibleTrigger className="flex w-full">
                        <EllipsisVertical />
                      </CollapsibleTrigger>
                      <CollapsibleContent>
                        <div className="px-5">
                          <Link href={`/admin/tasks/${task.id}`}>
                            <p className="btn-secondary p-3">
                              <Pencil />
                            </p>
                          </Link>
                          <DeleteDialog id={task.id} action={deleteTask} />
                          <button className="btn-primary mx-2 p-3">
                            <Plus />
                          </button>
                        </div>
                      </CollapsibleContent>
                    </Collapsible>
                  </CollapsibleTrigger>
                  <CollapsibleContent className="w-full">
                    {task.questions.map((question) => (
                      <div
                        key={question.id}
                        className="flex border-rounded border-2 mx-5 my-4 justify-around bg-purple-50"
                      >
                        <p className="hero-title text-xl m-0 flex items-center px-5">
                          {" "}
                          {question.text}
                        </p>
                        {question.options.map((option) => (
                          <div key={option} className="flex flex-row m-0">
                            <p
                              className={cn(
                                option === question.correctAnswer
                                  ? "badge my-2 text-mint"
                                  : "badge my-2",
                              )}
                            >
                              {option}
                            </p>
                          </div>
                        ))}
                        <div className="flex items-center ">
                          <Link href={`/admin/tasks/${question.id}`}>
                            <p className="btn-secondary p-3">
                              <Pencil />
                            </p>
                          </Link>
                          <DeleteDialog
                            id={question.id}
                            action={deleteQuestion}
                          />
                        </div>
                      </div>
                    ))}
                  </CollapsibleContent>
                </Collapsible>
              ))}
            </CollapsibleContent>
          </Collapsible>
        ))}
      </div>
    </div>
  );
};

export default AdminTasksPage;
