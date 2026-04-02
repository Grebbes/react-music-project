// Breakpoint values
export const breakpoints = {
  mobile: "576px",
  tablet: "768px",
  desktop: "769px",
};

export const mediaQueries = {
  mobile: `@media (max-width: ${breakpoints.mobile})`,
  tablet: `@media (min-width: 577px) and (max-width: ${breakpoints.tablet})`,
};
