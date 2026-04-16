import { useState } from "react";
import "./App.css";

// Hooks
import { useArticles } from "./hooks/useArticles";

// Components
import { Navbar } from "./components/Navbar";
import { ArticleCard } from "./components/ArticleCard";
import { CreatePost } from "./components/CreatePost";
import { ArticleModals } from "./components/ArticleModals";

export default function App() {
  const { articles, createArticle, deleteArticle, updateArticle } = useArticles();
  const [view, setView] = useState("gallery"); // 'gallery' or 'create'

  // Modals state
  const [editArticle, setEditArticle] = useState(null);
  const [viewArticle, setViewArticle] = useState(null);

  const handleCreate = async (title, content, image) => {
    await createArticle(title, content, image);
    setView("gallery");
  };

  const handleUpdate = async (id, title, content) => {
    await updateArticle(id, title, content);
    setEditArticle(null);
  };

  return (
    <div className="app-layout">
      <div className="main-content">
        <Navbar view={view} setView={setView} />

        <main className="content-area animate-fade">
          {view === "create" ? (
            <CreatePost
              onSave={handleCreate}
              onCancel={() => setView("gallery")}
            />
          ) : (
            <div className="gallery-grid">
              {articles.map((article, index) => (
                <ArticleCard
                  key={article.id}
                  article={article}
                  index={index}
                  onView={setViewArticle}
                  onEdit={setEditArticle}
                  onDelete={deleteArticle}
                />
              ))}

              {articles.length === 0 && (
                <div className="empty-state animate-fade">
                  <p>Aucun article pour le moment. Soyez le premier à publier !</p>
                  <button className="btn btn-primary" onClick={() => setView("create")}>
                    ✨ Créer un post
                  </button>
                </div>
              )}
            </div>
          )}
        </main>
      </div>

      <ArticleModals
        viewArticle={viewArticle}
        editArticle={editArticle}
        onViewClose={() => setViewArticle(null)}
        onEditSave={handleUpdate}
        onEditCancel={() => setEditArticle(null)}
      />
    </div>
  );
}
