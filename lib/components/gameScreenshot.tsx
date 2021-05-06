import Image from './image';

export default function GameScreenshot({ imageUrl }: { imageUrl: string }) {
  return <Image url={imageUrl} />;
}
