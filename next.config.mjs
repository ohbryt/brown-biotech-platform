/** @type {import('next').NextConfig} */
const nextConfig = {
  // Include repo-root content/ directory in the Vercel serverless bundle
  // so fs.readFile() at request time can read daily-digest / research-pulse
  // markdown files. Without this, Next.js's static analysis doesn't see the
  // filesystem reads and the files are not deployed → empty index page.
  // See: https://nextjs.org/docs/app/api-reference/config/next-config-js/outputFileTracingIncludes
  outputFileTracingIncludes: {
    "/blog/daily-digest/*": ["./content/daily-digest/**"],
    "/blog/research-pulse/*": ["./content/research-pulse/**"],
  },
};

export default nextConfig;
