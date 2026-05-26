import { Star } from "lucide-react";
import { prisma } from "@/lib/prisma";
import Link from "next/link";
import Image from "next/image";


const ChoosingSubjects = async () => {
    const subjects = await prisma.subject.findMany({
            select: {
                image: true,
                name: true,
                id: true,
                slug: true,
            }   
        })

    return (
        <section className="p-3 flex align-super">
            <div className="info-panel w-xs">
                <p className="logo">Choose subject</p>
                <Link href='/subjects' className="flex flex-row w-full btn-primary">
                    <Star/> All subjects
                </Link>
                {subjects.map((subject) => (
                    <div key={subject.id} className="w-full">
                        <Link href={`${subject.slug}`} className="flex flex-row pastel-blue btn-secondary justify-start ">
                            <Image src={`${subject.image}`} alt={subject.name} width={35} height={35} className="subject-icon" />
                            {subject.name}
                        </Link>
                    </div>
                ))}
                
            </div>
        </section>
    )
}

export default ChoosingSubjects;