import * as React from "react";
import Svg, { Path, SvgProps } from "react-native-svg";

type LockAltIconProps = SvgProps & {
  size?: number;
  color?: string;
};

const LockAltIcon = ({
  size = 48,
  color = "#fff",
  ...props
}: LockAltIconProps) => (
  <Svg width={size} height={size} viewBox="0 0 48 48" fill="none" {...props}>
    <Path
      d="M24 0C10.7452 0 0 10.7452 0 24C0 37.2548 10.7452 48 24 48C37.2548 48 48 37.2548 48 24C48 10.7452 37.2548 0 24 0ZM23.8272 10.9863C27.0682 11.0018 30.0307 13.0686 31.2891 15.9522C31.7196 16.9565 31.9482 17.9883 31.9482 19.1074V21.961H35.8799V37.0137H12.1201V21.9609H15.7354C15.7026 19.9447 15.6611 17.6381 16.3682 15.9521C17.743 12.9157 20.5861 10.9709 23.8272 10.9863ZM23.6514 15.7793C21.8561 15.817 20.6722 17.1822 20.499 19.1074V21.9609H27.1846V19.0781C27.1021 17.2525 25.7204 15.8296 23.8271 15.7793C23.7685 15.7779 23.7099 15.7779 23.6514 15.7793Z"
      fill={color}
    />
  </Svg>
);

export default LockAltIcon;
