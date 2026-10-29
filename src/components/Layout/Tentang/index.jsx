import Carousel from 'react-multi-carousel';
import 'react-multi-carousel/lib/styles.css';
import Container from "../../Container";
import { Spotlight } from "../../Ui/spotlight";

const Tentang = () => {
    const skills = [
        { text: 'Bootstrap' },
        { text: 'Tailwind' },
        { text: 'Vue.js' },
        { text: 'Communication Skills' },
        { text: 'Teamwork Skills' },
        { text: 'Problem Solving Skills' },
        { text: 'Adaptability' },
        { text: 'Pinia' },
        { text: 'React.js' },
        { text: 'Zustand' },
        { text: 'Digital Operation Skills' },
        { text: 'Vite' },
        { text: 'Express.js' },
        { text: 'MySql' },
        { text: 'Git' },
        { text: 'Figma' },
        { text: 'Microsoft Office' },
        { text: 'Google Suite' },
        { text: 'Administration Skills' },
        { text: 'Digital Operation Skills' },
        { text: 'Video Editing' },
        { text: 'Content Creation' },
        { text: 'Time Management' },
        { text: 'Detail Oriented' },
        { text: 'Fast Learner' },
        { text: 'Result Oriented' },
    ];

    return (
        <div className="h-full w-full flex items-center justify-center">
            <div className="h-[85%] w-[90%] flex justify-center items-center md:items-center md:justify-center bg-black/[0.96] antialiased bg-grid-white/[0.02] relative overflow-hidden bg-gradient-to-br border-2 border-gray-500 rounded-2xl p-5 md:p-0 md:w-[70%] md:h-[80%]">
                <Spotlight className="-top-40 left-0 md:left-60 md:-top-20" fill="white" />
                <Container size="md" className="h-full w-full flex items-center justify-center md:h-[80%]">

                    <div className="w-full h-full flex flex-col items-center justify-evenly text-neutral-400 md:p-0 gap-3">
                        <div className='flex flex-col gap-3 h-[80%] text-justify md:h-full'>
                            <p className="text-sm md:text-lg">Halo! Saya berfokus pada bidang Front-end Development, Administration Staff, dan IT & Digital Operations. Terbiasa menggunakan React.js, Vue.js, Express.js dan Tailwind CSS untuk membuat website yang responsif, modern, dan user-friendly serta Microsoft Office dan Google Suite untuk menunjang pekerjaan.</p>
                            <p className="text-sm md:text-lg">Selalu antusias untuk berkembang, mempelajari hal baru, bekerja secara detail, serta mampu bekerja secara individu maupun tim. Terbuka untuk sharing, diskusi peluang dan kolaborasi di bidang teknologi maupun administrasi digital.</p>
                            <p className="text-sm md:text-lg">Let’s build something awesome together!</p>
                        </div>

                        <div className="w-full h-12 relative inline-flex overflow-hidden rounded-full p-[1px] md:w-96 md:h-fit">
                            {/* Efek border gradient */}
                            <span className="absolute inset-[-1000%] animate-[spin_2s_linear_infinite] bg-[conic-gradient(from_90deg_at_50%_50%,#E2CBFF_0%,#393BB2_50%,#E2CBFF_100%)]" />

                            {/* Carousel Container */}
                            <div className="relative flex items-center justify-center w-full h-full rounded-full bg-black">
                                <Carousel
                                    additionalTransfrom={0}
                                    autoPlay
                                    autoPlaySpeed={1000}
                                    className="w-full h-full"
                                    containerClass="container-with-dots"
                                    draggable
                                    infinite
                                    responsive={{
                                        desktop: { breakpoint: { max: 3000, min: 1024 }, items: 3 },
                                        tablet: { breakpoint: { max: 1024, min: 464 }, items: 2 },
                                        mobile: { breakpoint: { max: 464, min: 0 }, items: 1 },
                                    }}
                                    slidesToSlide={1}
                                    swipeable
                                    arrows={false} // Pastikan ini diatur ke false
                                >
                                    {skills.map((skill, index) => (
                                        <div
                                            key={index}
                                            className="cursor-pointer p-3 text-neutral-400 rounded-full shadow-2xl text-center"
                                        >
                                            <p className="text-xs md:text-sm">{skill.text}</p>
                                        </div>
                                    ))}
                                </Carousel>
                            </div>
                        </div>
                    </div>

                </Container>
            </div>
        </div>
    )
}

export default Tentang