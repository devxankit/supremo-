import Link from "next/link";

export interface ProductCardBadge {
  label: string;
  primary?: boolean;
}

export interface ProductCardData {
  href: string;
  name: string;
  image: string;
  /** Eyebrow label above the name (e.g. the category). */
  categoryLabel?: string;
  /** Primary highlighted chip (e.g. capacity). */
  capacity?: string;
  /** Additional spec chips. */
  tags?: string[];
  badges?: ProductCardBadge[];
  tagline?: string;
  /** Colour swatches (hex values). */
  swatches?: string[];
}

/**
 * The single product card used by both the homepage best-sellers and the
 * catalogue browser. Styling lives in globals.css (.category-prod-card …).
 */
export function ProductCard({
  href,
  name,
  image,
  categoryLabel,
  capacity,
  tags = [],
  badges = [],
  tagline,
  swatches = [],
}: ProductCardData) {
  return (
    <Link href={href} className="category-prod-card">
      <div className="prod-card-frame">
        {badges.length > 0 && (
          <div className="prod-card-badges">
            {badges.map((b) => (
              <span key={b.label} className={`prod-card-badge${b.primary ? " prod-card-badge--primary" : ""}`}>
                {b.label}
              </span>
            ))}
          </div>
        )}
        <img className="prod-card-img" src={image} alt={name} />
      </div>

      <div className="prod-card-body">
        {categoryLabel && <span className="prod-card-cat">{categoryLabel}</span>}
        <h3 className="prod-card-name">{name}</h3>

        {(capacity || tags.length > 0) && (
          <div className="prod-card-tags">
            {capacity && <span className="prod-card-tag prod-card-tag--cap">{capacity}</span>}
            {tags.map((t) => (
              <span key={t} className="prod-card-tag">{t}</span>
            ))}
          </div>
        )}

        {tagline && <p className="prod-card-tagline">{tagline}</p>}

        <div className="prod-card-foot">
          <span className="prod-card-cta">
            View Details
            <svg className="prod-card-arrow" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
              <path d="M7 17L17 7M9 7h8v8" />
            </svg>
          </span>
          {swatches.length > 0 && (
            <div className="prod-card-swatches">
              {swatches.slice(0, 4).map((c, i) => (
                <span key={`${c}-${i}`} className="prod-card-swatch" style={{ background: c }} />
              ))}
              {swatches.length > 4 && <span className="prod-card-swatch-more">+{swatches.length - 4}</span>}
            </div>
          )}
        </div>
      </div>
    </Link>
  );
}
