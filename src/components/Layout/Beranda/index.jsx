import Link from "next/link";
import Button from "../../Ui/button";
import Container from "../../Container";
import { Spotlight } from "../../Ui/spotlight";
import { TextGenerateEffect } from "../../Ui/text-generate-effect";

const Beranda = () => {
    const pembuka = `Hai semua, saya`;
    const nama = `Denus Gading Imanuel`;
    const kata = `Berfokus pada Front-end Development, Administration Staff, dan IT & Digital Operations. Terampil menggunakan React.js, Vue.js, Express.js, Tailwind CSS, Microsoft Office, dan Google Suite. Adaptif, teliti, komunikatif, serta mampu bekerja secara individu maupun tim. Terbuka untuk belajar, berdiskusi, dan berkolaborasi di bidang teknologi dan administrasi digital.`;

    return (
        <div className="h-full w-full flex items-center justify-center ">
            <div className="h-[85%] w-[90%] flex md:items-center md:justify-center bg-black/[0.96] antialiased relative overflow-hidden bg-gradient-to-br border-2 border-neutral-500 rounded-2xl p-5 md:w-[70%] md:h-[80%] md:p-0">
                <Spotlight
                    className="-top-40 left-0 md:left-60 md:-top-20"
                    fill="white"
                />

                <Container
                    size="md"
                    className="h-full w-full flex items-center justify-center md:h-64 p-3 md:p-0"
                >
                    <div className="flex flex-col md:flex-row md:h-full gap-7 md:gap-10">
                        <div className="text-center flex flex-col md:text-start md:justify-between md:items-start h-full">
                            <TextGenerateEffect
                                words={pembuka}
                                className="text-neutral-400 font-normal"
                            />
                            <TextGenerateEffect
                                words={nama}
                                className="text-4xl md:text-7xl bg-clip-text text-transparent bg-gradient-to-b from-neutral-200 to-neutral-600 font-sans font-bold mt-2 mb-2 md:mt-0 md:mb-0"
                            />
                            <TextGenerateEffect
                                words={kata}
                                className="text-neutral-400 font-normal"
                            />
                        </div>

                        <div className="flex items-center justify-center">
                            <div className="flex flex-row gap-12 md:flex-col">
                                <Link href="https://www.linkedin.com/in/dgadingi/?locale=en">
                                    <Button children="Rekrut Saya" className="py-5 px-4 md:py-10" />
                                </Link>
                                <Link href="../../../../assets/cv/cv.pdf">
                                    <Button children="Unduh CV" className="py-5 px-4 md:py-10" />
                                </Link>
                            </div>
                        </div>
                    </div>
                </Container>
            </div>
        </div>
    );
};

export default Beranda;
