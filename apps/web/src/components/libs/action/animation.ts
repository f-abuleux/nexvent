export const animationVariants = (key: number) => ({
    initial: { opacity: 0, x: -10 },
    animate: { opacity: 1, x: 0 },
    exit: { opacity: 0, x: -10 },
    transition: {
        duration: 0.2,
        ease: "easeInOut",
        delay: key * 0.1
    }
});