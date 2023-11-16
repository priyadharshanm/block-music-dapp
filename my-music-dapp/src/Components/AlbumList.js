import React from 'react';
import './AlbumList.css'; // Make sure to create a corresponding CSS file

const AlbumList = () => {
  // Dummy data for the list of albums with placeholder image URLs
  const albums = [
    { id: 1, title: 'Forever', artist: 'Taylor Swift', royalty: '10 HT', cover: '/assets/images/ts_album_cover.jpg' },
    { id: 2, title: 'Light Show', artist: 'Lights Band', royalty: '18 HT', cover: '/Thank_U_Next.jpg' },
    { id: 3, title: 'Jai Ho', artist: 'A R Rahman', royalty: '12 HT', cover: '/path-to-jaiho-cover.jpg' },
    { id: 4, title: 'Attention', artist: 'Charlie Puth', royalty: '17 HT', cover: '/path-to-attention-cover.jpg' },
    // ... more albums
  ];

  return (
    <div className="album-list">
      {albums.map(album => (
        <div key={album.id} className="album-card">
          <img src={album.cover} alt={album.title} className="album-cover" />
          <div className="album-info">
            <h2>{album.title}</h2>
            <p>Royalty: {album.royalty}</p>
            <p>Artist: {album.artist}</p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default AlbumList;
