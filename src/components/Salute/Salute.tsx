import "./salute.css";
import type { Client } from "../../types/user.types";
import { getInitials } from "../../utils/getInitials";

type SaluteProps = { client: Client };

const Salute = ({ client }: SaluteProps) => {
    const { name } = client;
    return (
        <div className="salute" role="banner">
            <div className="salute__left">
                <h1 className="salute__greeting">
                    ¡Hola,{" "}
                    <span className="salute__greeting-strong">{name}!</span>
                </h1>
                <p className="salute__sub">Bienvenido a Kairon Bank</p>
            </div>

            <div className="salute__actions">
                <div className="salute__avatar" aria-hidden>
                    {getInitials(name)}
                </div>
            </div>
        </div>
    );
};

export default Salute;
