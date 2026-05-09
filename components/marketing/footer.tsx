import { footerLinks } from "@/lib/landing-data";

export default function Footer() {
  return (
    <footer className="border-t border-border bg-bg-warm">
      <div className="mx-auto max-w-[1200px] px-6 py-16">
        {/* Top: logo + tagline */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-4">
          <div>
            <span className="font-serif font-bold text-3xl text-text-primary">
              Creator
            </span>
            <span className="ml-3 text-sm font-mono text-text-secondary/40 tracking-wider">
              Career Guidance
            </span>
          </div>
          <p className="font-serif text-xl text-text-secondary italic">
            把复杂决策，变成清晰规划。
          </p>
        </div>

        {/* Links grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 gap-8 mb-12">
          <div>
            <h4 className="text-sm font-mono text-text-secondary/60 mb-4 uppercase tracking-wider">
              产品
            </h4>
            <ul className="space-y-3">
              {footerLinks.product.map((link) => (
                <li key={link.label}>
                  <a
                    href={link.href}
                    className="text-base text-text-secondary hover:text-text-primary transition-colors duration-200"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h4 className="text-sm font-mono text-text-secondary/60 mb-4 uppercase tracking-wider">
              资源
            </h4>
            <ul className="space-y-3">
              {footerLinks.resources.map((link) => (
                <li key={link.label}>
                  <a
                    href={link.href}
                    className="text-base text-text-secondary hover:text-text-primary transition-colors duration-200"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h4 className="text-sm font-mono text-text-secondary/60 mb-4 uppercase tracking-wider">
              关于
            </h4>
            <ul className="space-y-3">
              {footerLinks.about.map((link) => (
                <li key={link.label}>
                  <a
                    href={link.href}
                    className="text-base text-text-secondary hover:text-text-primary transition-colors duration-200"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom */}
        <div className="border-t border-border pt-6 text-sm text-text-secondary/50">
          © 2026 Creator Career Guidance
        </div>
      </div>
    </footer>
  );
}
