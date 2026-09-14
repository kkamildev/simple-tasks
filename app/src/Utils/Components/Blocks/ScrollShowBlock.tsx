import { useEffect, useRef, useState, type FC, type ReactNode } from "react";

type Props = {
    style?: string;
    children: ReactNode;
};

const ScrollShowBlock: FC<Props> = ({ children, style = "" }) => {
    const ref = useRef<HTMLDivElement>(null);
    const [visible, setVisible] = useState(false);

    useEffect(() => {
        const observer = new IntersectionObserver(([entry]) => {
            if (entry.isIntersecting) {
                setVisible(true);
                observer.disconnect(); // animacja tylko raz
            }
        }, {
            threshold: 0.2 // 20% elementu musi być widoczne
        });

        if (ref.current) observer.observe(ref.current);

        return () => observer.disconnect();
    }, []);

    return (
        <section
            ref={ref}
            className={`${style} ${visible ? "animate-slide-up" : "opacity-0"}`}
        >
            {children}
        </section>
    );
};

export default ScrollShowBlock;
