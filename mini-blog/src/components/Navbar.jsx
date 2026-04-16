export function Navbar({ view, setView, isAuthenticated, onLogout }) {
    return (
        <header className="navbar animate-fade">
            <div className="navbar-left animate-slide">
                <h3>{view === 'gallery' ? "Galerie d'articles" :
                    view === 'create' ? "Créer un article" :
                        view === 'login' ? "Connexion" : "Inscription"}</h3>
            </div>
            <div className="navbar-right animate-scale" style={{ gap: '15px', display: 'flex' }}>
                {isAuthenticated ? (
                    <>
                        <button className="btn btn-primary" onClick={() => setView('create')}>
                            ➕ Nouveau post
                        </button>
                        <button className="btn btn-secondary" onClick={onLogout}>
                            🚪 Déconnexion
                        </button>
                    </>
                ) : (
                    <button className="btn btn-primary" onClick={() => setView('login')}>
                        👤 Se connecter
                    </button>
                )}
            </div>
        </header>
    );
}
