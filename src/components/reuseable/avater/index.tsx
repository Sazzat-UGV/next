import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { cn } from "@/lib/utils";

type AvatarsProps = {
  className?: string;
  alt: string;
  src: string;
  imgstyle?: string;
  fallbackStyle?: string;
  fallback: string;
};

export default function Avatars({
  className,
  alt,
  src,
  imgstyle,
  fallbackStyle,
  fallback,
}: AvatarsProps) {
  // src
  return (
    <Avatar className={cn("size-10 2xl:size-11", className)}>
      <AvatarImage className={imgstyle} src={src} alt={alt} />
      <AvatarFallback
        className={cn("bg-grays-place text-blacks font-medium", fallbackStyle)}
      >
        {fallback?.charAt(0)?.toUpperCase()}
      </AvatarFallback>
    </Avatar>
  );
}
