import Image from "next/image";


const LoadingPage = () => {
    return (
        <div className="wrapper min-h-screen flex-center">
            <Image src='/loader.gif' width={50} height={50} alt="Loading..."/>
        </div>
    )
}

export default LoadingPage;