import { Card, CardContent } from "@/components/ui/card";
import Link from "next/link";
import Image from "next/image";

type Subject = {
    name: string;
    description: string;
    slug: string;
    image: string;
}

type SubjectsCardProps = {
  subject: Subject;
};


const SubjectsCard = ({subject}: SubjectsCardProps) => {
    return (
         <Card className="subject-card">
            <Link href={`/subject/${subject.slug}`} className="subject-icon">
                <Image
                src={subject.image}
                width={100}
                height={100}
                alt={subject.name}
                />
            </Link>

            <CardContent className="p-0">
                <Link href={`/subject/${subject.slug}`}>
                    <h3 className="subject-title">{subject.name}</h3>
                </Link>

                <p className="subject-text">{subject.description}</p>
            </CardContent>
        </Card>
    )
}

export default SubjectsCard;