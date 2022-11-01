import React from 'react';

export default function FavoriteAndShare() {
  return (
    <div>
      <button
        type="button"
        data-testid="share-btn"
      >
        Share
      </button>

      <button
        type="button"
        data-testid="favorite-btn"
      >
        Favorite
      </button>

    </div>
  );
}
