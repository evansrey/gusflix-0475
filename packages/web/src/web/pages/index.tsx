import { useEffect, useMemo, useState } from "react";
import {
  Search,
  Bell,
  ChevronDown,
  ChevronRight,
  Play,
  Plus,
  Check,
  Info,
  X,
  Volume2,
  Menu,
  UserRound,
  Film,
  Clapperboard,
} from "lucide-react";
import { catalog, type Title } from "../lib/catalog";

const profiles = [
  { name: "Gus", color: "#e65534", face: "G", pattern: "profile-orange" },
  { name: "Invitado", color: "#3c81b8", face: "I", pattern: "profile-blue" },
  { name: "Peques", color: "#e7b849", face: "P", pattern: "profile-yellow" },
];

function getStored<T>(key: string, fallback: T): T {
  try {
    const value = localStorage.getItem(key);
    return value ? (JSON.parse(value) as T) : fallback;
  } catch {
    return fallback;
  }
}

function Index() {
  const [profile, setProfile] = useState(() => getStored<string>("gusflix-profile", "Gus"));
  const [profilePicker, setProfilePicker] = useState(false);
  const [profileMenu, setProfileMenu] = useState(false);
  const [saved, setSaved] = useState<string[]>(() =>
    getStored<string[]>(`gusflix-saved-${getStored("gusflix-profile", "Gus")}`, []),
  );
  const [recent, setRecent] = useState<string[]>(() =>
    getStored<string[]>(`gusflix-recent-${getStored("gusflix-profile", "Gus")}`, []),
  );
  const [selected, setSelected] = useState<Title | null>(null);
  const [trailer, setTrailer] = useState<Title | null>(null);
  const [view, setView] = useState("Inicio");
  const [query, setQuery] = useState("");
  const [searchOpen, setSearchOpen] = useState(false);
  const [genre, setGenre] = useState("Todos");
  const [scrolled, setScrolled] = useState(false);
  const [mobileNav, setMobileNav] = useState(false);
  const hero = catalog[0];
  const activeProfile = profiles.find((p) => p.name === profile) || profiles[0];

  useEffect(() => {
    localStorage.setItem(`gusflix-saved-${profile}`, JSON.stringify(saved));
  }, [saved, profile]);
  useEffect(() => {
    localStorage.setItem(`gusflix-recent-${profile}`, JSON.stringify(recent));
  }, [recent, profile]);
  useEffect(() => {
    localStorage.setItem("gusflix-profile", JSON.stringify(profile));
  }, [profile]);
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 35);
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setSelected(null);
        setTrailer(null);
        setProfilePicker(false);
        setProfileMenu(false);
        setMobileNav(false);
      }
    };
    window.addEventListener("scroll", onScroll);
    window.addEventListener("keydown", onKey);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("keydown", onKey);
    };
  }, []);
  useEffect(() => {
    document.body.style.overflow = selected || trailer || profilePicker ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [selected, trailer, profilePicker]);

  const filtered = useMemo(
    () =>
      catalog.filter((item) => {
        const matchesQuery = `${item.name} ${item.genre} ${item.character} ${item.cast.join(" ")}`
          .toLowerCase()
          .includes(query.toLowerCase().trim());
        const matchesGenre = genre === "Todos" || item.genre === genre;
        const matchesView = view !== "Mi lista" || saved.includes(item.id);
        return matchesQuery && matchesGenre && matchesView;
      }),
    [query, genre, view, saved],
  );
  const searching = query.trim().length > 0 || genre !== "Todos" || view === "Mi lista";
  const genres = [
    "Todos",
    "Ciencia ficción",
    "Fantasía",
    "Suspenso",
    "Aventura",
    "Crimen",
    "Animación",
    "Acción",
    "Misterio",
  ];

  function openDetails(item: Title) {
    setSelected(item);
    setRecent((previous) => [item.id, ...previous.filter((id) => id !== item.id)].slice(0, 5));
  }
  function play(item: Title) {
    setSelected(null);
    setTrailer(item);
    setRecent((previous) => [item.id, ...previous.filter((id) => id !== item.id)].slice(0, 5));
  }
  function toggleSaved(id: string) {
    setSaved((previous) =>
      previous.includes(id) ? previous.filter((item) => item !== id) : [...previous, id],
    );
  }
  function switchProfile(name: string) {
    setSaved(getStored<string[]>(`gusflix-saved-${name}`, []));
    setRecent(getStored<string[]>(`gusflix-recent-${name}`, []));
    setProfile(name);
    setProfileMenu(false);
    setProfilePicker(false);
  }
  function navigate(next: string) {
    setView(next);
    setMobileNav(false);
    setGenre("Todos");
    setQuery("");
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  function Card({ item, rank }: { item: Title; rank?: number }) {
    return (
      <button
        className={`title-card ${rank ? "ranked-card" : ""}`}
        onClick={() => openDetails(item)}
        aria-label={`Ver detalles de ${item.name}`}
      >
        {rank && <span className="rank-number">{rank}</span>}
        <span className="card-art">
          <img src={item.image} alt="" loading="lazy" />
          <span className="card-shade" />
          <span className="card-tag">
            <span className="n-mark">G</span> {item.kind.toUpperCase()}
          </span>
          <span className="card-name">{item.name}</span>
          <span className="card-hover-play">
            <Play size={17} fill="currentColor" />
          </span>
        </span>
        <span className="card-bottom">
          <span className="match">{item.match}% de coincidencia</span>
          <span>{item.genre}</span>
        </span>
      </button>
    );
  }
  function Shelf({
    title,
    subtitle,
    items,
    ranked = false,
  }: {
    title: string;
    subtitle?: string;
    items: Title[];
    ranked?: boolean;
  }) {
    if (!items.length) return null;
    return (
      <section className="shelf">
        <div className="shelf-heading">
          <div>
            <h2>
              {title} <ChevronRight size={22} strokeWidth={2.6} />
            </h2>
            {subtitle && <p>{subtitle}</p>}
          </div>
          <span className="explore-label">
            EXPLORAR TODO <ChevronRight size={15} />
          </span>
        </div>
        <div className={`shelf-scroll ${ranked ? "ranked-scroll" : ""}`}>
          {items.map((item, i) => (
            <Card key={item.id} item={item} rank={ranked ? i + 1 : undefined} />
          ))}
        </div>
      </section>
    );
  }

  return (
    <div className="site-shell">
      <header className={`site-header ${scrolled || searching ? "is-scrolled" : ""}`}>
        <div className="header-left">
          <button
            className="brand"
            onClick={() => navigate("Inicio")}
            aria-label="Gusflix, ir al inicio"
          >
            GUS<span>FLIX</span>
          </button>
          <nav
            className={`main-nav ${mobileNav ? "nav-open" : ""}`}
            aria-label="Navegación principal"
          >
            {["Inicio", "Series", "Películas", "Personajes", "Mi lista"].map((item) => (
              <button
                key={item}
                className={view === item ? "active" : ""}
                onClick={() => navigate(item)}
              >
                {item}
              </button>
            ))}
          </nav>
        </div>
        <div className="header-actions">
          <button
            className="icon-button mobile-menu"
            aria-label="Abrir menú"
            onClick={() => setMobileNav(!mobileNav)}
          >
            <Menu size={24} />
          </button>
          <div className={`search-control ${searchOpen ? "search-expanded" : ""}`}>
            <button
              className="icon-button"
              aria-label="Buscar"
              onClick={() => {
                setSearchOpen(!searchOpen);
                if (searchOpen) setQuery("");
              }}
            >
              <Search size={23} />
            </button>
            {searchOpen && (
              <input
                placeholder="Títulos, personajes, géneros..."
                aria-label="Buscar títulos y personajes"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
              />
            )}
          </div>
          <button className="kids-link" onClick={() => switchProfile("Peques")}>
            Niños
          </button>
          <button
            className="icon-button notification"
            aria-label="Notificaciones"
            title="No tienes notificaciones"
          >
            <Bell size={21} />
            <span />
          </button>
          <div className="profile-wrap">
            <button
              className="profile-trigger"
              onClick={() => setProfileMenu(!profileMenu)}
              aria-label="Cambiar perfil"
            >
              <span className={`avatar ${activeProfile.pattern}`}>{activeProfile.face}</span>
              <ChevronDown size={16} />
            </button>
            {profileMenu && (
              <div className="profile-dropdown">
                {profiles.map((p) => (
                  <button key={p.name} onClick={() => switchProfile(p.name)}>
                    <span className={`avatar ${p.pattern}`}>{p.face}</span>
                    {p.name}
                    {profile === p.name && <Check size={15} />}
                  </button>
                ))}
                <button
                  className="manage-profile"
                  onClick={() => {
                    setProfileMenu(false);
                    setProfilePicker(true);
                  }}
                >
                  <UserRound size={16} /> Ver perfiles
                </button>
              </div>
            )}
          </div>
        </div>
      </header>

      {!searching && view === "Inicio" && (
        <section className="hero">
          <div className="hero-image" />
          <div className="hero-overlay" />
          <div className="hero-content">
            <div className="eyebrow">
              <span className="n-mark large">G</span>
              <span>SERIE DESTACADA</span>
              <span className="eyebrow-line" />
            </div>
            <div className="hero-title">
              STRANGER
              <br />
              <span>THINGS</span>
              <sup>5</sup>
            </div>
            <div className="hero-topline">
              <span className="top-badge">DESTACADA</span>
              <strong>El final de una era</strong>
            </div>
            <p className="hero-description">
              Una última aventura. Una última oportunidad para salvar Hawkins. El final de una
              historia que lo cambió todo.
            </p>
            <div className="hero-buttons">
              <button className="play-button" onClick={() => play(hero)}>
                <Play size={23} fill="currentColor" /> Ver tráiler
              </button>
              <button className="info-button" onClick={() => openDetails(hero)}>
                <Info size={23} /> Más información
              </button>
            </div>
            <div className="hero-meta">
              <span>2025</span>
              <span>16+</span>
              <span>5 temporadas</span>
              <span>Ciencia ficción</span>
            </div>
          </div>
          <div className="hero-side">
            <button aria-label="Reproducir tráiler destacado" onClick={() => play(hero)}>
              <Volume2 size={18} />
            </button>
            <span>16+</span>
          </div>
          <div className="hero-bottom-gradient" />
        </section>
      )}

      <main
        className={searching || view !== "Inicio" ? "browse-content browse-top" : "browse-content"}
      >
        {searching ? (
          <>
            <div className="results-head">
              <div>
                <div className="section-kicker">TU UNIVERSO DE HISTORIAS</div>
                <h1>
                  {view === "Mi lista"
                    ? "Mi lista"
                    : query
                      ? `Resultados para “${query}”`
                      : "Explora por género"}
                </h1>
                <p>
                  {filtered.length}{" "}
                  {filtered.length === 1 ? "título disponible" : "títulos disponibles"}
                </p>
              </div>
              <div className="filter-wrap">
                <span>Género</span>
                <select
                  aria-label="Filtrar por género"
                  value={genre}
                  onChange={(e) => setGenre(e.target.value)}
                >
                  {genres.map((g) => (
                    <option key={g}>{g}</option>
                  ))}
                </select>
              </div>
            </div>
            {filtered.length ? (
              <div className="results-grid">
                {filtered.map((item) => (
                  <Card key={item.id} item={item} />
                ))}
              </div>
            ) : (
              <div className="empty-state">
                <Film size={46} />
                <h2>Aquí todavía no hay nada</h2>
                <p>
                  {view === "Mi lista"
                    ? "Agrega títulos con el botón + para encontrarlos aquí."
                    : "Prueba con otro título, personaje o género."}
                </p>
                <button
                  onClick={() => {
                    setQuery("");
                    setGenre("Todos");
                    navigate("Inicio");
                  }}
                >
                  Volver al inicio
                </button>
              </div>
            )}
          </>
        ) : view === "Personajes" ? (
          <div className="characters-page">
            <div className="section-kicker">CONOCE A LOS PROTAGONISTAS</div>
            <h1>
              Personajes que dejan huella<span>.</span>
            </h1>
            <p>Detrás de cada gran historia hay alguien imposible de olvidar.</p>
            <div className="character-grid">
              {catalog.map((item) => (
                <button
                  className="character-card"
                  key={item.id}
                  aria-label={`Conocer a ${item.character} de ${item.name}`}
                  onClick={() => openDetails(item)}
                >
                  <img src={item.image} alt="" />
                  <span className="character-overlay" />
                  <span className="character-text">
                    <small>{item.name}</small>
                    <strong>{item.character}</strong>
                    <span>
                      Conocer personaje <ChevronRight size={15} />
                    </span>
                  </span>
                </button>
              ))}
            </div>
          </div>
        ) : (
          <>
            {view === "Inicio" && (
              <div className="welcome-line">
                <span className="welcome-dot" /> PARA TI, {profile.toUpperCase()}{" "}
                <span className="welcome-divider" />{" "}
                <span>Historias que no podrás dejar de ver</span>
              </div>
            )}
            <Shelf
              title={
                view === "Inicio"
                  ? "Tendencias ahora"
                  : view === "Series"
                    ? "Series para maratonear"
                    : "Películas para esta noche"
              }
              subtitle={
                view === "Inicio" ? "Las historias de las que todos están hablando" : undefined
              }
              items={
                view === "Películas"
                  ? catalog.filter((item) => item.kind === "Película")
                  : catalog.filter((item) => item.kind === "Serie").slice(0, 7)
              }
            />
            {view === "Inicio" && (
              <>
                <Shelf
                  title="El top 5 de Gus"
                  subtitle="Tus próximos favoritos están aquí"
                  items={[catalog[7], catalog[0], catalog[2], catalog[1], catalog[3]]}
                  ranked
                />
                <Shelf
                  title="Películas que atrapan"
                  items={catalog.filter((item) => item.kind === "Película")}
                />
                <Shelf
                  title="Continúa explorando"
                  items={
                    recent.length
                      ? recent
                          .map((id) => catalog.find((item) => item.id === id))
                          .filter((item): item is Title => Boolean(item))
                      : [catalog[4], catalog[5], catalog[6], catalog[8]]
                  }
                />
                <div className="editorial">
                  <div className="editorial-image" />
                  <div className="editorial-copy">
                    <span className="section-kicker">UN MUNDO POR DESCUBRIR</span>
                    <h2>Tu próxima obsesión empieza aquí.</h2>
                    <p>
                      Hay historias que se quedan contigo. Descubre personajes inolvidables y
                      universos a los que querrás volver.
                    </p>
                    <button onClick={() => navigate("Personajes")}>
                      Explorar personajes <ChevronRight size={19} />
                    </button>
                  </div>
                </div>
                <Shelf
                  title="Historias para otro mundo"
                  items={[catalog[4], catalog[7], catalog[5], catalog[8], catalog[3], catalog[1]]}
                />
              </>
            )}
          </>
        )}
      </main>
      <footer className="site-footer">
        <span className="footer-brand">
          GUS<span>FLIX</span>
        </span>
        <span>Una experiencia hecha para Gus.</span>
        <span>Catálogo de muestra · Tráilers oficiales en YouTube · No afiliado a Netflix</span>
      </footer>

      {selected && (
        <div className="modal-backdrop">
          <button
            className="backdrop-dismiss"
            aria-label="Cerrar detalles"
            onClick={() => setSelected(null)}
          />
          <dialog
            open
            className="detail-modal"
            aria-modal="true"
            aria-label={`Detalles de ${selected.name}`}
          >
            <button className="modal-close" onClick={() => setSelected(null)} aria-label="Cerrar">
              <X size={24} />
            </button>
            <div className="detail-hero">
              <img src={selected.image} alt="" />
              <div className="detail-gradient" />
              <div className="detail-hero-content">
                <div className="detail-type">
                  <span className="n-mark">G</span> {selected.kind.toUpperCase()}
                </div>
                <h2>{selected.name}</h2>
                <div className="detail-actions">
                  <button className="play-button" onClick={() => play(selected)}>
                    <Play size={21} fill="currentColor" /> Ver tráiler
                  </button>
                  <button
                    className="round-action"
                    onClick={() => toggleSaved(selected.id)}
                    aria-label={
                      saved.includes(selected.id) ? "Quitar de mi lista" : "Añadir a mi lista"
                    }
                  >
                    {saved.includes(selected.id) ? <Check size={23} /> : <Plus size={23} />}
                  </button>
                </div>
              </div>
            </div>
            <div className="detail-body">
              <div className="detail-main">
                <div className="detail-meta">
                  <strong>{selected.match}% de coincidencia</strong>
                  <span>{selected.year}</span>
                  <span className="age-box">{selected.maturity}</span>
                  <span>{selected.seasons}</span>
                  <span className="hd-box">HD</span>
                </div>
                <p>{selected.description}</p>
                <div className="character-feature">
                  <span>PERSONAJE DESTACADO</span>
                  <h3>{selected.character}</h3>
                  <p>{selected.characterDescription}</p>
                </div>
              </div>
              <aside>
                <p>
                  <span>Protagonistas:</span> {selected.cast.join(", ")}
                </p>
                <p>
                  <span>Género:</span> {selected.genre}
                </p>
                <p>
                  <span>Este programa es:</span> Inmersivo, emocionante
                </p>
              </aside>
            </div>
          </dialog>
        </div>
      )}
      {trailer && (
        <div className="modal-backdrop player-backdrop">
          <button
            className="backdrop-dismiss"
            aria-label="Cerrar tráiler"
            onClick={() => setTrailer(null)}
          />
          <dialog
            open
            className="player-modal"
            aria-modal="true"
            aria-label={`Tráiler de ${trailer.name}`}
          >
            <div className="player-header">
              <span>
                <Clapperboard size={20} /> Tráiler oficial · {trailer.name}
              </span>
              <button onClick={() => setTrailer(null)} aria-label="Cerrar tráiler">
                <X size={24} />
              </button>
            </div>
            <div className="player-frame">
              <iframe
                src={`https://www.youtube-nocookie.com/embed/${trailer.trailer}?autoplay=1&rel=0`}
                title={`Tráiler oficial de ${trailer.name}`}
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                allowFullScreen
                referrerPolicy="strict-origin-when-cross-origin"
              />
            </div>
            <p>
              Tráiler oficial alojado en YouTube. Para ver la serie completa, visita la plataforma
              oficial.
            </p>
          </dialog>
        </div>
      )}
      {profilePicker && (
        <dialog open className="profile-screen" aria-modal="true" aria-label="Seleccionar perfil">
          <button
            className="profile-screen-close"
            onClick={() => setProfilePicker(false)}
            aria-label="Cerrar"
          >
            <X size={26} />
          </button>
          <h2>¿Quién está viendo?</h2>
          <div className="profile-options">
            {profiles.map((p) => (
              <button key={p.name} onClick={() => switchProfile(p.name)}>
                <span className={`big-avatar ${p.pattern}`}>{p.face}</span>
                <span>{p.name}</span>
              </button>
            ))}
          </div>
          <p>Tu espacio, tus historias.</p>
        </dialog>
      )}
    </div>
  );
}

export default Index;
