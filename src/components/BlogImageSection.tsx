"use client"
import Image from "next/image";
import clsx from "clsx";
import { motion, Variants } from "framer-motion"

interface Props {
    imageSrc: string;
    imageAlt: string;
    imageAtRight?: boolean;
    children: React.ReactNode;
}

const containerVariants: Variants = {
    offscreen: {
        opacity: 0,
        y: 50
    },
    onscreen: {
        opacity: 1,
        y: 0,
        transition: {
            type: "spring",
            bounce: 0.2,
            duration: 0.8,
        }
    }
};

const BlogImageSection: React.FC<Props> = ({ imageSrc, imageAlt, imageAtRight = false, children }: Props) => {
    return (
        <motion.div
            className="flex flex-wrap flex-col items-center justify-center gap-8 lg:flex-row lg:gap-16 lg:flex-nowrap my-16"
            variants={containerVariants}
            initial="offscreen"
            whileInView="onscreen"
            viewport={{ once: true }}
        >
            <div
                className={clsx(
                    "flex flex-wrap items-center w-full max-w-2xl",
                    imageAtRight
                        ? "justify-start lg:-mr-24"
                        : "lg:order-1 justify-end lg:-ml-24"
                )}
            >
                <div className="w-full text-left prose prose-lg max-w-none">
                    {children}
                </div>
            </div>

            <div className={clsx("mt-5 lg:mt-0", { "lg:order-2": imageAtRight })}>
                <div className={clsx("w-fit flex", { "justify-start": imageAtRight, "justify-end": !imageAtRight })}>
                    <Image
                        src={imageSrc}
                        alt={imageAlt}
                        width={600}
                        height={400}
                        quality={90}
                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 600px"
                        loading="lazy"
                        className={clsx(
                            "rounded-lg shadow-lg bg-gray-200",
                            imageAtRight ? "lg:mask-fade-l" : "lg:mask-fade-r"
                        )}
                    />
                </div>
            </div>
        </motion.div>
    );
}

export default BlogImageSection;