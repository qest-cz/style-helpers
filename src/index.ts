import { css, FlattenInterpolation } from 'styled-components';

import { get } from './utils';

interface GeneralTheme {
    colors: any;
    resolution: any;
    utils: any;
}

const createStyledHelpers = <T extends GeneralTheme>() => {
    type ResolutionKey = keyof GeneralTheme['resolution'];
    type PropsWithTheme = { theme: T };
    type Styles = FlattenInterpolation<PropsWithTheme>;

    return {
        color: (colorKey: keyof T['colors']) => ({ theme }: PropsWithTheme): number => {
            return get(theme, ['colors', colorKey]);
        },
        resolution: (resolutionKey: keyof ResolutionKey) => ({ theme }: PropsWithTheme): string => {
            return get(theme, ['resolution', resolutionKey]);
        },
        util: (utilKey: keyof T['utils']) => ({
            theme,
        }: PropsWithTheme): string | number | ((...params: any) => string | number) => {
            return get(theme, ['utils', utilKey]);
        },
        baseUnit: (multiplier = 1) => ({ theme }: PropsWithTheme): string => {
            const selectedUnit = get(theme, ['utils', 'baseUnit']) as number;

            return `${selectedUnit * multiplier}px`;
        },
        media: {
            min: (breakpoint: ResolutionKey, styles: Styles) => ({ theme }: PropsWithTheme) => {
                return css`
                    @media (min-width: ${theme.resolution[breakpoint]}) {
                        ${styles}
                    }
                `;
            },
            max: (breakpoint: ResolutionKey, styles: Styles) => ({ theme }: PropsWithTheme) => {
                return css`
                    @media (max-width: ${theme.resolution[breakpoint]}) {
                        ${styles}
                    }
                `;
            },
            between: ([minBreakpoint, maxBreakpoint]: ResolutionKey[], styles: Styles) => ({
                theme,
            }: PropsWithTheme) => {
                return css`
                    @media (min-width: ${theme.resolution[minBreakpoint]}) and (max-width: ${theme
                            .resolution[maxBreakpoint]}) {
                        ${styles}
                    }
                `;
            },
        },
        transition: (config?: { duration?: number; properties?: string; animation?: string }) => {
            const {
                duration = 0.3,
                properties = 'all',
                animation = 'cubic-bezier(0.215, 0.61, 0.355, 1)',
            } = config || {};
            return css`
                transition: ${properties} ${duration}s ${animation};
            `;
        },
        cssCondition: (condition: boolean, ifStyles: Styles, elseStyles: Styles) => {
            if (condition) {
                return ifStyles;
            }
            return elseStyles;
        },
    };
};

const initializedStyleHelpers = createStyledHelpers();

export const {
    color,
    resolution,
    util,
    baseUnit,
    transition,
    cssCondition,
    media,
} = initializedStyleHelpers;

export default createStyledHelpers;
