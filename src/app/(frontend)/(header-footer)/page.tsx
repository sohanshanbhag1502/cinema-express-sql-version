import Carousel, {Releases} from "@/components/CarouselReleases"
import Display from "@/components/Display"

export default function Home() {
    return (
        <div className="w-full flex flex-col content-center justify-center 
        items-center my-4 py-4">
            <Carousel />
            <Releases />
            <Display />
        </div>
    )
}
