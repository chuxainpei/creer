import Link from "next/link";
import { footerLinks } from "@/lib/landing-data";

function FooterColumn({
  title,
  links,
}: {
  title: string;
  links: Array<{ label: string; href: string }>;
}) {
  return (
    <div>
      <h4 className="text-sm font-mono text-text-secondary/60 mb-4 uppercase tracking-wider">
        {title}
      </h4>
      <ul className="space-y-3">
        {links.map((link) => (
          <li key={link.label}>
            <Link
              href={link.href}
              className="text-base text-text-secondary hover:text-text-primary transition-colors duration-200"
            >
              {link.label}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}

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
          <FooterColumn title="产品" links={footerLinks.product} />
          <FooterColumn title="资源" links={footerLinks.resources} />
          <FooterColumn title="关于" links={footerLinks.about} />
        </div>

        {/* Disclaimers */}
        <div className="border-t border-border pt-6 space-y-2 text-sm text-text-secondary/50 leading-relaxed">
          <p>© 2026 Creator Career Guidance</p>
          <p>
            免责声明：Creator 提供的规划建议基于 AI 生成，仅供参考。重要的升学和就业决策请结合多方信息综合判断。AI 不承诺任何录取、入职或收入结果。
          </p>
          <p>
            本产品由 DeepSeek API 驱动，您可以在项目根目录的{" "}
            <code className="font-mono text-xs bg-surface-hover px-1 py-0.5">
              .env.local
            </code>{" "}
            中配置自己的 API Key。
          </p>
        </div>
      </div>
    </footer>
  );
}
