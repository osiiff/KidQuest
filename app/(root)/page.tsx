import HomePageHero from "@/components/shared/homepage-components/home-page-hero";
import HomePageInfoCards from "@/components/shared/homepage-components/home-page-info-cards";
import SubjectList from "@/components/shared/subjects/subject-list";
import { getLatestSubjects } from "@/lib/actions/subject.action";

const HomePage = async () => {

  const subjects = await getLatestSubjects()

  return (
    <>
    <HomePageHero/>
    <div className="min-[721px]:max-[1025px]:[&_.subjects-section]:px-6 min-[721px]:max-[1025px]:[&_.subjects-section]:py-8 min-[721px]:max-[1025px]:[&_.subjects-grid]:grid-cols-2 min-[721px]:max-[1025px]:[&_.subjects-grid]:gap-4 min-[721px]:max-[1025px]:[&_.subject-card]:min-w-0 min-[721px]:max-[1025px]:[&_.subject-card]:grid-cols-[64px_minmax(0,1fr)] min-[721px]:max-[1025px]:[&_.subject-card]:gap-3 min-[721px]:max-[1025px]:[&_.subject-card]:p-4 min-[721px]:max-[1025px]:[&_.subject-title]:w-full min-[721px]:max-[1025px]:[&_.subject-title]:wrap-break-word min-[721px]:max-[1025px]:[&_.subject-title]:text-xl min-[721px]:max-[1025px]:[&_.subject-text]:text-sm">
      <SubjectList data={subjects}/>
    </div>
    <HomePageInfoCards/>
    </>
  )
}

export default HomePage;