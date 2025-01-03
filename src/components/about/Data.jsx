import { useState, useEffect } from 'react';
import getUniconsIcons from '@/utils/getUniconIcons';
import Button from '@/components/Button';
import styles from '@/app/_root.module.css'

/**
 * Component props for {@link AboutData}
 * @typedef {Object} AboutDataProps
 * @property {import('@/schema/page/root').aboutSectionDataType} data
 * Section data
 */

/**
 * Component that represent section `About` on root page with provided data.
 * This will be rendered after refered data fetched in client side.
 * @param {AboutDataProps} props AboutData props
 * @returns {React.ReactElement<AboutDataProps, HTMLDivElement>} Rendered component
 */
export default function AboutData({ data }) {
    const [icons, setIcons] = useState(/** @type {JSX.Element} */(null));
    const [textIndex, setTextIndex] = useState(0);

    useEffect(() => {
        const loadIcons = async () => {
            const icons = await getUniconsIcons('UilDownloadAlt', styles.button__icon);
            setIcons(icons);
        };

        loadIcons();
    }, [])

    useEffect(() => {
        if (data) {
            const interval = setInterval(() => {
                setTextIndex(x => {
                    if (x + 1 >= data.interestedList.length) {
                        return 0;
                    }
                    return x + 1
                })
            }, 2500)

            return () => {
                clearInterval(interval);
            }
        }
    }, [data])

    return (
        <>
            <p className={styles.about__description}>
                {data.description}
            </p>

            <div className={styles.about__info}>
                <div>
                    <span className={styles.about__info_title}>Also interested in</span>
                </div>
                <div>
                    <span className={styles.about__info_name} id="interestedText">{data.interestedList[textIndex]}</span>
                </div>
            </div>

            <div className={styles.about__buttons}>
                <Button
                    href={'/#contact'}
                    className={`${styles.button} ${styles.button__flex} ${styles.about__button}`}
                    text="Download CV"
                    icon={icons}
                    label="Download CV"
                />
            </div>
        </>
    )
}