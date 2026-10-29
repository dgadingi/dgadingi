"use client";

import React, { useState, useEffect, useCallback, useRef } from "react";
import { createPortal } from "react-dom";
import { motion, AnimatePresence } from "framer-motion";
import {
    IconChevronLeft,
    IconChevronRight,
    IconX,
    IconZoomIn,
    IconZoomOut,
    IconArrowsMaximize,
    IconArrowsMinimize,
    IconPhoto
} from "@tabler/icons-react";

/**
 * ImageLightbox Component
 * Modern, professional, responsive image gallery modal with:
 * - Next / Previous navigation (looping)
 * - Keyboard navigation (ArrowLeft, ArrowRight, Escape)
 * - Mobile touch swipe gestures
 * - Zoom in / out toggle for inspecting details
 * - Fullscreen mode support
 * - Interactive scrollable thumbnail preview strip
 * - Smooth framer-motion slide/fade transitions
 * - Rendered via React Portal directly into document.body to avoid stacking context issues
 */
const ImageLightbox = ({
    isOpen = false,
    images = [],
    initialIndex = 0,
    title = "",
    onClose
}) => {
    const [mounted, setMounted] = useState(false);
    const [currentIndex, setCurrentIndex] = useState(initialIndex);
    const [direction, setDirection] = useState(0);
    const [isZoomed, setIsZoomed] = useState(false);
    const [isFullscreen, setIsFullscreen] = useState(false);

    // Refs for touch swipe and thumbnail scroll
    const touchStartX = useRef(null);
    const touchStartY = useRef(null);
    const thumbnailRefs = useRef({});
    const lightboxRef = useRef(null);

    // Ensure portal only mounts on client
    useEffect(() => {
        setMounted(true);
        return () => setMounted(false);
    }, []);

    // Sync initialIndex when lightbox opens or initialIndex changes
    useEffect(() => {
        if (isOpen) {
            setCurrentIndex(initialIndex);
            setIsZoomed(false);
        }
    }, [isOpen, initialIndex]);

    // Prevent body scroll when lightbox is open
    useEffect(() => {
        if (!isOpen) return;

        const originalStyle = window.getComputedStyle(document.body).overflow;
        document.body.style.overflow = "hidden";

        return () => {
            document.body.style.overflow = originalStyle;
        };
    }, [isOpen]);

    // Scroll active thumbnail into view
    useEffect(() => {
        if (isOpen && thumbnailRefs.current[currentIndex]) {
            thumbnailRefs.current[currentIndex].scrollIntoView({
                behavior: "smooth",
                block: "nearest",
                inline: "center"
            });
        }
    }, [currentIndex, isOpen]);

    // Track fullscreen changes
    useEffect(() => {
        const handleFullscreenChange = () => {
            setIsFullscreen(!!document.fullscreenElement);
        };
        document.addEventListener("fullscreenchange", handleFullscreenChange);
        return () => {
            document.removeEventListener("fullscreenchange", handleFullscreenChange);
        };
    }, []);

    const totalImages = images?.length || 0;

    const nextImage = useCallback(() => {
        if (totalImages <= 1) return;
        setIsZoomed(false);
        setDirection(1);
        setCurrentIndex((prev) => (prev + 1) % totalImages);
    }, [totalImages]);

    const prevImage = useCallback(() => {
        if (totalImages <= 1) return;
        setIsZoomed(false);
        setDirection(-1);
        setCurrentIndex((prev) => (prev - 1 + totalImages) % totalImages);
    }, [totalImages]);

    const handleClose = useCallback(() => {
        setIsZoomed(false);
        if (document.fullscreenElement) {
            document.exitFullscreen().catch(() => {});
        }
        onClose?.();
    }, [onClose]);

    const toggleZoom = useCallback(() => {
        setIsZoomed((prev) => !prev);
    }, []);

    const toggleFullscreen = useCallback(() => {
        if (!document.fullscreenElement) {
            lightboxRef.current?.requestFullscreen?.().catch(() => {});
        } else {
            document.exitFullscreen?.().catch(() => {});
        }
    }, []);

    // Keyboard navigation
    useEffect(() => {
        if (!isOpen) return;

        const handleKeyDown = (e) => {
            if (e.key === "Escape") {
                e.preventDefault();
                handleClose();
            } else if (e.key === "ArrowRight") {
                e.preventDefault();
                nextImage();
            } else if (e.key === "ArrowLeft") {
                e.preventDefault();
                prevImage();
            } else if (e.key === "f" || e.key === "F") {
                e.preventDefault();
                toggleFullscreen();
            }
        };

        window.addEventListener("keydown", handleKeyDown);
        return () => window.removeEventListener("keydown", handleKeyDown);
    }, [isOpen, handleClose, nextImage, prevImage, toggleFullscreen]);

    // Touch swipe handlers
    const handleTouchStart = (e) => {
        touchStartX.current = e.touches[0].clientX;
        touchStartY.current = e.touches[0].clientY;
    };

    const handleTouchEnd = (e) => {
        if (touchStartX.current === null || touchStartY.current === null) return;

        const deltaX = e.changedTouches[0].clientX - touchStartX.current;
        const deltaY = e.changedTouches[0].clientY - touchStartY.current;

        // Ensure horizontal swipe is more significant than vertical
        if (Math.abs(deltaX) > Math.abs(deltaY) && Math.abs(deltaX) > 40) {
            if (deltaX < 0) {
                nextImage();
            } else {
                prevImage();
            }
        }

        touchStartX.current = null;
        touchStartY.current = null;
    };

    if (!mounted || !isOpen || totalImages === 0) return null;

    const currentImage = images[currentIndex];

    // Animation variants for smooth sliding
    const slideVariants = {
        enter: (dir) => ({
            x: dir > 0 ? 80 : dir < 0 ? -80 : 0,
            opacity: 0,
            scale: 0.96
        }),
        center: {
            x: 0,
            opacity: 1,
            scale: 1,
            transition: {
                x: { type: "spring", stiffness: 350, damping: 30 },
                opacity: { duration: 0.2 },
                scale: { duration: 0.2 }
            }
        },
        exit: (dir) => ({
            x: dir > 0 ? -80 : dir < 0 ? 80 : 0,
            opacity: 0,
            scale: 0.96,
            transition: {
                x: { type: "spring", stiffness: 350, damping: 30 },
                opacity: { duration: 0.15 }
            }
        })
    };

    return createPortal(
        <AnimatePresence>
            <motion.div
                ref={lightboxRef}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.25 }}
                className="fixed inset-0 z-[999999] flex flex-col justify-between bg-black/95 backdrop-blur-xl text-neutral-100 select-none overflow-hidden"
                onClick={(e) => {
                    // Click outside backdrop to close
                    if (e.target === e.currentTarget) {
                        handleClose();
                    }
                }}
            >
                {/* Subtle ambient light gradient at the top */}
                <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-32 bg-cyan-500/10 blur-[100px] pointer-events-none" />

                {/* --- TOP HEADER BAR --- */}
                <header className="relative z-20 flex items-center justify-between px-4 py-3 md:px-6 md:py-4 border-b border-white/10 bg-black/40 backdrop-blur-md">
                    {/* Title & Index badge */}
                    <div className="flex items-center gap-2 md:gap-3 truncate pr-2">
                        <div className="hidden sm:flex items-center justify-center w-8 h-8 rounded-lg bg-neutral-800/80 border border-neutral-700/60 text-cyan-400">
                            <IconPhoto size={18} />
                        </div>
                        <div className="flex flex-col truncate">
                            <span className="text-sm md:text-base font-semibold text-neutral-200 truncate">
                                {title || "Pratinjau Gambar"}
                            </span>
                            <span className="text-xs text-neutral-400">
                                Gambar {currentIndex + 1} dari {totalImages}
                            </span>
                        </div>
                    </div>

                    {/* Action controls */}
                    <div className="flex items-center gap-1.5 md:gap-2">
                        {/* Zoom toggle button */}
                        <button
                            type="button"
                            onClick={toggleZoom}
                            className={`p-2 md:p-2.5 rounded-xl border transition-all duration-200 ${
                                isZoomed
                                    ? "bg-cyan-500/20 text-cyan-300 border-cyan-500/40 shadow-[0_0_12px_rgba(6,182,212,0.3)]"
                                    : "bg-neutral-800/70 hover:bg-neutral-700/80 text-neutral-300 border-white/10"
                            }`}
                            title={isZoomed ? "Perkecil (Reset Zoom)" : "Perbesar Gambar"}
                            aria-label={isZoomed ? "Perkecil" : "Perbesar"}
                        >
                            {isZoomed ? <IconZoomOut size={18} /> : <IconZoomIn size={18} />}
                        </button>

                        {/* Fullscreen toggle button */}
                        <button
                            type="button"
                            onClick={toggleFullscreen}
                            className="hidden sm:inline-flex p-2 md:p-2.5 rounded-xl bg-neutral-800/70 hover:bg-neutral-700/80 text-neutral-300 border border-white/10 transition-all duration-200"
                            title={isFullscreen ? "Keluar Fullscreen" : "Layar Penuh (F)"}
                            aria-label="Toggle Fullscreen"
                        >
                            {isFullscreen ? <IconArrowsMinimize size={18} /> : <IconArrowsMaximize size={18} />}
                        </button>

                        {/* Close button */}
                        <button
                            type="button"
                            onClick={handleClose}
                            className="p-2 md:p-2.5 rounded-xl bg-red-500/10 hover:bg-red-500/20 text-red-400 border border-red-500/20 hover:border-red-500/40 transition-all duration-200"
                            title="Tutup (Esc)"
                            aria-label="Tutup"
                        >
                            <IconX size={18} />
                        </button>
                    </div>
                </header>

                {/* --- MAIN DISPLAY AREA --- */}
                <main
                    className="relative flex-1 flex items-center justify-center px-2 py-2 sm:px-6 md:px-12 overflow-hidden"
                    onTouchStart={handleTouchStart}
                    onTouchEnd={handleTouchEnd}
                    onClick={(e) => {
                        if (e.target === e.currentTarget) {
                            handleClose();
                        }
                    }}
                >
                    {/* Previous Button (Left) */}
                    {totalImages > 1 && (
                        <button
                            type="button"
                            onClick={(e) => {
                                e.stopPropagation();
                                prevImage();
                            }}
                            className="absolute left-2 md:left-6 z-30 p-2.5 md:p-3.5 rounded-full bg-neutral-900/80 hover:bg-neutral-800 text-neutral-200 hover:text-white border border-white/15 backdrop-blur-md shadow-2xl hover:scale-110 active:scale-90 transition-all duration-200 focus:outline-none"
                            aria-label="Gambar Sebelumnya (ArrowLeft)"
                            title="Sebelumnya (ArrowLeft)"
                        >
                            <IconChevronLeft size={22} className="md:w-6 md:h-6" />
                        </button>
                    )}

                    {/* Image Stage with Animated Transitions */}
                    <div className="relative w-full h-full flex items-center justify-center p-1 sm:p-4">
                        <AnimatePresence custom={direction} mode="wait">
                            <motion.div
                                key={currentIndex}
                                custom={direction}
                                variants={slideVariants}
                                initial="enter"
                                animate="center"
                                exit="exit"
                                className={`relative flex items-center justify-center max-w-full max-h-full transition-transform duration-300 ${
                                    isZoomed ? "cursor-zoom-out scale-125 md:scale-150 z-20" : "cursor-zoom-in"
                                }`}
                                onClick={toggleZoom}
                            >
                                <img
                                    src={currentImage}
                                    alt={`${title} - Preview ${currentIndex + 1}`}
                                    draggable={false}
                                    className="max-h-[64vh] sm:max-h-[68vh] md:max-h-[72vh] max-w-[95vw] md:max-w-[85vw] object-contain rounded-xl border border-white/15 shadow-[0_15px_40px_rgba(0,0,0,0.8)]"
                                />

                                {/* Subtle zoom status badge */}
                                {isZoomed && (
                                    <div className="absolute top-3 right-3 px-2.5 py-1 rounded-md bg-black/80 backdrop-blur-md text-[11px] text-cyan-300 border border-cyan-500/30 font-mono shadow-lg pointer-events-none">
                                        Zoom Aktif • Klik untuk reset
                                    </div>
                                )}
                            </motion.div>
                        </AnimatePresence>
                    </div>

                    {/* Next Button (Right) */}
                    {totalImages > 1 && (
                        <button
                            type="button"
                            onClick={(e) => {
                                e.stopPropagation();
                                nextImage();
                            }}
                            className="absolute right-2 md:right-6 z-30 p-2.5 md:p-3.5 rounded-full bg-neutral-900/80 hover:bg-neutral-800 text-neutral-200 hover:text-white border border-white/15 backdrop-blur-md shadow-2xl hover:scale-110 active:scale-90 transition-all duration-200 focus:outline-none"
                            aria-label="Gambar Berikutnya (ArrowRight)"
                            title="Berikutnya (ArrowRight)"
                        >
                            <IconChevronRight size={22} className="md:w-6 md:h-6" />
                        </button>
                    )}
                </main>

                {/* --- BOTTOM FOOTER / THUMBNAILS STRIP --- */}
                <footer className="relative z-20 flex flex-col items-center gap-2 px-3 py-3 md:px-6 md:py-3.5 border-t border-white/10 bg-black/60 backdrop-blur-md">
                    {/* Thumbnail Bar */}
                    {totalImages > 1 && (
                        <div className="flex items-center gap-2 overflow-x-auto max-w-full py-1 px-2 no-visible-scrollbar scroll-smooth">
                            {images.map((img, idx) => {
                                const isActive = idx === currentIndex;
                                return (
                                    <button
                                        key={idx}
                                        ref={(el) => (thumbnailRefs.current[idx] = el)}
                                        type="button"
                                        onClick={(e) => {
                                            e.stopPropagation();
                                            setIsZoomed(false);
                                            setDirection(idx > currentIndex ? 1 : -1);
                                            setCurrentIndex(idx);
                                        }}
                                        className={`relative flex-shrink-0 w-14 h-10 sm:w-16 sm:h-12 md:w-20 md:h-14 rounded-lg overflow-hidden border transition-all duration-200 focus:outline-none ${
                                            isActive
                                                ? "border-cyan-400 ring-2 ring-cyan-400/50 scale-105 opacity-100 shadow-[0_0_12px_rgba(6,182,212,0.4)]"
                                                : "border-white/20 opacity-50 hover:opacity-90 hover:border-white/50"
                                        }`}
                                        aria-label={`Pilih gambar ${idx + 1}`}
                                    >
                                        <img
                                            src={img}
                                            alt={`Thumbnail ${idx + 1}`}
                                            className="w-full h-full object-cover"
                                            draggable={false}
                                        />
                                        {isActive && (
                                            <div className="absolute inset-0 bg-cyan-500/10 pointer-events-none" />
                                        )}
                                    </button>
                                );
                            })}
                        </div>
                    )}

                    {/* Hints & Instructions */}
                    <div className="flex items-center justify-between w-full text-[11px] text-neutral-400 px-2">
                        <span className="hidden sm:inline">
                            💡 Gunakan tombol <kbd className="px-1.5 py-0.5 rounded bg-neutral-800 border border-neutral-700 text-neutral-300 font-mono">◄</kbd> <kbd className="px-1.5 py-0.5 rounded bg-neutral-800 border border-neutral-700 text-neutral-300 font-mono">►</kbd> atau swipe untuk navigasi • <kbd className="px-1.5 py-0.5 rounded bg-neutral-800 border border-neutral-700 text-neutral-300 font-mono">ESC</kbd> untuk keluar
                        </span>
                        <span className="sm:hidden text-neutral-400">
                            👆 Geser (swipe) atau gunakan panah untuk ganti gambar
                        </span>
                        <span className="font-mono text-cyan-400/90 font-medium">
                            {currentIndex + 1} / {totalImages}
                        </span>
                    </div>
                </footer>
            </motion.div>
        </AnimatePresence>,
        document.body
    );
};

export default ImageLightbox;
