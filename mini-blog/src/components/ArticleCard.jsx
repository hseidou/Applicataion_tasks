export function ArticleCard({ article, index, onEdit, onDelete, onView }) {
    return (
        <article
            className="card article-small-card animate-scale"
            style={{ animationDelay: `${index * 0.1}s` }}
        >
            <div className="card-content">
                <div className="card-header">
                    <h3>{article.title}</h3>
                </div>
                <div className="card-body">
                    <p>{article.content}</p>
                </div>
                <div className="card-actions">
                    <button className="btn-text primary" onClick={() => onView(article)}>Voir</button>
                    <button className="btn-text secondary" onClick={() => onEdit(article)}>Modifier</button>
                    <button className="btn-text danger" onClick={() => onDelete(article.id)}>Supprimer</button>
                </div>
            </div>
        </article>
    );
}
