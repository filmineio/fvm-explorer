import {ImageProps} from "next/dist/client/image";
import Image from "next/image";
import {FC, useState} from "react";

interface ImageLoad extends ImageProps{
  alt: string
}
const ImageLoad: FC<ImageLoad> = (props) => {
  const [isLoaded, setIsLoaded] = useState(false);

  return (
    <Image
      {...props}
      alt={props.alt}
      className={`${!isLoaded && "c-animated-background"}`}
      onLoadingComplete={()=>setIsLoaded(true)}
    />
  )
}

export default ImageLoad;