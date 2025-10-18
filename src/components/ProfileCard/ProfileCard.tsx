import React from "react";
import "./ProfileCard.css";

type Props = {
    id?: string;
    initials: string;
    name: string;
    memberSince?: string;
    email?: string;
    phone?: string;
};

const ProfileCard: React.FC<Props> = ({
    id,
    initials,
    name,
    memberSince,
    email,
    phone,
}) => {
    return (
        <article
            id={id}
            className="profile-card"
            aria-labelledby={`${id}-title`}
        >
            <header className="profile-card__header">
                <div className="profile-card__avatar" aria-hidden>
                    {initials}
                </div>
                <div className="profile-card__meta">
                    <h2 id={`${id}-title`} className="profile-card__name">
                        {name}
                    </h2>
                    {memberSince && (
                        <div className="profile-card__since">
                            Cliente desde {memberSince}
                        </div>
                    )}
                </div>
            </header>

            <hr className="profile-card__separator" />

            <dl className="profile-card__details">
                <div className="profile-card__row">
                    <dt className="profile-card__label">Email</dt>
                    <dd className="profile-card__value">{email}</dd>
                </div>
                <div className="profile-card__row">
                    <dt className="profile-card__label">Teléfono</dt>
                    <dd className="profile-card__value">{phone}</dd>
                </div>
            </dl>
        </article>
    );
};

export default ProfileCard;
