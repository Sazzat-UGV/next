import { ReactNode, Fragment } from "react";

interface SkeletonCountProps {
  count: number;
  children: ReactNode;
}

const SkeletonCount = ({ count, children }: SkeletonCountProps) => 
  Array.from({ length: count }, (_, i) => (
    <Fragment key={i}>{children}</Fragment>
  ));

export default SkeletonCount;
