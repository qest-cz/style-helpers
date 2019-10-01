# @qest/style-helpers

Set of helper functions for easier work with styled components.

## Usage

```tsx
import { color, resolution, util, baseUnit, transition, cssCondition, media } from '@qest/style-helpers';
import styled, { css } from 'styled-components';

export const Button = styled.button`
    ${({ active }) =>
    cssCondition(
      active,
      css`
        background-color: ${color("blue")};
      `,
    )}
`;
```

## Available functions

-   color
-   resolution
-   util
-   baseUnit
-   transition
-   cssCondition
-   media

## Expected theme format

Selectors expect this format of theme.

```tsx
const SCREEN_XLL = 1600;
const SCREEN_XL = 1200;
const SCREEN_LG = 992;
const SCREEN_MD = 768;
const SCREEN_SM = 576;
const SCREEN_XS = 480;

const theme = {
    colors: {
        white: '#fff',
    },
    resolution: {
        screenLg: `${SCREEN_LG}px`,
        screenLgMax: `${SCREEN_XL - 1}px`,
        screenLgMin: `${SCREEN_LG}px`,
        screenMd: `${SCREEN_MD}px`,
        screenMdMax: `${SCREEN_LG - 1}px`,
        screenMdMin: `${SCREEN_MD}px`,
        screenSm: `${SCREEN_SM}px`,
        screenSmMax: `${SCREEN_MD}px`,
        screenSmMin: `${SCREEN_SM}px`,
        screenXl: `${SCREEN_XL}px`,
        screenXlMax: `${SCREEN_XLL - 1}px`,
        screenXlMin: `${SCREEN_XL}px`,
        screenXll: `${SCREEN_XLL}px`,
        screenXllMin: `${SCREEN_XLL}px`,
        screenXs: `${SCREEN_XS}px`,
        screenXsMax: `${SCREEN_SM - 1}px`,
        screenXsMin: `${SCREEN_XS}px`,
    },
    utils: {
        baseUnit: 8,
    },
};
```
