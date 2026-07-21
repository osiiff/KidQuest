import HomePageHero from "@/components/shared/homepage-components/home-page-hero";
import HomePageInfoCards from "@/components/shared/homepage-components/home-page-info-cards";
import SubjectList from "@/components/shared/subjects/subject-list";
import { getLatestSubjects } from "@/lib/actions/subject.action";

const HomePage = async () => {

  const subjects = await getLatestSubjects()

  return (
    <>
    <HomePageHero/>
    <SubjectList data={subjects}/>
    <HomePageInfoCards/>
    </>
  )
}

export default HomePage;