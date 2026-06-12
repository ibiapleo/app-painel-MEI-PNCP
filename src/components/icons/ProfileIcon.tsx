import { G, Mask, Path, Rect, Svg } from 'react-native-svg';

interface ProfileIconProps {
  color: string;
  size?: number;
}

export default function ProfileIcon({ color, size = 22 }: ProfileIconProps) {
  return (
    <Svg width={size} height={size} viewBox="0 0 20 20" fill="none">
      <Mask id="mask0" maskUnits="userSpaceOnUse" x="1" y="0" width="18" height="20">
        <Path
          d="M14.9998 4.99988C14.9998 7.76124 12.7614 9.99977 10 9.99977C7.23873 9.99977 5.00024 7.76124 5.00024 4.99988C5.00024 2.23852 7.23873 0 10 0C12.7614 0 14.9998 2.23852 14.9998 4.99988Z"
          fill={color}
        />
        <Path
          d="M1.66699 16.6667C1.66699 13.9054 3.90548 11.6669 6.6668 11.6669H13.3332C16.0945 11.6669 18.333 13.9054 18.333 16.6667V17.5001C18.333 18.8807 17.2138 20 15.8331 20H4.16689C2.78624 20 1.66699 18.8807 1.66699 17.5001V16.6667Z"
          fill={color}
        />
      </Mask>
      <G mask="url(#mask0)">
        <Rect x="0.000488281" y="-0.000976562" width="19.9992" height="19.9995" fill={color} />
      </G>
    </Svg>
  );
}
