import React, { useState } from "react";
import Container from "../../Container";
import { Spotlight } from "../../Ui/spotlight";
import Carousel from 'react-multi-carousel';
import 'react-multi-carousel/lib/styles.css';
import Modal from 'react-modal';
import { PinContainer } from "../../Ui/3d.pin";
import { TextGenerateEffect } from "../../Ui/text-generate-effect";
import Button from "../../Ui/button";
import Image from "next/image";
import ImageLightbox from "../../Ui/image-lightbox";
import { IconZoomIn } from "@tabler/icons-react";

const Tentang = () => {
    const [selectedProject, setSelectedProject] = useState(null);
    const [lightboxOpen, setLightboxOpen] = useState(false);
    const [lightboxIndex, setLightboxIndex] = useState(0);

    const openLightbox = (index) => {
        setLightboxIndex(index);
        setLightboxOpen(true);
    };

    const closeLightbox = () => {
        setLightboxOpen(false);
    };

    const responsive = {
        superLargeDesktop: {
            // the naming can be confusing, but essentially you need to change the value of the size of the carousel.
            // Example: 4k monitors
            breakpoint: { max: 4000, min: 3000 },
            items: 5
        },
        desktop: {
            breakpoint: { max: 3000, min: 1024 },
            items: 3
        },
        tablet: {
            breakpoint: { max: 1024, min: 464 },
            items: 2
        },
        mobile: {
            breakpoint: { max: 464, min: 0 },
            items: 1
        }
    };

    const projects = [
        {
            title: "Selaras POS APP",
            description: "Aplikasi kasir yang dirancang untuk memproses pesanan pelanggan dengan cepat dan efisien. Aplikasi ini dilengkapi dengan halaman admin yang memungkinkan pengaturan produk. Halaman admin ini memudahkan pengguna untuk mengelola daftar produk yang tersedia, sementara bagian kasir tetap fokus pada pemrosesan transaksi pelanggan.",
            thumbnail: "/assets/projek/kasir/2.png",
            images: [
                "/assets/projek/kasir/1.png",
                "/assets/projek/kasir/2.png",
                "/assets/projek/kasir/3.png",
                "/assets/projek/kasir/4.png",
                "/assets/projek/kasir/5.png",
                "/assets/projek/kasir/6.png",
                "/assets/projek/kasir/7.png",
            ],
            tech: [
                "/assets/skill/tailwindcss.svg",
                "/assets/skill/javascript.svg",
                "/assets/skill/vuedotjs.svg",
                "/assets/skill/mysql.svg",
                "/assets/skill/nodedotjs.svg",
                "/assets/skill/express.svg",
            ]
        },
        {
            title: "HRIS As-Syafii App",
            description: "Aplikasi presensi dan penggajian karyawan ini memiliki 4 akses: Admin dan Karyawan, Bendahara, Ketua Yayasan. Admin dapat mengelola data karyawan, presensi, rekap presensi, serta pengaturan aplikasi. Rekap presensi juga bisa dicetak dalam format PDF. Karyawan melakukan presensi dengan foto wajah dan pencatatan lokasi (longitude, latitude) untuk memastikan keaslian presensi. Aplikasi ini dirancang untuk mencegah kecurangan dengan verifikasi wajah dan lokasi. Proyek ini menawarkan fitur lengkap dan aman untuk manajemen presensi karyawan. untuk bendahara bisa mencetak rekap presensi dan rekap gaji karyawan. untuk ketua yayasan juga bisa mencetak rekap presensi dan rekap gaji karyawan. dan juga bisa mengelola data karyawan, presensi, rekap presensi, serta pengaturan aplikasi. untuk karyawan sendiri juga bisa mengajukan izin dan cuti. dan juga bisa mencetak rekap presensi. ketua yayasan juga bisa mengelola data karyawan, presensi, rekap presensi, serta pengaturan aplikasi. untuk karyawan sendiri juga bisa mengajukan izin dan cuti. dan juga bisa mencetak rekap presensi.",
            thumbnail: "/assets/projek/as-syafii/2.png",
            images: [
                "/assets/projek/as-syafii/1.png",
                "/assets/projek/as-syafii/2.png",
                "/assets/projek/as-syafii/3.png",
                "/assets/projek/as-syafii/4.png",
                "/assets/projek/as-syafii/5.png",
                "/assets/projek/as-syafii/6.png",
                "/assets/projek/as-syafii/7.png",
                "/assets/projek/as-syafii/8.png",
                "/assets/projek/as-syafii/9.png",
                "/assets/projek/as-syafii/10.png",
                "/assets/projek/as-syafii/11.png",
                "/assets/projek/as-syafii/12.png",
                "/assets/projek/as-syafii/13.png",
                "/assets/projek/as-syafii/14.png",
                "/assets/projek/as-syafii/15.png",
                "/assets/projek/as-syafii/16.png",
                "/assets/projek/as-syafii/17.png",
            ],
            tech: [

                "/assets/skill/tailwindcss.svg",
                "/assets/skill/javascript.svg",
                "/assets/skill/nodedotjs.svg",
                "/assets/skill/express.svg",
                "/assets/skill/react.svg",
                "/assets/skill/mysql.svg",
            ]
        },
        {
            title: "Luxy Phone Store",
            description: `Toko online untuk penjualan dan pembelian produk smartphone yang memiliki 3 akses: Admin, Pembeli, Penjual. Admin dapat mengelola data produk, data transaksi, data pengguna, serta pengaturan aplikasi. Pembeli dapat melakukan pembelian produk, serta dapat melihat riwayat pembelian. Penjual dapat melakukan penjualan produk, serta dapat melihat riwayat penjualan. Aplikasi ini dirancang untuk mencegah kecurangan dengan verifikasi wajah dan lokasi. Proyek ini menawarkan fitur lengkap dan aman untuk manajemen penjualan smartphone.`,
            thumbnail: "/assets/projek/luxy-phone/1.png",
            images: [
                "/assets/projek/luxy-phone/1.png",
                "/assets/projek/luxy-phone/2.png",
                "/assets/projek/luxy-phone/3.png",
                "/assets/projek/luxy-phone/4.png",
                "/assets/projek/luxy-phone/5.png",
                "/assets/projek/luxy-phone/6.png",
                "/assets/projek/luxy-phone/7.png",
                "/assets/projek/luxy-phone/8.png",
                "/assets/projek/luxy-phone/9.png",
                "/assets/projek/luxy-phone/10.png",
                "/assets/projek/luxy-phone/11.png",
                "/assets/projek/luxy-phone/12.png",
                "/assets/projek/luxy-phone/13.png",
                "/assets/projek/luxy-phone/14.png",
                "/assets/projek/luxy-phone/15.png",
                "/assets/projek/luxy-phone/16.png",
                "/assets/projek/luxy-phone/17.png",
                "/assets/projek/luxy-phone/18.png",
                "/assets/projek/luxy-phone/19.png",
                "/assets/projek/luxy-phone/20.png",
                "/assets/projek/luxy-phone/21.png",
                "/assets/projek/luxy-phone/22.png",

            ],
            tech: [
                "/assets/skill/tailwindcss.svg",
                "/assets/skill/javascript.svg",
                "/assets/skill/react.svg",
                "/assets/skill/nodedotjs.svg",
                "/assets/skill/express.svg",
                "/assets/skill/mysql.svg",
            ]
        },
        {
            title: "As-Sera Manajemen & Penilaian Anak",
            description: `Aplikasi manajemen dan penilaian anak yang dirancang untuk memudahkan wali santri dalam memantau perkembangan dan penilaian anak mereka. Aplikasi ini dilengkapi dengan halaman admin yang memungkinkan pengaturan data anak. Halaman admin ini memudahkan pengguna untuk mengelola daftar data anak, sementara bagian penilaian tetap fokus pada penilaian anak. Proyek ini menawarkan fitur lengkap dan aman untuk manajemen penjualan smartphone.`,
            thumbnail: "/assets/projek/assera/2.png",
            images: [
                "/assets/projek/assera/1.png",
                "/assets/projek/assera/2.png",
                "/assets/projek/assera/3.png",
                "/assets/projek/assera/4.png",
                "/assets/projek/assera/5.png",
                "/assets/projek/assera/6.png",
                "/assets/projek/assera/7.png",
                "/assets/projek/assera/8.png",
                "/assets/projek/assera/9.png",
                "/assets/projek/assera/10.png",
                "/assets/projek/assera/11.png",
                "/assets/projek/assera/12.png",
                "/assets/projek/assera/13.png",
                "/assets/projek/assera/14.png",
                "/assets/projek/assera/15.png",
                "/assets/projek/assera/16.png",
                "/assets/projek/assera/17.png",
                "/assets/projek/assera/18.png",
                "/assets/projek/assera/19.png",
                "/assets/projek/assera/20.png",

            ],
            tech: [
                "/assets/skill/tailwindcss.svg",
                "/assets/skill/javascript.svg",
                "/assets/skill/react.svg",
                "/assets/skill/nodedotjs.svg",
                "/assets/skill/express.svg",
                "/assets/skill/mysql.svg",
            ]
        },
    ];

    const openModal = (project) => {
        setSelectedProject(project);
    };

    const closeModal = () => {
        setSelectedProject(null);
        setLightboxOpen(false);
    };

    return (
        <div className="h-full w-full flex items-center justify-center">
            <div className="h-[85%] w-[90%] flex justify-center items-center md:items-center md:justify-center bg-black/[0.96] antialiased relative overflow-hidden bg-gradient-to-br border-2 border-gray-500 rounded-2xl p-5 md:p-5 md:w-[70%] md:h-[80%]">
                <Spotlight className="-top-40 left-0 md:left-60 md:-top-20" fill="white" />
                <Container size="lg" className="h-full w-full flex items-center justify-center md:h-full md:w-full">

                    <div className="w-full h-full flex flex-col items-center justify-start gap-5 md:gap-5">
                        <div className="w-full h-fit py-2 inline-flex animate-shimmer items-center justify-center rounded-xl border-b-2 border-slate-800 bg-[linear-gradient(110deg,#000103,45%,#1e2631,55%,#000103)] bg-[length:200%_100%] px-6 font-medium transition-colors shadow-md shadow-neutral-500">
                            <TextGenerateEffect words="Beberapa projek yang telah saya kerjakan" className="text-lg md:text-4xl text-center bg-clip-text text-transparent bg-gradient-to-b from-neutral-200 to-neutral-600 font-sans font-bold" />
                        </div>

                        <Carousel
                            responsive={responsive}
                            infinite={true}
                            autoPlay={true}
                            autoPlaySpeed={3000}
                            keyBoardControl={true}
                            swipeable={true}
                            draggable={true}
                            showDots={true}
                            className="w-full h-full"
                        >
                            {projects.map((project, index) => (
                                <PinContainer
                                    key={index}
                                    title={project.title}
                                    href={project.thumbnail}
                                    onClick={() => openModal(project)}
                                    containerClassName="w-full h-full rounded-lg shadow-lg flex items-center justify-center gap-5 p-5"
                                >
                                    <Image width={300} height={300} src={project.thumbnail} alt={project.title} className="w-full h-full object-cover" />

                                    <div className="w-fit h-fit flex flex-col items-start justify-center">
                                        <h3 className="text-neutral-200 font-semibold">{project.title}</h3>
                                        <p className="text-neutral-200 text-xs line-clamp-2">{project.description}</p>
                                        <div key={index} className="mt-2 pt-2 w-full h-fit border-t rounded-md border-neutral-400 flex justify-around items-center flex-row gap-1 flex-wrap">
                                            {
                                                project.tech.map((tech, index) => (
                                                    <Image key={index} width={27} height={27} src={tech} alt={project.title} className="p-1 bg-neutral-200 rounded-xl border-2 border-black border-dashed" />
                                                ))
                                            }
                                        </div>
                                    </div>
                                </PinContainer>
                            ))}
                        </Carousel>

                    </div>
                </Container>
            </div>

            <Modal
                isOpen={!!selectedProject}
                onRequestClose={closeModal}
                contentLabel="Detail Project"
                className="w-[90%] h-[90%] flex flex-col items-center justify-center bg-black p-4 rounded-lg shadow-lg"
                overlayClassName="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center"
            >
                {
                    selectedProject && (
                        <div className="text-center w-full h-full overflow-y-auto text-neutral-200 relative rounded-xl border-4 border-double border-neutral-400">
                            <div className="flex flex-col justify-center items-center w-full p-3 gap-2">
                                <h2 className="text-2xl font-bold ">{selectedProject.title}</h2>
                                <p className="text-sm md:text-base">{selectedProject.description}</p>
                                <div className="flex flex-col justify-center items-center w-full p-3 gap-2">
                                    <p className="text-lg font-bold">Tech Stack</p>
                                    <div className="flex flex-wrap justify-center gap-3">
                                        {selectedProject.tech.map((tech, index) => (
                                            <Image width={30} height={30} key={index} src={tech} alt={`Tech ${index}`} className="p-1 bg-neutral-200 rounded-xl border-2 border-black border-dashed" />
                                        ))}
                                    </div>
                                </div>
                            </div>

                            {/* Gallery Section */}
                            <div className="w-full p-3 sm:p-5 text-left">
                                <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-1 mb-4 pb-2 border-b border-neutral-800">
                                    <div className="flex items-center gap-2">
                                        <h3 className="text-base sm:text-lg font-bold text-neutral-200">
                                            Galeri Screenshot Projek
                                        </h3>
                                        <span className="text-xs px-2.5 py-0.5 rounded-full bg-cyan-500/10 text-cyan-400 border border-cyan-500/30 font-medium">
                                            {selectedProject.images.length} Gambar
                                        </span>
                                    </div>
                                    <span className="text-xs text-neutral-400 flex items-center gap-1">
                                        💡 Klik gambar untuk membuka pratinjau & navigasi
                                    </span>
                                </div>

                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                    {selectedProject.images.map((image, index) => (
                                        <div
                                            key={index}
                                            onClick={() => openLightbox(index)}
                                            className="group relative aspect-video w-full rounded-xl overflow-hidden bg-neutral-900 border border-neutral-700/60 hover:border-cyan-400/80 shadow-lg hover:shadow-[0_0_25px_rgba(6,182,212,0.2)] transition-all duration-300 cursor-pointer"
                                        >
                                            <Image
                                                fill
                                                sizes="(max-width: 640px) 100vw, 50vw"
                                                src={image}
                                                alt={`${selectedProject.title} screenshot ${index + 1}`}
                                                className="object-cover group-hover:scale-105 transition-transform duration-500"
                                            />
                                            {/* Hover Overlay */}
                                            <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-between p-3.5">
                                                <div className="flex justify-end">
                                                    <span className="p-2 rounded-lg bg-black/70 backdrop-blur-md text-cyan-400 border border-white/10 shadow-lg group-hover:scale-110 transition-transform">
                                                        <IconZoomIn size={18} />
                                                    </span>
                                                </div>
                                                <div className="flex items-center justify-between text-xs text-neutral-200">
                                                    <span className="font-medium bg-black/70 backdrop-blur-md px-2.5 py-1 rounded-md border border-white/10">
                                                        Gambar #{index + 1}
                                                    </span>
                                                    <span className="text-cyan-300 font-medium flex items-center gap-1 group-hover:translate-x-1 transition-transform">
                                                        Buka Gambar &rarr;
                                                    </span>
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            <div onClick={closeModal} className="absolute top-0 right-0 p-3 cursor-pointer z-10">
                                <Button children="X" className="py-4 px-4 md:py-4" />
                            </div>
                        </div>
                    )
                }
            </Modal>

            {/* Fullscreen Lightbox Image Gallery */}
            <ImageLightbox
                isOpen={lightboxOpen}
                images={selectedProject?.images || []}
                initialIndex={lightboxIndex}
                title={selectedProject?.title}
                onClose={closeLightbox}
            />

        </div>
    )
}

export default Tentang
