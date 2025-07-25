interface AvatarPickerProps {
  name: string;
  avatar: string;
  suggestedName: string;
  onChange: (name: string, avatar: string) => void;
  onSave: () => void;
}

export function AvatarPicker({
  name,
  avatar,
  suggestedName,
  onChange,
  onSave,
}: AvatarPickerProps) {
  return (
    <div className="mb-6 flex flex-wrap gap-4 items-center">
      <input
        name="walletName"
        type="text"
        value={name}
        onChange={(e) => onChange(e.target.value, avatar)}
        placeholder={suggestedName || "Wallet Name"}
        className="border border-white/80 text-[var(--text)] p-2 px-4 rounded-lg flex-1"
      />
      <div className="relative inline-block">
        <select
          name="avatar"
          value={avatar}
          onChange={(e) => onChange(name, e.target.value)}
          className="appearance-none border border-white/80 text-[var(--text)] p-2 pr-10 px-4 rounded-lg min-w-[100px] bg-transparent"
        >
          <option value="😊">😊</option>
          <option value="🔥">🔥</option>
          <option value="🚀">🚀</option>
        </select>
        <div className="pointer-events-none absolute inset-y-0 right-2 flex items-center">
          <svg
            className="w-4 h-4 text-[var(--text)]"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M19 9l-7 7-7-7"
            />
          </svg>
        </div>
      </div>
      <button
        onClick={onSave}
        className="button h-10"
        aria-label="Save wallet settings"
      >
        Save
      </button>
    </div>
  );
}
