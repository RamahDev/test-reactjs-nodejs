/* eslint-disable jsx-a11y/alt-text */
/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import * as React from 'react';
import { Carousel } from 'react-responsive-carousel';
import 'react-responsive-carousel/lib/styles/carousel.min.css'; // requires a loader

import './style.web.css';

type Props = {
  listItem: any[];
};

export default ({ listItem }: Props) => {
  const carousel = listItem && listItem.length > 0
    ? listItem.map((item: any) => {
      const { imageUrl, nom } = item;
      return (
        <div
          key={nom}
          onClick={() => {}}
          className="carouselWeb"
          style={{}}
        >
          <img src={imageUrl} />
        </div>
      );
    })
    : [];
  return (
    <div className="container-fluid welcome">
      {listItem && listItem.length > 0 ? (
        // @ts-ignore
        <Carousel swipeable infiniteLoop interval={4000} autoPlay>
          {carousel}
        </Carousel>
      ) : (
        <div />
      )}
    </div>
  );
};
