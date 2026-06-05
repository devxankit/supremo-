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
}: ProductCardData) {
  return (
    <Link href={href} className="category-prod-card">
      <div className="prod-card-frame">
        <img className="prod-card-img" src={image} alt={name} />
      </div>

      <div className="prod-card-body">
        <h3 className="prod-card-name">{name}</h3>
        <div className="prod-card-btn">View Product</div>
      </div>
    </Link>
  );
}
