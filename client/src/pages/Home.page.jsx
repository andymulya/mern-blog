import { AnimationWrapper } from "../components/Animations.component"
import InPageNavigate from "../components/InPageNavigate.component"

export default function Home() {
    
    return (
        <AnimationWrapper transition={{ duration: 0.5 }}>
            <section className="h-cover flex justify-center gap-10 py-4 px-[5vw] md:px-[7vw] lg:px-[10vw]">
                <div className="w-full">
                    <InPageNavigate routes={["home", "trending blogs"]} defaultHiddenRoutes={["trending blogs"]} >
                        <div>Latets Blog</div>
                        <div>Trending Blog</div>
                    </InPageNavigate>
                </div>
            </section>
        </AnimationWrapper>
    )
}