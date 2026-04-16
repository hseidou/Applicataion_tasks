import { useState, useEffect } from "react";
import "./App.css";

// Hooks
import { useArticles } from "./hooks/useArticles";

// Components
import { Navbar } from "./components/Navbar";
import { ArticleCard } from "./components/ArticleCard";
import { CreatePost } from "./components/CreatePost";
import { ArticleModals } from "./components/ArticleModals";
import { Login } from "./components/Login";
import { Register } from "./components/Register";

export default function App() {
  const { articles, createArticle, deleteArticle, updateArticle, fetchArticles } = useArticles();
  const [view, setView] = useState("gallery"); // 'gallery', 'create', 'login', 'register'
  const [isAuthenticated, setIsAuthenticated] = useState(!!localStorage.getItem("access_token"));

  // Modals state
  const [editArticle, setEditArticle] = useState(null);
  const [viewArticle, setViewArticle] = useState(null);

  useEffect(() => {
    fetchArticles();
  }, [isAuthenticated]);

  const handleLogin = () => {
    setIsAuthenticated(true);
    setView("gallery");
  };

  const handleLogout = () => {
    localStorage.removeItem("access_token");
    localStorage.removeItem("refresh_token");
    setIsAuthenticated(false);
    setView("gallery");
  };

  const handleCreate = async (title, content) => {
    await createArticle(title, content);
    setView("gallery");
  };

  const handleUpdate = async (id, title, content) => {
    await updateArticle(id, title, content);
    setEditArticle(null);
  };

  return (
    <div className="app-layout">
      <div className="main-content">
        <Navbar
          view={view}
          setView={setView}
          isAuthenticated={isAuthenticated}
          onLogout={handleLogout}
        />

        <main className="content-area animate-fade">
          {view === "login" && (
            <Login
              onLogin={handleLogin}
              onSwitch={() => setView("register")}
            />
          )}

          {view === "register" && (
            <Register
              onRegister={() => setView("login")}
              onSwitch={() => setView("login")}
            />
          )}

          {view === "create" && (
            <CreatePost
              onSave={handleCreate}
              onCancel={() => setView("gallery")}
            />
          )}

          {view === "gallery" && (
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
                  <button className="btn btn-primary" onClick={() => setView(isAuthenticated ? "create" : "login")}>
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
