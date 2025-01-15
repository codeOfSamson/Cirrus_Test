import React from 'react';
import { createAvatar } from '@dicebear/avatars';
import * as BotttsSprites from '@dicebear/avatars-bottts-sprites';

interface UserAvatarProps {
  userId: string; // Unique ID for the user
  size?: number; // Optional size for the avatar
  className?: string; // Optional Tailwind CSS classes
}

const UserAvatar: React.FC<UserAvatarProps> = ({ userId, size = 50, className }) => {
  // Generate the avatar SVG using DiceBear's updated API
  const avatarSvg = createAvatar(BotttsSprites, {
    seed: userId, // Generate avatar based on user ID
    size: 68, // Size of the SVG (default is 64)
    radius: 10, // Rounding for corners
  });

  return (
    <div
      className={`rounded-full overflow-hidden ${className}`}
      style={{ width: size, height: size }}
      dangerouslySetInnerHTML={{ __html: avatarSvg }} // Render the SVG directly
    />
  );
};

export default UserAvatar;
