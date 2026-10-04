export default function FallbackImage({ icon = "image", className = "" }: { icon?: string; className?: string }) {
  return (
    <div className={`bg-gradient-to-br from-primary via-primary-container to-secondary flex items-center justify-center ${className}`}>
      <span className="material-symbols-outlined text-white/25" style={{ fontSize: "48px" }}>
        {icon}
      </span>
    </div>
  );
}