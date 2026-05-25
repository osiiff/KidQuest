import SubjectsSlidebar from "@/components/shared/subjects/subjects-sidebar";
import TasksList from "@/components/shared/subjects/tasks-list";
import { getLatestSubjects } from "@/lib/actions/subject.action";



const SubjectsPage = async () => {
  const latestSubjects = await getLatestSubjects();
    return (
        <div className="">
            <p className="hero-title">Choose fun activities for kids</p>
                <SubjectsSlidebar/>
                <TasksList data={latestSubjects}/>
        </div>
    )
}

export default SubjectsPage;