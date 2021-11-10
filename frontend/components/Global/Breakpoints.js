export const XS = "320px";
export const SM = "576px";
export const MD = "769px";
export const LG = "992px";
export const XL = "1200px";
export const XXL = "1400px";

export const xs = `@media only screen and (min-width: ${XS})`;
export const sm = `@media only screen and (min-width: ${SM})`;
export const md = `@media only screen and (min-width: ${MD})`;
export const lg = `@media only screen and (min-width: ${LG})`;
export const xl = `@media only screen and (min-width: ${XL})`;
export const xxl = `@media only screen and (min-width: ${XXL})`;

// controlled breakpoints
export const mobileOnly = `@media only screen and (max-width: ${MD})`;
export const desktopOnly = `@media only screen and (min-width: ${MD})`;
export const xsOnly = `@media only screen and (max-width: ${SM})`;
export const smOnly = `@media only screen and (min-width: ${SM}) and (max-width: ${MD})`;
export const mdOnly = `@media only screen and (min-width: ${MD}) and (max-width: ${LG})`;
export const lgOnly = `@media only screen and (min-width: ${LG}) and (max-width: ${XL})`;
export const xlOnly = `@media only screen and (min-width: ${XL}) and (max-width: ${XXL})`;
export const xxlOnly = `@media only screen and (min-width: ${XXL})`;
