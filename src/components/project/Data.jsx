import { useState, useEffect } from 'react';
import Image from 'next/image';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination } from 'swiper/modules';
import getUniconsIcons from '@/utils/getUniconIcons';
import styles from '@/app/_root.module.css';
import Button from '@/components/Button';

const otherIcons = [
    { uil: 'UilAngleLeftB', className: 'swiper_portfolio_icon' },
    { uil: 'UilAngleRightB', className: 'swiper_portfolio_icon' },
]

/**
 * Component props for {@link ProjectData}
 * @typedef {Object} ProjectDataProps
 * @property {import('@/schema/page/root').projectSectionDataType} data
 * Section data
 */

/**
 * Component that represent section `Project` on root page with provided data.
 * This will be rendered after refered data fetched in client side.
 * @param {ProjectDataProps} props ProjectData props
 * @returns {React.ReactElement<ProjectDataProps, HTMLDivElement>} Rendered component
 */
export default function ProjectData({ data }) {
    const [icons, setIcons] = useState(/** @type {Array<JSX.Element>} */([]));
    const [projectIcons, setProjectIcons] = useState(/** @type {Array<JSX.Element>} */([]));

    useEffect(() => {
        const loadIcons = async () => {
            const projectIcons = await Promise.all(
                data.map(async (item) => {
                    const icon = await getUniconsIcons(item.button.iconName, item?.button?.iconClass ? styles[item.button.iconClass] : null);
                    return icon;
                })
            );
            const icons = await Promise.all(
                otherIcons.map(async (item) => {
                    const icon = await getUniconsIcons(item.uil, item?.className ? styles[item.className] : null);
                    return icon;
                })
            );

            setIcons(icons);
            setProjectIcons(projectIcons)
        };

        loadIcons();
    }, [data])

    return (
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
                <SwiperSlide
                    className={`${styles.portfolio__content} ${styles.grid}`}
                    key={crypto.randomUUID()}
                >
                    <Image
                        src={item.image.src}
                        width={4000}
                        height={2800}
                        quality={100}
                        alt={item.image.alt}
                        className={styles.portfolio__img}
                        priority
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
                            icon={projectIcons[index]}
                            label='Details'
                        />
                    </div>
                </SwiperSlide>
            ))}

            {data.length > 1 &&
                <>
                    <div className={styles.swiper_button_prev}>
                        {icons[0]}
                    </div>
                    <div className={styles.swiper_button_next}>
                        {icons[1]}
                    </div>

                    <div className={`${styles.portfolio} ${styles.pagination}`}>
                        <div className="swiper-pagination"></div>
                    </div>
                </>
            }
        </Swiper>
    )
}