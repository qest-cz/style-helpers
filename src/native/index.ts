import { Interpolation } from 'styled-components';
import { css } from 'styled-components/native';

import { get } from '../utils';

interface GeneralTheme {
    colors?: any;
    resolution?: any;
    utils?: any;
}

const createStyledHelpers = <T extends GeneralTheme>() => {
    type ResolutionKey = keyof GeneralTheme['resolution'];
    type PropsWithTheme = { theme: T };
    type Styles = Interpolation<PropsWithTheme>;

    return {
        color: (colorKey: keyof T['colors']) => ({ theme }: PropsWithTheme): string => {
            return get(theme, ['colors', colorKey], colorKey as string);
        },
        resolution: (resolutionKey: keyof ResolutionKey) => ({ theme }: PropsWithTheme): string => {
            return get(theme, ['resolution', resolutionKey], resolutionKey);
        },
        util: (utilKey: keyof T['utils']) => ({
            theme,
        }: PropsWithTheme): string | number | ((...params: any) => string | number) => {
            return get(theme, ['utils', utilKey], utilKey as string);
        },
        baseUnit: (multiplier = 1) => ({ theme }: PropsWithTheme): number => {
            const selectedUnit = get(theme, ['utils', 'baseUnit']);

            return selectedUnit * multiplier;
        },
        media: {
            min: (breakpoint: ResolutionKey, styles: Styles) => ({ theme }: PropsWithTheme) => {
                return css`
                    @media (min-width: ${get(
                            theme,
                            ['resolution', breakpoint],
                            breakpoint as string,
                        )}) {
                        ${styles}
                    }
                `;
            },
            max: (breakpoint: ResolutionKey, styles: Styles) => ({ theme }: PropsWithTheme) => {
                return css`
                    @media (max-width: ${get(
                            theme,
                            ['resolution', breakpoint],
                            breakpoint as string,
                        )}) {
                        ${styles}
                    }
                `;
            },
            between: ([minBreakpoint, maxBreakpoint]: ResolutionKey[], styles: Styles) => ({
                theme,
            }: PropsWithTheme) => {
                return css`
                    @media (min-width: ${get(
                            theme,
                            ['resolution', minBreakpoint],
                            minBreakpoint as string,
                        )}) and (max-width: ${get(
                            theme,
                            ['resolution', maxBreakpoint],
                            maxBreakpoint as string,
                        )}) {
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
        cssCondition: (condition: boolean, ifStyles: Styles, elseStyles?: Styles) => {
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
