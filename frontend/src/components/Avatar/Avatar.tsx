import { ComponentPropsWithoutRef } from "react";
import clsx from "clsx";
import AvatarPng from "./avatar.png";
import "./Avatar.css";

export interface AvatarProps extends ComponentPropsWithoutRef<"img"> {
  size?: "small" | "medium" | "large" | "xlarge" | "xxlarge";
}

export const Avatar = ({ size = "medium", src, ...props }: AvatarProps) => {
  return (
    <div className={clsx(`avatar avatar-${size}`)}>
      <img className="avatar-img" src={src ?? AvatarPng} {...props} />
    </div>
  );
};
