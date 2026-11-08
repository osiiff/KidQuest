import Link from "next/link";
import SubjectsSlidebar from "@/components/shared/subjects/subjects-sidebar";
import TasksList from "@/components/shared/subjects/tasks-list";
import { getLatestSubjects } from "@/lib/actions/subject.action";



const SubjectsPage = async (props: {
  searchParams: Promise<{
    difficulty: string,
    ageGroup: string
  }>
}) => {

  const {difficulty = 'all', ageGroup = 'all'} = await props.searchParams;

  const latestSubjects = await getLatestSubjects({
    difficulty,
    ageGroup
  });
    return (
        <div className="">
                <SubjectsSlidebar/>
                <p className="hero-title">Choose fun activities for kids</p>
                <div className="flex flex-col gap-10">
                  {latestSubjects.map((subject) => (
                    <section key={subject.id}>
                      <Link href={`subjects/${subject.slug}`} >
                        <h2 className="hero-title text-4xl">{subject.name}</h2>
                      </Link>
                      <TasksList data={subject.tasks} limit={6}/>
                    </section>
                  ))}
                </div>
        </div>
    )
}

export default SubjectsPage;