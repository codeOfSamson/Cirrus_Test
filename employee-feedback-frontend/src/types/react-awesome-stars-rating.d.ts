declare module 'react-awesome-stars-rating' {
    import { FC } from 'react';
  
    interface AwesomeStarsRatingProps {
      value?: number;
      onChange?: (value: number) => void;
      size?: number;
      className?: string;
      style?: React.CSSProperties;
      isEdit?: boolean;
    }
  
    const AwesomeStarsRating: FC<AwesomeStarsRatingProps>;
    export default AwesomeStarsRating;
  }
  