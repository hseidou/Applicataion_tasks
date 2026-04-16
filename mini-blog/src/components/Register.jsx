import { useState } from "react";

export function Register({ onRegister, onSwitch }) {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        try {
            const res = await fetch("http://127.0.0.1:8000/api/auth/register/", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    email,
                    password,
                    first_name: firstName,
                    last_name: lastName
                }),
            });
            const data = await res.json();
            if (res.ok) {
                alert("Compte créé avec succès ! Connectez-vous.");
                onRegister();
            } else {
                alert(JSON.stringify(data));
            }
        } catch (error) {
            alert("Erreur de connexion au serveur");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="create-container animate-fade">
            <div className="card create-card-large shadow-glow" style={{ maxWidth: '400px' }}>
                <h2>📝 Inscription</h2>
                <form onSubmit={handleSubmit} className="form-inputs">
                    <div className="form-group">
                        <label>Email</label>
                        <input
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                        />
                    </div>
                    <div className="form-group">
                        <label>Nom</label>
                        <input
                            type="text"
                            value={firstName}
                            onChange={(e) => setFirstName(e.target.value)}
                        />
                    </div>
                    <div className="form-group">
                        <label>Mot de passe</label>
                        <input
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                        />
                    </div>
                    <div className="form-footer" style={{ flexDirection: 'column', gap: '15px' }}>
                        <button className="btn btn-primary btn-large" style={{ width: '100%' }} disabled={loading}>
                            {loading ? "Chargement..." : "S'inscrire"}
                        </button>
                        <button type="button" className="btn-text" onClick={onSwitch}>
                            Déjà un compte ? Connectez-vous
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}
