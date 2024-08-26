
import image1 from '../assets/banner/img1.webp'
import image2 from '../assets/banner/img-2.jpg'
import image3 from '../assets/banner/img-3.jpg'
import image4 from '../assets/banner/img-4.webp'
import image5 from '../assets/banner/img-6.jpg';

import mobileimage1 from '../assets/banner/img1mobile.jpg'
import mobileimage2 from '../assets/banner/img-2mobile.jpg'
import mobileimage3 from '../assets/banner/img-3mobile.jpg'
import mobileimage4 from '../assets/banner/img-4mobile.jpg'
import mobileimage5 from '../assets/banner/img-6mobile.jpg'
import { useEffect, useState } from 'react';

import { FaAngleRight } from "react-icons/fa6";
import { FaAngleLeft } from "react-icons/fa6";



const BannerProduct = () => {

    const [currentImage, setCurrentImage] = useState(1)

    const desktopImages = [
        image1, image2, image3, image4, image5
    ]

    const mobileImages = [
        mobileimage1, mobileimage2, mobileimage3, mobileimage4, mobileimage5
    ]

    const nextImage = () => {
        if (desktopImages.length - 1 > currentImage) {
            setCurrentImage(prev => prev + 1)

        }

    }
    const prevImage = () => {

        if (currentImage != 0) {
            setCurrentImage(prev => prev - 1)
        }

    }

    useEffect(() => {

        const interval = setInterval(() => {

            if (desktopImages.length - 1 > currentImage) {

                nextImage()

            }
            else {
                setCurrentImage(0)
            }

        },5000)

        return ()=>clearInterval(interval)

    }, [currentImage])

    return (
        <>
            <div className="container mx-auto px-4 rounded">

                <div className="h-56 md:h-72 w-full bg-slate-200 relative">
                    <div className='absolute z-10 h-full w-full md:flex items-center hidden'>
                        <div className='s flex justify-between w-full text-3xl'>
                            <button onClick={prevImage} className='bg-white shadow-md rounded-full p-1'><FaAngleLeft /></button>
                            <button onClick={nextImage} className='bg-white shadow-md rounded-full p-1'><FaAngleRight /></button>
                        </div>
                    </div>

                    {/* desktop & tablet */}
                    <div className='hidden md:flex w-full h-full overflow-hidden'>
                        {
                            desktopImages.map((image, index) => {
                                return (
                                    <div className="w-full h-full flex min-w-full min-h-full transition-all" key={image} style={{ transform: `translateX(-${currentImage * 100}%)` }}>
                                        <img src={image} className="w-full h-full object-cover" />
                                    </div>
                                )
                            })
                        }
                    </div>
                    {/* mobile */}
                    <div className='flex w-full h-full overflow-hidden md:hidden'>
                        {
                            mobileImages.map((image, index) => {
                                return (
                                    <div className="w-full h-full flex min-w-full min-h-full transition-all" key={image} style={{ transform: `translateX(-${currentImage * 100}%)` }}>
                                        <img src={image} className="w-full h-full" />
                                    </div>
                                )
                            })
                        }
                    </div>

                </div>
            </div>
        </>
    );
}

export default BannerProduct;