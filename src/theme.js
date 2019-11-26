const BORDER_RADIUS = '10px';
const BORDER_SIZE = '2px';

const Color = {
  EBONY_CLAY: '#232f3e',
  GALLERY: '#eeeeee',
  HEART_RED: '#a83f39',
  KOROMIKO: '#ffc46d',
  ORANGE_PEEL: '#ff9900',
  PICKLED_BLUEWOOD: '#35475e',
  SILVER: '#cccccc',
  WHITE: '#ffffff',
};

const BORDER = `${BORDER_SIZE} solid ${Color.EBONY_CLAY}`;

const Device = {
  MOBILE: 'MOBILE',
  TABLET: 'TABLET',
  LAPTOP: 'LAPTOP',
};

const MinScreenWidth = {
  [Device.MOBILE]: 0,
  [Device.TABLET]: 768,
  [Device.LAPTOP]: 1024,
};

const Media = {
  [Device.MOBILE]: `@media (max-width:${MinScreenWidth[Device.TABLET] - 1}px)`,
  [Device.TABLET]: `@media (min-width:${MinScreenWidth[Device.TABLET]}px)
  and (max-width:${MinScreenWidth[Device.LAPTOP] - 1}px)`,
  [Device.LAPTOP]: `@media (min-width:${MinScreenWidth[Device.LAPTOP]}px)`,
};

function mediaParamsLessThanOrEqualTo(device) {
  // Default to 1 so if nothing catches the media query
  // will be `max-width: 0px` and nothing will display.
  let largerScreenWidth = 1;
  if (device === Device.LAPTOP) {
    largerScreenWidth = 1000000000;
  } else if (device === Device.TABLET) {
    largerScreenWidth = MinScreenWidth[Device.LAPTOP];
  } else if (device === Device.MOBILE) {
    largerScreenWidth = MinScreenWidth[Device.TABLET];
  }
  return `(max-width: ${largerScreenWidth - 1}px)`;
}

function mediaParamsGreaterThanOrEqualTo(device) {
  let minScreenWidth = 1000000000;
  try {
    minScreenWidth = MinScreenWidth[device];
  } catch {
    // Default to something so large that nothing will display.
    minScreenWidth = 1000000000;
  }
  return `(min-width: ${minScreenWidth}px)`;
}

function mediaParamsForRange(fromDevice, toDevice) {
  return `${mediaParamsGreaterThanOrEqualTo(fromDevice)} and ${mediaParamsLessThanOrEqualTo(toDevice)}`;
}

function mediaLte(device) {
  return `@media ${mediaParamsLessThanOrEqualTo(device)}`;
}

function mediaGte(device) {
  return `@media ${mediaParamsGreaterThanOrEqualTo(device)}`;
}

function mediaRange(fromDevice, toDevice) {
  return `@media ${mediaParamsForRange(fromDevice, toDevice)}`;
}

const SPACING_VALUE = 8;
const SPACING_UNIT = 'px';
/* This function behaves the same as margin,
allowing you to pass in different forms for shorthand css properties.
e.g:
spacing(1) => '8px'
spacing(1, 2) => '8px 16px'
spacing(1, 2, 3) => '8px 16px 24px'
spacing(1, 2, 3, 4) => '8px 16px 24px 32px'
*/
function spacing(v1, v2, v3, v4) {
  switch (arguments.length) {
    case 4:
      return `${SPACING_VALUE * v1}${SPACING_UNIT} ${SPACING_VALUE * v2}${SPACING_UNIT} ${SPACING_VALUE *
        v3}${SPACING_UNIT} ${SPACING_VALUE * v4}${SPACING_UNIT}`;
    case 3:
      return `${SPACING_VALUE * v1}${SPACING_UNIT} ${SPACING_VALUE * v2}${SPACING_UNIT} ${SPACING_VALUE *
        v3}${SPACING_UNIT}`;
    case 2:
      return `${SPACING_VALUE * v1}${SPACING_UNIT} ${SPACING_VALUE * v2}${SPACING_UNIT}`;
    case 1:
    default:
      return `${SPACING_VALUE * v1}${SPACING_UNIT}`;
  }
}

const theme = {
  BORDER,
  BORDER_RADIUS,
  BORDER_SIZE,
  Color,
  Device,
  Media,
  mediaLte,
  mediaGte,
  mediaRange,
  MinScreenWidth,
  spacing,
  SPACING_UNIT,
  SPACING_VALUE,
};

export {
  BORDER,
  BORDER_RADIUS,
  BORDER_SIZE,
  Color,
  Device,
  Media,
  mediaLte,
  mediaGte,
  mediaRange,
  MinScreenWidth,
  spacing,
  SPACING_UNIT,
  SPACING_VALUE,
};

export default theme;
