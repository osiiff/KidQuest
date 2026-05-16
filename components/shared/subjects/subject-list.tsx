import SubjectsCard from "./subjects-card";

type Subject = {
    name: string;
    description: string;
    slug: string;
    image: string;
}

type SubjectListProps = {
    data: Subject[];
}


const SubjectList = ({data}: SubjectListProps) => {
    return (
        <section className="subjects-section">
        {data.length > 0 ? (
        <div className="subjects-grid">
          {data.map((subject) => (
            <SubjectsCard key={subject.slug} subject={subject} />
          ))}
            </div>
            ) : (
                <p>No Subjects Found</p>
            )}
        </section>
    )
}

export default SubjectList;