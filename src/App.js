import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './App.css';
const accessKey = process.env.REACT_APP_API_KEY;

export default function App() {
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
          'x-api-key': accessKey,
        },
        params: {
          limit: '20',
          size: 'med',
          order: 'RANDOM',
        },
      });
      setImages(res.data);
    } catch (err) {
      console.log(err);
    }
  };
  return (
    <div className="image-grid">
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
  );
}
