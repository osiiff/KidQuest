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
        <section className="flex w-full min-w-0 p-3">
            <div className="info-panel w-full min-w-0 gap-3">
                <p className="logo">Choose subject</p>
                <Link href='/subjects' className="btn-primary flex min-h-12 w-full min-w-0 items-center gap-3 px-2 py-3 text-base leading-snug whitespace-normal sm:px-3">
                    <Star className="shrink-0"/> All subjects
                </Link>
                {subjects.map((subject) => (
                    <div key={subject.id} className="w-full min-w-0">
                        <Link href={`/subjects/${subject.slug}`} className="btn-secondary pastel-blue flex w-full min-w-0 items-center justify-start gap-3 px-2 py-2 text-left text-base sm:px-3">
                            <span className="block size-16 flex-none overflow-hidden rounded-xl">
                                <Image src={subject.image} alt={subject.name} width={64} height={64} sizes="64px" className="block size-full rounded-xl object-contain" />
                            </span>
                            <span className="min-w-0 flex-1 leading-snug whitespace-normal wrap-anywhere">{subject.name}</span>
                        </Link>
                    </div>
                ))}
                
            </div>
        </section>
    )
}

export default ChoosingSubjects;
