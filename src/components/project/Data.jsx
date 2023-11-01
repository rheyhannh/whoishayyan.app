import Link from 'next/link';
import Image from 'next/image';

import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination } from 'swiper/modules';

import styles from '@/app/_root.module.css';

import Button from '@/components/Button';

export default function ProjectData({ data, unicons }) {
    const getIcons = (iconName, className) => {
        const Icon = unicons[iconName];
        if (!Icon) {
            return null;
        }
        return (
            <Icon className={className ? styles[className] : ''} />
        )
    }

    return (
        <>
            <Swiper
                modules={[Navigation, Pagination]}
                loop={data.length > 2 ? true : false}
                cssMode={true}
                navigation={{
                    nextEl: `.${styles.swiper_button_next}`,
                    prevEl: `.${styles.swiper_button_prev}`,
                }}
                pagination={{
                    el: ".swiper-pagination",
                    clickable: true,
                }}
                className={`${styles.portfolio__container} ${styles.container}`}
            >
                {data.map((item, index) => (
                    <>
                        <SwiperSlide
                            className={`${styles.portfolio__content} ${styles.grid}`}
                            key={crypto.randomUUID()}
                        >
                            <Image
                                src={item.image.src}
                                width={300}
                                height={200}
                                quality={100}
                                alt={item.image.alt}
                                className={styles.portfolio__img}
                                priority={true}
                            />
                            <div className={styles.portfolio__data}>
                                <h3 className={styles.portfolio__title}>{item.title}</h3>
                                <p className={`${styles.portfolio__description} ${styles.text__justify}`} >
                                    {item.description}
                                </p>
                                <Button
                                    href={item.button.href}
                                    target={item.button.newTab ? '_blank' : '_self'}
                                    className={`${styles.button} ${styles.button__flex} ${styles.button__small} ${styles.portfolio__button}`}
                                    text={item.button.text}
                                    icon={getIcons(`${item.button.iconName}`, `${item.button.iconClass}`)}
                                />
                            </div>
                        </SwiperSlide>
                    </>
                ))}

                {data.length > 1 &&
                    <>
                        <div className={styles.swiper_button_prev}>
                            {getIcons('UilAngleLeftB', 'swiper_portfolio_icon')}
                        </div>
                        <div className={styles.swiper_button_next}>
                            {getIcons('UilAngleRightB', 'swiper_portfolio_icon')}
                        </div>

                        <div className={`${styles.portfolio} ${styles.pagination}`}>
                            <div class="swiper-pagination"></div>
                        </div>
                    </>
                }
            </Swiper>
        </>
    )
}