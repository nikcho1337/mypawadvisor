// Empty stub. jsPDF lazily `import()`s html2canvas / canvg / dompurify for its
// `.html()` feature, which this project never uses. We alias those optional deps here
// (via next.config turbopack.resolveAlias) so the bundler doesn't fail resolving them.
export default {};
