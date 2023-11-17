import React from 'react';
import './AlbumList.css'; // Ensure you have created a corresponding CSS file

const AlbumList = () => {
  const albums = [
    { id: 1, title: 'Forever', artist: 'Taylor Swift', royalty: '10 HT', cover: '/assets/images/ts_album_cover.jpg' },
    { id: 2, title: 'Thank U Next', artist: 'Ariana Grande', royalty: '18 HT', cover: '/assets/images/Thank_U_Next.jpg' },
    { id: 3, title: 'Jai Ho', artist: 'A R Rahman', royalty: '12 HT', cover: '/assets/images/ar_rahman.jpg' },
    { id: 4, title: 'Attention', artist: 'Charlie Puth', royalty: '17 HT', cover: '/assets/images/charlie_attention.jpg' },
    // ... more albums
  ];

  const handleBuyClick = (albumId) => {
    // Implement the logic to handle buying an album, such as interacting with a smart contract
    console.log(`Buy album with ID: ${albumId}`);
  };

  return (
    <div className="album-list">
      {albums.map(album => (
        <div key={album.id} className="album-card">
          <img src={album.cover} alt={album.title} className="album-cover" />
          <div className="album-info">
            <h2>{album.title}</h2>
            <p>Royalty: {album.royalty}</p>
            <p>Artist: {album.artist}</p>
            <button onClick={() => handleBuyClick(album.id)} className="buy-button">
              Own for {album.royalty}
            </button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default AlbumList;
