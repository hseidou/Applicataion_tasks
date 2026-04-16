import { useState, useEffect } from "react";

export function ArticleModals({ editArticle, viewArticle, onEditSave, onEditCancel, onViewClose }) {
    const [editTitle, setEditTitle] = useState("");
    const [editContent, setEditContent] = useState("");

    useEffect(() => {
        if (editArticle) {
            setEditTitle(editArticle.title);
            setEditContent(editArticle.content);
        }
    }, [editArticle]);

    const handleSave = () => {
        onEditSave(editArticle.id, editTitle, editContent);
    };

    return (
        <>
            {/* 👁️ VIEW MODAL */}
            {viewArticle && (
                <div className="modal-overlay" onClick={onViewClose}>
                    <div className="card modal-content-large animate-scale" onClick={e => e.stopPropagation()}>
                        <div className="modal-header">
                            <h2>{viewArticle.title}</h2>
                            <button className="btn-close" onClick={onViewClose}>×</button>
                        </div>
                        <div className="modal-body">
                            <p>{viewArticle.content}</p>
                        </div>
                    </div>
                </div>
            )}

            {/* ✏️ EDIT MODAL */}
            {editArticle && (
                <div className="modal-overlay">
                    <div className="card modal-content animate-scale">
                        <h2>Modifier l'article</h2>
                        <div className="form-group">
                            <label>Titre</label>
                            <input
                                value={editTitle}
                                onChange={(e) => setEditTitle(e.target.value)}
                            />
                            <label>Description</label>
                            <textarea
                                value={editContent}
                                onChange={(e) => setEditContent(e.target.value)}
                            />
                            <div className="actions">
                                <button className="btn btn-primary" onClick={handleSave}>Enregistrer</button>
                                <button className="btn btn-secondary" onClick={onEditCancel}>Annuler</button>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
}
