export function Navbar({ view, setView }) {
    return (
        <header className="navbar animate-fade">
            <div className="navbar-left animate-slide">
                <h3>{view === 'gallery' ? "Galerie d'articles" : "Créer un article"}</h3>
            </div>
            <div className="navbar-right animate-scale">
                <button className="btn btn-primary" onClick={() => setView('create')}>
                    ➕ Nouveau post
                </button>
            </div>
        </header>
    );
}
