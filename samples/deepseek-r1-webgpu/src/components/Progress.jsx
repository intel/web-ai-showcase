function formatBytes(size) {
  const i = size == 0 ? 0 : Math.floor(Math.log(size) / Math.log(1024));
  return (
    +(size / Math.pow(1024, i)).toFixed(2) * 1 +
    ["B", "kB", "MB", "GB", "TB"][i]
  );
}

export default function Progress({ text, percentage, total }) {
  percentage ??= 0;
  return (
    <div className="w-full bg-stone-200/40 text-left rounded-lg overflow-hidden mb-0.5">
      <div
        className="bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 whitespace-nowrap px-1 text-sm font-mono"
        style={{ width: `${percentage}%` }}
      >
        {text} ({percentage.toFixed(2)}%
        {isNaN(total) ? "" : ` of ${formatBytes(total)}`})
      </div>
    </div>
  );
}
