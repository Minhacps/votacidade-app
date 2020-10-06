import React from 'react';
import { string } from 'prop-types';
import styled from 'styled-components';
import colors from 'styles/colors';

const Thumbnail = styled.div`
  border-radius: 50%;

  ${({ width, height, backgroundColor }) => `
    background-color: ${backgroundColor};
    width: ${width};
    height: ${height};
  `}

  ${({ image, width }) =>
    image && `
      background-image: url(${image});
      background-position: center center;
      background-size: ${width} auto;
    `
  }
`;

const ImageThumbnail = ({ src, alt, width, height = width, backgroundColor = colors.grey300, placeholderText, className, ...props }) => {
  return (
    <Thumbnail
      {...props}
      image={src}
      width={width}
      height={height}
      backgroundColor={backgroundColor}
      className={`d-flex align-items-center justify-content-center ${className}`}
    >
      {src ? (
        <img
          src={src}
          alt={alt}
          className="sr-only"
        />
      ) : (
      <small className="text-uppercase text-light">{placeholderText}</small>
      )}
    </Thumbnail>
  )
};

ImageThumbnail.propTypes = {
  src: string,
  alt: string,
  width: string.isRequired,
  height: string.isRequired,
  backgroundColor: string,
  foregroundColor: string,
  className: string,
};

export default ImageThumbnail;
