/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useState } from "react";
import "./SettingsCard.css";
import Toggle from "../Toggle/Toggle";

type Item =
    | {
          id: string;
          type: "toggle";
          title: string;
          subtitle?: string;
          keyName?: string;
          defaultValue?: boolean;
      }
    | {
          id: string;
          type: "link";
          title: string;
          subtitle?: string;
          href?: string;
          icon?: string;
      };

type Props = {
    id?: string;
    title?: string;
    items: Item[];
    compact?: boolean;
};

const SettingsCard: React.FC<Props> = ({
    id,
    title,
    items,
    compact = false,
}) => {
    const [toggles, setToggles] = useState<Record<string, boolean>>(
        items.reduce((acc, it) => {
            if (it.type === "toggle") acc[it.id] = !!it.defaultValue;
            return acc;
        }, {} as Record<string, boolean>)
    );

    const handleToggle = (id: string) => {
        setToggles((s) => ({ ...s, [id]: !s[id] }));
    };

    return (
        <aside
            id={id}
            className={`settings-card ${
                compact ? "settings-card--compact" : ""
            }`}
            aria-labelledby={id ? `${id}-title` : undefined}
        >
            {title && (
                <h3
                    id={id ? `${id}-title` : undefined}
                    className="settings-card__title"
                >
                    {title}
                </h3>
            )}

            <ul className="settings-card__list" role="list">
                {items.map((it) => (
                    <li
                        key={it.id}
                        className="settings-card__item"
                        role="listitem"
                    >
                        {it.type === "toggle" ? (
                            <div className="settings-card__item-inner">
                                <div className="settings-card__text">
                                    <div className="settings-card__item-title">
                                        {it.title}
                                    </div>
                                    {it.subtitle && (
                                        <div className="settings-card__item-sub">
                                            {it.subtitle}
                                        </div>
                                    )}
                                </div>

                                <div className="settings-card__control">
                                    <Toggle
                                        id={it.id}
                                        checked={!!toggles[it.id]}
                                        onChange={() => handleToggle(it.id)}
                                        ariaLabel={it.title}
                                    />
                                </div>
                            </div>
                        ) : (
                            <a
                                className="settings-card__link"
                                href={(it as any).href || "#"}
                                aria-label={it.title}
                            >
                                <div className="settings-card__text">
                                    <div className="settings-card__item-title">
                                        {it.title}
                                    </div>
                                    {it.subtitle && (
                                        <div className="settings-card__item-sub">
                                            {it.subtitle}
                                        </div>
                                    )}
                                </div>
                                <div
                                    className="settings-card__chev"
                                    aria-hidden
                                >
                                    <svg
                                        width="18"
                                        height="18"
                                        viewBox="0 0 24 24"
                                        fill="none"
                                    >
                                        <path
                                            d="M9 18l6-6-6-6"
                                            stroke="currentColor"
                                            strokeWidth="1.6"
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                        />
                                    </svg>
                                </div>
                            </a>
                        )}
                    </li>
                ))}
            </ul>
        </aside>
    );
};

export default SettingsCard;
