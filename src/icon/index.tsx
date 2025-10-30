import React from "react";
import { IconList } from "./list";
import Image, { ImageProps } from "next/image";


export type ImageName = keyof typeof  IconList ;

interface CustomImageProps extends Omit<ImageProps, "src" | "alt"> {
  name: ImageName;
  alt?: string;
  width?: number;
  height?: number;
  className?: string;
}

const Icon: React.FC<CustomImageProps> = ({
  name,
  width,
  height,
  className,
  alt,
  ...rest
}) => {
  const imageSrc =  IconList[name];
  const altText = alt ?? name;
 

  return (
    <Image
      src={imageSrc}
      alt={altText}
      width={width}
      height={height}
      className={className}
      {...rest}
    />
  );
};

export default Icon
