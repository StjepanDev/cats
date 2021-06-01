import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './App.css';

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import InfiniteScroll from 'react-infinite-scroll-component';

const apiKey = process.env.REACT_APP_API_KEY;

if (!apiKey) {
  toast.error('Get Your Api Key!');
}

export default function App() {
  useEffect(() => {
    document.title = 'Cool Cats';
  }, []);

  const [images, setImages] = useState([]);

  useEffect(() => {
    getPhotos();
  }, []);

  const getPhotos = async () => {
    try {
      const res = await axios({
        method: 'GET',
        url: 'https://api.thecatapi.com/v1/images/search',
        headers: {
          'content-type': 'application/json',
          'x-api-key': apiKey,
        },
        params: {
          limit: '10',
          size: 'med',
          order: 'RANDOM',
        },
      });
      setImages((images) => [...images, ...res.data]);
    } catch (err) {
      toast.error('something went wrong');
    }
  };

  return (
    <>
      <InfiniteScroll
        dataLength={images.length}
        next={getPhotos}
        hasMore={true}
        loader={<h4>Loading...</h4>}
      >
        <div className="image-grid">
          <ToastContainer autoClose={3000} position="top-center" />
          {images.map((image, idx) => (
            <a
              className="image"
              key={idx}
              href={image.url}
              target="_blank"
              rel="noopener noreferrer"
            >
              <img src={image.url} alt={image.url} />
            </a>
          ))}
        </div>
      </InfiniteScroll>
    </>
  );
}
