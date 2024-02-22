import React from 'react';
import axios from 'axios';
import AlbumCard from './AlbumCard';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

// AlbumGallery component displays a collection of albums in a carousel format
function AlbumGallery({ albums, setAlbums, onTrackSelect }) {
    // Function to handle album deletion
    const handleDelete = async (albumId) => {
        try {
            await axios.delete(`${process.env.REACT_APP_API_URL}/api/albums/${albumId}`);
            // Update the albums state to reflect the deletion
            setAlbums(albums.filter(album => album._id !== albumId));
        } catch (error) {
            console.error('Error deleting album:', error);
        }
    };

    return (
        <div className="album-gallery">
            {/* Swiper Carousel to display albums */}
            <Swiper
                modules={[Navigation, Pagination]}
                spaceBetween={50}
                slidesPerView={3}
                navigation
                pagination={{ clickable: true }}
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
    );
}

export default AlbumGallery;

