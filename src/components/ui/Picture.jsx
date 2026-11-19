/* eslint-disable react/prop-types */
import { forwardRef } from "react";
import { imageSources } from "../../lib/images";

/**
 * An <img> that offers AVIF and WebP at several widths when the image has
 * generated variants (see src/lib/images.js), falling back to the original.
 * The browser picks the smallest file that is sharp at the rendered size.
 *
 * The <picture> wrapper is `display: contents`, so the image lays out exactly
 * as a bare <img> would. Pass `as` to render a motion component in its place.
 */
const Picture = forwardRef(function Picture({ src, sizes = "100vw", as: Img = "img", ...rest }, ref) {
  const sources = imageSources(src);
  const image = <Img ref={ref} src={src} {...rest} />;
  if (!sources) return image;

  return (
    <picture className="contents">
      <source type="image/avif" srcSet={sources.avif} sizes={sizes} />
      <source type="image/webp" srcSet={sources.webp} sizes={sizes} />
      {image}
    </picture>
  );
});

export default Picture;
