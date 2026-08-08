type StatusBadgeProps = {
  status: string;
  liveUrl?: string;
  asLink?: boolean;
};

export function StatusBadge({ status, liveUrl, asLink = false }: StatusBadgeProps) {
  if (status === "live") {
    if (asLink && liveUrl) {
      return (
        <a
          href={liveUrl}
          target="_blank"
          rel="noreferrer"
          className="status-badge status-live"
          style={{ textDecoration: "none" }}
        >
          <span className="status-dot" />
          Live — Visit Site
        </a>
      );
    }
    return (
      <span className="status-badge status-live">
        <span className="status-dot" />
        Live
      </span>
    );
  }
  return (
    <span className="status-badge status-archived">
      Archived
    </span>
  );
}
