
import SubjectsSlidebar from "@/components/shared/subjects/subjects-sidebar";
import TasksList from "@/components/shared/subjects/tasks-list";
import { getLatestSubjects } from "@/lib/actions/subject.action";



const SubjectsPage = async () => {
  const latestSubjects = await getLatestSubjects();
    return (
        <div className="">
                <SubjectsSlidebar/>
                <p className="hero-title">Choose fun activities for kids</p>
                <div className="flex flex-col gap-10">
                  {latestSubjects.map((subject) => (
                    <section key={subject.id}>
                      <h2 className="hero-title text-4xl">{subject.name}</h2>
                      <TasksList data={subject.tasks}/>
                    </section>
                  ))}
                </div>
        </div>
    )
}

export default SubjectsPage;