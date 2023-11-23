import React from 'react'
import axios from 'axios'
import AlbumCard from './AlbumCard'
import { Swiper, SwiperSlide } from 'swiper/react'
import { Navigation, Pagination } from 'swiper/modules'
import 'swiper/css'
import 'swiper/css/navigation'
import 'swiper/css/pagination'


function AlbumGallery({ albums, setAlbums, onTrackSelect }) {
    const handleDelete = async (albumId) => {
        try {
            await axios.delete(`http://localhost:5002/api/albums/${albumId}`)
            setAlbums(albums.filter(album => album._id !== albumId))
        } catch (error) {
            console.error('Error deleting album:'. error)
        }
    };

    return (
        <div className="album-gallery">
                <Swiper
                    modules={[Navigation, Pagination]}
                    spaceBetween={50}
                    slidesPerView={3}
                    navigation
                    pagination={{  clickable: true }}
                    onSlideChange={() => console.log('slide change')}
                    onSwiper={(swiper) => console.log(swiper)}
                >
                    {albums.map(album => (
                        <SwiperSlide key={album._id}>
                            <AlbumCard
                                album={album} 
                                onDelete={handleDelete} 
                                onTrackSelect={onTrackSelect}
                            />
                        </SwiperSlide>
                    ))}
                </Swiper>
        </div>
    )
}

export default AlbumGallery