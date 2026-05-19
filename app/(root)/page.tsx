import HomePageHero from "@/components/shared/homepage-components/home-page-hero";
import HomePageInfoCards from "@/components/shared/homepage-components/home-page-info-cards";
import SubjectList from "@/components/shared/subjects/subject-list";
import subjectsData from "@/db/subjects-data";

const HomePage = () => {
  return (
    <>
    <HomePageHero/>
    <SubjectList data={subjectsData.subjects}/>
    <HomePageInfoCards/>
    </>
  )
}

export default HomePage;