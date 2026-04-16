import { useState } from "react";

export function CreatePost({ onSave, onCancel }) {
    const [title, setTitle] = useState("");
    const [content, setContent] = useState("");
    const [loading, setLoading] = useState(false);

    const handleSubmit = async () => {
        if (!title || !content) {
            alert("Veuillez remplir le titre et le contenu.");
            return;
        }

        try {
            setLoading(true);
            await onSave(title, content);
        } catch (error) {
            alert("Erreur lors de la création : " + error.message);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="create-container animate-slide">
            <div className="card create-card-large shadow-glow">
                <h2>🖋️ Nouveau Post</h2>
                <div className="form-inputs">
                    <div className="form-group">
                        <label>Titre</label>
                        <input
                            placeholder="Donnez un titre percutant"
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                        />
                    </div>
                    <div className="form-group">
                        <label>Description</label>
                        <textarea
                            placeholder="Racontez votre histoire..."
                            value={content}
                            onChange={(e) => setContent(e.target.value)}
                        />
                    </div>
                </div>

                <div className="form-footer">
                    <button className="btn btn-secondary" onClick={onCancel}>Annuler</button>
                    <button
                        className="btn btn-primary btn-large"
                        onClick={handleSubmit}
                        disabled={loading}
                    >
                        {loading ? "Publication en cours..." : "Publier l'article"}
                    </button>
                </div>
            </div>
        </div>
    );
}
