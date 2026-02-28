import { ReactNode } from "react";

interface SectionProps {
  id?: string;
  className?: string;
  children: ReactNode;
  title?: string;
  description?: string;
}

export default function Section({
  id,
  className = "",
  children,
  title,
  description,
}: SectionProps) {
  return (
    <section id={id} className={`padding-responsive ${className}`}>
      <div className="container mx-auto px-4">
        {(title || description) && (
          <div className="text-center max-w-3xl mx-auto mb-12">
            {title && (
              <h2 className="text-3xl md:text-4xl font-bold text-tertiary mb-4">
                {title}
              </h2>
            )}
            {description && (
              <p className="text-lg text-gray-300">{description}</p>
            )}
          </div>
        )}
        <div className="max-w-6xl mx-auto">{children}</div>
      </div>
    </section>
  );
}
